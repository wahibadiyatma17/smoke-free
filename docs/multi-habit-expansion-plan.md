# Multi-Habit Expansion — Implementation Plan

Status: **Plan locked, ready to execute in phases.**
Last updated: 2026-04-17

---

## Vision

Evolve the current smoking-only app into **Breaking the Habit** — a multi-habit self-mastery PWA. Each habit (smoking, alcohol, pornography, …future) is a first-class module with its own onboarding flow, quit date, stats, health milestones, badges, educational facts, craving tips, motivation categories, and visual theme. Users track multiple habits **in parallel** and flip the active habit view from the dashboard header.

---

## Locked decisions

| # | Decision | Implication |
|---|---|---|
| 1 | **Parallel tracking** — all enabled habits tick simultaneously | Each habit has own quit date; all run in background; header selector only changes the *view* |
| 2 | **Label pornography literally** ("Pornografi") | Still applies privacy-first defaults (hidden from selector by default, optional PIN) — the literal naming doesn't mean we show it loudly |
| 3 | **App rename → "Breaking the Habit"** | Rebrand metadata, manifest, landing page, PWA title, Apple web app title. Bahasa Indonesia body copy unchanged |
| 4 | **Global craving log, tagged by `habitId`** | One Firestore collection `cravings/*`; every entry has `habitId` field; queries filter by active habit |
| 5 | **Inline read migration** | Legacy smoking-only profiles are transparently reshaped on every read; persisted on next write. No backfill script, no downtime |
| 6 | **Single-habit onboarding — user picks ONE focus habit to start** | First onboarding step is a single-select: "Kebiasaan apa yang ingin kamu atasi dulu?" → user picks exactly one; mini-onboarding runs for that habit only; additional habits are added later via Profil |
| 7 | **New habits added only from Profil page** | Header selector never shows "+ Add habit". Adding happens via a "Tambah kebiasaan" entry in Profil |
| 8 | **Remove habit = soft-archive, never purge** | Removing a habit sets `archived: true` on that habit slot; quit date, badges, and craving-log entries all remain in Firestore. User can restore from Profil. No destructive UI action |

---

## Data model

```ts
// src/habits/types.ts
type HabitId = 'smoking' | 'alcohol' | 'porn'

interface SmokingData   { quitDate: Timestamp; cigarettesPerDay: number; pricePerPack: number; cigarettesPerPack: number; motivation: string }
interface AlcoholData   { quitDate: Timestamp; drinksPerWeek:    number; pricePerDrink: number; motivation: string }
interface PornData      { quitDate: Timestamp; sessionsPerWeek:  number; motivation: string; privacy: 'visible' | 'hidden'; pinHash?: string }

// All three data shapes also carry:
//   archived?: boolean      // soft-archived, hidden from selector, restorable
//   archivedAt?: Timestamp

type HabitProfiles = {
  smoking?: SmokingData
  alcohol?: AlcoholData
  porn?:    PornData
}

interface UserProfile {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  activeHabitId: HabitId
  habits: HabitProfiles
  // + existing audit fields
}
```

### Craving log
```ts
// Firestore: users/{uid}/cravings/{id}
interface CravingLog {
  id: string
  uid: string
  habitId: HabitId           // NEW — tag for filtering
  timestamp: Timestamp
  intensity: number          // 1–10 (meaning is habit-specific; same scale)
  trigger: string            // pemicu — list differs per habit
  copingUsed: string         // cara atasi — list differs per habit
  resisted: boolean
  note?: string
}
```

### Inline migration (reads)
```ts
function normalizeProfile(raw: any): UserProfile {
  if (raw.habits) return raw              // already migrated
  if (raw.quitDate) {
    return {
      ...raw,
      activeHabitId: 'smoking',
      habits: {
        smoking: {
          quitDate:         raw.quitDate,
          cigarettesPerDay: raw.cigarettesPerDay,
          pricePerPack:     raw.pricePerPack,
          cigarettesPerPack: raw.cigarettesPerPack ?? 16,
          motivation:       raw.motivation,
        },
      },
    }
  }
  throw new Error('unrecognized profile shape')
}
```

---

## Code architecture

```
src/
  habits/
    types.ts                    ← HabitConfig, HabitStats, registry types
    registry.ts                 ← { smoking, alcohol, porn }
    useActiveHabit.ts           ← returns { config, profile, stats }
    <HabitProvider>             ← context, theme swap on change
    migration.ts                ← normalizeProfile()
    smoking/
      config.ts                 ← id, label, theme tokens, unitLabels, sourceUrls
      onboarding.ts             ← step definitions (date, cigs/day, price, motivation)
      compute.ts                ← stats(data) → { moneySaved, avoided, hoursLife, ... }
      milestones.ts             ← health milestones (emoji icons)
      badges.ts                 ← gamification (emoji icons)
      facts.ts                  ← educational content + categoryMeta (emoji)
      tips.ts                   ← craving tips + categories (emoji)
      motivations.ts            ← selection options (emoji)
      copy.ts                   ← all Indonesian user-facing strings
    alcohol/   ← mirror of smoking/
    porn/      ← mirror + privacy
```

**Rule of thumb:** nothing in `src/app/**` or generic components references smoking fields directly. They read from `useActiveHabit()`.

### Habit config shape

```ts
interface HabitConfig<TData> {
  id: HabitId
  label: string                          // "Rokok", "Alkohol", "Pornografi"
  emoji: string                          // header selector icon
  theme: ThemeTokens                     // CSS custom property overrides
  privacy?: 'always-visible' | 'hideable'
  onboarding: OnboardingStep[]
  compute: (data: TData) => HabitStats
  milestones: Milestone[]
  badges: Badge[]
  facts: Fact[]
  tips: TipCategory[]
  motivations: Motivation[]
  cravingTriggers: string[]              // "Stres", "Setelah makan", ...
  cravingCopings:  string[]              // "Tarik napas dalam", ...
  copy: Record<string, string>           // habit-specific labels: "Rokok Dihindari", "Minuman Dihindari"
}
```

### Shared `HabitStats` interface
To keep pages habit-agnostic, all `compute()` fns return the same shape:

```ts
interface HabitStats {
  diffMs: number; diffSeconds: number; diffMinutes: number; diffHours: number
  diffDays: number; diffWeeks: number; diffMonths: number; diffYears: number
  moneySaved: number          // 0 for porn
  unitsAvoided: number        // cigarettes | drinks | sessions
  unitsLabel: string          // "batang" | "minuman" | "sesi"
  timeReclaimed: { minutes: number; hours: number; days: number }
}
```

---

## Theming

Each habit ships a theme token set that overrides `:root` CSS vars inside `<HabitProvider>`:

```ts
interface ThemeTokens {
  primary:      string  // --green in smoking
  primaryMid:   string
  primaryDark:  string
  primaryPale:  string
  primaryTint:  string
  accent:       string  // --coral in smoking
  accentPale:   string
  // ... matches existing palette vars
}
```

**Palette per habit:**
- **Smoking** — current green + coral + amber (keep existing tokens as the default baseline)
- **Alcohol** — amber/ochre primary + teal accent (clarity, sobriety, liver-friendly palette)
- **Pornography** — muted indigo/slate primary + warm sand accent (calm, private, deliberately non-shaming — avoid red/black)

Transition: 300ms CSS `transition` on `background-color`/`color`/`border-color` at `:root` level. Respect `prefers-reduced-motion`.

---

## Pornography — sensitive handling (still applies despite literal label)

- **Privacy default:** `privacy: 'hidden'` on creation. Hidden habits:
  - Don't appear in dashboard header selector
  - Accessed only via Profil → "Kebiasaan Tersembunyi"
  - Optional device-level PIN/biometric before opening
- **Evidence-based facts only:** cite Kraus, Voon, Love et al. around compulsive sexual behavior. **Skip NoFap pseudoscience** (no "superpowers" claims).
- **No monetary stat** — show time reclaimed + sessions avoided + focus/sleep milestones.
- **Copy tone:** self-mastery and compassion, not shame. Indonesian phrasing reviewed carefully.
- **App Store description:** use "digital wellness / habit recovery" umbrella wording; don't surface the word "pornografi" in store metadata.

---

## Shared vs habit-specific

| Concern | Scope |
|---|---|
| Auth, profile basics, navigation, layout | Shared |
| CravingLog collection | Shared, filtered by `habitId` |
| Daily motivational quotes (pool) | Shared; habit may inject extras |
| InsightCard component | Shared; pulls facts from active habit |
| Quit date & all stats formulas | Per habit |
| Milestones, badges, facts, tips, motivations | Per habit |
| Theme tokens | Per habit |
| Onboarding steps | Per habit (common wrapper) |
| Craving triggers & coping lists | Per habit |

---

## Phased rollout

### Phase 1 — Architectural refactor (smoking only, zero visible change) ← **start here**
- [ ] Rename app metadata to "Breaking the Habit" (layout.tsx, manifest.json, apple-web-app title, landing copy)
- [ ] Create `src/habits/{types,registry,useActiveHabit,HabitProvider,migration}.ts`
- [ ] Extract current smoking data into `src/habits/smoking/{config,compute,milestones,badges,facts,tips,motivations,onboarding,copy}.ts`
- [ ] Wrap app in `<HabitProvider>`; default activeHabit = `'smoking'`
- [ ] Migrate every dashboard/progress/achievements/profil/cravings/insight reference to use `useActiveHabit()` (no direct `profile.cigarettesPerDay` in UI code)
- [ ] Read-side migration shim in `UserDataContext`
- [ ] Add habit-picker step 0 to onboarding — "Kebiasaan apa yang ingin kamu atasi dulu?" — single-select. For now smoking is the only option (auto-select / skip-if-single). Step exists so Phase 4 just lights up more options.
- [ ] Add `habitId` to all new CravingLog writes; reads for now default to smoking
- [ ] **Acceptance:** existing user sees pixel-identical app; new user goes through "pick habit → smoking onboarding"; build + smoke test green; any future habit just drops a module in `src/habits/<id>/`

### Phase 2 — Theming system
- [ ] Audit hardcoded colors in all pages/components (some use raw hex) and replace with CSS vars
- [ ] `<HabitProvider>` sets per-habit CSS vars on `<html>` or a wrapping `<div>`
- [ ] Add 300ms transition on themed properties
- [ ] Smoking theme stays identical to current palette
- [ ] **Acceptance:** themes swap live when activeHabit changes, respecting reduced-motion

### Phase 3 — Alcohol habit module
- [ ] Research: Indonesian drinking patterns, alcohol pricing (cheapest bir ≈ Rp 25–45k, liquor varies), liver recovery milestones, sleep/BP improvements, calorie math
- [ ] Build full `src/habits/alcohol/` module
- [ ] Alcohol onboarding steps: quit date, drinks/week, avg price/drink, motivation
- [ ] Milestones: 24h sleep, 72h withdrawal peak, 1w BP, 2w liver fat ↓, 1m insulin sensitivity, 3m liver regeneration, 1y cancer risk ↓
- [ ] Badges: Hari pertama, Seminggu jernih, Sebulan sadar, Setahun bebas, etc.
- [ ] Theme tokens (amber/teal)
- [ ] Register; **keep feature-flagged off** until content reviewed
- [ ] **Acceptance:** enabling the flag lets a test user onboard alcohol and see a full working dashboard

### Phase 4 — Turn alcohol on end-to-end (selector + add-flow + unflag)
Bundled as one shipment because no piece is useful alone: the selector only matters when ≥2 habits exist; the add-flow only matters when alcohol is unflagged.
- [ ] Onboarding step 0 now lists smoking + alcohol as selectable (still single-select — user picks the *first* focus habit)
- [ ] Profil page: "Tambah kebiasaan" section showing not-yet-enabled habits; tapping runs that habit's mini-onboarding and appends to `habits.*`
- [ ] Header selector UI in dashboard top-right: pill with active habit's emoji + label; tap opens bottom sheet with enabled (non-archived) habits
- [ ] Switching active habit: persist `activeHabitId`, animate theme, stats recompute, craving log re-filters by `habitId`
- [ ] Remove alcohol feature-flag
- [ ] **Acceptance:** existing smoking user can tap Profil → "Tambah kebiasaan" → Alkohol → complete mini-onboarding → dashboard selector now shows both; switching works with theme transition

### Phase 5 — Profil edit, archive, restore
- [ ] Per-habit edit sheet (reuse existing edit UI, parameterised by habit config)
- [ ] "Hentikan pantauan" (stop tracking) action on each habit → sets `archived: true, archivedAt: now`
- [ ] Archived habits move to "Kebiasaan Diarsipkan" section in Profil — listed but excluded from header selector
- [ ] "Pulihkan" (restore) on archived habit → clears `archived`, returns it to the active selector
- [ ] If user archives the current `activeHabitId`, auto-switch to another non-archived habit (or prompt to add a new one if none left)
- [ ] Craving log entries are untouched; badges remain — everything is restorable
- [ ] **Acceptance:** archiving and restoring a habit preserves 100% of its data; no destructive path exposed in the UI

### Phase 6 — Pornography habit module (privacy-first)
- [ ] Content research: peer-reviewed sources only, sensitive Indonesian copy review
- [ ] Build `src/habits/porn/` module
- [ ] Privacy defaults (confirmed decision):
  - `privacy: 'hidden'` by default on creation
  - Hidden habits don't appear in the dashboard header selector
  - Accessed via Profil → "Kebiasaan Tersembunyi"
  - Optional PIN gate before opening (stored as `pinHash` — bcrypt/argon2 of a 4–6 digit PIN; no biometric in Phase 6, WebAuthn can come later)
  - User can flip to `privacy: 'visible'` from Profil if they want it in the normal selector
- [ ] Indigo/slate theme (calm, non-shaming)
- [ ] Onboarding surfaces the privacy choice upfront and defaults to hidden+PIN
- [ ] Register; flagged off until content + copy reviewed
- [ ] **Acceptance:** user can enable privately; hidden habit never leaks into header selector or aggregate views without unlock; forgetting PIN locks user out (document recovery path — Firestore admin reset)

### Phase 7 — Polish & aggregate
- [ ] Aggregate stats view: "Kamu bebas dari N kebiasaan • total M hari • Rp X hemat"
- [ ] Home empty state when switching to a habit without data yet
- [ ] Smooth cross-fade transition on habit switch
- [ ] Analytics: per-habit retention, switch frequency

---

## Rename scope: "Napas Baru" → "Breaking the Habit"

Files touching the brand name (audit during Phase 1):
- `src/app/layout.tsx` — `metadata.title`, `metadata.description`, `appleWebApp.title`
- `src/app/page.tsx` — landing logo "Napas Baru" text + tagline "bebas rokok, selamanya"
- `public/manifest.json` — name, short_name, description
- `public/service-worker.js` (if exists) — cache name
- Any PWA icons/splash that bake the name in (likely none — current icons are just the leaf)

Bahasa Indonesia body copy inside pages stays unchanged; only the app name + tagline change.

---

## Open risks / things to watch

1. **Firestore rules** — ensure cravings query supports `where('habitId', '==', x)`; may need composite index on `(uid, habitId, timestamp)`.
2. **PWA cache invalidation** on rename — users may get stale "Napas Baru" splash until service worker updates. Bump cache version on Phase 1 release.
3. **Profile migration edge cases** — guest-mode localStorage profile also needs the same normalization function.
4. **Theme flash on initial load** — render with neutral theme and swap once `activeHabitId` is known to avoid flicker.
5. **"Remove habit" semantics** — ✅ resolved: soft-archive only (locked decision #8). Implementation detail: header selector + aggregate views must filter by `!habit.archived`.
6. **Forgot-PIN recovery for pornography** — Phase 6 open issue. Current thinking: no in-app reset (PIN protects exactly this case); provide a doc/email recovery path that wipes the habit's profile (not the craving log). Revisit before Phase 6 ship.

---

## Recommended start

Execute **Phase 1 only** in the next session. It's pure plumbing with zero user-visible change, which makes it a safe pre-commit before anyone else looks at this. Once Phase 1 is merged and running for a few days, Phases 3+ become "fill in a module" work rather than rewrites.

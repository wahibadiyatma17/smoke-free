import type { HabitTheme } from '../types'

/**
 * Alcohol theme — Ocean Clarity.
 *
 * Light: cool cream backdrop, deep ocean teal primary, sunset orange accent.
 * Dark: night-sea surfaces (deep blue-green-black), bright cyan primary,
 * warm ember orange accent. Keeps the "water at night" mood consistent
 * with the daytime version. Amber (money) and lavender (milestones) stay
 * stable across habits.
 */
export const alcoholTheme: HabitTheme = {
  light: {
    cream:        '#F4F8FA',
    card:         '#FFFFFF',
    cardTinted:   '#EEF4F7',

    green:        '#0891B2',
    greenMid:     '#0E7490',
    greenDark:    '#164E63',
    greenPale:    '#ECFEFF',
    greenTint:    '#A5F3FC',

    coral:        '#EA580C',
    coralMid:     '#C2410C',
    coralPale:    '#FFF7ED',
    coralTint:    '#FED7AA',

    amber:        '#F5A523',
    amberPale:    '#FEF6E3',
    amberTint:    '#FDE8A0',

    lavender:     '#8B7FD4',
    lavenderPale: '#F0EEFF',
    lavenderTint: '#D8D2FF',
  },
  dark: {
    cream:        '#0B1318',
    card:         '#131F25',
    cardTinted:   '#1A2831',

    green:        '#22D3EE',
    greenMid:     '#67E8F9',
    greenDark:    '#A5F3FC',
    greenPale:    '#112A33',
    greenTint:    '#1E4450',

    coral:        '#FB923C',
    coralMid:     '#FDBA74',
    coralPale:    '#2B1C12',
    coralTint:    '#4A2F1C',

    amber:        '#FFB84D',
    amberPale:    '#2E2415',
    amberTint:    '#4A3A20',

    lavender:     '#A89CEC',
    lavenderPale: '#1F1D2E',
    lavenderTint: '#352F4E',
  },
}

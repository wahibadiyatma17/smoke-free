import type { HabitTheme } from '../types'

/**
 * Sugar theme — Berry Bloom.
 *
 * Light: soft rose cream backdrop, deep raspberry-pink primary, fresh
 * orange accent — sweet-toned without reading sugary/candy-like, so the
 * palette celebrates natural sweetness (berries, fruit) instead of the
 * processed kind being quit. Dark: warm plum-black surfaces with bright
 * pink primary, keeping the "berries at dusk" mood. Amber (money) and
 * lavender (milestones) stay stable across habits.
 */
export const sugarTheme: HabitTheme = {
  light: {
    cream:        '#FDF6F8',
    card:         '#FFFFFF',
    cardTinted:   '#FBF0F3',

    green:        '#DB2777',
    greenMid:     '#BE185D',
    greenDark:    '#9D174D',
    greenPale:    '#FDF2F8',
    greenTint:    '#FBCFE8',

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
    cream:        '#161014',
    card:         '#211820',
    cardTinted:   '#2B1F29',

    green:        '#F472B6',
    greenMid:     '#F9A8D4',
    greenDark:    '#FBCFE8',
    greenPale:    '#331B29',
    greenTint:    '#4E2A3F',

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

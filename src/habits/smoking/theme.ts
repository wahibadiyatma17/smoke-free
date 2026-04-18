import type { HabitTheme } from '../types'

/**
 * Smoking theme — Warm Outdoors.
 * Light: warm cream backdrop, fresh sage green primary, coral urgent accent.
 * Dark: deep warm brown surfaces keep the "outdoors at dusk" mood without
 * going cold-blue. Accent greens/corals are brightened so they read clearly
 * against low-key surfaces. Pale/tint variants on dark become dim tinted
 * surfaces (colored dim) rather than near-white paper.
 */
export const smokingTheme: HabitTheme = {
  light: {
    cream:        '#FAF7F0',
    card:         '#FFFFFF',
    cardTinted:   '#FDF9F3',

    green:        '#3DBE8F',
    greenMid:     '#2A9E72',
    greenDark:    '#1A6B4E',
    greenPale:    '#E9F8F1',
    greenTint:    '#C8EFE0',

    coral:        '#F06B4D',
    coralMid:     '#D95A3D',
    coralPale:    '#FEF0EC',
    coralTint:    '#FBCFBF',

    amber:        '#F5A523',
    amberPale:    '#FEF6E3',
    amberTint:    '#FDE8A0',

    lavender:     '#8B7FD4',
    lavenderPale: '#F0EEFF',
    lavenderTint: '#D8D2FF',
  },
  dark: {
    cream:        '#14110C',
    card:         '#1E1A14',
    cardTinted:   '#262118',

    green:        '#4FDBA6',
    greenMid:     '#6BE8B7',
    greenDark:    '#8FEFC7',
    greenPale:    '#1F2D25',
    greenTint:    '#2E4A3B',

    coral:        '#FF8F6E',
    coralMid:     '#FFA184',
    coralPale:    '#2E1F17',
    coralTint:    '#4A2E23',

    amber:        '#FFB84D',
    amberPale:    '#2E2415',
    amberTint:    '#4A3A20',

    lavender:     '#A89CEC',
    lavenderPale: '#1F1D2E',
    lavenderTint: '#352F4E',
  },
}

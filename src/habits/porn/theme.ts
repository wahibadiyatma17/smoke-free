import type { HabitTheme } from '../types'

/**
 * PMO theme — Mindful Rose.
 *
 * Light: warm pink-tinted cream, deep indigo primary, soft rose accent —
 * the "still, well-lit room" mood.
 * Dark: deep indigo-black surfaces with a soft rose-pink tint, brightened
 * indigo primary, muted dusty rose accent — like moonlight in a quiet
 * bedroom. Keeps the non-shaming contemplative mood consistent.
 */
export const pornTheme: HabitTheme = {
  light: {
    cream:        '#FAF5F7',
    card:         '#FFFFFF',
    cardTinted:   '#F5EEF1',

    green:        '#6366F1',
    greenMid:     '#4F46E5',
    greenDark:    '#3730A3',
    greenPale:    '#EEF2FF',
    greenTint:    '#C7D2FE',

    coral:        '#E8889C',
    coralMid:     '#C6627A',
    coralPale:    '#FDF2F5',
    coralTint:    '#F9CCDA',

    amber:        '#F5A523',
    amberPale:    '#FEF6E3',
    amberTint:    '#FDE8A0',

    lavender:     '#8B7FD4',
    lavenderPale: '#F0EEFF',
    lavenderTint: '#D8D2FF',
  },
  dark: {
    cream:        '#120C10',
    card:         '#1C1419',
    cardTinted:   '#241A21',

    green:        '#818CF8',
    greenMid:     '#A5B4FC',
    greenDark:    '#C7D2FE',
    greenPale:    '#1C1D3D',
    greenTint:    '#2D2E5C',

    coral:        '#F0A0B5',
    coralMid:     '#F3B5C5',
    coralPale:    '#2B1921',
    coralTint:    '#4A2C38',

    amber:        '#FFB84D',
    amberPale:    '#2E2415',
    amberTint:    '#4A3A20',

    lavender:     '#A89CEC',
    lavenderPale: '#1F1D2E',
    lavenderTint: '#352F4E',
  },
}

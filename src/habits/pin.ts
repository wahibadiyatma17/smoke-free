/**
 * PIN hashing utilities for hidden habits.
 *
 * Threat model: the PIN is a friction gate to prevent casual over-the-shoulder
 * or phone-grab access to a sensitive habit. It is NOT cryptographic protection
 * — the user's Firestore data is accessible to their authenticated session
 * regardless, and localStorage (for guest mode) is readable by any script on
 * the origin.
 *
 * Given that, SHA-256 with a per-habit random salt is sufficient. Iterating
 * (PBKDF2) adds little since the effective search space of a 4–6 digit numeric
 * PIN is small either way. The salt prevents rainbow-table lookups across
 * multiple users.
 */

const hex = (bytes: Uint8Array) =>
  Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

export function generatePinSalt(): string {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return hex(arr)
}

export async function hashPin(pin: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${pin}::${salt}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return hex(new Uint8Array(digest))
}

export async function verifyPin(pin: string, salt: string, expectedHash: string): Promise<boolean> {
  const actual = await hashPin(pin, salt)
  // Constant-time-ish: compare all chars regardless of mismatch position.
  if (actual.length !== expectedHash.length) return false
  let diff = 0
  for (let i = 0; i < actual.length; i++) {
    diff |= actual.charCodeAt(i) ^ expectedHash.charCodeAt(i)
  }
  return diff === 0
}

export function isValidPinFormat(pin: string): boolean {
  return /^\d{4,6}$/.test(pin)
}

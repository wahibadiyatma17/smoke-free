/**
 * Generate PNG icons from SVG for PWA/TWA.
 * Run once: node scripts/generate-icons.mjs
 * Requires: npm install --save-dev sharp
 */

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const iconSvg = readFileSync(join(publicDir, 'icons', 'icon.svg'))
const maskableSvg = readFileSync(join(publicDir, 'icons', 'icon-maskable.svg'))

const sizes = [192, 512]

async function generate() {
  for (const size of sizes) {
    await sharp(iconSvg)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, 'icons', `icon-${size}.png`))
    console.log(`icon-${size}.png`)

    await sharp(maskableSvg)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, 'icons', `icon-maskable-${size}.png`))
    console.log(`icon-maskable-${size}.png`)
  }

  // Apple touch icon (180x180)
  await sharp(iconSvg)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'icons', 'apple-touch-icon.png'))
  console.log('apple-touch-icon.png')

  console.log('All icons generated.')
}

generate().catch(console.error)

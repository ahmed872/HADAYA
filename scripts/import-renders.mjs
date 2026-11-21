// يحوّل الصور المصيّرة (PNG) إلى JPG عالي الجودة داخل assets-src/
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
const [from] = process.argv.slice(2)
const to = path.resolve(import.meta.dirname, '..', 'assets-src')
for (const f of (await readdir(from)).filter((f) => f.endsWith('.png') && !f.startsWith('test'))) {
  await sharp(path.join(from, f)).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(to, f.replace('.png', '.jpg')))
  console.log('→', f)
}

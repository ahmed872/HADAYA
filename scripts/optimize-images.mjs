/**
 * يولّد صوراً متجاوبة (WebP بعدة مقاسات) من الصور الأصلية في assets-src/
 * ويكتب ملف src/data/images.json (الأبعاد + المقاسات المتاحة + لون/صورة مصغرة للتحميل).
 *
 * الاستخدام: npm run images
 * لإضافة صورة جديدة: ضعها في assets-src/ (jpg/png/webp) ثم شغّل الأمر.
 */
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets-src')
const OUT = path.join(ROOT, 'public', 'images')
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.json')
const WIDTHS = [480, 800, 1200, 1600, 2400]

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const manifest = {}

for (const file of files) {
  const name = path.parse(file).name
  const input = path.join(SRC, file)
  const meta = await sharp(input).metadata()
  const widths = WIDTHS.filter((w) => w < meta.width)
  widths.push(Math.min(meta.width, 2400))
  const uniq = [...new Set(widths)]
  const srcTime = (await stat(input)).mtimeMs
  for (const w of uniq) {
    const out = path.join(OUT, `${name}-${w}.webp`)
    const fresh = await stat(out).then((s) => s.mtimeMs > srcTime).catch(() => false)
    if (fresh) continue
    await sharp(input).resize({ width: w }).webp({ quality: w <= 800 ? 78 : 74, effort: 5 }).toFile(out)
  }
  const tiny = await sharp(input).resize({ width: 16 }).blur(1).webp({ quality: 40 }).toBuffer()
  manifest[name] = {
    w: meta.width,
    h: meta.height,
    widths: uniq,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
  }
  console.log('✓', name, uniq.join(','))
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 1))
console.log(`\n${files.length} images → public/images, manifest → src/data/images.json`)

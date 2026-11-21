import images from '../data/images.json'

const base = import.meta.env.BASE_URL

export const imgUrl = (name, w) => {
  const m = images[name]
  if (!m) return ''
  const width = w ? m.widths.find((x) => x >= w) ?? m.widths.at(-1) : m.widths.at(-1)
  return `${base}images/${name}-${width}.webp`
}

export const srcSet = (name) => {
  const m = images[name]
  return m ? m.widths.map((w) => `${base}images/${name}-${w}.webp ${w}w`).join(', ') : undefined
}

export const imageMeta = (name) => images[name]

/**
 * صورة متجاوبة مع srcset وخلفية ضبابية أثناء التحميل.
 * name: اسم الصورة في public/images (بدون المقاس والامتداد)
 */
export default function Img({ name, alt = '', sizes = '100vw', className = '', priority = false, style, ...rest }) {
  const m = images[name]
  if (!m) return <div className={`bg-navy-800 ${className}`} role="img" aria-label={alt} />
  return (
    <img
      src={imgUrl(name, 1200)}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={{ backgroundImage: `url(${m.blur})`, backgroundSize: 'cover', ...style }}
      {...rest}
    />
  )
}

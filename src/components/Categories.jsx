import { ArrowUpLeft } from 'lucide-react'
import { categories } from '../data/catalog'
import { SectionHeading } from './Brand'
import Img from './Img'

// asymmetric editorial grid (desktop): positions per item
const layout = [
  'md:col-span-6 lg:col-span-5 lg:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[24rem]',
  'lg:col-span-7 aspect-[4/5] md:aspect-auto md:min-h-[17rem]',
  'lg:col-span-3 aspect-[4/5] md:aspect-auto md:min-h-[17rem]',
  'lg:col-span-4 aspect-[4/5] md:aspect-auto md:min-h-[17rem]',
  'lg:col-span-7 aspect-[4/5] md:aspect-auto md:min-h-[17rem]',
  'col-span-2 md:col-span-6 lg:col-span-5 aspect-[16/10] md:aspect-auto md:min-h-[17rem]',
]
const objectPos = ['50% 55%', '50% 45%', '50% 55%', '50% 40%', '50% 50%', '50% 50%']

export default function Categories({ onSelect }) {
  return (
    <section id="categories" className="relative bg-ivory-100 py-20 sm:py-28" aria-labelledby="cat-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="أقسامنا"
            title={<span id="cat-title">تشكيلة تليق بكل مناسبة</span>}
            text="من الدروع الخشبية الكلاسيكية إلى الكريستال وهدايا الشركات، اختاروا القسم الأقرب لمناسبتكم وسنساعدكم في الباقي."
          />
          <a href="#products" className="link-underline shrink-0 pb-1 text-[0.95rem] font-medium text-navy-900" data-reveal>
            عرض جميع المنتجات
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-[17rem_17rem_19rem]">
          {categories.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={`group relative isolate overflow-hidden bg-navy-900 text-start ${i === 0 ? 'col-span-2' : ''} ${
                i > 0 && i < 5 ? 'md:col-span-3' : ''
              } ${layout[i]}`}
              data-reveal
              style={{ '--d': `${(i % 3) * 90}ms` }}
              aria-label={`${c.title} — عرض المنتجات`}
            >
              <Img
                name={c.image}
                alt=""
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 50vw"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.6s] ease-(--ease-luxe) group-hover:scale-[1.06]"
                style={{ objectPosition: objectPos[i] }}
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950/90 via-navy-950/25 via-45% to-transparent" />
              <div className="absolute inset-0 -z-10 border border-gold-400/0 transition-colors duration-700 group-hover:border-gold-400/40" style={{ margin: '0.6rem' }} />

              <span className="absolute top-4 right-4 font-latin text-sm text-ivory-100/70 sm:top-5 sm:right-5">0{i + 1}</span>
              <span className="absolute top-3.5 left-3.5 grid h-9 w-9 translate-y-1 place-items-center bg-gold-500 text-navy-900 opacity-0 transition-all duration-500 ease-(--ease-luxe) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:top-4 sm:left-4">
                <ArrowUpLeft className="h-4 w-4" strokeWidth={1.75} />
              </span>

              <span className="absolute inset-x-0 bottom-0 block p-4 sm:p-6">
                <span className="block font-display text-[1.15rem] leading-snug font-bold text-ivory-100 sm:text-2xl">{c.title}</span>
                <span className="mt-1.5 block max-w-xs text-[0.8rem] leading-relaxed text-ivory-100/65 sm:text-sm">{c.line}</span>
                <span className="mt-4 block h-px w-10 bg-gold-500 transition-[width] duration-700 ease-(--ease-luxe) group-hover:w-20" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

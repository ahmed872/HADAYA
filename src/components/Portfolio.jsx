import { Plus } from 'lucide-react'
import { portfolio } from '../data/catalog'
import { showDemoImageNotice } from '../config/site'
import { SectionHeading } from './Brand'
import Img from './Img'

export default function Portfolio({ onOpen }) {
  const items = portfolio.map((p) => ({ image: p.image, title: p.title, caption: p.tag }))
  return (
    <section id="portfolio" className="relative bg-ivory-100 py-20 sm:py-28" aria-labelledby="pf-title">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <SectionHeading eyebrow="معرض الأعمال" title={<span id="pf-title">من أعمالنا</span>} />
          <p className="max-w-md text-[1.02rem] leading-[1.95] text-ink-500 md:justify-self-end" data-reveal>
            لمحة من الدروع والجوائز والهدايا التي نصممها لحفلات التكريم والفعاليات والمناسبات. اضغطوا على أي صورة لمشاهدتها بحجم أكبر.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 md:mt-16 lg:columns-3 lg:gap-5">
          {portfolio.map((p, i) => (
            <figure key={p.image + i} className="mb-4 break-inside-avoid lg:mb-5" data-reveal style={{ '--d': `${(i % 3) * 100}ms` }}>
              <button
                type="button"
                onClick={() => onOpen(items, i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden bg-navy-900 text-start"
                aria-label={`عرض: ${p.title}`}
              >
                <Img
                  name={p.image}
                  alt={p.title}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className={`w-full object-cover transition-[transform,filter] duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.05] group-hover:brightness-[.8] ${
                    p.shape === 'wide' ? 'aspect-[4/3]' : 'aspect-[3/4]'
                  }`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-navy-950/85 to-transparent p-5 pt-16 text-ivory-100 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-700 sm:ease-(--ease-luxe) sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  <span>
                    <span className="block text-[0.75rem] text-gold-400">{p.tag}</span>
                    <span className="mt-1 block font-display text-lg font-bold">{p.title}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-ivory-100/40">
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
        {showDemoImageNotice && <p className="mt-6 text-center text-[0.8rem] text-ink-500/80">صور توضيحية لأنواع الأعمال، وتُستبدل بصور الأعمال المنفذة.</p>}
      </div>
    </section>
  )
}

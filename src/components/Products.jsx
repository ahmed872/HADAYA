import { Expand } from 'lucide-react'
import { categories, products } from '../data/catalog'
import { showDemoImageNotice } from '../config/site'
import { waLink, productMessage } from '../lib/whatsapp'
import { SectionHeading, WhatsAppIcon } from './Brand'
import Img from './Img'

const tabs = [{ id: 'all', title: 'الكل' }, ...categories]

export default function Products({ filter, setFilter, onOpen }) {
  const list = filter === 'all' ? products : products.filter((p) => p.category === filter)

  return (
    <section id="products" className="relative bg-ivory-200/60 py-20 sm:py-28" aria-labelledby="products-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="منتجاتنا"
          title={<span id="products-title">قطع مختارة من تشكيلتنا</span>}
          text="نماذج من التصاميم التي ننفذها، ويمكن تعديل كل منها في المقاس والخامة والنص والشعار حسب مناسبتكم."
        />

        {/* category filter */}
        <div className="relative mt-10 -mx-5 md:mx-0" data-reveal>
          <div role="tablist" aria-label="تصفية المنتجات حسب القسم" className="flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => {
              const count = t.id === 'all' ? products.length : products.filter((p) => p.category === t.id).length
              const on = filter === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => setFilter(t.id)}
                  className={`flex shrink-0 items-center gap-2 border px-4 py-2.5 text-[0.9rem] transition-all duration-500 ease-(--ease-luxe) ${
                    on ? 'border-navy-900 bg-navy-900 text-ivory-100' : 'border-navy-900/12 bg-ivory-50 text-navy-900/75 hover:border-navy-900/40 hover:text-navy-900'
                  }`}
                >
                  {t.title}
                  <span className={`font-latin text-[0.8rem] ${on ? 'text-gold-400' : 'text-navy-900/40'}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <ul key={filter} className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {list.map((p, i) => (
            <li key={p.id} className="group flex animate-fade-up flex-col" style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}>
              <div className="relative overflow-hidden bg-ivory-300">
                <button type="button" onClick={() => onOpen(list, i)} className="block w-full cursor-zoom-in" aria-label={`عرض صورة ${p.name} بحجم أكبر`}>
                  <Img
                    name={p.image}
                    alt={p.name}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-(--ease-luxe) group-hover:scale-[1.045]"
                  />
                </button>
                <span className="pointer-events-none absolute top-3 right-3 hidden bg-ivory-50/85 px-2.5 py-1 text-[0.72rem] text-navy-900/80 backdrop-blur-sm sm:block">{p.material}</span>
                <span className="pointer-events-none absolute bottom-3 left-3 grid h-9 w-9 place-items-center bg-navy-900/80 text-ivory-100 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex flex-1 flex-col pt-4 sm:pt-5">
                <h3 className="font-display text-[1.08rem] leading-snug font-bold text-navy-900 sm:text-[1.35rem]">{p.name}</h3>
                <p className="mt-1.5 line-clamp-3 flex-1 text-[0.82rem] leading-[1.8] text-ink-500 sm:text-[0.9rem]">{p.desc}</p>
                <a
                  href={waLink(productMessage(p.name))}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-outline-dark mt-4 min-h-11 w-full gap-2 px-3 text-[0.82rem] sm:text-[0.9rem]"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  اطلب عبر واتساب
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-14 border-t border-navy-900/10 pt-6 text-center text-[0.82rem] leading-relaxed text-ink-500">
          {showDemoImageNotice && 'الصور المعروضة نماذج توضيحية. '}
          تُحدَّد المقاسات والخامات والأسعار ومدة التنفيذ عند التواصل معنا حسب تفاصيل كل طلب.
        </p>
      </div>
    </section>
  )
}

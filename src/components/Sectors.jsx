import { useState } from 'react'
import { Building2, Stethoscope, GraduationCap, Landmark, Presentation, Gift } from 'lucide-react'
import { sectors } from '../data/catalog'
import { SectionHeading } from './Brand'
import Img from './Img'

const icons = { Building2, Stethoscope, GraduationCap, Landmark, Presentation, Gift }

export default function Sectors() {
  const [active, setActive] = useState(0)
  return (
    <section id="sectors" className="relative bg-ivory-200/60 py-20 sm:py-28" aria-labelledby="sec-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="من نخدم"
            title={<span id="sec-title">شركاء في كل مناسبة تكريم</span>}
            text="نعمل مع جهات وأفراد باحتياجات مختلفة، ونقترح لكل جهة ما يناسب طبيعة مناسبتها وجمهورها."
          />
          <ul className="mt-10 border-t border-navy-900/10">
            {sectors.map((s, i) => {
              const Icon = icons[s.icon]
              const on = active === i
              return (
                <li key={s.id} data-reveal style={{ '--d': `${i * 60}ms` }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group grid w-full grid-cols-[auto_1fr] items-start gap-x-5 border-b border-navy-900/10 py-6 text-start sm:grid-cols-[auto_14rem_1fr] sm:items-center"
                    aria-pressed={on}
                  >
                    <span className={`grid h-12 w-12 place-items-center border transition-all duration-500 ${on ? 'border-navy-900 bg-navy-900 text-gold-400' : 'border-navy-900/15 text-navy-900/70'}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </span>
                    <span className={`font-display text-[1.3rem] font-bold transition-colors sm:text-[1.4rem] ${on ? 'text-navy-900' : 'text-navy-900/80'}`}>{s.title}</span>
                    <span className="col-start-2 mt-1 text-[0.92rem] leading-relaxed text-ink-500 sm:col-start-3 sm:mt-0">{s.text}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 overflow-hidden bg-navy-900" style={{ aspectRatio: '4/5' }}>
            {sectors.map((s, i) => (
              <Img
                key={s.id}
                name={s.image}
                alt=""
                sizes="36vw"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1.2s] ease-(--ease-luxe) ${active === i ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent" />
            <div className="absolute inset-[0.75rem] border border-gold-400/30" />
            <p className="absolute right-8 bottom-8 left-8 font-display text-2xl font-bold text-ivory-100" aria-live="polite">
              {sectors[active].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

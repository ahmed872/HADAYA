import { useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import { customOptions, processSteps } from '../data/catalog'
import { waLink } from '../lib/whatsapp'
import { SectionHeading, WhatsAppIcon } from './Brand'
import { imgUrl } from './Img'

const titles = [
  { id: 'thanks', label: 'شكر وتقدير', line: 'تقديراً لجهوده المتميزة وعطائه المخلص' },
  { id: 'employee', label: 'موظف الشهر', line: 'تقديراً لتميزه والتزامه خلال الشهر' },
  { id: 'excellence', label: 'جائزة التميز', line: 'تقديراً للأداء المتميز والإسهام الفاعل' },
  { id: 'memory', label: 'ذكرى عطاء', line: 'مع خالص الشكر والامتنان لسنوات العطاء' },
]

const materials = [
  { id: 'wood', label: 'خشب ولوحة مذهّبة', swatch: 'linear-gradient(135deg,#3a2416,#6b4329 50%,#2b1a0f)' },
  { id: 'navy', label: 'كحلي وذهبي', swatch: 'linear-gradient(135deg,#0b1424,#203249)' },
  { id: 'acrylic', label: 'أكريليك شفاف', swatch: 'linear-gradient(135deg,#e9eef2,#b9c6cf 60%,#f7fafc)' },
  { id: 'crystal', label: 'كريستال', swatch: 'conic-gradient(from 30deg,#dfe7ec,#ffffff,#aebdc7,#f4f7f9,#c8d3da,#dfe7ec)' },
]

function PlaquePreview({ name, title, material }) {
  const t = titles.find((x) => x.id === title)
  const wood = imgUrl('tex_wood', 800)
  const text = (
    <>
      <span className="block font-display text-[0.62rem] tracking-normal opacity-80 sm:text-xs">يُقدَّم هذا الدرع إلى</span>
      <span className="mt-1 block font-calli text-[1.55rem] leading-tight font-bold sm:text-[2.1rem]">{t.label}</span>
      <span className="mx-auto my-2 block h-px w-14 bg-current opacity-50" />
      <span className="block min-h-[1.6em] font-calli text-[1.1rem] leading-snug sm:text-[1.45rem]">{name || 'اسم المكرَّم'}</span>
      <span className="mt-1.5 block font-display text-[0.68rem] leading-relaxed opacity-85 sm:text-[0.8rem]">{t.line}</span>
    </>
  )

  if (material === 'acrylic' || material === 'crystal') {
    const crystal = material === 'crystal'
    return (
      <div className="relative flex flex-col items-center">
        <div
          className="relative flex w-[13.5rem] flex-col items-center justify-center px-6 pt-12 pb-10 text-center text-white sm:w-[16rem]"
          style={{
            aspectRatio: crystal ? '0.62' : '0.72',
            borderRadius: crystal ? 0 : '999px 999px 6px 6px',
            clipPath: crystal ? 'polygon(0 14%, 50% 0, 100% 10%, 100% 100%, 0 100%)' : undefined,
            background: crystal
              ? 'linear-gradient(115deg, rgba(255,255,255,.28), rgba(255,255,255,.05) 35%, rgba(170,200,220,.12) 60%, rgba(255,255,255,.3))'
              : 'linear-gradient(160deg, rgba(255,255,255,.22), rgba(255,255,255,.04) 45%, rgba(255,255,255,.14))',
            boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,.55), inset 0 0 40px rgba(255,255,255,.12), 0 30px 60px -20px rgba(0,0,0,.6)',
            backdropFilter: 'blur(3px)',
            textShadow: '0 0 8px rgba(255,255,255,.35)',
          }}
        >
          <span className="pointer-events-none absolute inset-y-0 right-[18%] w-6 bg-linear-to-l from-transparent via-white/20 to-transparent" />
          <span className="opacity-90">{text}</span>
        </div>
        <div
          className="h-9 w-[15.5rem] sm:w-[18rem]"
          style={{
            background: crystal ? 'linear-gradient(180deg,#1c222b,#07090c)' : `linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.5)), url(${wood}) center/cover`,
            boxShadow: '0 1px 0 #c5a15a inset, 0 24px 40px -18px rgba(0,0,0,.8)',
          }}
        />
      </div>
    )
  }

  const navy = material === 'navy'
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative flex w-[15rem] flex-col items-center justify-center p-4 sm:w-[18.5rem] sm:p-5"
        style={{
          aspectRatio: '0.8',
          borderRadius: 6,
          background: navy
            ? 'linear-gradient(150deg,#1b2b44,#0b1424)'
            : `linear-gradient(160deg,rgba(255,255,255,.1),rgba(0,0,0,.25)), url(${wood}) center/cover`,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08), inset 0 2px 0 rgba(255,255,255,.12), 0 40px 70px -30px rgba(0,0,0,.85)',
        }}
      >
        <svg viewBox="0 0 48 48" className={`mb-3 h-7 w-7 ${navy ? 'text-gold-400' : 'text-gold-300'}`} aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="12" y="12" width="24" height="24" />
            <rect x="12" y="12" width="24" height="24" transform="rotate(45 24 24)" />
          </g>
        </svg>
        <div
          className="w-full px-3 py-5 text-center sm:py-6"
          style={
            navy
              ? { color: '#d9bd84', boxShadow: 'inset 0 0 0 1px rgba(214,183,122,.7), inset 0 0 0 5px #142238, inset 0 0 0 6px rgba(214,183,122,.35)' }
              : {
                  color: '#2a1a0c',
                  borderRadius: 3,
                  background: 'linear-gradient(100deg,#9c7633 0%,#e8cf93 22%,#c49a4f 45%,#f1dca7 62%,#b48a43 82%,#d9b874 100%)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,240,200,.6), inset 0 0 0 5px rgba(0,0,0,0), 0 2px 6px rgba(0,0,0,.4)',
                }
          }
        >
          {text}
        </div>
      </div>
      <div
        className="h-4 w-[13rem] sm:w-[16rem]"
        style={{ background: `linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.6)), url(${wood}) center/cover`, boxShadow: '0 20px 30px -14px rgba(0,0,0,.9)' }}
      />
    </div>
  )
}

export default function Customizer() {
  const [name, setName] = useState('أ. خالد بن عبدالله')
  const [title, setTitle] = useState('thanks')
  const [material, setMaterial] = useState('wood')
  const t = titles.find((x) => x.id === title)
  const m = materials.find((x) => x.id === material)
  const message = `السلام عليكم، أرغب في طلب تصميم خاص:\n• نوع التكريم: ${t.label}\n• الاسم: ${name || '—'}\n• الخامة: ${m.label}\n\nأرجو التواصل معي لاستكمال التفاصيل.`

  return (
    <section id="customize" className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-ivory-100 sm:py-28" aria-labelledby="custom-title">
      <div className="pattern-star absolute inset-0 -z-10 opacity-[0.04]" />
      <div className="absolute -top-40 left-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        {/* copy */}
        <div className="lg:col-span-5">
          <SectionHeading
            dark
            eyebrow="التخصيص"
            title={<span id="custom-title">تصميم خاص يعكس هويتكم</span>}
            text="كل قطعة نصنعها تبدأ بفكرتكم. أضيفوا الأسماء وشعار جهتكم وعبارات الشكر وتفاصيل المناسبة، واختاروا الخامة واللمسة النهائية التي تليق بها."
          />
          <ul className="mt-10 space-y-5">
            {customOptions.map((o, i) => (
              <li key={o.title} className="flex gap-4" data-reveal style={{ '--d': `${i * 70}ms` }}>
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center border border-gold-500/50 text-gold-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-medium text-ivory-100">{o.title}</span>
                  <span className="mt-0.5 block text-[0.92rem] leading-relaxed text-ivory-100/60">{o.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* live preview */}
        <div className="lg:col-span-7" data-reveal>
          <div className="relative border border-ivory-100/10 bg-navy-950/60">
            <div className="flex items-center justify-between border-b border-ivory-100/10 px-5 py-3.5 sm:px-7">
              <p className="text-sm text-ivory-100/80">جرّب الفكرة — معاينة تقريبية</p>
              <span className="font-latin text-xs tracking-[0.3em] text-gold-500/80">PREVIEW</span>
            </div>
            <div className="grid md:grid-cols-[1fr_17rem]">
              {/* stage */}
              <div
                className="relative flex min-h-[25rem] items-end justify-center overflow-hidden px-6 pt-10 pb-12 sm:min-h-[30rem]"
                style={{ background: 'radial-gradient(ellipse at 50% 35%, #24395a 0%, #101c2c 55%, #0a1320 100%)' }}
              >
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/40 to-transparent" />
                <div key={material} className="relative animate-fade-up">
                  <PlaquePreview name={name} title={title} material={material} />
                </div>
              </div>

              {/* controls */}
              <form className="space-y-6 border-t border-ivory-100/10 p-5 sm:p-7 md:border-t-0 md:border-r" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="cz-name" className="text-[0.8rem] text-ivory-100/60">
                    الاسم على الدرع
                  </label>
                  <input
                    id="cz-name"
                    value={name}
                    maxLength={32}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border border-ivory-100/15 bg-navy-900 px-3.5 py-3 text-ivory-100 placeholder:text-ivory-100/30 focus:border-gold-500 focus:outline-none"
                    placeholder="اكتب الاسم هنا"
                  />
                </div>
                <fieldset>
                  <legend className="text-[0.8rem] text-ivory-100/60">نوع التكريم</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {titles.map((x) => (
                      <label
                        key={x.id}
                        className={`cursor-pointer border px-2 py-2.5 text-center text-[0.85rem] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-gold-500 ${
                          title === x.id ? 'border-gold-500 bg-gold-500/10 text-gold-300' : 'border-ivory-100/15 text-ivory-100/75 hover:border-ivory-100/40'
                        }`}
                      >
                        <input type="radio" name="cz-title" value={x.id} checked={title === x.id} onChange={() => setTitle(x.id)} className="sr-only" />
                        {x.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-[0.8rem] text-ivory-100/60">
                    الخامة: <span className="text-ivory-100">{m.label}</span>
                  </legend>
                  <div className="mt-3 flex gap-3">
                    {materials.map((x) => (
                      <label key={x.id} className="cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold-500" title={x.label}>
                        <input type="radio" name="cz-mat" value={x.id} checked={material === x.id} onChange={() => setMaterial(x.id)} className="sr-only" />
                        <span className="sr-only">{x.label}</span>
                        <span
                          className={`block h-11 w-11 rounded-full transition-all duration-300 ${material === x.id ? 'ring-2 ring-gold-500 ring-offset-3 ring-offset-navy-950' : 'ring-1 ring-ivory-100/20 hover:ring-ivory-100/50'}`}
                          style={{ background: x.swatch }}
                        />
                      </label>
                    ))}
                  </div>
                </fieldset>
                <a href={waLink(message)} target="_blank" rel="noopener" className="btn btn-gold w-full">
                  <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
                  اطلب تصميمك الآن
                </a>
                <p className="text-[0.75rem] leading-relaxed text-ivory-100/45">سنرسل لكم نموذجاً نهائياً للمراجعة قبل التنفيذ.</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* process */}
      <div className="container-x mt-20 sm:mt-24">
        <div className="flex items-center gap-4" data-reveal>
          <h3 className="shrink-0 font-display text-2xl font-bold">كيف نعمل معكم</h3>
          <span className="h-px flex-1 bg-linear-to-l from-gold-500/50 to-transparent" />
        </div>
        <ol className="mt-10 grid gap-px bg-ivory-100/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="group relative bg-navy-900 p-6 sm:p-8" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="font-latin text-5xl leading-none text-gold-500/90">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-5 text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ivory-100/60">{s.text}</p>
              {i < processSteps.length - 1 && (
                <ArrowLeft className="absolute top-8 left-6 hidden h-5 w-5 text-gold-500/40 lg:block" strokeWidth={1.25} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

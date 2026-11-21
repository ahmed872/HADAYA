import { useState } from 'react'
import { MapPin, Phone, Clock, Navigation, ArrowUpLeft } from 'lucide-react'
import { contact } from '../config/site'
import { categories } from '../data/catalog'
import { waLink } from '../lib/whatsapp'
import { SectionHeading, WhatsAppIcon, LogoMark } from './Brand'

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4 border-b border-navy-900/10 py-5">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.4} />
      <div className="min-w-0">
        <p className="text-[0.8rem] text-ink-500">{label}</p>
        <div className="mt-1 text-[1.02rem] text-navy-900">{children}</div>
      </div>
    </div>
  )
}

function MapPlaceholder() {
  return (
    <div className="relative flex h-full min-h-[22rem] items-center justify-center overflow-hidden bg-navy-900 text-ivory-100">
      <svg className="absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <path d="M56 0H0v56" fill="none" stroke="#C5A15A" strokeWidth=".6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M-20 260 C 180 200, 320 330, 520 240 S 900 120, 1200 200" stroke="#C5A15A" strokeWidth="6" fill="none" opacity=".5" />
        <path d="M300 -20 C 280 200, 380 300, 340 700" stroke="#C5A15A" strokeWidth="3" fill="none" opacity=".4" />
      </svg>
      <div className="relative text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-500/60 bg-navy-950/60">
          <MapPin className="h-7 w-7 text-gold-400" strokeWidth={1.4} />
        </span>
        <p className="mt-4 font-display text-xl font-bold">موقع المتجر على الخريطة</p>
        <p className="mt-1 text-sm text-ivory-100/60">تُضاف خريطة Google هنا برابط الموقع الفعلي</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', type: categories[0].title, qty: '', notes: '' })
  const [tried, setTried] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.name.trim().length > 1
  const msg = [
    'السلام عليكم، أرغب في طلب عرض سعر:',
    `• الاسم: ${form.name}`,
    form.org && `• الجهة: ${form.org}`,
    `• نوع المنتج: ${form.type}`,
    form.qty && `• الكمية التقريبية: ${form.qty}`,
    form.notes && `• تفاصيل: ${form.notes}`,
  ]
    .filter(Boolean)
    .join('\n')
  const field = 'mt-2 w-full border border-navy-900/15 bg-ivory-50 px-3.5 py-3 text-navy-900 placeholder:text-navy-900/35 transition-colors focus:border-gold-600 focus:outline-none'

  return (
    <section id="contact" className="relative bg-ivory-100 py-20 sm:py-28" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="تواصل معنا"
          title={<span id="contact-title">لنبدأ تصميم تكريمكم القادم</span>}
          text="أرسلوا لنا فكرتكم عبر واتساب أو زورونا في المتجر، وسنساعدكم في اختيار التصميم والخامة المناسبة."
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* info */}
          <div className="lg:col-span-5" data-reveal>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="group relative flex items-center justify-between gap-4 overflow-hidden bg-navy-900 p-6 text-ivory-100 sm:p-7"
            >
              <span className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center bg-gold-500 text-navy-900 transition-transform duration-500 group-hover:scale-105">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-sm text-ivory-100/60">أسرع طريقة للتواصل</span>
                  <span className="mt-0.5 block font-display text-2xl font-bold">راسلنا عبر واتساب</span>
                </span>
              </span>
              <ArrowUpLeft className="h-6 w-6 text-gold-400 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" strokeWidth={1.4} />
              <span className="pattern-star pointer-events-none absolute inset-0 opacity-[0.05]" />
            </a>

            <div className="mt-4">
              <InfoRow icon={Phone} label="رقم الجوال">
                {contact.phoneHref ? (
                  <a href={contact.phoneHref} className="link-underline select-all" dir="ltr">
                    {contact.phoneDisplay}
                  </a>
                ) : (
                  <span dir="ltr">{contact.phoneDisplay}</span>
                )}
              </InfoRow>
              <InfoRow icon={MapPin} label="العنوان">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-1 block text-[0.85rem] text-ink-500">{contact.shortAddress}</span>
              </InfoRow>
              {contact.hours.map((h) => (
                <InfoRow key={h.label} icon={Clock} label={h.label}>
                  {h.value}
                </InfoRow>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {contact.services.map((s) => (
                <li key={s} className="border border-gold-600/30 bg-ivory-50 px-3 py-1.5 text-[0.82rem] text-navy-900/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* map */}
          <div className="relative overflow-hidden lg:col-span-7" data-reveal style={{ '--d': '120ms' }}>
            {contact.map.embedUrl ? (
              <div className="relative h-full min-h-[22rem] bg-navy-900">
                <iframe
                  title="موقع المتجر على خرائط Google"
                  src={contact.map.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.35)_contrast(1.05)]"
                  allowFullScreen
                />
              </div>
            ) : (
              <MapPlaceholder />
            )}
            {contact.map.directionsUrl && (
              <a href={contact.map.directionsUrl} target="_blank" rel="noopener" className="btn btn-navy absolute bottom-4 left-4 min-h-11 px-5 text-sm shadow-xl">
                <Navigation className="h-4 w-4" strokeWidth={1.5} /> الاتجاهات
              </a>
            )}
          </div>
        </div>

        {/* quick quote form → WhatsApp */}
        <form className="relative mt-6 grid gap-x-5 gap-y-5 border border-navy-900/10 bg-ivory-50 p-6 sm:p-8 md:grid-cols-2 lg:mt-8 lg:grid-cols-12" onSubmit={(e) => e.preventDefault()} noValidate data-reveal>
          <div className="flex items-start gap-4 md:col-span-2 lg:col-span-12">
            <LogoMark className="h-9 w-9 shrink-0 text-gold-600" />
            <div>
              <h3 className="font-display text-2xl font-bold text-navy-900">اطلب عرض سعر سريع</h3>
              <p className="mt-1 text-[0.9rem] text-ink-500">املأ البيانات وسيتم تجهيز رسالة واتساب جاهزة للإرسال.</p>
            </div>
          </div>
          <label className="block text-[0.85rem] text-ink-500 lg:col-span-3" htmlFor="q-name">
            الاسم <span className="text-gold-700">*</span>
            <input id="q-name" className={`${field} ${tried && !valid ? 'border-red-700/60' : ''}`} value={form.name} onChange={set('name')} placeholder="الاسم الكريم" autoComplete="name" aria-invalid={tried && !valid} aria-describedby="q-name-err" />
            {tried && !valid && (
              <span id="q-name-err" className="mt-1 block text-[0.78rem] text-red-800">
                اكتب اسمك ليصلنا طلبك بشكل صحيح.
              </span>
            )}
          </label>
          <label className="block text-[0.85rem] text-ink-500 lg:col-span-3" htmlFor="q-org">
            الجهة (اختياري)
            <input id="q-org" className={field} value={form.org} onChange={set('org')} placeholder="شركة، مدرسة، مستشفى..." autoComplete="organization" />
          </label>
          <label className="block text-[0.85rem] text-ink-500 lg:col-span-3" htmlFor="q-type">
            نوع المنتج
            <select id="q-type" className={field} value={form.type} onChange={set('type')}>
              {categories.map((c) => (
                <option key={c.id}>{c.title}</option>
              ))}
            </select>
          </label>
          <label className="block text-[0.85rem] text-ink-500 lg:col-span-3" htmlFor="q-qty">
            الكمية التقريبية
            <input id="q-qty" className={field} value={form.qty} onChange={set('qty')} inputMode="numeric" placeholder="مثال: 25" />
          </label>
          <label className="block text-[0.85rem] text-ink-500 md:col-span-2 lg:col-span-9" htmlFor="q-notes">
            تفاصيل المناسبة
            <input id="q-notes" className={field} value={form.notes} onChange={set('notes')} placeholder="المناسبة، الموعد المطلوب، النصوص أو الشعار..." />
          </label>
          <div className="flex items-end md:col-span-2 lg:col-span-3">
            <a
              href={valid ? waLink(msg) : '#contact'}
              target={valid ? '_blank' : undefined}
              rel="noopener"
              onClick={(e) => {
                if (!valid) {
                  e.preventDefault()
                  setTried(true)
                  document.getElementById('q-name')?.focus()
                }
              }}
              className="btn btn-gold w-full"
            >
              <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /> إرسال عبر واتساب
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}

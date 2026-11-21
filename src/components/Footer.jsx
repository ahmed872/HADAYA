import { Phone, MapPin, Clock } from 'lucide-react'
import { brand, contact, nav } from '../config/site'
import { categories } from '../data/catalog'
import { waLink } from '../lib/whatsapp'
import { Logo, WhatsAppIcon } from './Brand'

export default function Footer({ onCategory }) {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-navy-950 text-ivory-100" style={{ paddingBottom: 'env(safe-area-inset-bottom,0px)' }}>
      <div className="pattern-star absolute inset-0 -z-10 opacity-[0.03]" />
      {/* CTA band */}
      <div className="container-x flex flex-col items-start justify-between gap-6 border-b border-ivory-100/10 py-14 md:flex-row md:items-center">
        <p className="max-w-xl font-display text-3xl leading-snug font-bold sm:text-4xl">
          لديكم مناسبة قادمة؟ <span className="text-gold-400">دعونا نصمم لها تكريماً يليق بها.</span>
        </p>
        <a href={waLink()} target="_blank" rel="noopener" className="btn btn-gold shrink-0">
          <WhatsAppIcon /> ابدأ المحادثة
        </a>
      </div>

      <div className="container-x grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-[0.92rem] leading-[1.9] text-ivory-100/55">{brand.description}</p>
        </div>
        <nav aria-label="روابط سريعة" className="lg:col-span-2">
          <h3 className="text-sm font-medium text-gold-400">روابط سريعة</h3>
          <ul className="mt-5 space-y-3 text-[0.92rem]">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="link-underline text-ivory-100/70 hover:text-ivory-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="أقسام المنتجات" className="lg:col-span-3">
          <h3 className="text-sm font-medium text-gold-400">أقسام المنتجات</h3>
          <ul className="mt-5 space-y-3 text-[0.92rem]">
            {categories.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => onCategory(c.id)} className="link-underline text-start text-ivory-100/70 hover:text-ivory-100">
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h3 className="text-sm font-medium text-gold-400">تواصل معنا</h3>
          <ul className="mt-5 space-y-4 text-[0.92rem] text-ivory-100/70">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
              {contact.phoneHref ? (
                <a href={contact.phoneHref} dir="ltr" className="hover:text-ivory-100">
                  {contact.phoneDisplay}
                </a>
              ) : (
                <span dir="ltr">{contact.phoneDisplay}</span>
              )}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
              <span>{contact.addressLines.join('، ')}</span>
            </li>
            {contact.hours.map((h) => (
              <li key={h.label} className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                <span>{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory-100/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[0.8rem] text-ivory-100/45 sm:flex-row">
          <p>
            © {year} {brand.name}. جميع الحقوق محفوظة.
          </p>
          <p className="font-latin tracking-[0.25em]">{brand.latin}</p>
        </div>
      </div>
    </footer>
  )
}

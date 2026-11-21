import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { nav, contact, brand } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { useActiveSection, useScrolled, useLockBody } from '../hooks/useReveal'
import { Logo, WhatsAppIcon } from './Brand'

const ids = nav.map((n) => n.id)

export default function Header() {
  const scrolled = useScrolled(40)
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  useLockBody(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-(--ease-luxe) ${
          scrolled || open ? 'bg-navy-900/92 shadow-[0_1px_0_rgb(197_161_90/0.14)] backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={{ top: 0, paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-700 ease-(--ease-luxe) ${scrolled ? 'h-[4.5rem]' : 'h-20 lg:h-24'}`}>
          <a href="#home" className="relative z-10 shrink-0" aria-label={`${brand.name} — الصفحة الرئيسية`} onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="القائمة الرئيسية" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`group relative block px-4 py-2 text-[0.95rem] transition-colors duration-300 ${
                      active === item.id ? 'text-gold-300' : 'text-ivory-100/75 hover:text-ivory-100'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-gold-500 transition-transform duration-500 ease-(--ease-luxe) ${
                        active === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn-gold hidden min-h-11 px-5 sm:inline-flex">
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
              <span>تواصل عبر واتساب</span>
            </a>
            <a href={waLink()} target="_blank" rel="noopener" aria-label="تواصل عبر واتساب" className="grid h-11 w-11 place-items-center bg-gold-500 text-navy-900 sm:hidden">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-ivory-100/20 text-ivory-100 transition-colors hover:border-gold-400 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-navy-900 transition-[opacity,visibility] duration-500 ease-(--ease-luxe) lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <div className="pattern-star pointer-events-none absolute inset-0 opacity-[0.05]" />
        <nav aria-label="قائمة الجوال" className="container-x relative flex flex-1 flex-col justify-center pt-24">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li
                key={item.id}
                className="transition-[opacity,transform] duration-700 ease-(--ease-luxe)"
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms', opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(16px)' }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between border-b border-ivory-100/10 py-4 font-display text-[2rem] font-bold ${
                    active === item.id ? 'text-gold-400' : 'text-ivory-100'
                  }`}
                >
                  {item.label}
                  <span className="font-latin text-sm text-gold-500/70">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x relative space-y-3 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-gold w-full">
            <WhatsAppIcon /> تواصل عبر واتساب
          </a>
          {contact.phoneHref && (
            <a href={contact.phoneHref} className="btn btn-outline-light w-full">
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span dir="ltr">{contact.phoneDisplay}</span>
            </a>
          )}
        </div>
      </div>
    </>
  )
}

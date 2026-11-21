import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLockBody } from '../hooks/useReveal'
import { waLink, productMessage } from '../lib/whatsapp'
import { WhatsAppIcon } from './Brand'
import Img from './Img'

/**
 * نافذة عرض الصور — items: [{ image, title, caption?, order? }]
 * التنقل: الأسهم، Esc، السحب على الجوال.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && items?.length
  const closeRef = useRef(null)
  const touch = useRef(null)
  useLockBody(open)

  const go = useCallback((d) => onIndex((i) => (i + d + items.length) % items.length), [items, onIndex])

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // RTL: السهم الأيسر = التالي
      if (e.key === 'ArrowLeft') go(1)
      if (e.key === 'ArrowRight') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [open, go, onClose])

  if (!open) return null
  const item = items[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[60] flex animate-[lbfade_.45s_var(--ease-luxe)] flex-col bg-navy-950/96 text-ivory-100 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1)
        touch.current = null
      }}
      style={{ paddingTop: 'env(safe-area-inset-top,0px)', paddingBottom: 'env(safe-area-inset-bottom,0px)' }}
    >
      <style>{`@keyframes lbfade{from{opacity:0}to{opacity:1}}@keyframes lbimg{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}`}</style>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-latin text-sm tracking-[0.2em] text-ivory-100/60" dir="ltr">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 place-items-center border border-ivory-100/20 transition-colors hover:border-gold-400 hover:text-gold-300" aria-label="إغلاق">
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Img
          key={item.image}
          name={item.image}
          alt={item.title}
          sizes="(min-width: 1024px) 80vw, 100vw"
          priority
          className="max-h-full w-auto max-w-full animate-[lbimg_.6s_var(--ease-luxe)] object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]"
          style={{ backgroundImage: 'none' }}
        />
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="الصورة السابقة" className="absolute right-3 hidden h-12 w-12 place-items-center border border-ivory-100/20 bg-navy-950/50 transition-colors hover:border-gold-400 hover:text-gold-300 sm:grid">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="الصورة التالية" className="absolute left-3 hidden h-12 w-12 place-items-center border border-ivory-100/20 bg-navy-950/50 transition-colors hover:border-gold-400 hover:text-gold-300 sm:grid">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      <div className="container-x flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:justify-between sm:text-start">
        <div>
          <p className="font-display text-xl font-bold">{item.title}</p>
          {item.caption && <p className="mt-1 text-sm text-ivory-100/60">{item.caption}</p>}
        </div>
        <div className="flex items-center gap-2">
          {items.length > 1 && (
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} aria-label="الصورة السابقة" className="grid h-11 w-11 place-items-center border border-ivory-100/20">
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="الصورة التالية" className="grid h-11 w-11 place-items-center border border-ivory-100/20">
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          )}
          <a href={waLink(item.order || productMessage(item.title))} target="_blank" rel="noopener" className="btn btn-gold min-h-11 px-5 text-sm">
            <WhatsAppIcon className="h-4 w-4" /> اطلب تصميماً مشابهاً
          </a>
        </div>
      </div>
    </div>
  )
}

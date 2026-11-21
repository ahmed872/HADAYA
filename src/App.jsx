import { useCallback, useState } from 'react'
import { useReveal, useScrolled } from './hooks/useReveal'
import { waLink } from './lib/whatsapp'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Customizer from './components/Customizer'
import Portfolio from './components/Portfolio'
import Sectors from './components/Sectors'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import { WhatsAppIcon } from './components/Brand'

export default function App() {
  useReveal()
  const scrolled = useScrolled(600)
  const [filter, setFilter] = useState('all')
  const [lb, setLb] = useState({ items: [], index: null })

  const openLightbox = useCallback((items, index) => {
    setLb({ items: items.map((x) => ({ image: x.image, title: x.title ?? x.name, caption: x.caption ?? x.material })), index })
  }, [])
  const setIndex = useCallback((fn) => setLb((s) => ({ ...s, index: typeof fn === 'function' ? fn(s.index) : fn })), [])

  const goToCategory = (id) => {
    setFilter(id)
    requestAnimationFrame(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[70] focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-900">
        تخطَّ إلى المحتوى
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Categories onSelect={goToCategory} />
        <Products filter={filter} setFilter={setFilter} onOpen={openLightbox} />
        <Customizer />
        <Portfolio onOpen={openLightbox} />
        <Sectors />
        <About />
        <Contact />
      </main>
      <Footer onCategory={goToCategory} />

      {/* floating WhatsApp */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="تواصل معنا عبر واتساب"
        className={`fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_14px_34px_-10px_rgba(0,0,0,.55)] transition-all duration-700 ease-(--ease-luxe) hover:scale-105 ${
          scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
        style={{ left: 'max(1.25rem, env(safe-area-inset-left))', bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1f9d55]/40 [animation-duration:2.6s]" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>

      <Lightbox items={lb.items} index={lb.index} onIndex={setIndex} onClose={() => setLb((s) => ({ ...s, index: null }))} />
    </>
  )
}

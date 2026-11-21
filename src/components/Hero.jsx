import { ArrowLeft, Star } from 'lucide-react'
import { contact } from '../config/site'
import { srcSet, imgUrl, imageMeta } from './Img'

const highlights = ['تصاميم حسب الطلب', 'خشب · أكريليك · كريستال · معدن', 'للأفراد والجهات والمؤسسات']

export default function Hero() {
  const d = imageMeta('hero')
  const m = imageMeta('hero_m')
  return (
    <section id="home" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900 text-ivory-100" aria-labelledby="hero-title">
      {/* background composition */}
      <picture className="absolute inset-0 -z-20 block">
        {d && <source media="(min-width: 768px)" srcSet={srcSet('hero')} sizes="100vw" width={d.w} height={d.h} />}
        <img
          src={imgUrl('hero_m', 800)}
          srcSet={srcSet('hero_m')}
          sizes="100vw"
          width={m?.w}
          height={m?.h}
          alt="تشكيلة من دروع التكريم الخشبية وجوائز الكريستال والكؤوس الذهبية"
          fetchPriority="high"
          decoding="sync"
          className="h-[68%] w-full animate-hero-zoom object-cover object-[50%_35%] md:h-full md:object-[22%_50%]"
        />
      </picture>
      {/* overlays: legibility on the text side (right in RTL) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900 from-35% via-navy-900/40 via-60% to-navy-900/10 md:bg-linear-to-l md:from-navy-900 md:from-25% md:via-navy-900/75 md:via-50% md:to-transparent md:to-80%" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-navy-950/80 to-transparent" />
      <div className="pattern-star absolute inset-y-0 right-0 -z-10 hidden w-[38%] opacity-[0.035] md:block" />

      <div className="container-x relative flex flex-1 flex-col justify-end pt-28 pb-10 md:justify-center md:pt-32 md:pb-24">
        <div className="max-w-[40rem] lg:max-w-[44rem]">
          {contact.rating ? (
            <a
              href={contact.map.directionsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex animate-fade-up items-center gap-2.5 border border-gold-500/30 bg-navy-900/40 px-3.5 py-1.5 text-[0.8rem] text-ivory-100/85 backdrop-blur-sm transition-colors hover:border-gold-400"
              style={{ animationDelay: '150ms' }}
            >
              <span className="flex items-center gap-0.5 text-gold-400" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </span>
              <span>
                <b className="font-semibold text-ivory-100">{contact.rating.value}</b> من {contact.rating.count} مراجعة على {contact.rating.source}
              </span>
            </a>
          ) : (
            <p className="eyebrow animate-fade-up" style={{ animationDelay: '150ms' }}>
              دروع تكريم · جوائز · هدايا شركات
            </p>
          )}

          <h1 id="hero-title" className="mt-6 font-display text-[2.75rem] leading-[1.25] font-bold sm:text-6xl sm:leading-[1.22] lg:text-[4.6rem] xl:text-[5.1rem]">
            <span className="block animate-fade-up" style={{ animationDelay: '300ms' }}>
              نصنع لحظات التقدير...
            </span>
            <span className="block animate-fade-up bg-linear-to-l from-gold-300 via-gold-400 to-gold-600 bg-clip-text pb-2 text-transparent" style={{ animationDelay: '480ms' }}>
              ونخلّد الإنجازات
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-fade-up text-[1.05rem] leading-[1.95] text-ivory-100/75 sm:text-lg" style={{ animationDelay: '650ms' }}>
            دروع تكريم وهدايا دعائية بتصاميم مميزة وجودة تليق بإنجازاتكم ومناسباتكم.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '800ms' }}>
            <a href="#products" className="btn btn-gold group">
              استعرض منتجاتنا
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.75} />
            </a>
            <a href="#customize" className="btn btn-outline-light">
              اطلب تصميمك الخاص
            </a>
          </div>
        </div>

        <ul className="mt-12 hidden animate-fade-up flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-ivory-100/60 md:mt-16 md:flex" style={{ animationDelay: '1000ms' }}>
          {highlights.map((h, i) => (
            <li key={h} className="flex items-center gap-6">
              {i > 0 && <span className="h-3 w-px bg-gold-500/40" aria-hidden="true" />}
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* scroll cue + vertical latin mark */}
      <a href="#categories" aria-label="انتقل إلى الأقسام" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory-100/50 transition-colors hover:text-gold-300 md:flex">
        <span className="font-latin text-[0.7rem] tracking-[0.35em]">SCROLL</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory-100/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-luxe)_infinite] bg-gold-400" />
        </span>
      </a>
      <p className="pointer-events-none absolute top-1/2 left-6 hidden -translate-y-1/2 -rotate-90 font-latin text-[0.7rem] tracking-[0.5em] whitespace-nowrap text-ivory-100/30 xl:block" style={{ transformOrigin: 'center' }} aria-hidden="true">
        AWARDS · PLAQUES · CORPORATE GIFTS
      </p>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}

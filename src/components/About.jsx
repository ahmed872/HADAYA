import { PenTool, Gem, Layers, Briefcase } from 'lucide-react'
import { features } from '../data/catalog'
import { brand } from '../config/site'
import Img from './Img'

const icons = { PenTool, Gem, Layers, Briefcase }

export default function About() {
  return (
    <section id="about" className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-ivory-100 sm:py-28" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5" data-reveal>
          <div className="relative overflow-hidden">
            <Img name="g_islamic" alt="درع شكر وتقدير بزخرفة هندسية ذهبية" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover object-center sm:aspect-[4/3] lg:aspect-[4/5]" />
            <div className="absolute inset-[0.75rem] border border-gold-400/30" />
          </div>
          <p className="absolute -bottom-6 left-6 hidden bg-gold-500 px-6 py-4 font-display text-lg font-bold text-navy-900 shadow-2xl sm:block">
            التفاصيل الصغيرة تصنع الفرق
          </p>
        </div>

        <div className="lg:col-span-7">
          <div data-reveal>
            <p className="eyebrow">من نحن</p>
            <h2 id="about-title" className="mt-4 font-display text-[2.1rem] leading-[1.35] font-bold sm:text-5xl sm:leading-[1.3]">
              نهتم بأن تبقى لحظة التكريم ذكرى تليق بأصحابها
            </h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[2] text-ivory-100/70">
              في {brand.shortName} نصمم وننفذ دروع التكريم والجوائز والهدايا المخصصة للأفراد والجهات في {brand.city}، بعناية في اختيار الخامة ودقة في الحفر
              والتشطيب، لتصل كل قطعة جاهزة لمناسبتها كما تخيلتموها.
            </p>
          </div>

          <h3 className="mt-12 text-sm font-medium text-gold-400" data-reveal>
            لماذا تختارنا
          </h3>
          <ul className="mt-5 grid gap-px bg-ivory-100/10 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = icons[f.icon]
              return (
                <li key={f.title} className="group bg-navy-900 p-6 transition-colors duration-500 hover:bg-navy-800 sm:p-7" data-reveal style={{ '--d': `${i * 80}ms` }}>
                  <Icon className="h-6 w-6 text-gold-400 transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.3} />
                  <h4 className="mt-5 font-display text-[1.35rem] font-bold">{f.title}</h4>
                  <p className="mt-2 text-[0.92rem] leading-[1.85] text-ivory-100/60">{f.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

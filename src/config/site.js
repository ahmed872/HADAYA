/**
 * إعدادات الموقع — كل بيانات النشاط التجاري في مكان واحد.
 * Business settings — edit this file to rebrand the site or change contact details.
 *
 * وضع العرض التجريبي: عند البناء بالأمر `npm run build:demo` تُستبدل بيانات التواصل
 * ببيانات تجريبية واضحة (placeholders) حتى يمكن مشاركة رابط المعاينة بأمان.
 */

const DEMO = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_DEMO_CONTACT === 'true'

export const brand = {
  // الاسم المؤقت للعرض — بدّله باسم النشاط الفعلي
  // (اسم النشاط على خرائط Google: «تصميم الهدايا الدعائية»)
  name: 'دار التميز للهدايا والدروع',
  shortName: 'دار التميز',
  tagline: 'للهدايا والدروع',
  latin: 'DAR AL TAMAYUZ',
  description:
    'دروع تكريم وهدايا دعائية بتصاميم مميزة وجودة تليق بإنجازاتكم ومناسباتكم. نصمم وننفذ الدروع الخشبية والأكريليك والكريستال والجوائز وهدايا الشركات حسب الطلب.',
  city: 'جدة',
}

/* ---------------------------------------------------------------
 * بيانات التواصل الفعلية (من صفحة النشاط على خرائط Google)
 * ------------------------------------------------------------- */
export const realContact = {
  isPlaceholder: false,
  phoneDisplay: '+966 53 415 9266',
  phoneHref: 'tel:+966534159266',
  whatsappNumber: '966534159266', // بالصيغة الدولية بدون + أو أصفار
  addressLines: ['حي النعيم، جدة 23526', 'المملكة العربية السعودية'],
  shortAddress: 'العنوان الوطني المختصر: JENA3521',
  hours: [{ label: 'مواعيد العمل', value: 'نستقبلكم حتى 11:30 مساءً' }],
  services: ['التسوّق داخل المتجر', 'الاستلام من المتجر', 'خدمة التوصيل'],
  map: {
    lat: 21.62144,
    lng: 39.15194,
    plusCode: 'J5C2+HQ جدة',
    embedUrl: 'https://maps.google.com/maps?q=21.62144,39.15194&z=16&hl=ar&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=21.62144%2C39.15194',
  },
  // تقييم النشاط على خرائط Google وقت إعداد العرض — حدّثه أو احذفه عند الحاجة
  rating: { value: '4.9', count: 42, source: 'خرائط Google' },
}

/* ---------------------------------------------------------------
 * بيانات تجريبية للمعاينة العامة — لا تمثل أي رقم أو عنوان حقيقي
 * ------------------------------------------------------------- */
export const placeholderContact = {
  isPlaceholder: true,
  phoneDisplay: '05X XXX XXXX',
  phoneHref: null,
  whatsappNumber: null, // بدون رقم: يفتح واتساب لاختيار جهة الاتصال
  addressLines: ['اسم الحي، المدينة', 'المملكة العربية السعودية'],
  shortAddress: 'العنوان الوطني المختصر: XXXX0000',
  hours: [{ label: 'مواعيد العمل', value: 'تُكتب مواعيد العمل هنا' }],
  services: ['التسوّق داخل المتجر', 'الاستلام من المتجر', 'خدمة التوصيل'],
  map: { embedUrl: null, directionsUrl: null, plusCode: null },
  rating: null,
}

export const contact = DEMO ? placeholderContact : realContact

export const nav = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'products', label: 'منتجاتنا' },
  { id: 'portfolio', label: 'أعمالنا' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'تواصل معنا' },
]

// أظهر ملاحظة «صور توضيحية» تحت المعرض والمنتجات حتى تُضاف صور الأعمال الفعلية
export const showDemoImageNotice = true

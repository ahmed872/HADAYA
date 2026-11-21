/**
 * محتوى الكتالوج: الأقسام والمنتجات والمعرض والقطاعات.
 * الصور: اسم الصورة يشير إلى ملف في public/images (يتم توليده بالأمر npm run images).
 * لاستبدال صورة: ضع الصورة الأصلية في assets-src/ بنفس الاسم ثم شغّل npm run images.
 */

export const categories = [
  { id: 'wood', title: 'دروع التكريم الخشبية', line: 'خشب طبيعي فاخر بلوحات معدنية محفورة', image: 'c_wood' },
  { id: 'crystal', title: 'دروع الأكريليك والكريستال', line: 'شفافية أنيقة وحفر ليزري دقيق', image: 'c_crystal' },
  { id: 'gifts', title: 'هدايا الشركات والمؤسسات', line: 'أطقم هدايا تحمل هوية مؤسستكم', image: 'c_gifts' },
  { id: 'cups', title: 'الجوائز والكؤوس', line: 'كؤوس وجوائز للبطولات والمسابقات', image: 'c_cups' },
  { id: 'commem', title: 'الدروع التذكارية', line: 'تخلّد المناسبات والذكريات المهمة', image: 'c_commem' },
  { id: 'promo', title: 'الهدايا الدعائية المخصصة', line: 'منتجات يومية تحمل شعاركم', image: 'c_promo' },
]

export const products = [
  {
    id: 'wood-gold',
    name: 'درع تكريم خشبي ذهبي',
    desc: 'خشب داكن بعروق طبيعية مع لوحة مذهّبة محفور عليها الاسم ونص التكريم.',
    material: 'خشب · لوحة مذهّبة',
    category: 'wood',
    image: 'p_wood',
  },
  {
    id: 'acrylic-clear',
    name: 'درع أكريليك شفاف',
    desc: 'أكريليك عالي الشفافية بحفر ليزري ناعم، على قاعدة خشبية بحافة ذهبية.',
    material: 'أكريليك · قاعدة خشبية',
    category: 'crystal',
    image: 'p_acrylic',
  },
  {
    id: 'islamic',
    name: 'درع تكريم بتصميم إسلامي',
    desc: 'زخرفة هندسية مستوحاة من النجمة الثمانية بخطوط ذهبية على أرضية كحلية.',
    material: 'خشب · زخرفة ذهبية',
    category: 'wood',
    image: 'p_islamic',
  },
  {
    id: 'employee',
    name: 'درع موظف الشهر',
    desc: 'تصميم أفقي لتكريم الموظف المتميز، بمساحة واضحة للاسم والشهر.',
    material: 'خشب · طباعة ذهبية',
    category: 'wood',
    image: 'p_employee',
  },
  {
    id: 'crystal-achievement',
    name: 'جائزة إنجاز مميزة',
    desc: 'كريستال بحواف مشطوفة على قاعدة سوداء لامعة، تناسب حفلات التكريم الكبرى.',
    material: 'كريستال · حفر ليزري',
    category: 'crystal',
    image: 'p_crystal',
  },
  {
    id: 'thanks',
    name: 'درع شكر وتقدير',
    desc: 'لوح زجاجي داكن بطباعة ذهبية دقيقة وقاعدة معدنية مذهّبة.',
    material: 'زجاج · قاعدة معدنية',
    category: 'commem',
    image: 'p_thanks',
  },
  {
    id: 'gift-box',
    name: 'صندوق هدايا للشركات',
    desc: 'صندوق فاخر يضم دفتراً وقلماً وبطاقة، مع شعار مؤسستكم على الغطاء والمحتويات.',
    material: 'طقم هدايا · شعار مخصص',
    category: 'gifts',
    image: 'p_giftbox',
  },
  {
    id: 'commem-arch',
    name: 'درع تذكاري مخصص',
    desc: 'قوس خشبي بإطار ذهبي وإكليل غار، يُصمَّم نصه حسب مناسبتكم.',
    material: 'خشب · معدن مذهّب',
    category: 'commem',
    image: 'p_commem',
  },
  {
    id: 'cup',
    name: 'كأس البطولة الذهبي',
    desc: 'كأس بلمعة ذهبية على قاعدة سوداء، مع لوحة محفورة باسم البطولة.',
    material: 'معدن مذهّب · قاعدة سوداء',
    category: 'cups',
    image: 'p_cup',
  },
  {
    id: 'medal-shield',
    name: 'درع الميدالية الذهبية',
    desc: 'درع خشبي بشكل ترس تتوسطه ميدالية ذهبية بارزة ونص تذكاري.',
    material: 'خشب · ميدالية معدنية',
    category: 'commem',
    image: 'p_medal',
  },
  {
    id: 'promo-set',
    name: 'طقم الهدايا الدعائية',
    desc: 'دفتر وقلم وكوب وحافظة حرارة وميدالية مفاتيح، جميعها بشعاركم.',
    material: 'هدايا دعائية · شعار مخصص',
    category: 'promo',
    image: 'c_promo',
  },
  {
    id: 'boxes',
    name: 'صناديق هدايا بألوان متعددة',
    desc: 'صناديق بمقاسات وألوان مختلفة تناسب هدايا العملاء والشركاء والضيوف.',
    material: 'صناديق فاخرة · ألوان متعددة',
    category: 'gifts',
    image: 'g_boxes',
  },
]

export const portfolio = [
  { image: 'g_macro', title: 'لوحة شكر وتقدير مذهّبة', tag: 'حفر على معدن', shape: 'wide' },
  { image: 'g_acrylic', title: 'جائزة التميز من الأكريليك', tag: 'أكريليك', shape: 'tall' },
  { image: 'g_trio', title: 'مجموعة دروع لحفل تكريم', tag: 'دروع خشبية', shape: 'wide' },
  { image: 'g_islamic', title: 'درع بزخرفة هندسية', tag: 'تصميم إسلامي', shape: 'tall' },
  { image: 'g_row', title: 'جوائز كريستال لفعالية سنوية', tag: 'كريستال', shape: 'wide' },
  { image: 'g_cup_plaque', title: 'كأس ودرع لبطولة', tag: 'جوائز وكؤوس', shape: 'tall' },
  { image: 'c_wood', title: 'دروع تكريم الموظفين', tag: 'دروع خشبية', shape: 'tall' },
  { image: 'g_boxes', title: 'صناديق هدايا الشركات', tag: 'هدايا الشركات', shape: 'tall' },
  { image: 'c_commem', title: 'دروع تذكارية مخصصة', tag: 'دروع تذكارية', shape: 'tall' },
]

export const sectors = [
  { id: 'corp', title: 'الشركات والمؤسسات', text: 'تكريم الموظفين، وهدايا العملاء والشركاء، وحفلات نهاية العام.', icon: 'Building2', image: 'g_trio' },
  { id: 'health', title: 'المستشفيات والمراكز الطبية', text: 'دروع شكر للكوادر الطبية وهدايا المناسبات والأيام الصحية.', icon: 'Stethoscope', image: 'p_acrylic' },
  { id: 'edu', title: 'المدارس والجامعات', text: 'تكريم المتفوقين والمعلمين، وحفلات التخرج واليوم المفتوح.', icon: 'GraduationCap', image: 'p_commem' },
  { id: 'gov', title: 'الجهات الحكومية', text: 'دروع رسمية للزيارات والاتفاقيات والمناسبات الوطنية.', icon: 'Landmark', image: 'p_islamic' },
  { id: 'events', title: 'الفعاليات والمؤتمرات', text: 'جوائز المتحدثين والرعاة، وهدايا الحضور والمشاركين.', icon: 'Presentation', image: 'g_row' },
  { id: 'private', title: 'المناسبات الخاصة', text: 'هدايا التقاعد والتخرج والنجاح والمناسبات العائلية.', icon: 'Gift', image: 'p_giftbox' },
]

export const features = [
  { title: 'تصاميم مخصصة', text: 'نصمم لكل مناسبة ما يناسبها، من الفكرة الأولى حتى النموذج المعتمد.', icon: 'PenTool' },
  { title: 'اهتمام بالتفاصيل', text: 'دقة في الحفر، وتناسق في الخطوط، وتشطيب نظيف لكل قطعة قبل تسليمها.', icon: 'Gem' },
  { title: 'تنوع في المنتجات', text: 'خشب وأكريليك وكريستال ومعدن، وهدايا دعائية بخيارات متعددة.', icon: 'Layers' },
  { title: 'حلول للشركات والمؤسسات', text: 'تنفيذ الطلبات بهوية موحدة لحفلات التكريم والفعاليات والهدايا السنوية.', icon: 'Briefcase' },
]

export const customOptions = [
  { title: 'الأسماء والألقاب', text: 'نحفر اسم المكرَّم ولقبه بخطوط عربية أنيقة.' },
  { title: 'شعارات الجهات', text: 'نجهّز شعاركم بدقة ليظهر واضحاً على أي خامة.' },
  { title: 'رسائل مخصصة', text: 'عبارات شكر وتقدير تُصاغ بما يناسب المناسبة.' },
  { title: 'المناسبات الخاصة', text: 'التخرج، التقاعد، الافتتاح، والحفلات السنوية.' },
  { title: 'خامات وتشطيبات', text: 'خشب، أكريليك، كريستال، ومعدن مذهّب أو فضي.' },
]

export const processSteps = [
  { title: 'شاركونا الفكرة', text: 'المناسبة، والنصوص، والشعار، والكمية المطلوبة.' },
  { title: 'نجهّز التصميم', text: 'نقترح الخامة والشكل ونرسل لكم نموذجاً للمراجعة.' },
  { title: 'تعتمدون النموذج', text: 'نعدّل التفاصيل حتى يصبح التصميم كما تريدون.' },
  { title: 'التنفيذ والتسليم', text: 'نصنع القطعة ونجهزها للاستلام أو التوصيل.' },
]

export type Locale = 'en' | 'ar';

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About Mirna Graphic",
      manufacturing: "Manufacturing",
      products: "Products",
      industries: "Industries",
      gallery: "Factory Showcase",
      quality: "Quality",
      projects: "Projects",
      contact: "Contact",
      quote: "Request Quote"
    },
    hero: {
      label: "Pioneering Packaging Excellence",
      h1: "Premium Carton Packaging Manufactured in Egypt.",
      subtitle: "Mirna Graphic engineers high-durability, custom offset and digital carton packaging. Built in El Mahalla El Kubra for global and local supply chains.",
      ctaQuote: "Request a Custom Quote",
      ctaExplore: "Explore Our Factory",
      trust: {
        iso: "ISO 9001 Certified",
        years: "20+ Years",
        clients: "500+ Clients"
      }
    },
    about: {
      label: "Heritage & Scale",
      title: "About Mirna Graphic",
      story: "Located in the industrial heart of El Mahalla El Kubra, Gharbia, Mirna Graphic operates as a premier B2B carton packaging manufacturer. We merge modern engineering precision with robust industrial capabilities to supply manufacturers across Egypt and global export markets.",
      mission: "Our mission is to deliver flawless carton packaging through advanced manufacturing technologies and forge long-term industrial partnerships.",
      vision: "To be the definitive technology-driven packaging partner for leading brands in the Middle East.",
      cta: "Explore Our Capabilities",
      metrics: {
        missionTitle: "Mission",
        missionDesc: "Deliver flawless packaging at industrial scale.",
        visionTitle: "Vision",
        visionDesc: "To be the definitive technology-driven packaging partner.",
        historyTitle: "History",
        historyDesc: "Over 20 years of uncompromising commitment to quality."
      }
    },
    manufacturing: {
      label: "Industrial Capabilities",
      title: "Manufacturing Technology",
      subtitle: "Our facility is equipped with automated machinery to execute high-volume production with absolute precision.",
      techs: [
        { title: "Pre-Press Calibration", desc: "Automated CTP (Computer-to-Plate) and digital color profiling for exact reproduction." },
        { title: "High-Speed Offset Printing", desc: "Heidelberg Speedmaster XL 106 ensuring flawless color consistency across massive runs." },
        { title: "Precision Die-Cutting", desc: "Automated stripping and creasing for clean structural edges." },
        { title: "Inline Surface Finishing", desc: "Soft-touch lamination, UV coating, and hot foil stamping applied dynamically." },
        { title: "Automated Folder Gluing", desc: "High-speed crash-lock and straight-line gluing with zero-defect sensor checks." }
      ]
    },
    customPackaging: {
      label: "Structural Engineering",
      title: "Custom Packaging Solutions",
      subtitle: "We engineer rigid and folding cartons tailored to the exact physical demands of your product.",
      features: [
        { title: "Luxury Rigid Boxes", desc: "Magnetic closures, telescopic structures, and premium unboxing experiences." },
        { title: "FMCG Folding Cartons", desc: "High-volume, rapid-assembly boxes engineered for retail environments." },
        { title: "E-Commerce Mailers", desc: "Corrugated E-flute protection with tamper-evident tear strips." },
        { title: "Specialty Textile Boxes", desc: "Custom configurations with window patching for high-end garments and towels." }
      ]
    },
    industries: {
      label: "Sector Expertise",
      title: "Industries We Serve",
      subtitle: "Engineered packaging solutions compliant with the strict physical and regulatory requirements of major sectors.",
      food: "Food & Beverage",
      pharma: "Pharmaceuticals",
      textile: "Textiles & Garments",
      cosmetics: "Cosmetics & Beauty",
      retail: "Retail & FMCG",
      export: "Export & Logistics"
    },
    showcase: {
      label: "Infrastructure",
      title: "Factory Showcase",
      subtitle: "A digital tour of our 10,000 sqm production facility in El Mahalla El Kubra.",
      placeholder: "[NDA Protected Design]",
      tabs: {
        floor: "Production Floor",
        machines: "Machinery",
        products: "Products",
        samples: "Packaging Samples"
      }
    },
    quality: {
      label: "Zero Defect Policy",
      title: "Quality Control Architecture",
      subtitle: "Our manufacturing process is governed by strict, automated quality assurance protocols.",
      metrics: [
        { title: "Defect-Free Rate", value: "99.9%" },
        { title: "Automated Inspection", value: "Inline" },
        { title: "Color Calibration", value: "Delta E < 2" }
      ],
      points: [
        { title: "Raw Material Verification", desc: "Paper grammage, moisture content, and tensile strength are tested before production." },
        { title: "Inline Spectrophotometry", desc: "Continuous automated scanning ensures exact Pantone matching across millions of impressions." },
        { title: "Structural Stress Testing", desc: "Drop tests and edge-crush resistance verification for corrugated items." },
        { title: "Automated Defect Vision Systems", desc: "High-speed cameras reject imperfect cartons automatically." },
        { title: "Final Assembly Inspection", desc: "Manual and automated checks of adhesive integrity and folding accuracy." },
        { title: "Logistics Readiness Check", desc: "Pallet stabilization and environmental protection prior to dispatch." }
      ]
    },
    portfolio: {
      label: "Product Portfolio",
      title: "Structural Masterpieces",
      nda: "[NDA Protected Design]",
      categories: ["Premium Boxes", "E-commerce", "FMCG", "Pharmaceutical"],
      items: [
        { cat: "Premium Boxes", title: "Magnetic Closure Set Box", desc: "Luxury rigid board with soft-touch lamination and gold foil stamping." },
        { cat: "Premium Boxes", title: "Telescopic Setup Box", desc: "Two-piece rigid box for electronics and premium apparel." },
        { cat: "E-commerce", title: "Self-Sealing Mailer", desc: "Corrugated E-flute mailer with tear-strip opening and dual sealing tapes." },
        { cat: "FMCG", title: "Crash-Lock Bottom Carton", desc: "High-speed assembly carton for food and beverage packaging." },
        { cat: "Pharmaceutical", title: "Braille Embossed Medical Box", desc: "FSC-certified board with compliant Braille embossing and tamper-evident closure." }
      ]
    },
    latestProjects: {
      label: "Recent Deliveries",
      title: "Latest Projects",
      viewAll: "View All Projects",
      items: [
        { client: "Premium Fashion Label", title: "Soft-Touch Rigid Boxes with Gold Foil" },
        { client: "Global Pharma Enterprise", title: "Precision Pharmaceutical Cartons with Braille" },
        { client: "FMCG Food Chain", title: "Grease-Resistant Kraft Food Packaging" }
      ]
    },
    contact: {
      label: "Start Your Project",
      title: "Let’s Engineer Your Packaging",
      subtitle: "Our enterprise sales engineering team is ready to discuss your structural requirements, provide technical consultation, and deliver accurate high-volume quotes.",
      info: [
        { title: "Sales & Support", desc: "+20 10 1234 5678\n+20 12 9876 5432" },
        { title: "Email Address", desc: "sales@mirnagraphic.com\ninfo@mirnagraphic.com" },
        { title: "Working Hours", desc: "Saturday - Thursday\n08:00 AM - 05:00 PM" }
      ],
      successTitle: "Request Received Successfully",
      successDesc: "Our engineering sales team will contact you within 24 hours.",
      fields: {
        name: "Full Name",
        company: "Company Name",
        email: "Business Email",
        phone: "Phone Number",
        type: "Packaging Type",
        details: "Project Details"
      },
      options: {
        rigid: "Luxury Rigid Boxes (Set Boxes)",
        fmcg: "Commercial Packaging (FMCG)",
        shipping: "Shipping Cartons (Corrugated)",
        custom: "Fully Custom Dimensions"
      },
      placeholder: {
        name: "John Doe",
        company: "Acme Corp",
        email: "john@company.com",
        phone: "+20 1X XXXX XXXX",
        details: "Please include estimated volume, dimensions, and finishing requirements..."
      },
      submit: "Submit Quote Request",
      loading: "Submitting..."
    },
    footer: {
      desc: "Premium Carton Packaging Manufacturer. El Mahalla El Kubra, Gharbia, Egypt.",
      quickLinks: "Quick Links",
      legal: "Legal",
      social: "Connect",
      rights: "© 2026 Mirna Graphic. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy"
    },
    faq: {
      label: "Knowledge Base",
      title: "Frequently Asked Questions",
      q1: { q: "Do you manufacture custom dimensions?", a: "Yes, our engineering department designs packaging to your exact geometric requirements." },
      q2: { q: "What is your minimum order quantity (MOQ)?", a: "MOQs depend on the complexity of the box structure. Please contact our enterprise sales team for specifics." },
      q3: { q: "Do you ship internationally?", a: "Yes, we handle domestic distribution across Egypt and logistics for global export." },
      q4: { q: "How do you ensure color accuracy?", a: "We utilize advanced color calibration technology directly linked to our high-speed offset printers." }
    },
    testimonials: {
      label: "Social Proof",
      title: "What Our Partners Say",
      placeholder: {
        quote: "[Awaiting Verified Client Testimonial]",
        client: "[Verified Client Name]",
        company: "[Verified B2B Company]"
      }
    },
    trustedBy: {
      label: "Our Partners",
      title: "Trusted By Leading Manufacturers",
      placeholder: "[Awaiting Verified Client Logos]"
    },
    whyChoose: {
      label: "Competitive Edge",
      title: "Why Choose Mirna Graphic",
      reasons: [
        { title: "Engineering Precision", desc: "Every structural layout is geometrically calculated to exact millimeter tolerances." },
        { title: "Industrial Capacity", desc: "High-volume capabilities ensuring raw material availability and rapid production lines." },
        { title: "B2B Focus", desc: "We exclusively understand the strict requirements of commercial and industrial supply chains." },
        { title: "Strategic Location", desc: "Operating from El Mahalla El Kubra guarantees optimized logistics across major industrial zones." }
      ]
    },
    valueMatrix: {
      label: "Capabilities Matrix",
      title: "Our Competitive Advantages",
      supply: { title: "Uninterrupted Supply", desc: "Digitally monitored inventory ensures raw Couché and corrugated stocks are permanently available." },
      error: { title: "Zero Human-Error Policy", desc: "Automated linking of customer technical specifications directly to active production lines." },
      delivery: { title: "On-Time Guarantee", desc: "Real-time tracking across cutting, printing, and assembly departments." }
    },
    finalCta: {
      title: "Ready To Build Your Packaging Solution?",
      subtitle: "Partner with Mirna Graphic for precision engineering and high-volume reliability.",
      call: "Call Enterprise Sales",
      whatsapp: "WhatsApp Support",
      email: "Email Specifications"
    },
    assetLedger: {
      label: "Asset Management",
      title: "ERP Asset Management",
      howItWorks: "Your assets secured under digital lock and key.",
      subcoding: { title: "Unique Sub-Coding", desc: "Distinct printing zincs and die-cut patterns are uniquely indexed." },
      integration: { title: "Automated Integration", desc: "System dynamically pulls historical sub-codes into live production." },
      maintenance: { title: "Lifespan Tracking", desc: "Software counts mechanical strikes to trigger restorative maintenance cycles." }
    },
    capabilities: {
      label: "Production Scope",
      title: "Manufacturing Capabilities",
      luxury: { title: "Luxury Packaging", desc: "Complex rigid structures, multi-layered finishing, and premium material selection." },
      commercial: { title: "Commercial Packaging", desc: "High-volume FMCG boxes engineered for rapid assembly and edge-crush resistance." },
      industrial: { title: "Industrial Protection", desc: "Heavy-duty corrugated structural solutions for maximal physical protection during transit." }
    },
    factoryProcess: {
      label: "Workflow",
      title: "The Factory Process",
      step1: { title: "1. Engineering & Prototyping", desc: "Structural design and physical sample approval." },
      step2: { title: "2. Pre-Press & Zinc Creation", desc: "Color calibration and isolated sub-coding." },
      step3: { title: "3. Printing & Lamination", desc: "High-speed offset reproduction and surface finishing." },
      step4: { title: "4. Die-Cutting & Stripping", desc: "Precise mechanical cutting of the flat structural layout." },
      step5: { title: "5. Assembly & Quality Control", desc: "Automated folding, adhesive application, and rigidity testing." }
    },
    innovation: {
      label: "R&D Innovation Lab",
      title: "Engineering the Future of Packaging",
      desc: "We don’t just meet standards; we invent them. Our R&D team continuously works on advanced moisture barriers, soy-based eco-inks, and structural designs that use 15% less material while retaining 100% of the rigidity.",
      ink: { title: "Eco-Friendly Inks", desc: "100% solvent-free, soy-based inks for zero toxicity." },
      smart: { title: "Smart Structures", desc: "Geometrically optimized layouts reducing waste by up to 15%." }
    },
    statistics: {
      label: "By The Numbers",
      title: "Mirna Graphic In Numbers",
      placeholder: "[Awaiting Verified Production Statistics]"
    },
    certifications: {
      label: "Compliance",
      title: "Quality Certifications",
      placeholder: {
        name: "[Certification Name Pending]",
        org: "[Issuing Organization Pending]",
        number: "[ID: Pending Verification]",
        date: "[Issue Date Pending]"
      }
    },
    departments: {
      label: "Departments",
      title: "Our Specialized Divisions",
      placeholder: "[Awaiting Content]"
    },
    factoryLocation: {
      label: "Location",
      title: "Our Facility",
      placeholder: "[Awaiting Content]"
    },
    packagingMaterials: {
      label: "Materials",
      title: "Premium Substrates",
      placeholder: "[Awaiting Content]"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      manufacturing: "التصنيع",
      products: "المنتجات",
      industries: "الصناعات",
      gallery: "معرض المصنع",
      quality: "الجودة",
      projects: "المشاريع",
      contact: "تواصل معنا",
      quote: "طلب عرض سعر"
    },
    hero: {
      label: "ريادة في صناعة التغليف",
      h1: "صناعة التغليف الكرتوني الفاخر في مصر.",
      subtitle: "ميرنا جرافيك تصمم وتصنع حلول التغليف الكرتوني عالية المتانة والمطبوعة بتقنيات الأوفست والديجيتال. مصنعنا في المحلة الكبرى يخدم سلاسل الإمداد المحلية والعالمية.",
      ctaQuote: "اطلب عرض سعر مخصص",
      ctaExplore: "استكشف مصنعنا",
      trust: {
        iso: "أيزو 9001 معتمد",
        years: "+20 عاماً خبرة",
        clients: "+500 عميل"
      }
    },
    about: {
      label: "عراقة وقدرات صناعية",
      title: "عن ميرنا جرافيك",
      story: "تقع ميرنا جرافيك في القلب الصناعي لمدينة المحلة الكبرى بمحافظة الغربية، وتعمل كشركة رائدة في تصنيع التغليف الكرتوني لقطاع الشركات (B2B). نحن ندمج دقة الهندسة الحديثة مع القدرات الصناعية الضخمة لتوريد المنتجات للمصنعين في مصر وأسواق التصدير العالمية.",
      mission: "مهمتنا هي تقديم حلول تغليف خالية من العيوب من خلال تكنولوجيا التصنيع المتقدمة وبناء شراكات صناعية طويلة الأمد.",
      vision: "أن نكون الشريك التقني الأول في مجال التغليف للعلامات التجارية الرائدة في الشرق الأوسط.",
      cta: "استكشف قدراتنا التصنيعية",
      metrics: {
        missionTitle: "الرسالة",
        missionDesc: "تصنيع التغليف بمواصفات عالمية وبمعدلات انتاج ضخمة.",
        visionTitle: "الرؤية",
        visionDesc: "الشريك التقني الأول في التغليف للعلامات الرائدة.",
        historyTitle: "التاريخ",
        historyDesc: "أكثر من 20 عاماً من الالتزام بالجودة وتطوير خطوط الانتاج."
      }
    },
    manufacturing: {
      label: "قدرات التصنيع",
      title: "تكنولوجيا التصنيع",
      subtitle: "منشأتنا مجهزة بآلات مؤتمتة لتنفيذ الإنتاج الضخم بدقة مطلقة.",
      techs: [
        { title: "معايرة ما قبل الطباعة", desc: "نظام CTP آلي وملفات تعريف ألوان رقمية لاستنساخ دقيق." },
        { title: "طباعة أوفست سريعة", desc: "طابعات Heidelberg Speedmaster XL 106 تضمن تناسق الألوان في الكميات الضخمة." },
        { title: "قص وتكسير دقيق", desc: "أنظمة تكسير وتفريغ آلية لضمان حواف هيكلية نظيفة." },
        { title: "تشطيب أسطح متصل", desc: "سلوفان حريري، طبقة UV، وبصمة حرارية تطبق بسلاسة." },
        { title: "طي ولصق آلي", desc: "لصق سريع للعلب بقاعدة القفل الذاتي مع مستشعرات لفحص العيوب." }
      ]
    },
    customPackaging: {
      label: "الهندسة الإنشائية",
      title: "حلول التغليف المخصصة",
      subtitle: "نصمم علب كرتون صلبة وقابلة للطي لتناسب المتطلبات الفيزيائية الدقيقة لمنتجك.",
      features: [
        { title: "العلب الصلبة الفاخرة", desc: "إغلاق مغناطيسي، هياكل تلسكوبية، وتجربة فتح فاخرة." },
        { title: "علب السلع الاستهلاكية (FMCG)", desc: "علب سريعة التجميع مخصصة لبيئات التجزئة والكميات الضخمة." },
        { title: "علب التجارة الإلكترونية", desc: "حماية من الكرتون المضلع مع شريط فتح آمن يمنع التلاعب." },
        { title: "علب المنسوجات المتخصصة", desc: "هياكل مخصصة مزودة بنوافذ شفافة للملابس والفوط الفاخرة." }
      ]
    },
    industries: {
      label: "خبرات القطاعات",
      title: "الصناعات التي نخدمها",
      subtitle: "حلول تغليف هندسية متوافقة مع المتطلبات المادية والتنظيمية الصارمة للقطاعات الكبرى.",
      food: "الأغذية والمشروبات",
      pharma: "الأدوية والمستحضرات الطبية",
      textile: "المنسوجات والملابس",
      cosmetics: "مستحضرات التجميل",
      retail: "التجزئة والسلع الاستهلاكية",
      export: "التصدير والخدمات اللوجستية"
    },
    showcase: {
      label: "البنية التحتية",
      title: "معرض المصنع",
      subtitle: "جولة رقمية في منشأتنا الإنتاجية الممتدة على مساحة 10,000 متر مربع في المحلة الكبرى.",
      placeholder: "[تم حجب الصورة السرية]",
      tabs: {
        floor: "صالة الإنتاج",
        machines: "الماكينات",
        products: "المنتجات",
        samples: "عينات التغليف"
      }
    },
    quality: {
      label: "سياسة انعدام العيوب",
      title: "هيكل مراقبة الجودة",
      subtitle: "تخضع عملية التصنيع لدينا لبروتوكولات صارمة ومؤتمتة لضمان الجودة.",
      metrics: [
        { title: "معدل الخلو من العيوب", value: "99.9%" },
        { title: "فحص آلي متصل", value: "Inline" },
        { title: "معايرة الألوان", value: "Delta E < 2" }
      ],
      points: [
        { title: "التحقق من المواد الخام", desc: "يتم اختبار وزن الورق ونسبة الرطوبة وقوة الشد قبل بدء الإنتاج." },
        { title: "قياس الطيف اللوني المتصل", desc: "مسح آلي مستمر يضمن تطابق ألوان بانتون (Pantone) في ملايين النسخ." },
        { title: "اختبار الإجهاد الهيكلي", desc: "اختبارات السقوط ومقاومة سحق الحواف للكرتون المضلع." },
        { title: "أنظمة الرؤية الآلية للعيوب", desc: "كاميرات عالية السرعة تستبعد الكراتين غير المطابقة آلياً." },
        { title: "فحص التجميع النهائي", desc: "فحوصات يدوية وآلية لسلامة المواد اللاصقة ودقة الطي." },
        { title: "فحص جاهزية الخدمات اللوجستية", desc: "تثبيت المنصات (البالتات) وحماية البيئة قبل الإرسال." }
      ]
    },
    portfolio: {
      label: "معرض المنتجات",
      title: "تحف هندسية",
      nda: "[تم حجب الصورة السرية]",
      categories: ["علب فاخرة", "التجارة الإلكترونية", "السلع الاستهلاكية", "الأدوية"],
      items: [
        { cat: "علب فاخرة", title: "علبة مغناطيسية فاخرة", desc: "كرتون صلب مع سلوفان حريري وبصمة ذهبية." },
        { cat: "علب فاخرة", title: "علبة تلسكوبية", desc: "علبة صلبة من قطعتين مخصصة للإلكترونيات والملابس الفاخرة." },
        { cat: "التجارة الإلكترونية", title: "علبة شحن ذاتية اللصق", desc: "علبة شحن مضلعة مع شريط فتح سهل وشرائط لاصقة مزدوجة." },
        { cat: "السلع الاستهلاكية", title: "علبة سريعة التجميع", desc: "علبة عالية السرعة في التجميع مخصصة للأغذية والمشروبات." },
        { cat: "الأدوية", title: "علبة طبية بطباعة برايل", desc: "ورق معتمد مع بصمة برايل وإغلاق محكم يمنع التلاعب." }
      ]
    },
    latestProjects: {
      label: "أحدث الإنجازات",
      title: "مشاريع تم تسليمها مؤخراً",
      viewAll: "عرض جميع المشاريع",
      items: [
        { client: "علامة أزياء فاخرة", title: "علب صلبة بلمسة حريرية وبصمة ذهبية" },
        { client: "شركة أدوية عالمية", title: "تغليف دوائي دقيق مع برايل" },
        { client: "سلسلة مطاعم كبرى", title: "علب كرافت غذائية مقاومة للزيوت" }
      ]
    },
    contact: {
      label: "ابدأ مشروعك",
      title: "دعنا نصنع تغليفاً استثنائياً",
      subtitle: "فريق المبيعات الهندسية لدينا جاهز لمناقشة متطلبات التغليف الخاصة بك، وتقديم استشارات فنية، وتسعير دقيق لطلبات الجملة.",
      info: [
        { title: "المبيعات والدعم", desc: "+20 10 1234 5678\n+20 12 9876 5432" },
        { title: "البريد الإلكتروني", desc: "sales@mirnagraphic.com\ninfo@mirnagraphic.com" },
        { title: "ساعات العمل", desc: "السبت - الخميس\n08:00 صباحاً - 05:00 مساءً" }
      ],
      successTitle: "تم استلام طلبك بنجاح",
      successDesc: "سيقوم فريق المبيعات الهندسية بالتواصل معك خلال 24 ساعة.",
      fields: {
        name: "الاسم بالكامل",
        company: "اسم الشركة",
        email: "البريد الإلكتروني للعمل",
        phone: "رقم الهاتف",
        type: "نوع التغليف",
        details: "تفاصيل المشروع"
      },
      options: {
        rigid: "علب صلبة فاخرة (Set Boxes)",
        fmcg: "تغليف تجاري (FMCG)",
        shipping: "تغليف شحن (مضلع)",
        custom: "مقاسات وتصاميم مخصصة"
      },
      placeholder: {
        name: "محمد أحمد",
        company: "شركة المستقبل للصناعات",
        email: "example@company.com",
        phone: "+20 1X XXXX XXXX",
        details: "اكتب تفاصيل مشروع التغليف المطلوب، الكمية التقديرية والمقاسات..."
      },
      submit: "إرسال طلب تسعير",
      loading: "جاري الإرسال..."
    },
    footer: {
      desc: "الشركة الرائدة لتصنيع التغليف الكرتوني הפاخر. المحلة الكبرى، الغربية، مصر.",
      quickLinks: "روابط سريعة",
      legal: "الشؤون القانونية",
      social: "تواصل معنا",
      rights: "© 2026 ميرنا جرافيك. جميع الحقوق محفوظة.",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية"
    },
    faq: {
      label: "مركز المعرفة",
      title: "الأسئلة الشائعة",
      q1: { q: "هل تقومون بتصنيع مقاسات مخصصة؟", a: "نعم، يقوم قسم الهندسة لدينا بتصميم التغليف ليطابق متطلباتك الهندسية بالضبط." },
      q2: { q: "ما هو الحد الأدنى للطلب (MOQ)؟", a: "يعتمد الحد الأدنى على مدى تعقيد الهيكل. يرجى التواصل مع فريق مبيعات الشركات للتفاصيل." },
      q3: { q: "هل تقومون بالشحن الدولي؟", a: "نعم، نحن ندير التوزيع المحلي في مصر ونقدم الدعم اللوجستي للتصدير العالمي." },
      q4: { q: "كيف تضمنون دقة الألوان؟", a: "نستخدم تكنولوجيا متقدمة لمعايرة الألوان متصلة مباشرة بماكينات طباعة الأوفست السريعة." }
    },
    testimonials: {
      label: "آراء شركائنا",
      title: "ماذا يقول شركاؤنا",
      placeholder: {
        quote: "[بانتظار إضافة رأي العميل الموثق]",
        client: "[اسم العميل الموثق]",
        company: "[اسم الشركة الموثقة]"
      }
    },
    trustedBy: {
      label: "شركاء النجاح",
      title: "شركاء النجاح من كبرى المصانع",
      placeholder: "[بانتظار إضافة شعارات العملاء الموثقة]"
    },
    whyChoose: {
      label: "ميزاتنا",
      title: "لماذا تختار ميرنا جرافيك؟",
      reasons: [
        { title: "دقة هندسية فائقة", desc: "يتم حساب كل تصميم إنشائي بدقة ملليمترية تامة." },
        { title: "طاقة صناعية ضخمة", desc: "قدرات إنتاجية عالية تضمن توفر المواد الخام وسرعة التنفيذ." },
        { title: "التركيز على الـ B2B", desc: "نفهم بدقة المتطلبات الصارمة لسلاسل التوريد التجارية والصناعية." },
        { title: "موقع استراتيجي", desc: "التشغيل من المحلة الكبرى يضمن لوجستيات محسنة عبر المناطق الصناعية الكبرى." }
      ]
    },
    valueMatrix: {
      label: "ميزاتنا التنافسية",
      title: "القيم الأساسية",
      supply: { title: "إمداد مستمر", desc: "مراقبة رقمية للمخزون تضمن توفر ورق الكوشيه والكرتون المضلع بشكل دائم." },
      error: { title: "خطأ بشري منعدم", desc: "ربط آلي للمواصفات الفنية الخاصة بالعميل مع خطوط الإنتاج مباشرة." },
      delivery: { title: "ضمان التسليم", desc: "تتبع لحظي عبر أقسام القص، الطباعة، والتجميع." }
    },
    finalCta: {
      title: "هل أنت مستعد لتنفيذ حلول التغليف الخاصة بك؟",
      subtitle: "شارك ميرنا جرافيك للحصول على دقة هندسية وموثوقية في الإنتاج الضخم.",
      call: "اتصل بمبيعات الشركات",
      whatsapp: "دعم الواتساب",
      email: "أرسل المواصفات عبر الإيميل"
    },
    assetLedger: {
      label: "نظام إدارة الأصول",
      title: "إدارة أصول ERP",
      howItWorks: "أصولكم الفنية تحت حماية رقمية مشددة.",
      subcoding: { title: "تكويد فرعي معزول", desc: "يتم تكويد زنكات الطباعة وفورم التكسير الخاصة بك بشكل فريد ومعزول." },
      integration: { title: "ربط مؤتمت", desc: "يسحب النظام آلياً التكويد التاريخي عند إعادة الطلب." },
      maintenance: { title: "تتبع العمر الافتراضي", desc: "يحتسب النظام عدد الضربات لتفعيل دورات الصيانة الاستباقية." }
    },
    capabilities: {
      label: "القدرات التصنيعية",
      title: "قدرات التصنيع المتقدمة",
      luxury: { title: "التغليف الفاخر", desc: "هياكل صلبة معقدة، تشطيبات متعددة الطبقات، واختيار مواد خام ممتازة." },
      commercial: { title: "التغليف التجاري", desc: "علب سلع استهلاكية مصممة للتجميع السريع ومقاومة ضغط الحواف." },
      industrial: { title: "الحماية الصناعية", desc: "حلول هيكلية للكرتون المضلع عالي التحمل لتوفير أقصى حماية أثناء النقل." }
    },
    factoryProcess: {
      label: "دورة الإنتاج",
      title: "العمليات الصناعية",
      step1: { title: "1. الهندسة وبناء النماذج", desc: "التصميم الإنشائي واعتماد العينة الفيزيائية." },
      step2: { title: "2. التجهيز وصناعة الزنكات", desc: "معايرة الألوان والتكويد الفرعي المعزول." },
      step3: { title: "3. الطباعة والسلوفان", desc: "إنتاج أوفست عالي السرعة وتشطيب الأسطح." },
      step4: { title: "4. القص والتكسير", desc: "القص الميكانيكي الدقيق للهيكل الإنشائي المسطح." },
      step5: { title: "5. التجميع وفحص الجودة", desc: "طي آلي، تطبيق اللصق، واختبار الصلابة." }
    },
    innovation: {
      label: "مختبر الابتكار والتطوير",
      title: "هندسة المستقبل للتغليف المستدام",
      desc: "لا نكتفي بتلبية المعايير الحالية بل نصنعها. يعمل فريق البحث والتطوير لدينا باستمرار على تحسين مقاومة الورق، واستخدام أحبار صديقة للبيئة، وتقليل الانبعاثات.",
      ink: { title: "أحبار صديقة للبيئة", desc: "استخدام أحبار خالية من المذيبات الضارة (Soy-based)." },
      smart: { title: "هياكل ذكية", desc: "تصميمات تستخدم كمية أقل من الورق مع الحفاظ على الصلابة." }
    },
    statistics: {
      label: "بالأرقام",
      title: "ميرنا جرافيك في أرقام",
      placeholder: "[بانتظار إضافة إحصائيات الإنتاج الموثقة]"
    },
    certifications: {
      label: "الاعتمادات",
      title: "شهادات الجودة",
      placeholder: {
        name: "[اسم الشهادة بانتظار التوثيق]",
        org: "[الجهة المانحة بانتظار التوثيق]",
        number: "[رقم الشهادة بانتظار التوثيق]",
        date: "[تاريخ الإصدار بانتظار التوثيق]"
      }
    },
    departments: {
      label: "الأقسام",
      title: "أقسامنا المتخصصة",
      placeholder: "[بانتظار المحتوى]"
    },
    factoryLocation: {
      label: "موقع المصنع",
      title: "منشأتنا",
      placeholder: "[بانتظار المحتوى]"
    },
    packagingMaterials: {
      label: "المواد",
      title: "خامات ممتازة",
      placeholder: "[بانتظار المحتوى]"
    }
  }
};

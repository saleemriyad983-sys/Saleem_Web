/* =====================================================================
 *  TRANSLATIONS  —  every interface label, in English and Arabic.
 *  (Your own content — name, bio, projects… — is in js/data.js.)
 *
 *  Both languages MUST have exactly the same keys.
 *  In index.html use:  data-i18n="section.key"
 *                      data-i18n-placeholder="..." / data-i18n-aria="..."
 * ===================================================================== */
window.I18N = {
  en: {
    meta: {
      title: "Portfolio | Web Software Engineer",
      description: "Personal portfolio of a Web Software Engineer: skills, projects, certificates and contact."
    },
    nav: {
      home: "Home", about: "About", skills: "Skills",
      projects: "Projects", certificates: "Certificates", contact: "Contact",
      menu: "Open menu", closeMenu: "Close menu", main: "Main navigation",
      language: "Language", switchTo: "Switch language"
    },
    hero: {
      eyebrow: "Welcome to my portfolio",
      greeting: "Hello, I'm",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      photoAlt: "Profile photo",
      scroll: "Scroll"
    },
    about: {
      eyebrow: "About",
      title: "About Me",
      education: "Education",
      experience: "Experience",
      interests: "Interests"
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical Skills",
      subtitle: "Technologies and tools I work with.",
      level: "Level {n} of 5"
    },
    projects: {
      eyebrow: "Work",
      title: "Projects",
      subtitle: "A selection of things I have built.",
      all: "All",
      filters: "Project categories",
      demo: "Live Demo",
      source: "Source Code",
      details: "View Details",
      technologies: "Technologies",
      noLink: "Link not added yet",
      empty: "No projects in this category yet."
    },
    certs: {
      eyebrow: "Achievements",
      title: "Certificates",
      subtitle: "Courses and credentials.",
      view: "View Certificate",
      issuer: "Issued by",
      date: "Date",
      empty: "No certificates added yet."
    },
    contact: {
      eyebrow: "Contact",
      title: "Get In Touch",
      subtitle: "Have a project or an opportunity in mind? Send a message.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending…",
      emailLabel: "Email",
      emailMissing: "[Your Email]",
      findMe: "Find me online",
      linkMissing: "Link not added yet",
      err: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        short: "Please write at least 10 characters."
      },
      status: {
        sent: "Thank you! Your message has been sent.",
        failed: "Sorry, the message could not be sent. Please try again later.",
        mailto: "Opening your email app to send this message…",
        notConfigured: "This form is not connected to an email service yet, so nothing was sent."
      }
    },
    footer: {
      links: "Quick links",
      follow: "Follow",
      rights: "All rights reserved.",
      backToTop: "Back to top"
    },
    common: {
      close: "Close",
      loading: "Loading",
      jsRequired: "JavaScript is required to view this website."
    }
  },

  ar: {
    meta: {
      title: "معرض الأعمال | مهندس برمجيات ويب",
      description: "معرض أعمال شخصي لمهندس برمجيات ويب: المهارات والمشاريع والشهادات والتواصل."
    },
    nav: {
      home: "الرئيسية", about: "من أنا", skills: "المهارات",
      projects: "المشاريع", certificates: "الشهادات", contact: "التواصل",
      menu: "فتح القائمة", closeMenu: "إغلاق القائمة", main: "التنقل الرئيسي",
      language: "اللغة", switchTo: "تغيير اللغة"
    },
    hero: {
      eyebrow: "أهلاً بك في معرض أعمالي",
      greeting: "مرحباً، أنا",
      viewProjects: "عرض المشاريع",
      contactMe: "تواصل معي",
      photoAlt: "الصورة الشخصية",
      scroll: "مرر"
    },
    about: {
      eyebrow: "نبذة",
      title: "من أنا",
      education: "التعليم",
      experience: "الخبرة",
      interests: "الاهتمامات"
    },
    skills: {
      eyebrow: "المهارات",
      title: "المهارات التقنية",
      subtitle: "التقنيات والأدوات التي أعمل بها.",
      level: "المستوى {n} من 5"
    },
    projects: {
      eyebrow: "الأعمال",
      title: "المشاريع",
      subtitle: "مجموعة مختارة مما قمت ببنائه.",
      all: "الكل",
      filters: "تصنيفات المشاريع",
      demo: "معاينة مباشرة",
      source: "الكود المصدري",
      details: "عرض التفاصيل",
      technologies: "التقنيات",
      noLink: "لم تتم إضافة الرابط بعد",
      empty: "لا توجد مشاريع في هذا التصنيف بعد."
    },
    certs: {
      eyebrow: "الإنجازات",
      title: "الشهادات",
      subtitle: "الدورات والاعتمادات.",
      view: "عرض الشهادة",
      issuer: "الجهة المانحة",
      date: "التاريخ",
      empty: "لم تتم إضافة شهادات بعد."
    },
    contact: {
      eyebrow: "التواصل",
      title: "تواصل معي",
      subtitle: "لديك مشروع أو فرصة؟ أرسل لي رسالة.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      emailLabel: "البريد الإلكتروني",
      emailMissing: "[بريدك الإلكتروني]",
      findMe: "تجدني على الإنترنت",
      linkMissing: "لم تتم إضافة الرابط بعد",
      err: {
        required: "هذا الحقل مطلوب.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        short: "يرجى كتابة 10 أحرف على الأقل."
      },
      status: {
        sent: "شكراً لك! تم إرسال رسالتك.",
        failed: "عذراً، تعذر إرسال الرسالة. يرجى المحاولة لاحقاً.",
        mailto: "جارٍ فتح تطبيق البريد لإرسال هذه الرسالة…",
        notConfigured: "هذا النموذج غير مربوط بخدمة بريد بعد، لذلك لم يتم إرسال أي شيء."
      }
    },
    footer: {
      links: "روابط سريعة",
      follow: "تابعني",
      rights: "جميع الحقوق محفوظة.",
      backToTop: "العودة للأعلى"
    },
    common: {
      close: "إغلاق",
      loading: "جارٍ التحميل",
      jsRequired: "يلزم تفعيل جافاسكربت لعرض هذا الموقع."
    }
  }
};

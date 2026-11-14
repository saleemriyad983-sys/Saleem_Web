/* =====================================================================
 *  SITE DATA  —  the ONLY file you need to edit for your content.
 *
 *  - Text shown to visitors is bilingual:  { en: "...", ar: "..." }
 *  - Anything wrapped in [brackets] is a placeholder. Replace it.
 *  - Leave a link as "" and its button is shown disabled (never a fake link).
 *  - Leave an image as "" and a placeholder picture is used.
 *  - Interface labels (button names, section titles…) live in js/i18n.js
 * ===================================================================== */
window.SITE_DATA = {

  /* ---------------- Site settings ---------------- */
  settings: {
    // Contact form delivery. Leave "" until you configure a service.
    // Example (Formspree): "https://formspree.io/f/xxxxxxxx"
    // With "" the form validates, then opens the visitor's email app
    // (if profile.email is set) and honestly says nothing was sent otherwise.
    contactFormEndpoint: "",

    // Placeholder images (used whenever an image path is "" or fails to load)
    placeholders: {
      profile: "assets/images/profile-placeholder.svg",
      project: "assets/images/project-placeholder.svg",
      certificate: "assets/images/certificate-placeholder.svg"
    }
  },

  /* ---------------- Personal information ---------------- */
  profile: {
    name:  { en: "Saleem Riyad ", ar: "سليم رياض" },
    title: { en: "Web Software Engineer", ar: "مهندس برمجيات ويب" },
    intro: {
      en: "Web Software Engineer, building modern digital experiences and professional software solutions.",
      ar: "مهندس برمجيات ويب، أبني تجارب رقمية عصرية وحلولاً برمجية احترافية."
    },
    // Rotating words under the name (typing animation)
    roles: {
      en: ["Web Software Engineer", "Frontend Development", "Backend Development"],
      ar: ["مهندس برمجيات ويب", "تطوير الواجهات الأمامية", "تطوير الأنظمة الخلفية"]
    },
   photo: "assets/images/dimond.jpeg",             // e.g. "assets/images/profile.jpg"
    email: "saleemriyad983@gmail.com",                // e.g. "you@example.com"  (shown in Contact + used for mailto)
    bio: {
      en: "Web Software Engineer specialized in full-stack web application development, combining robust backend architecture with modern, responsive frontend interfaces ",
      ar: "مهندس برمجيات ويب متخصّص في تطوير تطبيقات الويب المتكاملة (Full-Stack)، أجمع بين هندسة الأنظمة الخلفية القوية واجهات المستخدم الحديثة والمتجاوبة."
    },
    education: [
      {
        degree:  { en: "Web Software Engineer ",     ar: " مهندس برمجيات الويب" },
        school:  { en: "University College of Applied Sciences (UCAS) ", ar: "الكلية الجامعية للعلوم التطبيقية" },
        period:  { en: "2026-2027",           ar: "2026-2027" }
      }
    ],
    experience: [
      {
        role:   { en: "Full-Stack Web Developer",       ar: " مطور وب متكامل (Full-Stack)" },
        org:    { en: "Academic & Personal Projects", ar: " مشاريع أكاديمية وشخصية " },
        period: { en: "2025 - Present",           ar: "2025 - حتى الآن" },
        desc:   { en: "Developed multiple production-ready systems including Smart Pharmacy POS, Dental Clinic Management, and E-commerce platforms using PHP, Laravel, Vue.js, and MySQL. ", ar: "طورت العديد من الأنظمة المتقدمة تشمل نظام إدارة الصيدليات والمخزون الذكي، ونظام إدارة عيادات الأسنان، ومنصات تجارية باستخدام PHP و Laravel و Vue.js و MySQL." }
      }
    ],
    interests: [
      { en: " Football", ar: " كرة القدم" },
      { en: "3D Web Animations (Three.js)", ar: " رسومات الويب ثلاثية الأبعاد" },
      { en: "Video Games", ar: "ألعاب الفيديو " },
      { en: "Problem Solving", ar: "حل المشكلات البرمجية" },
{ en: "UI/UX Design", ar: "تصميم واجهات وتجربة المستخدم" },
{ en: "Database Architecture", ar: "هندسة قواعد البيانات" },
{ en: "Open Source Contributions", ar: "المساهمة في المشاريع مفتوحة الصورس" },
{ en: "Reading Tech Blogs", ar: "قراءة المدونات التقنية" }
    ],
// value: type a number (e.g. "12") to get a count-up animation, or any text.
    stats: [
        { value: "2+", label: { en: "Years of Experience", ar: "سنوات الخبرة" } },
        { value: "6+", label: { en: "Projects Completed", ar: "المشاريع المنجزة" } },
        { value: "90.50", label: { en: "University GPA", ar: "المعدل الجامعي" } },
        { value: "10+", label: { en: "Technologies Mastered", ar: "تقنيات متقنة" } }
    ],
    // Decorative floating badges around the hero photo (just text, not claims)
    floatingTech: ["HTML", "CSS", "JS", "PHP", "Laravel", "Vue.js", "MySQL", "Git"]
},

/* ------------------- Social links -------------------
 * id -> icon. Available icons: github, linkedin, instagram, mail, link
 * Leave url "" and the icon is shown disabled.
 * Add more lines freely.                               */
social: [
    { id: "github", label: "GitHub", icon: "github", url: "https://github.com/saleemriyad983-sys" },
    { id: "linkedin", label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/saleem-riyad-b2aa64440?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { id: "instagram", label: "Instagram", icon: "instagram", url: "https://www.instagram.com/saleem_r_2005?xtok=MTNzZGNmNHdjOWQ5Mg==" },
    { id: "other", label: "Website", icon: "link", url: "https://saleemriyad983-sys.github.io/my-frist-project/" }
],

  /* ---------------- Skills ----------------
   * abbr : short text shown on the badge (e.g. "JS")
   * level: null  → no level shown (default, avoids false claims)
   *        1..5  → shows a 5-dot indicator                              */
  skills: [
    {
      id: "frontend",
      title: { en: "Frontend Development", ar: "تطوير الواجهات الأمامية" },
      items: [
        { name: "HTML5",      abbr: "H5",  level: null },
        { name: "CSS3",       abbr: "C3",  level: null },
        { name: "JavaScript", abbr: "JS",  level: null },
        { name: "Vue.js",     abbr: "Vue", level: null },
        { name: "Bootstrap",  abbr: "Bs",  level: null }
      ]
    },
    {
      id: "backend",
      title: { en: "Backend Development", ar: "تطوير الأنظمة الخلفية" },
      items: [
        { name: "PHP",        abbr: "PHP", level: null },
        { name: "PHP OOP",    abbr: "OOP", level: null },
        { name: "MySQL",      abbr: "My",  level: null },
        { name: "SQL Server", abbr: "SQL", level: null }
      ]
    },
    {
      id: "tools",
      title: { en: "Tools", ar: "الأدوات" },
      items: [
        { name: "Git",     abbr: "Git", level: null },
        { name: "GitHub",  abbr: "GH",  level: null },
        { name: "VS Code", abbr: "VS",  level: null },
        { name: "XAMPP",   abbr: "XP",  level: null }
      ]
    }
  ],

  /* ---------------- Project categories ----------------
   * Each project points to one of these ids. "All" is added automatically. */
  projectCategories: [
    { id: "web",    label: { en: "Web",    ar: "ويب" } },
    { id: "backend", label: { en: "Backend", ar: "خلفية" } },
    { id: "other",  label: { en: "Other",  ar: "أخرى" } }
  ],

/* ---------------- Projects ----------------
   * To add one: copy a block, give it a new unique id, fill it in.
   * image : "assets/images/projects/my-project.png"  ("" = placeholder)
   * links : leave "" for no link (button shows disabled)                  */
  projects: [
    {
      id: "smilecare-dental-system",
      category: "web",
      title: { 
        en: "SmileCare Dental Clinic Management System", 
        ar: "نظام إدارة عيادة سمايل كير لطب الأسنان" 
      },
      description: { 
        en: "A comprehensive web-based dental clinic management system featuring patient records, appointment scheduling, and service management.", 
        ar: "نظام إلكتروني متكامل لإدارة عيادات الأسنان يتضمن سجلات المرضى، جدولة المواعيد، وإدارة الخدمات الطبية." 
      },
      details: {
        en: "Developed a full-stack dental clinic management portal to streamline patient workflows, doctor appointments, and medical records. Built with PHP, MySQL, and Bootstrap 5 for a secure, responsive, and user-friendly experience.",
        ar: "تطوير بوابة إلكترونية متكاملة لإدارة عيادات الأسنان لتنظيم سير عمل المرضى، مواعيد الأطباء، والسجلات الطبية. تم بناؤه باستخدام PHP و MySQL و Bootstrap 5 لتقديم تجربة مستخدم آمنة، متجاوبة، وسهلة الاستخدام.",
      },
      tech: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "HTML5", "CSS3"],
      image: "../assets/images/اسنان.png",
      links: { 
        demo: "https://smilecare-demo.infinityfree.io/signup.php", 
        source: "" 
      },
    },
    {
      id: "project-02",
      category: "backend",
      title: { en: "Project 02", ar: "المشروع 02" },
      description: { en: "Short project description", ar: "وصف مختصر للمشروع" },
      details: {
        en: "Full project details: goals, your role, challenges, results.",
        ar: "تفاصيل المشروع: الأهداف، دورك، التحديات، النتائج.",
      },
      tech: ["PHP", "MySQL"],
      image: "",
      links: { demo: "", source: "" },
    },
    {
      id: "project-03",
      category: "web",
      title: { en: "Project 03", ar: "المشروع 03" },
      description: { en: "Short project description", ar: "وصف مختصر للمشروع" },
      details: {
        en: "Full project details: goals, your role, challenges, results.",
        ar: "تفاصيل المشروع: الأهداف، دورك، التحديات، النتائج.",
      },
      tech: ["Vue.js", "Bootstrap"],
      image: "",
      links: { demo: "", source: "" },
    },
  ],

/* ---------------- Certificates ----------------
   * Only add certificates you really earned. The entries below can
   * be replaced with your actual certificates.
   * image: "assets/images/certificates/my-cert.jpg"  ("" = placeholder)    */
  certificates: [
    {
      id: "cert-01",
      title:  { en: "Web Design & Development Diploma", ar: "دبلوم تصميم وتطوير الويب" },
      issuer: { en: "University College of Applied Sciences", ar: "الكلية الجامعية للعلوم التطبيقية" },
      date:   { en: "2026", ar: "2026" },
      description: { en: "Comprehensive academic credential in full-stack web engineering and modern user interface design.", ar: "شهادة أكاديمية متكاملة في هندسة الويب وتصميم واجهات المستخدم الحديثة." },
      image: "assets/images/Web Development Diploma.png"
    },
    {
      id: "cert-02",
      title:  { en: "Full-Stack Web Applications Masterclass", ar: "احتراف بناء تطبيقات الويب المتكاملة" },
      issuer: { en: "Professional Web Development Training", ar: "تدريب تطوير الويب الاحترافي" },
      date:   { en: "2026", ar: "2026" },
      description: { en: "Advanced hands-on training in developing robust database-driven systems using PHP, Laravel, and Vue.js.", ar: "تدريب عملي متقدم في تطوير أنظمة قواعد البيانات باستخدام PHP و Laravel و Vue.js." },
      image: "assets/images/شهادة Full-Stack Web Applications Masterclass.png"
    },
    {
      id: "cert-03",
      title:  { en: "Database Design & SQL Architecture", ar: "تصميم قواعد البيانات وهندسة SQL" },
      issuer: { en: "Software Engineering Institute", ar: "معهد هندسة البرمجيات" },
      date:   { en: "2025", ar: "2025" },
      description: { en: "Specialized certification covering relational schema normalization, advanced T-SQL queries, views, and procedures.", ar: "شهادة متخصصة تغطي تسوية مخططات البيانات، واستعلامات T-SQL المتقدمة، والإجراءات المخزنة." },
      image: "assets/images/شهادة هندسة قواعد البيانات وSQL.png"
    }
  ]
};

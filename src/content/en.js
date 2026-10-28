export default {
  preloader: { greeting: "Hello" },
  nav: {
    menu: "Menu",
    projects: "Projects",
    experience: "Experience",
    about: "About",
    contact: "Contact",
  },
  hero: {
    kicker: "Frontend developer · Bishkek, Kyrgyzstan",
    title:
      "I build websites end-to-end, in React, Vue, WordPress or plain JavaScript.",
    lede: "3+ years of commercial work. I pick the tool for the project and finish what I start. Selected work below.",
    cta: "See the work",
    scroll: "Scroll",
  },
  projects: {
    heading: "Selected work",
    subheading: "Four projects in React, WordPress and plain JavaScript.",
    items: [
      {
        id: "quasar",
        name: "Quasar DAO",
        tag: "DeFi / landing page",
        stack: "HTML · CSS · JavaScript · Figma",
        summary:
          "Landing page for a DeFi staking platform, built from a Figma design in plain HTML, CSS and JavaScript. Custom animations, fully responsive.",
        links: [
          {
            label: "Live demo",
            href: "https://aleksandr3267.github.io/quasar",
          },
        ],
      },
      {
        id: "primeholding",
        name: "PrimeHolding",
        tag: "Real estate",
        stack: "React · Redux Toolkit · SVG · PDF",
        summary:
          "Interactive apartment configurator: master plan → section → building → apartment, with clickable SVG zones, data loading by floor and layout, a lead form and PDF generation. Built solo in React; the client paused the project before launch, so there is a public demo instead of a live site.",
        links: [
          {
            label: "Demo",
            href: "https://aleksandr3267.github.io/primeholding",
          },
        ],
      },
      {
        id: "polibuild",
        name: "Polibuild",
        tag: "E-commerce",
        stack: "WordPress · Elementor",
        summary:
          "Online store for construction materials, built from scratch on WordPress with Elementor: responsive layout, optimized for lead conversion.",
        links: [{ label: "Live site", href: "https://polibuild.kz" }],
      },
      {
        id: "green-api-chat",
        name: "GREEN-API Chat",
        tag: "Test task",
        stack: "React · TypeScript",
        summary:
          "React + TypeScript web chat for sending and receiving WhatsApp messages through GREEN-API. Built as a test task with AI assistance: the code review was positive and GREEN-API issued a qualification certificate.",
        links: [
          {
            label: "Repository",
            href: "https://github.com/Aleksandr3267/green-api-chat",
          },
          { label: "Demo", href: "https://green-api-chat-tau.vercel.app/" },
          {
            label: "Certificate",
            href: "https://green-api.com/certificates/developer/49524fc541a44e52.pdf",
          },
        ],
      },
    ],
  },
  experience: {
    heading: "Experience",
    items: [
      {
        role: "Frontend Developer",
        company: "Vortex Innovations LLC",
        period: "May 2025 – Sep 2026",
        text: "Built and customized landing pages and web forms (HTML, CSS, JavaScript, PHP): responsive layouts, dynamic content, analytics parameters, page speed and conversion optimization.",
      },
      {
        role: "WordPress Developer",
        company: "Trust Corp (TOPSALES group) · contract",
        period: "May 2024 – Nov 2025",
        text: "WordPress sites, custom themes and templates, hooks, plugins, Elementor, PageSpeed optimization.",
      },
      {
        role: "Frontend Developer",
        company: "Moore Studio",
        period: "Feb 2023 – Apr 2024",
        text: "SPAs in React and Vue (TypeScript), component architecture, REST API. Contributed to an online store (header, footer, catalog, cart) and to the studio's own site (GSAP animations).",
      },
      {
        role: "Freelance Developer",
        company: "",
        period: "2021 – 2023",
        text: "Landing pages and small sites on WordPress, React and Vue.",
      },
    ],
    cv: "",
    hh: "View on hh.ru",
  },
  about: {
    heading: "About",
    body: "I'm Aleksandr, a frontend developer from Bishkek with 3+ years of commercial experience. I build responsive, cross-browser interfaces from Figma designs in React, Vue and TypeScript, and WordPress sites with Elementor. I'm comfortable taking over existing code and changing it without breaking what works. I check my work across browsers and devices before handing it over, and I'm currently deepening JavaScript and TypeScript.",
  },
  contact: {
    heading: "Let's work together",
    body: "Open to remote full-time roles and freelance projects. I reply within a day.",
    cta: "Get in touch",
    resume: "Resume",
    cv: "",
  },
  langSwitch: { label: "EN" },
};

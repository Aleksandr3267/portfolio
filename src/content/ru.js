export default {
  preloader: { greeting: "Здравствуйте" },
  nav: {
    menu: "Меню",
    projects: "Проекты",
    experience: "Опыт",
    about: "Обо мне",
    contact: "Контакты",
  },
  hero: {
    kicker: "Frontend-разработчик · Бишкек, Кыргызстан",
    title:
      "Делаю сайты от начала до конца на React, Vue, WordPress или чистом JavaScript.",
    lede: "3+ года коммерческого опыта. Выбираю инструмент под проект и довожу начатое до конца. Избранные работы ниже.",
    cta: "Смотреть работы",
    scroll: "Листайте",
  },
  projects: {
    heading: "Избранные проекты",
    subheading: "Четыре проекта на React, WordPress и чистом JavaScript.",
    items: [
      {
        id: "quasar",
        name: "Quasar DAO",
        tag: "DeFi / лендинг",
        stack: "HTML · CSS · JavaScript · Figma",
        summary:
          "Лендинг DeFi-платформы стейкинга по макету из Figma на чистом HTML, CSS и JavaScript. Авторские анимации, полностью адаптивная вёрстка.",
        links: [
          { label: "Демо", href: "https://aleksandr3267.github.io/quasar" },
        ],
      },
      {
        id: "primeholding",
        name: "PrimeHolding",
        tag: "Недвижимость",
        stack: "React · Redux Toolkit · SVG · PDF",
        summary:
          "Интерактивный конфигуратор квартир: генплан → секция → здание → квартира, кликабельные SVG-зоны, загрузка данных по этажам и планировкам, форма заявки и генерация PDF. Сделан в одиночку на React; заказчик приостановил проект до запуска, поэтому вместо живого сайта есть публичное демо.",
        links: [
          {
            label: "Демо",
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
          "Интернет-магазин стройматериалов, сделанный с нуля на WordPress и Elementor: адаптивная вёрстка, оптимизация под конверсию заявок.",
        links: [{ label: "Сайт", href: "https://polibuild.kz" }],
      },
      {
        id: "green-api-chat",
        name: "GREEN-API Chat",
        tag: "Тестовое задание",
        stack: "React · TypeScript",
        summary:
          "Веб-чат на React и TypeScript для отправки и получения сообщений WhatsApp через GREEN-API. Выполнен как тестовое задание с помощью ИИ: код-ревью положительное, GREEN-API выдал сертификат о квалификации.",
        links: [
          {
            label: "Репозиторий",
            href: "https://github.com/Aleksandr3267/green-api-chat",
          },
          { label: "Демо", href: "https://green-api-chat-tau.vercel.app/" },
          {
            label: "Сертификат",
            href: "https://green-api.com/certificates/developer/49524fc541a44e52.pdf",
          },
        ],
      },
    ],
  },
  experience: {
    heading: "Опыт",
    items: [
      {
        role: "Frontend-разработчик",
        company: "Vortex Innovations LLC",
        period: "май 2025 – сен 2026",
        text: "Верстал и дорабатывал лендинги и веб-формы (HTML, CSS, JavaScript, PHP): адаптивные макеты, динамический контент, параметры аналитики, скорость загрузки и оптимизация конверсии.",
      },
      {
        role: "WordPress-разработчик",
        company: "Trust Corp (группа TOPSALES) · контракт",
        period: "май 2024 – ноя 2025",
        text: "Сайты на WordPress, собственные темы и шаблоны, хуки, плагины, Elementor, оптимизация PageSpeed.",
      },
      {
        role: "Frontend-разработчик",
        company: "Moore Studio",
        period: "фев 2023 – апр 2024",
        text: "SPA на React и Vue (TypeScript), компонентная архитектура, REST API. Участвовал в разработке интернет-магазина (шапка, подвал, каталог, корзина) и собственного сайта студии (анимации на GSAP).",
      },
      {
        role: "Фриланс-разработчик",
        company: "",
        period: "2021 – 2023",
        text: "Лендинги и небольшие сайты на WordPress, React и Vue.",
      },
    ],
    cv: "Скачать резюме (PDF)",
    hh: "Открыть на hh.ru",
  },
  about: {
    heading: "Обо мне",
    body: "Меня зовут Александр, я frontend-разработчик из Бишкека с 3+ годами коммерческого опыта. Делаю адаптивные кроссбраузерные интерфейсы по макетам Figma на React, Vue и TypeScript, а также сайты на WordPress с Elementor. Умею брать чужой код и менять его, не ломая то, что работает. Перед сдачей проверяю работу в разных браузерах и на разных устройствах, сейчас углубляю JavaScript и TypeScript.",
  },
  contact: {
    heading: "Давайте поработаем",
    body: "Открыт к удалённой работе на полный день и к фриланс-проектам. Отвечаю в течение дня.",
    cta: "Написать мне",
    resume: "Резюме",
    cv: "Скачать резюме",
  },
  langSwitch: { label: "RU" },
};

import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../content/LanguageContext.jsx';
import './Nav.css';
import { track } from '../analytics';

const SECTIONS = ['projects', 'experience', 'about', 'contact'];

export default function Nav() {
  const { t, lang, toggleLang } = useLanguage();
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.5;
      let current = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const links = SECTIONS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      className={active === id ? 'active' : ''}
      aria-current={active === id ? 'true' : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {t.nav[id]}
    </a>
  ));

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">AP</a>

        <nav className="nav-links">{links}</nav>

        <div className="nav-right">
          <button className="lang-toggle mono" onClick={() => { track('lang_switch', { to: lang === 'en' ? 'ru' : 'en' }); toggleLang(); }} aria-label="Switch language">
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="divider">/</span>
            <span className={lang === 'ru' ? 'active' : ''}>RU</span>
          </button>

          <button
            className={`nav-burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {links}
      </nav>
    </header>
  );
}
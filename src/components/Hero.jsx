import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../content/LanguageContext.jsx';
import { siteReady } from '../intro.js';
import RevealText from './RevealText.jsx';
import './Hero.css';
import { NAME } from '../config.js';

export default function Hero() {
  const { t } = useLanguage();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .from('.hero-kicker', { opacity: 0, y: 14, duration: 0.7 }, 0.05)
        .from('.hero-lede', { opacity: 0, y: 16, duration: 0.8 }, 0.6)
        .from('.hero-cta', { opacity: 0, y: 12, duration: 0.7 }, 0.8)
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, 1.2);

      let alive = true; 
      siteReady.then(() => alive && tl.play());
      return () => {
        alive = false;
      };
    }, rootRef);
    return () => mm.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker mono">
            <span><strong>{NAME}</strong> ·
            {t.hero.kicker}</span>
          </p>
          <RevealText as="h1" className="hero-title" scroll={false} delay={0.1}>
            {t.hero.title}
          </RevealText>
          <p className="hero-lede">
            <span>{t.hero.lede}</span>
          </p>
          <a href="#projects" className="hero-cta btn-primary" data-umami-event="click_hero_cta">
            {t.hero.cta}
          </a>
        </div>
      </div>

      <div className="hero-scroll mono" aria-hidden="true">
        <span>{t.hero.scroll}</span>
        <i />
      </div>
    </section>
  );
}

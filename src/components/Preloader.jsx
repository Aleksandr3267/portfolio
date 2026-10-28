import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { markSiteReady } from '../intro.js';
import './Preloader.css';
import { useLanguage } from '../content/LanguageContext.jsx';
import { startScroll, stopScroll } from '../smoothScroll.js';

gsap.registerPlugin(SplitText);

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Preloader() {
  const { t } = useLanguage();
  
  const [done, setDone] = useState(reducedMotion);

  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const metaRef = useRef(null);

  useLayoutEffect(() => {
   
    document.getElementById('boot-shell')?.remove();

    if (done) {
      markSiteReady();
      return;
    }

    const html = document.documentElement;
    html.style.overflow = 'hidden'; 
    stopScroll();
    window.scrollTo(0, 0);

   
    const split = SplitText.create(wordRef.current, {
      type: 'chars',
      mask: 'chars',
      charsClass: 'pre-char',
    });

    
    const counter = { value: 0 };
    const paint = () => {
      countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
      barRef.current.style.transform = `scaleX(${counter.value / 100})`;
    };

    
    const intro = gsap
      .timeline()
      .from(split.chars, { yPercent: 110, duration: 0.7, ease: 'expo.out', stagger: 0.035 }, 0.1)
      .from(metaRef.current, {  duration: 0.6 }, 0.3)
      .to(counter, { value: 90, duration: 1.1, ease: 'power2.out', onUpdate: paint }, 0.1);

    let alive = true;
    let exitTl;

    
    const exit = () => {
      exitTl = gsap
        .timeline({
          onComplete: () => {
            html.style.overflow = '';
            startScroll();
            setDone(true);
          },
        })
        .to(counter, { value: 100, duration: 0.25, ease: 'power1.out', onUpdate: paint })
        .to(split.chars, { yPercent: -110, duration: 0.45, ease: 'power3.in', stagger: 0.02 }, '+=0.1')
        .to(metaRef.current, { opacity: 0, duration: 0.3 }, '<')
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
        
        .call(markSiteReady, null, '<+0.4');
    };

    
    const introDone = new Promise((resolve) => intro.eventCallback('onComplete', resolve));
    const resourcesReady = Promise.race([
      Promise.all([document.fonts?.ready, import('../three/Scene.jsx').catch(() => {})]),
      new Promise((resolve) => setTimeout(resolve, 7000)),
    ]);

    Promise.all([introDone, resourcesReady]).then(() => alive && exit());

    return () => {
      alive = false;
      intro.kill();
      exitTl?.kill();
      split.revert();
      html.style.overflow = '';
      startScroll();
    };
   
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef} role="status" aria-label="Loading">
     
      <div className="preloader-top" ref={metaRef}>
        <div className="wrap preloader-nav">
          <span className="preloader-logo">AP</span>
          <span className="preloader-count mono">
            <span ref={countRef}>000</span>%
          </span>
        </div>
        <div className="preloader-track">
          <div className="preloader-bar" ref={barRef} />
        </div>
      </div>

      <div className="wrap preloader-body">
        <p className="preloader-word" ref={wordRef}>
        {t.preloader.greeting}<span className="bang">!</span>
        </p>
      </div>
    </div>
  );
}

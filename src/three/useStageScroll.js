import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stage, KEYFRAMES } from './stage.js';
import { siteReady } from '../intro.js';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ['top', 'projects', 'about', 'contact'];


export function useStageScroll() {
  useLayoutEffect(() => {
   
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 901px)',
        mobile: '(max-width: 900px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { mobile, reduce } = context.conditions;
        const frames = mobile ? KEYFRAMES.mobile : KEYFRAMES.desktop;

        gsap.set(stage, { ...frames[0], drift: 0 });

        
        if (reduce) {
          gsap.set(stage, { intro: 1 });
          return;
        }

       
        const introTween = gsap.fromTo(
          stage,
          { intro: 0 },
          { intro: 1, duration: 1.8, ease: 'expo.out', paused: true }
        );
        let alive = true;
        siteReady.then(() => alive && introTween.play());

       
        for (let i = 1; i < frames.length; i++) {
          gsap.fromTo(stage, frames[i - 1], {
            ...frames[i],
            ease: 'power2.inOut',
            immediateRender: false,
            scrollTrigger: {
              trigger: `#${SECTION_IDS[i]}`,
              start: 'top bottom',
              end: 'top 35%',
              scrub: 1,
            },
          });
        }

        
        gsap.fromTo(
          stage,
          { drift: 0 },
          {
            drift: Math.PI * 3,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );

       
        return () => {
          alive = false;
        };
      }
    );

   
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);
}

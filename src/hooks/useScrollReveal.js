import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const VARIANTS = {
  
  rise: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
    clear: 'transform,opacity',
  },
  
  wipe: {
    from: { opacity: 0, y: 36, clipPath: 'inset(100% 0% 0% 0%)' },
    to: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      stagger: 0.18,
      ease: 'expo.out',
    },
    clear: 'transform,opacity,clipPath',
  },
 
  pop: {
    from: { opacity: 0, scale: 0.82, y: 12 },
    to: {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: { amount: 0.5, from: 'random' },
      ease: 'back.out(1.7)',
    },
    clear: 'transform,opacity',
  },
};


export function useScrollReveal(
  selector,
  deps = [],
  variant = 'rise',
  media = '(prefers-reduced-motion: no-preference)'
) {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(media, () => {
      const v = VARIANTS[variant] ?? VARIANTS.rise;
      const all = scopeRef.current ? [...scopeRef.current.querySelectorAll(selector)] : [];

     
      const revealLine = window.innerHeight * 0.88;
      const targets = all.filter((el) => el.getBoundingClientRect().top > revealLine);
      if (!targets.length) return;

      
      gsap.set(targets, v.from);

      
      ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            ...v.to,
            overwrite: true,
            onComplete: () => gsap.set(batch, { clearProps: v.clear }),
          }),
      });
    }, scopeRef);

    return () => mm.revert();

  }, deps);

  return scopeRef;
}

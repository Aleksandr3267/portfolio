import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { siteReady } from '../intro.js';

gsap.registerPlugin(ScrollTrigger, SplitText);


export default function RevealText({ as: Tag = 'h2', children, className, scroll = true, delay = 0 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    let split;
    let alive = true;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) => {
          const tween = gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.12,
            delay,
           
            paused: !scroll,
            scrollTrigger: scroll
              ? { trigger: el, start: 'top 88%', once: true }
              : undefined,
          });
          if (!scroll) siteReady.then(() => alive && tween.play());
          return tween;
        },
      });
    });

    return () => {
      alive = false;
      mm.revert();
      split?.revert();
    };
  }, [children, scroll, delay]);

  return (
    <Tag ref={ref} className={className} key={children}>
      {children}
    </Tag>
  );
}

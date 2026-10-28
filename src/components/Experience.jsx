import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../content/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { CONTACTS } from '../config.js';
import RevealText from './RevealText.jsx';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { t } = useLanguage();
  const rootRef = useScrollReveal('.exp-row, .exp-actions', [t], 'rise');
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const hasActions = CONTACTS.cvPdf || CONTACTS.hh;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
     
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 65%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      
      const rows = gsap.utils.toArray('.exp-row', listRef.current);
      const triggers = rows.map((row) =>
        ScrollTrigger.create({
          trigger: row,
          start: 'top 62%',
          onEnter: () => row.classList.add('is-active'),
          onLeaveBack: () => row.classList.remove('is-active'),
        })
      );

      return () => {
        triggers.forEach((tr) => tr.kill());
        rows.forEach((row) => row.classList.remove('is-active'));
      };
    }, listRef);

    return () => mm.revert();
  }, [t]);

  return (
    <section id="experience" className="experience" ref={rootRef}>
      <div className="wrap">
        <RevealText as="h2">{t.experience.heading}</RevealText>

        <div className="exp-list" ref={listRef}>
          <div className="exp-rail" aria-hidden="true">
            <i ref={fillRef} />
          </div>

          {t.experience.items.map((job) => (
            <div className="exp-row" key={job.role + job.period}>
              <div className="exp-meta">
                <h3>{job.role}</h3>
                {job.company && <p>{job.company}</p>}
                <span className="mono">{job.period}</span>
              </div>
              <p className="exp-text">{job.text}</p>
            </div>
          ))}
        </div>

       
        {hasActions && (
          <div className="exp-actions">
            {t.experience.cv && CONTACTS.cvPdf && (
              <a href={CONTACTS.cvPdf} download className="btn-primary">
                {t.experience.cv}
              </a>
            )}
            {CONTACTS.hh && (
              <a href={CONTACTS.hh} target="_blank" rel="noreferrer" className="contact-secondary-link">
                {t.experience.hh}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

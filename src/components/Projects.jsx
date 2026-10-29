import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../content/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { stage } from '../three/stage.js';
import RevealText from './RevealText.jsx';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);


const HORIZONTAL = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';
const STACKED_REVEAL = '(max-width: 900px) and (prefers-reduced-motion: no-preference)';

export default function Projects() {
  const { t } = useLanguage();
 
  const rootRef = useScrollReveal('.project-card', [t], 'wipe', STACKED_REVEAL);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

   
    mm.add(
      HORIZONTAL,
      () => {
        const track = trackRef.current;
        const section = rootRef.current;
       
        const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`, 
              pin: true,                   
              scrub: 0.5,                    
              invalidateOnRefresh: true,    
              anticipatePin: 1,
              refreshPriority: 1,          
            },
          })
          .to(track, { x: () => -distance() }, 0)
          .to(barRef.current, { scaleX: 1 }, 0);
      },
      rootRef
    );

   
    mm.add(
      '(max-width: 900px)',
      () => {
        const cards = gsap.utils.toArray('.project-card');
        const triggers = cards.map((card, i) =>
          ScrollTrigger.create({
            trigger: card,
            start: 'top 62%',
            end: 'bottom 38%',
            onToggle: (self) => {
              if (self.isActive) stage.active = i;
              else if (stage.active === i) stage.active = -1;
            },
          })
        );
        return () => triggers.forEach((tr) => tr.kill());
      },
      rootRef
    );

    return () => {
      mm.revert();
      stage.active = -1;
    };
  }, [rootRef]);

  
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [t]);

  return (
    <section id="projects" className="projects" ref={rootRef}>
      <div className="wrap">
        <div className="projects-head">
          <RevealText as="h2">{t.projects.heading}</RevealText>
          <p>
            <span>{t.projects.subheading}</span>
          </p>
        </div>
      </div>

      <div className="project-grid" ref={trackRef}>
        {t.projects.items.map((project, i) => (
          <article
            className="project-card"
            key={project.id}
            onPointerEnter={(e) => e.pointerType === 'mouse' && (stage.active = i)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && (stage.active = -1)}
          >
            <div className="project-card-top">
              <span className="project-tag mono">{project.tag}</span>
              <h3>{project.name}</h3>
            </div>
            <p className="project-summary">{project.summary}</p>
            <div className="project-stack mono">{project.stack}</div>

            {project.links?.length > 0 && (
              <div className="project-links">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-umami-event="project_link"
                    data-umami-event-project={project.id}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className="project-progress" aria-hidden="true">
          <i ref={barRef} />
        </div>
      </div>
    </section>
  );
}

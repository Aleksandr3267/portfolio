import { useLanguage } from '../content/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import RevealText from './RevealText.jsx';
import './About.css';


const STACK = [
  'React', 'Vue', 'TypeScript', 'HTML/CSS/JS', 'WordPress', 'Elementor',
  'GSAP', 'Vite', 'SCSS', 'Figma', 'Git',
];

export default function About() {
  const { t } = useLanguage();
  const bodyRef = useScrollReveal('.about-body', [t], 'rise');
  const chipsRef = useScrollReveal('.stack-chip', [t], 'pop');

  return (
    <section id="about" className="about">
      <div className="wrap about-inner">
        <div ref={bodyRef}>
          <RevealText as="h2">{t.about.heading}</RevealText>
          <p className="about-body">
            <span>{t.about.body}</span>
          </p>
        </div>

        <div className="stack-list" ref={chipsRef}>
          {STACK.map((tech) => (
            <span className="stack-chip mono" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

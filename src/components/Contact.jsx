import { useLanguage } from '../content/LanguageContext.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { CONTACTS, NAME } from '../config.js';
import RevealText from './RevealText.jsx';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const rootRef = useScrollReveal('.contact-reveal', [t], 'rise');

  const links = [
    { label: 'Telegram', href: CONTACTS.telegram },
    { label: 'GitHub', href: CONTACTS.github },
    { label: t.contact.resume, href: CONTACTS.hh },
    { label: t.contact.cv, href: t.contact.cv ? CONTACTS.cvPdf : null },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="contact">
      <div className="wrap contact-inner" ref={rootRef}>
        <RevealText as="h2">{t.contact.heading}</RevealText>
        <p className="contact-reveal">
          <span>{t.contact.body}</span>
        </p>

        <div className="contact-reveal contact-links">
          <a href={`mailto:${CONTACTS.email}`} className="btn-primary">
            {t.contact.cta}
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="contact-secondary-link"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <span className="mono">© {new Date().getFullYear()} {NAME}</span>
      </footer>
    </section>
  );
}

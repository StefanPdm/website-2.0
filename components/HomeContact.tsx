'use client';

import { createContext, useContext, useId, useRef, useState, type ReactNode } from 'react';

import ContactForm from '@/components/ContactForm';

/**
 * Ein- und ausklappbarer Kontaktbereich der Startseite.
 *
 * Vorher lief das über `#root-contact:target` in CSS. Das hatte zwei Fehler:
 *
 *  1. Der Anker bleibt in der Adresszeile stehen. Nach einem Klick auf
 *     „Kontakt" war der Bereich bei jedem weiteren Aufruf der Seite sichtbar —
 *     die Startseite passte dann nicht mehr auf eine Bildschirmhöhe.
 *  2. `#root-contact:target` hat Spezifität 1,0,0 und schlägt
 *     `.contact-grid--hidden` (0,1,0) unabhängig von der Reihenfolge. Es gab
 *     also keine Möglichkeit, das per CSS wieder einzufangen.
 *
 * Jetzt hält React den Zustand: standardmäßig zu, bei jedem Seitenaufruf
 * wieder zu, per Klick auf und wieder zu. Die URL bleibt sauber.
 *
 * Trigger und Bereich stehen an weit auseinanderliegenden Stellen im Layout,
 * deshalb ein kleiner Context statt einer einzelnen Komponente.
 */

type ContactContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  sectionId: string;
};

const HomeContactContext = createContext<ContactContextValue | null>(null);

function useHomeContact() {
  const ctx = useContext(HomeContactContext);
  if (!ctx) throw new Error('HomeContact-Komponenten brauchen den HomeContactProvider');
  return ctx;
}

export function HomeContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionId = useId();

  const open = () => {
    setIsOpen(true);
    // Nach dem Einblenden scrollen und den ersten Eingabewert fokussieren.
    requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      section.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    });
  };

  const close = () => setIsOpen(false);

  return (
    <HomeContactContext.Provider value={{ isOpen, open, close, sectionId }}>
      <SectionRefContext.Provider value={sectionRef}>{children}</SectionRefContext.Provider>
    </HomeContactContext.Provider>
  );
}

const SectionRefContext = createContext<React.RefObject<HTMLElement | null> | null>(null);

/** Der „Kontakt"-Button im Kopfbereich. */
export function HomeContactTrigger({ className }: { className?: string }) {
  const { isOpen, open, close, sectionId } = useHomeContact();

  return (
    <button
      type='button'
      onClick={isOpen ? close : open}
      aria-expanded={isOpen}
      aria-controls={sectionId}
      className={className}>
      {isOpen ? 'Kontakt schließen' : 'Kontakt'}
    </button>
  );
}

/** Der Kontaktbereich selbst. */
export function HomeContactSection() {
  const { isOpen, close, sectionId } = useHomeContact();
  const sectionRef = useContext(SectionRefContext);

  if (!isOpen) return null;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className='landing-grid contact-grid pt-8'>
      <div className='landing-left'>
        <span className='landing-badge'>Kontakt</span>
        <h2 className='landing-title'>Lass uns sprechen.</h2>
        <p className='landing-subtitle'>
          Kurze Beschreibung reicht. Ich melde mich ehrlich zurück.
        </p>
        <div className='contact-points'>
          <div>Antwort i. d. R. innerhalb von 24–48 Stunden.</div>
          <div>Vertraulich. Persönlich. Ohne Umwege.</div>
        </div>
        <button
          type='button'
          onClick={close}
          className='landing-cta landing-cta--ghost mt-4 w-full sm:w-auto'>
          Schließen
        </button>
      </div>

      <div className='contact-card mt-16 px-4! md:mt-0 md:px-unset'>
        <h3 className='contact-title'>Nachricht senden</h3>
        <p className='contact-subtitle'>
          Erzähl mir kurz, worum es geht – Website, Coaching oder etwas anderes.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}

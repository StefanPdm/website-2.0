'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { PrimaryButton } from '@/app/nlp/components/Buttons';

type NlpHeaderProps = {
  isWarmTheme: boolean;
  onToggleTheme: () => void;
};

/**
 * Kopfzeile von Welt A.
 *
 * Der frühere Aufbau brach zwischen 1024 und ~1400 px: Logo mit Untertitel,
 * sechs Navigationspunkte, Theme-Umschalter und ein CTA mit „Gratis
 * Erstgespräch" brauchen zusammen rund 1200 px. Ab lg wurde trotzdem alles
 * gleichzeitig eingeblendet — die Labels sind zweizeilig umgebrochen und der
 * CTA aus dem Viewport gelaufen.
 *
 * Der Neuaufbau arbeitet mit einem Platzbudget statt mit einem einzigen
 * Umschaltpunkt. Was wieviel Platz kostet, wird gestaffelt freigegeben:
 *
 *   < lg   Logo-Icon + kompakter CTA + Menü-Button (Panel schaltet am
 *          selben Breakpoint — das war zuvor auseinandergelaufen)
 *   ≥ lg   volle Navigation, Theme-Umschalter als Icon, CTA „Erstgespräch"
 *   ≥ xl   zusätzlich Wortmarke mit Untertitel und der volle CTA-Text
 *
 * Jedes Label trägt `whitespace-nowrap`: Ein Umbruch in der Navigation ist
 * immer ein Fehler, nie ein akzeptabler Zustand.
 */

type NavItem = { label: string; section?: string; href?: string };

/**
 * Anker vor dem Aufklapp-Menü.
 *
 * Die Leiste trennt jetzt zwei Arten von Zielen, die vorher vermischt waren:
 * Anker scrollen auf der NLP-Startseite, eigene Seiten liegen im Menü
 * „Entdecken". Ein Klick tut dadurch immer das, was der Nutzer erwartet.
 */
const navBefore: NavItem[] = [{ label: 'Über mich', section: 'ueber' }];

/** Anker nach dem Aufklapp-Menü. */
const navAfter: NavItem[] = [
  { label: 'Preise', section: 'preise' },
  { label: 'Kontakt', section: 'kontakt' },
];

/**
 * Eigene Seiten, gebündelt hinter einem Punkt.
 *
 * Flach waren es zuletzt sieben Punkte — genau die Menge, an der die Leiste
 * schon einmal umgebrochen ist. Jede weitere Inhaltsseite kommt hier dazu,
 * nicht in die Hauptleiste.
 */
const discoverItems: { label: string; href: string; hint: string; match?: string }[] = [
  {
    label: 'Persönlichkeitstest',
    href: '/nlp/persoenlichkeitstest',
    hint: '18 Fragen, Auswertung sofort',
  },
  { label: 'Warum NLP wirkt', href: '/nlp/wissenschaft', hint: 'Der Forschungsstand 2026' },
  {
    label: '20 Regeln fürs Glücklichsein',
    href: '/nlp/regeln/gluecklichsein',
    // Beide Regelseiten zählen als dasselbe Ziel – sonst gilt das Menü auf
    // der Umkehrung als inaktiv, obwohl man mitten darin steht.
    match: '/nlp/regeln',
    hint: 'Und die ironische Umkehrung',
  },
];

/** Abschnitte, die für die aktive Markierung beobachtet werden. */
const spySections = ['start', 'nlp', 'erfuellung', 'preise', 'leitfaden', 'ueber', 'kontakt'];

/** Abonnement für useSyncExternalStore – außerhalb der Komponente, damit die
 *  Referenz stabil bleibt und React nicht bei jedem Render neu abonniert. */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

export default function NlpHeader({ isWarmTheme, onToggleTheme }: NlpHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // useSyncExternalStore statt Effekt: liest den Scrollstand direkt aus dem
  // Browser, ohne beim Mounten einen zusätzlichen Render auszulösen.
  const isScrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 24, () => false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const discoverButtonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const isNlpLanding = pathname === '/nlp';
  const sectionHref = (id: string) => (isNlpLanding ? `#${id}` : `/nlp#${id}`);

  // --- Aktiven Abschnitt markieren (nur auf der NLP-Startseite) ------------
  useEffect(() => {
    // Kein Zurücksetzen nötig: `isActive` wertet activeSection nur aus, wenn
    // wir auf der NLP-Startseite sind.
    if (!isNlpLanding) return;

    const elements = spySections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Der am weitesten oben sichtbare Abschnitt gewinnt.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      // Oberer Rand um die Kopfzeilenhöhe versetzt, damit der Abschnitt erst
      // als aktiv gilt, wenn er wirklich unter dem Header steht.
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isNlpLanding]);

  // --- Mobiles Menü: Escape, Klick nach außen, Scroll-Sperre ---------------
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // --- Aufklapp-Menü: Escape mit Fokus-Rückgabe, Klick nach außen ----------
  // Bewusst kein useModal: Das ist kein Dialog, sondern ein Menü. Eine
  // Fokus-Falle wäre hier falsch — Tab muss aus der Liste heraus in den Rest
  // der Kopfzeile führen können.
  useEffect(() => {
    if (!isDiscoverOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDiscoverOpen(false);
        discoverButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!discoverRef.current?.contains(event.target as Node)) setIsDiscoverOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isDiscoverOpen]);

  // Menü beim Routenwechsel schließen. Bewusst während des Renders statt im
  // Effekt – das ist Reacts empfohlenes Muster zum Zurücksetzen von State bei
  // geänderten Eingaben und erspart einen zusätzlichen Renderdurchlauf.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsMenuOpen(false);
    setIsDiscoverOpen(false);
  }

  const handleContactClick = () => {
    setIsMenuOpen(false);
    if (isNlpLanding) {
      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push('/nlp#kontakt');
    }
  };

  const isActive = (item: NavItem) => {
    if (item.href && item.href !== '/') return pathname.startsWith(item.href);
    if (item.section) return isNlpLanding && activeSection === item.section;
    return false;
  };

  const linkClass = (item: NavItem) =>
    [
      'relative whitespace-nowrap rounded-full px-2.5 py-2 transition-colors duration-200 xl:px-3',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
      isActive(item)
        ? 'text-(--text) bg-surface-strong'
        : 'text-(--muted) hover:text-(--text) hover:bg-surface',
    ].join(' ');

  const isDiscoverActive = discoverItems.some((item) =>
    pathname.startsWith(item.match ?? item.href),
  );

  const renderMobileLink = (item: NavItem) => (
    <Link
      key={item.label}
      href={item.href ?? sectionHref(item.section as string)}
      onClick={() => setIsMenuOpen(false)}
      aria-current={isActive(item) ? 'page' : undefined}
      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
        isActive(item)
          ? 'bg-surface text-(--text)'
          : 'text-(--muted) hover:bg-surface hover:text-(--text)'
      }`}>
      {item.label}
    </Link>
  );

  const renderNavLink = (item: NavItem) => (
    <Link
      key={item.label}
      href={item.href ?? sectionHref(item.section as string)}
      aria-current={isActive(item) ? 'page' : undefined}
      className={linkClass(item)}>
      {item.label}
      {isActive(item) && (
        <span
          aria-hidden='true'
          className='absolute inset-x-3 -bottom-0.5 h-px bg-linear-to-r from-accent to-accent-2'
        />
      )}
    </Link>
  );

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-border bg-surface-strong backdrop-blur-xl shadow-[0_10px_40px_var(--glow)]'
          : 'border-transparent bg-surface backdrop-blur-md'
      }`}>
      <div
        className={`mx-auto flex w-full max-w-[88rem] items-center gap-3 px-4 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3 hdr:py-4'
        }`}>
        {/* Marke */}
        <Link
          href='/nlp'
          aria-label='NLP Coaching – zur Startseite'
          className='flex shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
          <span
            className={`relative block shrink-0 transition-all duration-300 ${
              isScrolled ? 'h-10 w-10' : 'h-11 w-11 hdr:h-12 hdr:w-12'
            }`}>
            <Image
              src='/logos/logo-nlp.svg'
              alt=''
              fill
              sizes='48px'
              className='object-contain'
              priority
            />
          </span>
          <span className='hidden flex-col leading-tight sm:flex'>
            <span className='whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.12em] text-accent-soft xl:text-base xl:tracking-[0.18em]'>
              NLP Coaching
            </span>
            {/* Untertitel kostet ~150px – erst ab xl, wo der Platz da ist. */}
            <span className='hidden whitespace-nowrap text-xs tracking-wide text-(--muted) xl:block'>
              Wir lieben dein Problem
            </span>
          </span>
        </Link>

        {/* Navigation ab lg */}
        <nav
          aria-label='Hauptnavigation'
          className='mx-auto hidden items-center text-sm font-semibold hdr:flex hdr:gap-0.5 xl:gap-2'>
          {/*
            „Start" nur auf Unterseiten. Auf /nlp selbst wäre es ein Link auf
            die Seite, auf der man bereits steht — und nie als aktiv markiert,
            weil es ein Weg zurück ist, kein Ort.
          */}
          {!isNlpLanding && (
            <Link
              href='/nlp'
              className={linkClass({ label: 'Start' })}>
              Start
            </Link>
          )}

          {navBefore.map(renderNavLink)}

          {/* Aufklapp-Menü für die eigenen Seiten */}
          <div
            ref={discoverRef}
            className='relative'>
            <button
              ref={discoverButtonRef}
              type='button'
              onClick={() => setIsDiscoverOpen((prev) => !prev)}
              aria-expanded={isDiscoverOpen}
              aria-controls='nlp-discover'
              className={`${linkClass({ label: 'Entdecken' })} inline-flex cursor-pointer items-center gap-1 ${
                isDiscoverActive ? 'text-(--text) bg-surface-strong' : ''
              }`}>
              Entdecken
              <ChevronDown
                aria-hidden='true'
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isDiscoverOpen ? 'rotate-180' : ''
                }`}
              />
              {isDiscoverActive && (
                <span
                  aria-hidden='true'
                  className='absolute inset-x-3 -bottom-0.5 h-px bg-linear-to-r from-accent to-accent-2'
                />
              )}
            </button>

            <div
              id='nlp-discover'
              hidden={!isDiscoverOpen}
              className='absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 rounded-2xl border border-border bg-surface-strong p-2 shadow-[0_24px_70px_var(--glow)] backdrop-blur-xl'>
              <ul>
                {discoverItems.map((item) => {
                  const active = pathname.startsWith(item.match ?? item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsDiscoverOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`block rounded-xl px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          active ? 'bg-surface text-(--text)' : 'hover:bg-surface'
                        }`}>
                        <span className='block text-sm font-semibold text-(--text)'>
                          {item.label}
                        </span>
                        <span className='mt-0.5 block text-xs font-normal text-(--muted)'>
                          {item.hint}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {navAfter.map(renderNavLink)}
        </nav>

        {/* Aktionen */}
        <div className='ml-auto flex shrink-0 items-center gap-2 hdr:ml-0'>
          <button
            type='button'
            onClick={onToggleTheme}
            aria-pressed={isWarmTheme}
            aria-label={isWarmTheme ? 'Zum kühlen Design wechseln' : 'Zum warmen Design wechseln'}
            title={isWarmTheme ? 'Kühles Design' : 'Warmes Design'}
            className='hidden h-10 w-10 cursor-pointer place-items-center rounded-full border border-border bg-surface text-(--text) transition hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hdr:grid'>
            {isWarmTheme ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
          </button>

          <PrimaryButton
            href={sectionHref('kontakt')}
            onClick={handleContactClick}
            className='whitespace-nowrap px-4! py-2! text-xs! hdr:px-5! hdr:py-2.5! hdr:text-sm!'>
            {/* Kurzform bis xl, dort ist der volle Text zu breit. */}
            <span className='xl:hidden'>Erstgespräch</span>
            <span className='hidden xl:inline'>Gratis Erstgespräch</span>
          </PrimaryButton>

          <button
            ref={toggleRef}
            type='button'
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isMenuOpen}
            aria-controls='nlp-mobile-nav'
            className='grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border bg-surface text-(--text) transition hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hdr:hidden'>
            {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {/* Mobiles Panel – schaltet am selben Breakpoint wie der Menü-Button */}
      <div
        id='nlp-mobile-nav'
        ref={panelRef}
        hidden={!isMenuOpen}
        className='hdr:hidden'>
        <div className='mx-4 mb-4 rounded-2xl border border-border bg-surface-strong p-3 shadow-[0_20px_60px_var(--glow)] backdrop-blur-xl'>
          {/*
            Mobil bleibt „Entdecken" aufgeklappt: Platz ist hier kein Problem,
            und ein zweites Aufklappen innerhalb eines Aufklapp-Panels wäre
            eine Ebene zu viel.
          */}
          <nav
            aria-label='Hauptnavigation (mobil)'
            className='flex flex-col'>
            {!isNlpLanding && (
              <Link
                href='/nlp'
                onClick={() => setIsMenuOpen(false)}
                className='rounded-xl px-4 py-3 text-sm font-semibold text-(--muted) transition hover:bg-surface hover:text-(--text)'>
                Start
              </Link>
            )}

            {navBefore.map(renderMobileLink)}

            <p className='px-4 pt-4 pb-1 text-xs uppercase tracking-[0.2em] text-(--muted)'>
              Entdecken
            </p>
            {discoverItems.map((item) => {
              const active = pathname.startsWith(item.match ?? item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 transition ${
                    active ? 'bg-surface' : 'hover:bg-surface'
                  }`}>
                  <span className='block text-sm font-semibold text-(--text)'>{item.label}</span>
                  <span className='mt-0.5 block text-xs text-(--muted)'>{item.hint}</span>
                </Link>
              );
            })}

            <span
              aria-hidden='true'
              className='my-2 h-px bg-border'
            />

            {navAfter.map(renderMobileLink)}
          </nav>

          <div className='mt-3 border-t border-border pt-3'>
            <button
              type='button'
              onClick={onToggleTheme}
              aria-pressed={isWarmTheme}
              className='flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-(--muted) transition hover:bg-surface hover:text-(--text)'>
              <span>{isWarmTheme ? 'Kühles Design' : 'Warmes Design'}</span>
              {isWarmTheme ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
            </button>
            <PrimaryButton
              href={sectionHref('kontakt')}
              onClick={handleContactClick}
              className='mt-2 w-full'>
              Gratis Erstgespräch
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}

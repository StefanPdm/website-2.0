'use client';

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BatteryCharging,
  BookOpen,
  Briefcase,
  Castle,
  ChevronDown,
  Fingerprint,
  FlaskConical,
  Frown,
  Headphones,
  HeartHandshake,
  Landmark,
  type LucideIcon,
  Menu,
  MessageSquareQuote,
  Sigma,
  Smile,
  Sparkles,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { PrimaryButton } from '@/app/coaching/components/Buttons';

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
type DiscoverGroup = 'tests' | 'lesen' | 'fuer-dich' | 'regeln';
type DiscoverItem = {
  label: string;
  href: string;
  hint: string;
  Icon: LucideIcon;
  group: DiscoverGroup;
  match?: string;
};

const discoverItems: DiscoverItem[] = [
  {
    label: 'Persönlichkeitstest',
    href: '/coaching/persoenlichkeitstest',
    hint: '18 Fragen, Auswertung sofort',
    Icon: Fingerprint,
    group: 'tests',
  },
  {
    label: 'Glaubenssätze erkennen',
    href: '/coaching/glaubenssaetze',
    hint: '50 Sätze zum Antippen',
    Icon: MessageSquareQuote,
    group: 'tests',
  },
  {
    label: 'Partnerschaftstest',
    href: '/coaching/partnerschaftstest',
    hint: 'Lebenspartner oder Lebenslektion?',
    Icon: HeartHandshake,
    group: 'tests',
  },
  {
    label: 'Formel zum Glück',
    href: '/coaching/formel-zum-glueck',
    hint: 'Die S-L-A-C-Formel',
    Icon: Sigma,
    group: 'tests',
  },
  {
    label: 'Tägliche Impulse',
    href: '/coaching/impulse',
    hint: 'Gedanken aus dem WhatsApp-Status',
    Icon: Sparkles,
    group: 'lesen',
  },
  {
    label: 'Session-Podcast',
    href: '/coaching/session-podcast',
    hint: 'Dein Coaching zum Nachhören',
    Icon: Headphones,
    group: 'lesen',
  },
  {
    label: 'Bücher',
    href: '/coaching/buecher',
    hint: 'Was mich geprägt hat',
    Icon: BookOpen,
    group: 'lesen',
  },
  {
    label: 'Warum NLP wirkt',
    href: '/coaching/wissenschaft',
    hint: 'Der Forschungsstand 2026',
    Icon: FlaskConical,
    group: 'lesen',
  },
  {
    label: 'Coaching nach Burnout',
    href: '/coaching/burnout',
    hint: 'Der Weg danach – von einem, der dort war',
    Icon: BatteryCharging,
    group: 'fuer-dich',
  },
  {
    label: 'Mit eigener Firma',
    href: '/coaching/unternehmer',
    hint: 'Für Unternehmerinnen & Unternehmer',
    Icon: Briefcase,
    group: 'fuer-dich',
  },
  {
    label: 'Coaching in Potsdam',
    href: '/coaching/potsdam',
    hint: 'Vor Ort, im Gehen, online',
    Icon: Castle,
    group: 'fuer-dich',
  },
  {
    label: 'Coaching in Berlin',
    href: '/coaching/berlin',
    hint: 'Bei dir, online oder in Potsdam',
    Icon: Landmark,
    group: 'fuer-dich',
  },
  {
    label: '20 Regeln fürs Glücklichsein',
    href: '/coaching/regeln/gluecklichsein',
    hint: 'Was dich trägt',
    Icon: Smile,
    group: 'regeln',
  },
  {
    label: '20 Regeln fürs Unglücklichsein',
    href: '/coaching/regeln/ungluecklichsein',
    hint: 'Die ironische Umkehrung',
    Icon: Frown,
    group: 'regeln',
  },
];

/** Spalten des Entdecken-Panels (Desktop). Reihenfolge = Anzeige. */
const discoverColumns: { key: DiscoverGroup; title: string }[][] = [
  [{ key: 'tests', title: 'Selbst ausprobieren' }],
  [{ key: 'lesen', title: 'Lesen & Hören' }],
  [
    { key: 'fuer-dich', title: 'Für dich & vor Ort' },
    { key: 'regeln', title: 'Gedankenspiele' },
  ],
];

/** Abschnitte, die für die aktive Markierung beobachtet werden. */
const spySections = [
  'start',
  'erfuellung',
  'ansatz',
  'ablauf',
  'podcast',
  'preise',
  'ueber',
  'impulse',
  'leitfaden',
  'kontakt',
];

/** Abonnement für useSyncExternalStore – außerhalb der Komponente, damit die
 *  Referenz stabil bleibt und React nicht bei jedem Render neu abonniert. */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

export default function NlpHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // useSyncExternalStore statt Effekt: liest den Scrollstand direkt aus dem
  // Browser, ohne beim Mounten einen zusätzlichen Render auszulösen.
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);
  const discoverButtonRef = useRef<HTMLButtonElement>(null);
  // Hover öffnet „Entdecken“ (2026-11-14, nur Maus): kurze Schließ-Verzögerung,
  // damit der Zeiger die Lücke zwischen Button und Panel überqueren kann.
  const discoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const cancelDiscoverClose = () => {
    if (discoverCloseTimer.current) clearTimeout(discoverCloseTimer.current);
    discoverCloseTimer.current = null;
  };
  const onDiscoverPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    cancelDiscoverClose();
    if (!isDiscoverOpen) openedByHover.current = true;
    setIsDiscoverOpen(true);
  };
  const onDiscoverPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    cancelDiscoverClose();
    discoverCloseTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setIsDiscoverOpen(false);
    }, 220);
  };

  const pathname = usePathname();
  const router = useRouter();
  const isNlpLanding = pathname === '/coaching';
  const sectionHref = (id: string) => (isNlpLanding ? `#${id}` : `/coaching#${id}`);

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
      router.push('/coaching#kontakt');
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
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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
      className={`tone-dark fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-border backdrop-blur-xl shadow-[0_10px_40px_var(--glow)]'
          : 'border-transparent backdrop-blur-md'
      }`}>
      <div
        className={`mx-auto flex w-full max-w-[88rem] items-center gap-3 px-4 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-3 hdr:py-4'
        }`}>
        {/* Marke */}
        <Link
          href='/coaching'
          aria-label='Stefan Heinemann Coaching – zur Startseite'
          className='flex shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
          <span
            className={`relative block shrink-0 transition-all duration-300 ${
              isScrolled ? 'h-10 w-10' : 'h-11 w-11 hdr:h-12 hdr:w-12'
            }`}>
            <Image
              src='/logos/logo-zeichen.svg'
              alt=''
              fill
              sizes='48px'
              className='object-contain'
              priority
            />
          </span>
          <span className='hidden flex-col leading-tight sm:flex'>
            <span className='whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.12em] text-accent-soft xl:text-base xl:tracking-[0.18em]'>
              Stefan Heinemann{' '}
              {/* Helle, dünne Schrift trennt das Wort „Coaching“ sichtbar vom Namen. */}
              <span className='font-light text-(--text)'>Coaching</span>
            </span>
            {/* Untertitel kostet ~150px – erst ab xl, wo der Platz da ist. */}
            <span className='hidden whitespace-nowrap text-xs uppercase text-(--muted) xl:block'>
              Life Coaching · Potsdam &amp; Berlin
            </span>
          </span>
        </Link>

        {/* Navigation ab lg */}
        <nav
          aria-label='Hauptnavigation'
          className='mx-auto hidden items-center text-sm font-semibold hdr:flex hdr:gap-0.5 xl:gap-2'>
          {/*
            „Start" nur auf Unterseiten. Auf /coaching selbst wäre es ein Link auf
            die Seite, auf der man bereits steht — und nie als aktiv markiert,
            weil es ein Weg zurück ist, kein Ort.
          */}
          {!isNlpLanding && (
            <Link
              href='/coaching'
              className={linkClass({ label: 'Start' })}>
              Start
            </Link>
          )}

          {navBefore.map(renderNavLink)}

          {/* Aufklapp-Menü für die eigenen Seiten */}
          <div
            ref={discoverRef}
            onPointerEnter={onDiscoverPointerEnter}
            onPointerLeave={onDiscoverPointerLeave}
            className='relative'>
            <button
              ref={discoverButtonRef}
              type='button'
              onClick={() => {
                // Schon per Hover geöffnet: der erste Klick soll es nicht gleich wieder zuklappen.
                if (openedByHover.current) {
                  openedByHover.current = false;
                  setIsDiscoverOpen(true);
                  return;
                }
                setIsDiscoverOpen((prev) => !prev);
              }}
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

            {/*
              Entdecken-Panel (2026-11-14): drei Spalten mit Icon-Kacheln.
              Öffnen als Choreografie (.discover* in coaching.css): Panel klappt aus
              der Tiefe auf, eine Bernstein-Naht zieht oben von der Mitte nach außen,
              Spalten und Punkte laufen gestaffelt ein (--i). Schließen schnell, ohne
              Staffel. Bleibt gemountet; zu ist es per visibility unsichtbar und
              nicht fokussierbar.

              Fast deckender Hintergrund statt bg-surface-strong + backdrop-blur:
              Die Kopfzeile hat selbst schon backdrop-filter, ein verschachtelter
              wird vom Browser ignoriert.
            */}
            <div
              id='nlp-discover'
              data-open={isDiscoverOpen ? '' : undefined}
              aria-hidden={!isDiscoverOpen}
              className='discover absolute left-1/2 top-full z-60 w-[min(54rem,calc(100vw-2rem))] -translate-x-1/2 pt-3'>
              <div className='discover__panel relative max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border-strong bg-(--bg) p-3 shadow-[0_30px_90px_-20px_rgba(20,10,4,0.65),0_0_60px_var(--glow)]'>
                <span
                  aria-hidden='true'
                  className='discover__seam'
                />
                <span
                  aria-hidden='true'
                  className='discover__glow'
                />
                <div className='relative grid gap-2 md:grid-cols-3'>
                  {discoverColumns.map((column, columnIndex) => (
                    <div
                      key={column[0].key}
                      className='discover__col'>
                      {column.map((group, groupIndex) => {
                        const items = discoverItems.filter((item) => item.group === group.key);
                        const offset = discoverItems.findIndex((item) => item.group === group.key);
                        return (
                          <div
                            key={group.key}
                            className={groupIndex > 0 ? 'mt-2 border-t border-border pt-2' : ''}>
                            <p
                              className='discover__title px-3 pt-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-soft'
                              style={
                                {
                                  '--i': columnIndex + groupIndex * 2,
                                } as CSSProperties
                              }>
                              {group.title}
                            </p>
                            <ul>
                              {items.map((item, index) => {
                                const active = pathname.startsWith(item.match ?? item.href);
                                const { Icon } = item;
                                return (
                                  <li
                                    key={item.href}
                                    className='discover__item'
                                    style={{ '--i': offset + index } as CSSProperties}>
                                    <Link
                                      href={item.href}
                                      tabIndex={isDiscoverOpen ? undefined : -1}
                                      onClick={() => setIsDiscoverOpen(false)}
                                      aria-current={active ? 'page' : undefined}
                                      className={`discover__link flex items-center gap-3 rounded-2xl px-3 py-2.5 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                                        active
                                          ? 'is-active bg-surface'
                                          : 'hover:bg-surface focus-visible:bg-surface'
                                      }`}>
                                      <span
                                        aria-hidden='true'
                                        className='discover__icon grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent'>
                                        <Icon className='h-[18px] w-[18px]' />
                                      </span>
                                      <span className='min-w-0 flex-1'>
                                        <span className='block text-sm font-semibold leading-snug text-(--text)'>
                                          {item.label}
                                        </span>
                                        <span className='mt-0.5 block text-xs font-normal leading-snug text-(--muted)'>
                                          {item.hint}
                                        </span>
                                      </span>
                                      <ArrowRight
                                        aria-hidden='true'
                                        className='discover__arrow h-4 w-4 shrink-0 text-accent'
                                      />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {navAfter.map(renderNavLink)}
        </nav>

        {/* Aktionen */}
        <div className='ml-auto flex shrink-0 items-center gap-2 hdr:ml-0'>
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
        {/*
          Deckender Hintergrund – Begründung siehe Entdecken-Dropdown oben.
          Eigene Maximalhöhe + Scrollen: Solange das Menü offen ist, ist der
          Body gesperrt – ohne das wären die unteren Einträge unerreichbar.
        */}
        <div className='mx-4 mb-4 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border-strong bg-(--bg)/94 p-3 shadow-[0_20px_60px_var(--glow)]'>
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
                href='/coaching'
                onClick={() => setIsMenuOpen(false)}
                className='rounded-xl px-4 py-2.5 text-sm font-semibold text-(--muted) transition hover:bg-surface hover:text-(--text)'>
                Start
              </Link>
            )}

            {navBefore.map(renderMobileLink)}

            <p className='px-4 pt-3 pb-1 text-xs uppercase tracking-[0.2em] text-(--muted)'>
              Entdecken
            </p>
            {/* Ab sm zweispaltig mit Untertitel, darunter einspaltig ohne – sonst zu hoch */}
            <div className='flex flex-col sm:grid sm:grid-cols-2'>
              {discoverItems.map((item) => {
                const active = pathname.startsWith(item.match ?? item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition ${
                      active ? 'bg-surface' : 'hover:bg-surface'
                    }`}>
                    <item.Icon
                      aria-hidden='true'
                      className='h-4 w-4 shrink-0 text-accent'
                    />
                    <span className='min-w-0'>
                      <span className='block text-sm font-semibold text-(--text)'>
                        {item.label}
                      </span>
                      <span className='mt-0.5 hidden text-xs text-(--muted) sm:block'>
                        {item.hint}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <span
              aria-hidden='true'
              className='my-2 h-px bg-border'
            />

            {navAfter.map(renderMobileLink)}
          </nav>

          <div className='mt-3 border-t border-border pt-3'>
            <PrimaryButton
              href={sectionHref('kontakt')}
              onClick={handleContactClick}
              className='w-full'>
              Gratis Erstgespräch
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}

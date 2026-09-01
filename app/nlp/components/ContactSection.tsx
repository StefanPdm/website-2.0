'use client';

import ContactFormNlp from '@/components/ContactFormNlp';

export default function ContactSection() {
  return (
    <section
      id='kontakt'
      className='relative border-t border-(--border) py-16 sm:py-24 lg:py-28'>
      <div className='container px-4 mx-auto'>
        {/*
          `minmax(0, …)` statt `1.1fr` und `min-w-0` an beiden Spalten:
          Grid-Items haben standardmäßig `min-width: auto` und können damit
          nicht unter die Mindestbreite ihres breitesten Kindes schrumpfen.
          Ein <select> übernimmt als Mindestbreite die längste Option — das
          hat den Abschnitt unter ~490 px über den Viewport hinausgeschoben.
        */}
        <div className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
          <div className='min-w-0'>
            <p className='text-xs uppercase tracking-[0.3em] text-[#7DE3FF]'>Kontakt</p>
            <h2 className='mt-4 text-3xl font-semibold text-white sm:text-4xl'>
              Dein nächster Schritt
            </h2>
            <p className='mt-4 text-base text-white/70 sm:text-lg'>
              Schreib mir, wenn du Klarheit willst: kurze Sessions, intensive Workshops oder ein
              kompletter Transformationsprozess. Ich antworte persönlich innerhalb von 48 Stunden.
            </p>
            <div className='mt-6 space-y-3 text-sm text-white/70'>
              {[
                'Individuelle 1:1 Begleitung mit Fokus auf Entscheidungsklarheit.',
                'Workshops für Teams & Führungskräfte – praxisnah und messbar.',
                'NLP-Tools, die du sofort im Alltag anwenden kannst.',
              ].map((item) => (
                <div
                  key={item}
                  className='rounded-2xl border border-(--border) bg-white/5 p-4'>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className='min-w-0 rounded-3xl border border-(--border) bg-white/5 p-4 shadow-[0_30px_80px_rgba(0,229,255,0.25)]'>
            <ContactFormNlp />
          </div>
        </div>
      </div>
    </section>
  );
}

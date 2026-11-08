import { Sparkles } from 'lucide-react';

/**
 * Sichtbare Kennzeichnung für KI-generierte Personen- und Ortsbilder
 * (EU AI Act Art. 50: erkennbar spätestens beim Ansehen). Sitzt im
 * `relative`-Rahmen des Bildes; Position per `className`.
 * Nicht für Stefans echte Fotos und nicht für die WhatsApp-Impulse.
 *
 * Feste Farben statt Tokens: Die Plakette liegt auf dem Foto, nicht auf dem
 * Seitengrund – sie muss auf hellen wie dunklen Bildstellen gleich lesbar sein.
 */
export default function AiBadge({ className = 'bottom-3 right-3' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-[rgba(20,10,4,0.62)] px-2.5 py-1 text-xs font-medium text-[#fbefdf] ring-1 ring-[rgba(255,220,180,0.28)] backdrop-blur-sm ${className}`}>
      <Sparkles
        aria-hidden='true'
        className='h-3.5 w-3.5 text-[#f6b35a]'
      />
      KI-Bild
    </span>
  );
}

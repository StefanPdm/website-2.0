'use client';

import { useCallback } from 'react';

type ContactRevealButtonProps = {
  targetId: string;
  className?: string;
  label?: string;
};

export default function ContactRevealButton({
  targetId,
  className,
  label = 'Kontakt',
}: ContactRevealButtonProps) {
  const handleClick = useCallback(() => {
    const section = document.getElementById(targetId);
    if (section) {
      section.classList.remove('contact-grid--hidden');
      requestAnimationFrame(() => {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const firstInput = section.querySelector('input[name="name"]') as HTMLInputElement | null;
          firstInput?.focus();
        }, 60);
      });
    }
  }, [targetId]);

  return (
    <button
      type='button'
      className={className}
      onClick={handleClick}>
      {label}
    </button>
  );
}

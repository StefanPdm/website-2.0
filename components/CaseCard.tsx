'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

type Props = {
  title: string;
  status: string;
  image?: string;
  video?: string; // optional: show a video instead of image
  href?: string;
  cta?: string;
};

export default function CaseCard({
  title,
  status,
  image,
  video,
  href,
  cta = 'Nicht öffentlich',
}: Props) {
  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
  const isRemoteImage = typeof image === 'string' && /^https?:\/\//i.test(image);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [transform, setTransform] = useState<string>(
    'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
  );

  function handlePointerMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1;
    const max = 8; // deg
    const rx = -py * max; // invert so up moves negative
    const ry = px * max;
    const next = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setTransform(next));
  }

  function handlePointerLeave() {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  return (
    <div className='border border-white/10 rounded-2xl p-4 md:p-8 transition-shadow duration-300 hover:shadow-[0_60px_160px_-60px_rgba(45,212,191,.55),_0_0_44px_0_rgba(45,212,191,.28)]'>
      {/* Media Container */}
      <div
        ref={tiltRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className='group relative overflow-hidden rounded-2xl bg-neutral-900/60 will-change-transform'
        style={{ transform, transition: 'transform 300ms ease' }}>
        {/* Hover Glow */}
        <div
          aria-hidden
          className='pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen'
          style={{
            background:
              'radial-gradient(70% 90% at 50% 40%, rgba(45,212,191,0.75), transparent 65%), radial-gradient(50% 70% at 20% 10%, rgba(45,212,191,0.5), transparent 62%), radial-gradient(50% 70% at 85% 85%, rgba(45,212,191,0.45), transparent 62%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Image or Video */}
        <div className='relative h-52 md:h-[20.8rem] w-full'>
          {video ? (
            <video
              className='h-full w-full object-cover object-top'
              src={video}
              muted
              loop
              autoPlay
              playsInline
              controls={false}
              poster={image}
            />
          ) : image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes='(min-width: 768px) 50vw, 100vw'
              className='object-cover object-top'
              priority={false}
              quality={100}
              unoptimized={isRemoteImage}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-sm text-white/70'>
              Kein Bild/Video vorhanden
            </div>
          )}
        </div>
      </div>
      {/* Info bar */}
      <div className='flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md w-full md:w-[80%] mx-auto relative z-10 mt-4'>
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold text-white'>{title}</p>
          <p className='truncate text-xs font-medium text-sky-200/90'>{status}</p>
        </div>
        {href ? (
          isExternal ? (
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-sm transition-none hover:opacity-90'>
              {cta}
            </a>
          ) : (
            <Link
              href={href}
              className='ml-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-sm transition-none hover:opacity-90'>
              {cta}
            </Link>
          )
        ) : (
          <div className='ml-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-sm opacity-50'>
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}

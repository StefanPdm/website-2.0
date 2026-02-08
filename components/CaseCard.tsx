import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  status: string;
  image: string;
  href?: string;
  cta?: string;
};

export default function CaseCard({ title, status, image, href, cta = 'ansehen' }: Props) {
  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
  const isRemoteImage = typeof image === 'string' && /^https?:\/\//i.test(image);

  return (
    <div className='border border-white/10 rounded-2xl p-8'>
      {/* Image Container */}
      <div className='group relative  overflow-hidden rounded-2xl  bg-neutral-900/60'>
        {/* Image */}
        <div className='relative h-[20.8rem] w-full'>
          <Image
            src={image}
            alt={title}
            fill
            sizes='(min-width: 768px) 50vw, 100vw'
            className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
            priority={false}
            quality={100}
            unoptimized={isRemoteImage}
          />
        </div>
      </div>
      {/* Info bar */}
      <div className='flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md w-[80%] mx-auto relative z-10 mt-4'>
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
          <div className='ml-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-sm opacity-70'>
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}

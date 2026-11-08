import { getImageProps } from 'next/image';

type Source = { src: string; width: number; height: number };

/**
 * Hero-Foto mit Bildwahl je Format (Art Direction): ab lg (1024 px) das Querformat,
 * darunter das Hochformat. Über getImageProps von next/image – der Browser
 * lädt nur die passende Fassung, beide optimiert. Für das LCP-Bild einer
 * Route `priority` setzen (§12: höchstens eines je Route).
 */
export default function HeroPicture({
  wide,
  tall,
  alt,
  className,
  priority = false,
}: {
  wide: Source;
  tall: Source;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const common = { alt, sizes: '100vw', quality: 75, priority };
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, ...wide });
  const {
    props: { srcSet: tallSet, ...rest },
  } = getImageProps({ ...common, ...tall });

  return (
    <picture>
      <source
        media='(min-width: 1024px)'
        srcSet={wideSet}
      />
      <source
        media='(max-width: 1023px)'
        srcSet={tallSet}
      />
      <img
        {...rest}
        alt={alt}
        className={className}
        style={{ width: '100%', height: '100%' }}
      />
    </picture>
  );
}

import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * <img> that degrades gracefully: if a remote image fails to load, a neutral
 * placeholder is shown instead of a broken-image icon.
 */
export const SafeImage: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & { fallbackClassName?: string }
> = ({ src, alt, className, fallbackClassName, ...rest }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-stone-900 text-stone-600 ${fallbackClassName ?? className ?? ''}`}
        aria-label={alt}
        role="img"
      >
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

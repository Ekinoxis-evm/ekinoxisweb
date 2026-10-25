'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/** Seconds before the clip's end where the video hands over to the still. */
const HANDOFF = 1.2;

/**
 * The home hero's equinox: the camera glides out of the dark toward the line of
 * light, once, then the clip fades away and leaves the still horizon behind the
 * headline. The still is always underneath, so a slow network, a blocked
 * autoplay or prefers-reduced-motion all land on the same resting frame.
 */
export default function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettled(true);
      return;
    }
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration - HANDOFF) setSettled(true);
    };
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', () => setSettled(true));
    void v.play().catch(() => setSettled(true));
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <Image
        src="/media/hero/horizon-still.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_50%]"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover object-[65%_50%] transition-opacity duration-[1200ms] [transition-timing-function:var(--ease-settle)] ${
          settled ? 'opacity-0' : 'opacity-100'
        }`}
        muted
        playsInline
        preload="auto"
        poster="/media/hero/horizon-still.webp"
      >
        <source src="/media/hero/horizon.webm" type="video/webm" />
        <source src="/media/hero/horizon.mp4" type="video/mp4" />
      </video>
      {/* Headline side stays dark; the bottom melts into the page */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/0" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}

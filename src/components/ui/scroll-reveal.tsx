'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
}

/**
 * Lightweight scroll reveal component using IntersectionObserver.
 * Zero overhead — observer disconnects after element is revealed.
 * Only uses compositor-safe properties: opacity + transform.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.01,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately show if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('sr-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay and trigger reveal
          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('sr-revealed');
            }, delay);
          } else {
            el.classList.add('sr-revealed');
          }
          // Disconnect immediately — no need to keep observing
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '100px 0px 0px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const directionClass =
    direction === 'up'    ? 'sr-up' :
    direction === 'down'  ? 'sr-down' :
    direction === 'left'  ? 'sr-left' :
    direction === 'right' ? 'sr-right' :
    'sr-fade';

  return (
    <div ref={ref} className={`sr-hidden ${directionClass} ${className}`}>
      {children}
    </div>
  );
}

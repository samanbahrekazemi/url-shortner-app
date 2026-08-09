"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 800, className }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevValue.current;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);
    prevValue.current = value;

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return <span className={className}>{display.toLocaleString()}</span>;
}

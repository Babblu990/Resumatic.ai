
'use client';

import React, { useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function InteractiveBackground({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
    }, 1000); // Corresponds to animation duration
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary/30 via-background to-accent/30"
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
}

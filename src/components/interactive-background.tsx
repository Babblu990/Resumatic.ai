
'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface InteractiveBackgroundProps {
    children: React.ReactNode;
    score?: number | null; // Score from 0 to 100
}

export function InteractiveBackground({ children, score = 50 }: InteractiveBackgroundProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent creating ripples on interactive elements like buttons
    if ((e.target as HTMLElement).closest('button, a, input, textarea, [role="button"]')) {
      return;
    }

    const newRipple: Ripple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples(prevRipples => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
    }, 2000); // Corresponds to animation duration
  }, []);

  const backgroundStyle = useMemo(() => {
    const lightness = score === null ? 50 : 10 + (score / 100) * 85; // Map score 0-100 to lightness 10%-95%
    const fromColor = `hsl(var(--primary) / ${Math.max(0, 0.4 - (score ?? 50) / 250)})`;
    const toColor = `hsl(var(--accent) / ${Math.max(0, 0.4 - (score ?? 50) / 250)})`;
    
    return {
        '--dynamic-background': `hsl(211 30% ${lightness}%)`,
        '--dynamic-from-color': fromColor,
        '--dynamic-to-color': toColor,
    } as React.CSSProperties
  }, [score])


  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[--dynamic-background] transition-colors duration-1000 ease-in-out"
      onClick={handleClick}
      style={backgroundStyle}
    >
       <div className="absolute inset-0 bg-gradient-to-br from-[--dynamic-from-color] via-transparent to-[--dynamic-to-color] transition-opacity duration-1000" />
      <div className="relative z-10">
        {children}
      </div>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect z-0"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
}

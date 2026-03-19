import { cn } from './ui/Button';
import { useState } from 'react';

export function Logo({ className }: { className?: string }) {
  const [imgSrc, setImgSrc] = useState<string | null>('/logo.png');

  if (imgSrc) {
    return (
      <img 
        src={imgSrc} 
        alt="Bee Fluent Logo" 
        className={cn("w-auto h-10 object-contain", className)}
        onError={() => {
          if (imgSrc === '/logo.png') setImgSrc('/logo.jpg');
          else setImgSrc(null);
        }}
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 200 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("w-auto h-10", className)}
    >
      <defs>
        <linearGradient id="wingGradL" x1="90" y1="70" x2="20" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#FF9F1C" />
        </linearGradient>
        <linearGradient id="wingGradR" x1="110" y1="70" x2="180" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#FF9F1C" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="100" y1="30" x2="100" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2B2D42" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FF9F1C" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Wings with shadow */}
      <g filter="url(#shadow)">
        {/* Left Wing */}
        <path d="M 90 75 C 40 25, 0 65, 30 105 C 50 130, 80 110, 90 85 Z" fill="url(#wingGradL)" />
        {/* Right Wing */}
        <path d="M 110 75 C 160 25, 200 65, 170 105 C 150 130, 120 110, 110 85 Z" fill="url(#wingGradR)" />
      </g>

      {/* Wing Accents (Inner wings for depth) */}
      <path d="M 85 80 C 50 45, 25 70, 45 100 C 60 115, 80 100, 85 85 Z" fill="#FFFFFF" opacity="0.3" />
      <path d="M 115 80 C 150 45, 175 70, 155 100 C 140 115, 120 100, 115 85 Z" fill="#FFFFFF" opacity="0.3" />

      {/* Elegant B and F */}
      <text 
        x="52" 
        y="84" 
        textAnchor="middle" 
        dominantBaseline="central" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="44" 
        fontWeight="800" 
        fill="#FFFFFF" 
        opacity="0.95" 
        transform="rotate(-12 52 84)"
      >
        B
      </text>
      <text 
        x="148" 
        y="84" 
        textAnchor="middle" 
        dominantBaseline="central" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="44" 
        fontWeight="800" 
        fill="#FFFFFF" 
        opacity="0.95" 
        transform="rotate(12 148 84)"
      >
        F
      </text>

      {/* Bee Body */}
      <rect x="86" y="45" width="28" height="75" rx="14" fill="url(#bodyGrad)" />
      
      {/* Body Highlights for 3D effect */}
      <rect x="88" y="50" width="4" height="65" rx="2" fill="#FFFFFF" opacity="0.15" />
      
      {/* Body Stripes (Sleek yellow curves) */}
      <path d="M 86 62 Q 100 68 114 62 L 114 68 Q 100 74 86 68 Z" fill="#FFD166" />
      <path d="M 86 82 Q 100 88 114 82 L 114 88 Q 100 94 86 88 Z" fill="#FFD166" />
      <path d="M 86 102 Q 100 108 114 102 L 114 108 Q 100 114 86 108 Z" fill="#FFD166" />

      {/* Head */}
      <circle cx="100" cy="32" r="14" fill="url(#bodyGrad)" />
      <circle cx="96" cy="28" r="3" fill="#FFFFFF" opacity="0.2" />

      {/* Antennae */}
      <path d="M 94 22 C 88 12, 78 12, 78 12" stroke="#2B2D42" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 106 22 C 112 12, 122 12, 122 12" stroke="#2B2D42" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Antennae dots */}
      <circle cx="78" cy="12" r="3.5" fill="#FF9F1C" />
      <circle cx="122" cy="12" r="3.5" fill="#FF9F1C" />

      {/* Stinger */}
      <path d="M 96 118 L 100 134 L 104 118 Z" fill="#141414" />
    </svg>
  );
}

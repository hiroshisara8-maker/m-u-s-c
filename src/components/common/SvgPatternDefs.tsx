import React from 'react';

export const SvgPatternDefs: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
      <defs>
        {/* Red: Diagonal stripes ///// */}
        <pattern id="pat-diagonal-stripe" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="3" />
        </pattern>

        {/* Orange: Reverse diagonal stripes \\\\\ */}
        <pattern id="pat-reverse-stripe" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="3" />
        </pattern>

        {/* Yellow: Crosshatch xxxxx */}
        <pattern id="pat-crosshatch" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="12" y2="12" stroke="currentColor" strokeWidth="2.2" />
          <line x1="12" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="2.2" />
        </pattern>

        {/* Green: Dots ••••• */}
        <pattern id="pat-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2.2" fill="currentColor" />
        </pattern>

        {/* Cyan: Grid boxes ⊞⊞⊞⊞ */}
        <pattern id="pat-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </pattern>

        {/* Blue: Solid blocks / Brick grid ████ */}
        <pattern id="pat-solid-blocks" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="7" height="7" fill="currentColor" opacity="0.85" />
          <rect x="7" y="7" width="7" height="7" fill="currentColor" opacity="0.85" />
        </pattern>

        {/* Purple: Diamonds / Stars ✦✦✦✦ */}
        <pattern id="pat-diamonds" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 7 1 L 13 7 L 7 13 L 1 7 Z" fill="currentColor" />
        </pattern>

        {/* Pink: Hearts / Rings ♡♡♡♡ */}
        <pattern id="pat-hearts" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        </pattern>

        {/* Brown: Waves ≈≈≈≈ */}
        <pattern id="pat-waves" width="16" height="8" patternUnits="userSpaceOnUse">
          <path d="M 0 4 Q 4 0, 8 4 T 16 4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </pattern>

        {/* Gray: Dashed lines ----- */}
        <pattern id="pat-dashed" width="12" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="2.2" />
        </pattern>

        {/* Black: Stipple dense mesh */}
        <pattern id="pat-solid-dark" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="3" height="3" fill="currentColor" opacity="0.9" />
          <rect x="3" y="3" width="3" height="3" fill="currentColor" opacity="0.9" />
        </pattern>

        {/* White: Hollow square border */}
        <pattern id="pat-solid-light" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
    </svg>
  );
};

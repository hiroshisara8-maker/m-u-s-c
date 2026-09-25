import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const sloganSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`inline-flex items-center gap-3 select-none group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Custom CHROMA X Icon: X + Eye + Color Spectrum */}
      <div
        className={`relative shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1A1F2C] to-[#0D111A] border border-purple-500/30 shadow-[0_0_15px_rgba(157,78,221,0.25)] ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00FF87" />
            </linearGradient>
            <linearGradient id="neonGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF3366" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Diagonal 1 of X with spectrum dots */}
          <path
            d="M 18 18 L 82 82"
            stroke="url(#neonGradient1)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Diagonal 2 of X */}
          <path
            d="M 82 18 L 18 82"
            stroke="url(#neonGradient2)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Center Eye Contour */}
          <path
            d="M 32 50 C 40 38, 60 38, 68 50 C 60 62, 40 62, 32 50 Z"
            fill="#08090D"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />

          {/* Eye Iris / Retina Spectrum Ring */}
          <circle cx="50" cy="50" r="8" fill="url(#neonGradient1)" />
          {/* Eye Pupil */}
          <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />

          {/* Color Spectrum Accents */}
          <circle cx="24" cy="24" r="2.5" fill="#A855F7" />
          <circle cx="76" cy="24" r="2.5" fill="#FF3366" />
          <circle cx="24" cy="76" r="2.5" fill="#EAB308" />
          <circle cx="76" cy="76" r="2.5" fill="#00FF87" />
        </svg>

        {/* Glow pulsing ring */}
        <div className="absolute -inset-0.5 rounded-xl bg-purple-500/20 blur-[6px] -z-10 group-hover:bg-purple-500/35 transition-colors" />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-wider text-white font-sans ${titleSizes[size]}`}
          >
            CHROMA
          </span>
          <span
            className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 ${titleSizes[size]}`}
          >
            X
          </span>
        </div>
        {showSlogan && (
          <span
            className={`font-semibold tracking-[0.22em] text-[#00F0FF] uppercase mt-1 leading-none ${sloganSizes[size]}`}
          >
            SEE BEYOND COLOR
          </span>
        )}
      </div>
    </div>
  );
};

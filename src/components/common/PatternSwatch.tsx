import React from 'react';
import { ColorData } from '../../types';
import { useApp } from '../../context/AppContext';

interface PatternSwatchProps {
  color: ColorData;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSymbol?: boolean;
  showHex?: boolean;
  showName?: boolean;
  forcePattern?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PatternSwatch: React.FC<PatternSwatchProps> = ({
  color,
  size = 'md',
  showSymbol = true,
  showHex = false,
  showName = false,
  forcePattern = false,
  className = '',
  onClick,
}) => {
  const { settings } = useApp();
  const isPatternActive = forcePattern || settings.patternMode;

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-[10px]',
    md: 'w-12 h-12 rounded-xl text-xs',
    lg: 'w-16 h-16 rounded-2xl text-sm',
    xl: 'w-24 h-24 rounded-2xl text-base',
  };

  const patternId = `pat-${color.pattern.patternType}`;
  // High contrast stroke color over the background
  const strokeColor = color.isDarkTextPreferred ? '#000000' : '#FFFFFF';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative inline-flex flex-col items-center justify-center shrink-0 border border-white/15 overflow-hidden transition-all duration-200 select-none ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 hover:border-purple-400/80 shadow-md' : ''
      } ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: color.hex }}
      title={`${color.nameVi} (${color.hex}) - Ký hiệu: ${color.pattern.symbol}`}
    >
      {/* Pattern Overlay */}
      {isPatternActive && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-difference"
          style={{ color: '#FFFFFF' }}
        >
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      )}

      {/* Symbol Badge */}
      {showSymbol && (
        <span
          className={`relative z-10 px-1 py-0.5 rounded font-mono font-bold tracking-widest text-center shadow-xs backdrop-blur-[2px] ${
            color.isDarkTextPreferred
              ? 'text-black bg-white/70'
              : 'text-white bg-black/60'
          }`}
          style={{
            fontSize: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px',
          }}
        >
          {color.pattern.symbol}
        </span>
      )}

      {/* Optional Hex */}
      {showHex && (
        <span
          className={`relative z-10 font-mono text-[9px] font-semibold mt-0.5 ${
            color.isDarkTextPreferred ? 'text-black' : 'text-white'
          }`}
        >
          {color.hex}
        </span>
      )}

      {/* Optional Name */}
      {showName && (
        <span
          className={`relative z-10 text-[10px] font-medium truncate max-w-full px-1 ${
            color.isDarkTextPreferred ? 'text-black' : 'text-white'
          }`}
        >
          {color.nameVi}
        </span>
      )}
    </div>
  );
};

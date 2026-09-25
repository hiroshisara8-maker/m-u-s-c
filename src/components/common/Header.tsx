import React from 'react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from './navConfig';
import { Logo } from './Logo';
import { Layers, Volume2, VolumeX, Eye } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentTab, setCurrentTab, settings, togglePatternMode, updateSettings } = useApp();
  const currentNav = NAV_ITEMS.find((n) => n.id === currentTab) || NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-20 w-full bg-[#08090D]/90 backdrop-blur-md border-b border-[#1B202C] px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Left side: Mobile logo or active section title on Desktop */}
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Logo onClick={() => setCurrentTab('home')} size="sm" showSlogan={false} />
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#11141B] border border-gray-800 flex items-center justify-center text-lg shadow-inner">
            {currentNav.iconChar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-wide">
                {currentNav.labelVi}
              </h1>
              <span className="text-xs font-mono text-gray-400">
                / {currentNav.labelEn}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              CHROMA X Accessibility Suite
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Global quick switches */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Pattern Mode Quick Button */}
        <button
          onClick={togglePatternMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            settings.patternMode
              ? 'bg-purple-600/25 border border-purple-500/50 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
              : 'bg-[#121622] border border-gray-800 text-gray-400 hover:text-white'
          }`}
          title="Bật/Tắt chế độ hoa văn ký hiệu cho mọi màu sắc"
          aria-label="Chế độ hoa văn Pattern Mode"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Pattern:</span>
          <span className="font-mono font-bold text-[11px]">
            {settings.patternMode ? 'BẬT' : 'TẮT'}
          </span>
        </button>

        {/* Audio Speech Quick Button */}
        <button
          onClick={() =>
            updateSettings({ audioDescription: !settings.audioDescription })
          }
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            settings.audioDescription
              ? 'bg-cyan-600/25 border border-cyan-500/50 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              : 'bg-[#121622] border border-gray-800 text-gray-400 hover:text-white'
          }`}
          title="Bật/Tắt đọc thông tin màu bằng giọng nói"
          aria-label="Giọng nói mô tả màu Audio Voice"
        >
          {settings.audioDescription ? (
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-gray-500" />
          )}
          <span className="hidden sm:inline">Voice:</span>
          <span className="font-mono font-bold text-[11px]">
            {settings.audioDescription ? 'BẬT' : 'TẮT'}
          </span>
        </button>

        {/* Quick link to Vision Simulator */}
        {currentTab !== 'vision-sim' && (
          <button
            onClick={() => setCurrentTab('vision-sim')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121622] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span>Thử mô phỏng</span>
          </button>
        )}
      </div>
    </header>
  );
};

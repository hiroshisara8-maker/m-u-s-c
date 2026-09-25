import React from 'react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from './navConfig';
import { Logo } from './Logo';
import { Layers, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, settings, togglePatternMode, updateSettings } = useApp();

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0 bg-[#0C0E14] border-r border-[#1B202C] z-30 select-none">
      {/* Header Logo */}
      <div className="p-5 border-b border-[#1B202C]/80">
        <Logo onClick={() => setCurrentTab('home')} size="md" />
      </div>

      {/* Quick Global Action Switches */}
      <div className="p-3 mx-3 my-2 rounded-xl bg-[#11141B] border border-[#1F2535] space-y-2">
        {/* Pattern Mode Toggle */}
        <button
          onClick={togglePatternMode}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            settings.patternMode
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
              : 'bg-[#181C26] text-gray-400 hover:text-gray-200 border border-transparent'
          }`}
          title="Chuyển đổi hiển thị hoa văn cho màu sắc"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Pattern Mode</span>
          </div>
          <span
            className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
              settings.patternMode
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {settings.patternMode ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Audio Description Quick Toggle */}
        <button
          onClick={() =>
            updateSettings({ audioDescription: !settings.audioDescription })
          }
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
            settings.audioDescription
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-[#181C26] text-gray-400 hover:text-gray-200 border border-transparent'
          }`}
          title="Tự động đọc tên và thông tin màu khi chọn"
        >
          <div className="flex items-center gap-2">
            {settings.audioDescription ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
            <span>Audio Voice</span>
          </div>
          <span
            className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
              settings.audioDescription
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {settings.audioDescription ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
        <div className="px-3 py-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase font-mono">
          Chức năng chính
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-transparent text-white border-l-4 border-purple-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#131722]'
              }`}
            >
              {/* Emoji icon char + lucide */}
              <span className="text-base shrink-0 group-hover:scale-110 transition-transform">
                {item.iconChar}
              </span>
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />

              <div className="flex-1 min-w-0">
                <p className={`truncate ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                  {item.labelVi}
                </p>
              </div>

              {item.badge && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#1B202C]/80 bg-[#090B10]">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="truncate">Hỗ trợ thị giác màu toàn diện</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-1 font-mono">
          Phiên bản 2.5 • Chuẩn WCAG 2.1
        </p>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from './navConfig';
import { Home, Camera, Layers, TrafficCone, MoreHorizontal, X } from 'lucide-react';
import { TabType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const primaryItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-5 h-5" /> },
    { id: 'scanner', label: 'Quét màu', icon: <Camera className="w-5 h-5" /> },
    { id: 'compare', label: 'So sánh', icon: <Layers className="w-5 h-5" /> },
    { id: 'traffic', label: 'Giao thông', icon: <TrafficCone className="w-5 h-5" /> },
  ];

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Modal for "More" */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsMoreOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 bg-[#11141B] border-t border-purple-500/30 rounded-t-3xl max-h-[80vh] flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <span className="font-bold text-white text-base">Tất cả chức năng</span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-lg bg-gray-800/80 text-gray-300 hover:text-white"
                aria-label="Đóng danh mục"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-4 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = currentTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-[#161B26] border-gray-800/80 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <span className="text-xl">{item.iconChar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">{item.labelVi}</p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{item.labelEn}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav
        aria-label="Điều hướng dưới cùng"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0C0E14]/95 border-t border-[#1C2230] backdrop-blur-lg px-2 py-1.5 flex items-center justify-around safe-area-bottom"
      >
        {primaryItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-cyan-500/15 shadow-[0_0_12px_rgba(0,240,255,0.25)]' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
            isMoreOpen || !primaryItems.some((p) => p.id === currentTab)
              ? 'text-purple-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          aria-label="Xem thêm chức năng"
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              !primaryItems.some((p) => p.id === currentTab)
                ? 'bg-purple-500/15 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                : ''
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Thêm nữa</span>
        </button>
      </nav>
    </>
  );
};

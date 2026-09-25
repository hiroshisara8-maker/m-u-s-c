import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings as SettingsIcon,
  Type,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { AppSettings } from '../../types';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, showToast } = useApp();

  const handleReset = () => {
    const defaultSettings: AppSettings = {
      fontSize: 'md',
      highContrast: false,
      reducedMotion: false,
      patternMode: true,
      audioDescription: true,
      soundEffects: true,
      speechLanguage: 'vi',
      theme: 'dark',
    };
    updateSettings(defaultSettings);
    showToast({
      type: 'info',
      title: 'ĐÃ KHÔI PHỤC',
      message: 'Các thiết lập đã trở về mặc định ban đầu.',
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          <span>Cài đặt hệ thống – Settings</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Tùy biến kích thước hiển thị, độ tương phản và phương thức trợ năng theo nhu cầu cá nhân.
          Tất cả dữ liệu được lưu cục bộ an toàn trên thiết bị của bạn.
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Kích thước chữ (Font Size) */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <Type className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Kích thước phông chữ (Text Size)</h3>
              <p className="text-xs text-gray-400">Điều chỉnh độ lớn văn bản để dễ đọc nhất</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { id: 'sm', label: 'Nhỏ', size: '14px' },
              { id: 'md', label: 'Vừa (Mặc định)', size: '16px' },
              { id: 'lg', label: 'Lớn', size: '18px' },
              { id: 'xl', label: 'Rất lớn', size: '20px' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => updateSettings({ fontSize: f.id as AppSettings['fontSize'] })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  settings.fontSize === f.id
                    ? 'bg-purple-600/25 border-purple-500 text-white font-bold shadow-sm'
                    : 'bg-[#0E1118] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <span className="block text-xs">{f.label}</span>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5">{f.size}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Trợ năng thị giác: Tương phản cao & Giảm chuyển động */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Trợ năng thị giác (Visual Accessibility)</h3>
              <p className="text-xs text-gray-400">Tối ưu hóa độ sắc nét và giảm mỏi mắt</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {/* High Contrast */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D14] border border-gray-800">
              <div>
                <span className="text-xs font-bold text-white block">Chế độ độ tương phản cao (High Contrast)</span>
                <span className="text-[11px] text-gray-400">Tăng độ dày đường viền và tương phản sáng tối đạt chuẩn WCAG AAA</span>
              </div>
              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.highContrast ? 'bg-cyan-500' : 'bg-gray-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D14] border border-gray-800">
              <div>
                <span className="text-xs font-bold text-white block">Giảm hiệu ứng chuyển động (Reduced Motion)</span>
                <span className="text-[11px] text-gray-400">Tắt các hiệu ứng động mượt mà để chống chóng mặt</span>
              </div>
              <button
                onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.reducedMotion ? 'bg-purple-500' : 'bg-gray-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Chế độ hoa văn Pattern Mode */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-yellow-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Chế độ hoa văn ký hiệu (Pattern Mode)</h3>
                <p className="text-xs text-gray-400">Tự động gắn mã hoa văn /////, •••••, █████ cho mọi mẫu màu</p>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ patternMode: !settings.patternMode })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.patternMode ? 'bg-yellow-500' : 'bg-gray-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.patternMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. Âm thanh & Giọng đọc */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Âm thanh & Giọng nói (Audio & Speech)</h3>
              <p className="text-xs text-gray-400">Đọc tự động thông tin màu sắc và hiệu ứng phản hồi</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {/* Auto Speech */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D14] border border-gray-800">
              <div>
                <span className="text-xs font-bold text-white block">Tự động đọc màu khi chạm (Audio Description)</span>
                <span className="text-[11px] text-gray-400">Phát giọng đọc tên màu, độ sáng và bão hòa ngay khi chọn điểm trên ảnh</span>
              </div>
              <button
                onClick={() => updateSettings({ audioDescription: !settings.audioDescription })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.audioDescription ? 'bg-emerald-500' : 'bg-gray-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.audioDescription ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound FX Tone */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D14] border border-gray-800">
              <div>
                <span className="text-xs font-bold text-white block">Âm tần số mô phỏng (Sound Effects)</span>
                <span className="text-[11px] text-gray-400">Phát âm tần cao cho màu sáng, trầm cho màu tối và tín hiệu giao thông</span>
              </div>
              <button
                onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.soundEffects ? 'bg-emerald-500' : 'bg-gray-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.soundEffects ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0D14] border border-gray-800">
              <span className="text-xs font-bold text-white">Ngôn ngữ giọng đọc (Voice Language)</span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSettings({ speechLanguage: 'vi' })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    settings.speechLanguage === 'vi'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => updateSettings({ speechLanguage: 'en' })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    settings.speechLanguage === 'en'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Giao diện (Theme Selection) */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Chủ đề giao diện (Appearance)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'dark', label: '🖤 Cyber Dark', desc: 'Đen than #08090D & Tím neon' },
              { id: 'contrast', label: '◼️ Midnight Contrast', desc: 'Đen tuyệt đối & Viền sáng' },
              { id: 'neon', label: '🟣 Neon Pulse', desc: 'Sáng tạo sắc nét hiện đại' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => updateSettings({ theme: t.id as AppSettings['theme'] })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  settings.theme === t.id
                    ? 'bg-purple-600/25 border-purple-500 text-white font-bold shadow-sm'
                    : 'bg-[#0E1118] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold block">{t.label}</span>
                <span className="text-[10px] text-gray-500 block mt-0.5">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Local Storage & Reset */}
        <div className="p-4 rounded-xl bg-[#0E1118] border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Đã lưu vào bộ nhớ trình duyệt (LocalStorage)</span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục cài đặt gốc</span>
          </button>
        </div>
      </div>
    </div>
  );
};

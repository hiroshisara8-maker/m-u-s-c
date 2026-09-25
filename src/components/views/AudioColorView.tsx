import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeColor } from '../../utils/colorUtils';
import { playColorTone, speakColorDescription } from '../../utils/audioUtils';
import { PatternSwatch } from '../common/PatternSwatch';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Headphones,
  Sliders,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

const AUDIO_PALETTES = [
  { name: 'Xanh dương đậm (Dark Blue)', hex: '#243B64' },
  { name: 'Đỏ tươi (Bright Red)', hex: '#EF4444' },
  { name: 'Vàng rực rỡ (Bright Yellow)', hex: '#FACC15' },
  { name: 'Xanh lục bảo (Emerald Green)', hex: '#16A34A' },
  { name: 'Tím than (Dark Purple)', hex: '#581C87' },
  { name: 'Cam san hô (Coral Orange)', hex: '#FB923C' },
  { name: 'Hồng sen (Hot Pink)', hex: '#EC4899' },
  { name: 'Trắng tuyết (Snow White)', hex: '#F8FAFC' },
  { name: 'Đen than (Charcoal Black)', hex: '#11141B' },
  { name: 'Xanh lơ cyan (Pure Cyan)', hex: '#06B6D4' },
  { name: 'Nâu cà phê (Coffee Brown)', hex: '#78350F' },
  { name: 'Xám khói (Medium Gray)', hex: '#6B7280' },
];

export const AudioColorView: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [selectedHex, setSelectedHex] = useState('#243B64');
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState('');

  const colorData = analyzeColor(selectedHex);

  const handlePlayAudio = async (hexToPlay: string = selectedHex) => {
    setSelectedHex(hexToPlay);
    const color = analyzeColor(hexToPlay);
    setIsPlaying(true);

    // Play synthesized acoustic tone
    if (settings.soundEffects) {
      playColorTone(color);
    }

    // Set transcript matching prompt requirements
    const viText = `${color.nameVi}. Độ sáng ${color.brightnessLevel.toLowerCase()}. Độ bão hòa ${color.saturationLevel.toLowerCase()}.`;
    const enText = `${color.nameEn}. ${color.brightnessLevelEn.toLowerCase()} brightness. ${color.saturationLevelEn.toLowerCase()} saturation.`;
    setLastSpokenText(settings.speechLanguage === 'vi' ? viText : enText);

    // Web Speech API
    await speakColorDescription(color, settings.speechLanguage);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-violet-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🔊</span>
          <span>Đọc màu bằng âm thanh – Audio Color</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Hệ thống âm thanh đa kênh: Đọc tên màu, độ sáng và độ bão hòa bằng giọng đọc trình duyệt,
          đồng thời phát tần số âm thanh mô phỏng độ sáng và quang phổ màu.
        </p>
      </div>

      {/* Main Player & Interactive Soundboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visualizer & Active Audio Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#11141B] border-2 border-purple-500/30 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Glow line */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: colorData.hex }}
            />

            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                  Mô phỏng âm thanh đang chọn
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase">
                {settings.speechLanguage === 'vi' ? 'Tiếng Việt' : 'English Voice'}
              </span>
            </div>

            {/* Big Swatch & Names */}
            <div className="flex items-center gap-4">
              <PatternSwatch color={colorData} size="xl" showSymbol={true} />
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-2xl font-black text-white">{colorData.nameVi}</h3>
                <p className="text-sm font-semibold text-gray-400 font-mono">
                  {colorData.nameEn} • {colorData.hex}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-300 pt-1">
                  <span>Độ sáng: {colorData.brightnessLevel}</span>
                  <span>·</span>
                  <span>Bão hòa: {colorData.saturationLevel}</span>
                </div>
              </div>
            </div>

            {/* Audio Waveform Simulation Animation */}
            <div className="p-4 rounded-2xl bg-[#090B10] border border-gray-800 flex items-center justify-center gap-1.5 h-20">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 transition-all duration-150 ${
                    isPlaying
                      ? 'animate-pulse'
                      : 'opacity-40'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(12, Math.sin(i * 0.5) * 45 + 25)}px`
                      : `${Math.max(8, (i % 5) * 8 + 10)}px`,
                  }}
                />
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handlePlayAudio(selectedHex)}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:brightness-110 active:scale-95 transition-all"
            >
              <Volume2 className="w-5 h-5 text-cyan-300" />
              <span>Phát giọng đọc & Tần số âm thanh</span>
            </button>

            {/* Textual Transcript Fallback (Strictly matching prompt requirement) */}
            <div className="p-4 rounded-xl bg-[#0C0F17] border border-gray-800 space-y-1.5">
              <span className="text-[10px] text-gray-400 uppercase font-mono block">
                Nội dung giọng đọc hiển thị bằng chữ (Transcript):
              </span>
              <p className="text-xs font-bold text-white font-mono leading-relaxed">
                “{lastSpokenText || `${colorData.nameVi}. Độ sáng ${colorData.brightnessLevel.toLowerCase()}. Độ bão hòa ${colorData.saturationLevel.toLowerCase()}.`}”
              </p>
              <p className="text-[11px] text-gray-400 italic">
                * Hiển thị chữ đầy đủ phục vụ người dùng có khiếm thính hoặc khi thiết bị tắt âm.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Audio Palette Soundboard & Settings */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl bg-[#11141B] border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 uppercase">
                Bảng phím âm thanh màu sắc (Soundboard)
              </span>
              <span className="text-[11px] text-gray-400">Chạm để nghe lập tức</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {AUDIO_PALETTES.map((item) => {
                const isSelected = selectedHex.toLowerCase() === item.hex.toLowerCase();
                const color = analyzeColor(item.hex);

                return (
                  <button
                    key={item.hex}
                    onClick={() => handlePlayAudio(item.hex)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 group ${
                      isSelected
                        ? 'bg-purple-600/20 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                        : 'bg-[#0E1118] border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 border border-white/20 shadow-sm"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate group-hover:text-cyan-300">
                        {color.nameVi}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">{color.hex}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Voice Language Switcher */}
          <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
            <span className="text-xs font-mono font-bold text-gray-300 uppercase block">
              Tùy chỉnh giọng đọc và hiệu ứng
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateSettings({ speechLanguage: 'vi' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  settings.speechLanguage === 'vi'
                    ? 'bg-cyan-600/20 border-cyan-500 text-white font-bold'
                    : 'bg-[#141824] border-gray-800 text-gray-400'
                }`}
              >
                <span className="text-xs block">🇻🇳 Tiếng Việt</span>
                <span className="text-[10px] opacity-75">Ví dụ: “Xanh dương thẫm...”</span>
              </button>

              <button
                onClick={() => updateSettings({ speechLanguage: 'en' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  settings.speechLanguage === 'en'
                    ? 'bg-cyan-600/20 border-cyan-500 text-white font-bold'
                    : 'bg-[#141824] border-gray-800 text-gray-400'
                }`}
              >
                <span className="text-xs block">🇺🇸 English</span>
                <span className="text-[10px] opacity-75">e.g. “Dark blue. Low brightness...”</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

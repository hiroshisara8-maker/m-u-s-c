import React, { useState } from 'react';
import { analyzeColor, analyzeComparison, simulateColorHex } from '../../utils/colorUtils';
import { PatternSwatch } from '../common/PatternSwatch';
import { ColorVisionDeficiency } from '../../types';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRightLeft,
  Eye,
} from 'lucide-react';

const PRESET_PAIRS = [
  { name: 'Đỏ vs Xanh lục (Nguy cơ Protan/Deutan)', c1: '#DC2626', c2: '#16A34A' },
  { name: 'Xanh dương vs Tím (Khó phân biệt sắc đỏ)', c1: '#2563EB', c2: '#9333EA' },
  { name: 'Xanh lá vs Nâu đất (Luminance gần bằng nhau)', c1: '#15803D', c2: '#78350F' },
  { name: 'Xanh navy vs Đen than (Độ sáng cực thấp)', c1: '#0F172A', c2: '#11141B' },
  { name: 'Xanh dương vs Xanh cyan (Tritanopia test)', c1: '#3B82F6', c2: '#06B6D4' },
  { name: 'Vàng vs Xanh chuối sáng', c1: '#EAB308', c2: '#84CC16' },
];

export const CompareView: React.FC = () => {
  const [hex1, setHex1] = useState('#DC2626');
  const [hex2, setHex2] = useState('#16A34A');

  const color1 = analyzeColor(hex1);
  const color2 = analyzeColor(hex2);

  const analysis = analyzeComparison(color1, color2);

  const swapColors = () => {
    const temp = hex1;
    setHex1(hex2);
    setHex2(temp);
  };

  const simModes: { id: ColorVisionDeficiency; label: string; desc: string }[] = [
    { id: 'normal', label: 'Bình thường', desc: 'Thị giác chuẩn 3 loại tế bào nón' },
    { id: 'protanopia', label: 'Protanopia', desc: 'Mù màu đỏ (thiếu thụ thể L)' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Mù màu xanh lục (thiếu thụ thể M)' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'Mù màu xanh lam (thiếu thụ thể S)' },
    { id: 'grayscale', label: 'Grayscale', desc: 'Thang độ xám / Mù màu hoàn toàn' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🎨</span>
          <span>So sánh màu – Color Compare</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Chọn hai màu để phân tích độ tương phản, mức chênh lệch và đánh giá nguy cơ gây nhầm lẫn
          cho các dạng khiếm khuyết thị giác màu.
        </p>
      </div>

      {/* Preset quick test pairs */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-gray-400 uppercase">
          Thử nhanh các cặp màu thực tế thường gặp
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESET_PAIRS.map((pair, idx) => (
            <button
              key={idx}
              onClick={() => {
                setHex1(pair.c1);
                setHex2(pair.c2);
              }}
              className="p-2.5 rounded-xl bg-[#11141B] border border-gray-800 hover:border-purple-400/60 transition-all text-left group"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: pair.c1 }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: pair.c2 }}
                />
              </div>
              <p className="text-[11px] font-semibold text-gray-300 group-hover:text-white line-clamp-2">
                {pair.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Two Color Pickers & Swap */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Color 1 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">
              Màu thứ nhất (A)
            </span>
            <input
              type="color"
              value={color1.hex}
              onChange={(e) => setHex1(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              aria-label="Chọn màu thứ nhất"
            />
          </div>

          <div className="flex items-center gap-4">
            <PatternSwatch color={color1} size="lg" showSymbol={true} />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">{color1.nameVi}</h3>
              <p className="text-xs text-gray-400 font-mono">{color1.nameEn}</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={hex1}
                  onChange={(e) => setHex1(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-[#08090D] border border-gray-700 text-xs font-mono text-white w-24 uppercase"
                />
                <span className="text-[11px] text-gray-400 font-mono">
                  RGB({color1.rgb.r}, {color1.rgb.g}, {color1.rgb.b})
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-800">
            <div className="p-2 rounded-lg bg-[#0B0E14]">
              <span className="text-[10px] text-gray-400 uppercase block">Độ sáng</span>
              <span className="font-bold text-white">
                {color1.brightnessLevel} ({color1.brightnessPercent}%)
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#0B0E14]">
              <span className="text-[10px] text-gray-400 uppercase block">Độ bão hòa</span>
              <span className="font-bold text-white">
                {color1.saturationLevel} ({color1.saturationPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Swap button */}
        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={swapColors}
            className="p-3 rounded-full bg-[#181D2A] hover:bg-purple-600/30 border border-gray-700 hover:border-purple-400 text-gray-300 hover:text-white transition-all shadow-lg active:scale-95"
            title="Đổi vị trí 2 màu"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Color 2 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Màu thứ hai (B)
            </span>
            <input
              type="color"
              value={color2.hex}
              onChange={(e) => setHex2(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              aria-label="Chọn màu thứ hai"
            />
          </div>

          <div className="flex items-center gap-4">
            <PatternSwatch color={color2} size="lg" showSymbol={true} />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white truncate">{color2.nameVi}</h3>
              <p className="text-xs text-gray-400 font-mono">{color2.nameEn}</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={hex2}
                  onChange={(e) => setHex2(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-[#08090D] border border-gray-700 text-xs font-mono text-white w-24 uppercase"
                />
                <span className="text-[11px] text-gray-400 font-mono">
                  RGB({color2.rgb.r}, {color2.rgb.g}, {color2.rgb.b})
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-800">
            <div className="p-2 rounded-lg bg-[#0B0E14]">
              <span className="text-[10px] text-gray-400 uppercase block">Độ sáng</span>
              <span className="font-bold text-white">
                {color2.brightnessLevel} ({color2.brightnessPercent}%)
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#0B0E14]">
              <span className="text-[10px] text-gray-400 uppercase block">Độ bão hòa</span>
              <span className="font-bold text-white">
                {color2.saturationLevel} ({color2.saturationPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contrast & Metric Analysis Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Contrast Ratio */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-2">
          <span className="text-xs font-mono font-bold text-gray-400 uppercase block">
            Tỷ lệ tương phản (Contrast Ratio)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {analysis.contrastRatio}:1
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                analysis.isAccessibleAA
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {analysis.contrastRating}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {analysis.isAccessibleAA
              ? 'Đạt tiêu chuẩn WCAG 2.1 AA cho nội dung văn bản thông thường.'
              : 'Dưới chuẩn 4.5:1. Cần tăng độ chênh lệch sáng để người xem đọc dễ dàng.'}
          </p>
        </div>

        {/* Text over Background Legibility Preview */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-2">
          <span className="text-xs font-mono font-bold text-gray-400 uppercase block">
            Mẫu hiển thị lồng nhau
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="p-3 rounded-xl text-center font-bold text-xs flex flex-col justify-center items-center shadow-inner"
              style={{ backgroundColor: color1.hex, color: color2.hex }}
            >
              <span>Văn bản B</span>
              <span className="text-[10px] font-mono opacity-80">trên nền A</span>
            </div>
            <div
              className="p-3 rounded-xl text-center font-bold text-xs flex flex-col justify-center items-center shadow-inner"
              style={{ backgroundColor: color2.hex, color: color1.hex }}
            >
              <span>Văn bản A</span>
              <span className="text-[10px] font-mono opacity-80">trên nền B</span>
            </div>
          </div>
        </div>

        {/* Quick Delta metrics */}
        <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-2">
          <span className="text-xs font-mono font-bold text-gray-400 uppercase block">
            Chênh lệch thông số
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-[#0C0F17]">
              <span className="text-[10px] text-gray-400 block font-mono">Độ lệch sáng (ΔL)</span>
              <span className="font-bold text-white">{analysis.lightnessDelta}%</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0C0F17]">
              <span className="text-[10px] text-gray-400 block font-mono">Độ lệch góc sắc (ΔH)</span>
              <span className="font-bold text-white">{analysis.hueDelta}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Blindness Confusion Alerts */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>⚠️</span>
          <span>Phân tích cảnh báo thị giác màu</span>
        </h3>

        <div className="space-y-3">
          {analysis.confusionAlerts.map((alert, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                alert.type === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                  : alert.type === 'info'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200'
                  : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
              }`}
            >
              {alert.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              ) : alert.type === 'info' ? (
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                <p className="text-xs leading-relaxed opacity-90">{alert.messageVi}</p>
                <p className="text-[11px] leading-relaxed opacity-75 font-mono">
                  {alert.messageEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nuanced Disclaimer as strictly required */}
        <p className="text-[11px] text-gray-400 italic">
          * Lưu ý: Mức độ nhạy cảm và nhận biết màu sắc có thể khác nhau tùy theo mức độ khiếm khuyết
          của từng cá nhân (mù màu nhẹ, trung bình hoặc hoàn toàn). Hệ thống không khẳng định tuyệt
          đối rằng tất cả người mù màu đều nhìn hai màu này giống nhau hoàn toàn.
        </p>
      </div>

      {/* Side-by-side Vision Deficiency Simulation Matrix */}
      <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">
              Cặp màu này trông như thế nào dưới các dạng thị giác?
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">5 Dạng mô phỏng</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {simModes.map((sim) => {
            const simHex1 = simulateColorHex(color1.hex, sim.id);
            const simHex2 = simulateColorHex(color2.hex, sim.id);

            return (
              <div
                key={sim.id}
                className="p-3 rounded-xl bg-[#0B0D13] border border-gray-800/80 space-y-2.5"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{sim.label}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{sim.desc}</p>
                </div>

                {/* Swatches side by side */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 h-12 rounded-lg border border-white/10 shadow-inner flex items-center justify-center font-mono text-[10px] font-bold text-white drop-shadow"
                    style={{ backgroundColor: simHex1 }}
                  >
                    A
                  </div>
                  <div
                    className="flex-1 h-12 rounded-lg border border-white/10 shadow-inner flex items-center justify-center font-mono text-[10px] font-bold text-white drop-shadow"
                    style={{ backgroundColor: simHex2 }}
                  >
                    B
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>{simHex1}</span>
                  <span>{simHex2}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

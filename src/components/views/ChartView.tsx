import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeColor } from '../../utils/colorUtils';
import { PatternSwatch } from '../common/PatternSwatch';
import { ColorData } from '../../types';
import {
  BarChart3,
  PieChart as PieIcon,
  Upload,
  Check,
  Eye,
  Sliders,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';

interface ChartSegment {
  id: string;
  name: string;
  value: number;
  hex: string;
  patternType: string;
  symbol: string;
}

const SAMPLE_DATA: ChartSegment[] = [
  { id: '1', name: 'Kênh Online', value: 42, hex: '#EF4444', patternType: 'pat-diagonal-stripe', symbol: '/////' },
  { id: '2', name: 'Đại lý phân phối', value: 28, hex: '#22C55E', patternType: 'pat-dots', symbol: '•••••' },
  { id: '3', name: 'Bán lẻ trực tiếp', value: 18, hex: '#3B82F6', patternType: 'pat-solid-blocks', symbol: '█████' },
  { id: '4', name: 'Đối tác doanh nghiệp', value: 12, hex: '#EAB308', patternType: 'pat-crosshatch', symbol: 'xxxxx' },
];

export const ChartView: React.FC = () => {
  const { addRecentColor } = useApp();

  // Layer toggles required by prompt: "Có thể bật/tắt tên, pattern, giá trị và màu sắc."
  const [showPattern, setShowPattern] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showValues, setShowValues] = useState(true);
  const [colorMode, setColorMode] = useState<'color' | 'grayscale'>('color');

  const [chartType, setChartType] = useState<'bar' | 'donut'>('bar');
  const [uploadedChart, setUploadedChart] = useState<string | null>(null);
  const [sampledColor, setSampledColor] = useState<ColorData | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setUploadedChart(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChartImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 600;
    canvas.height = img.naturalHeight || 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const rect = img.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = Math.max(0, Math.min(canvas.width - 1, Math.floor((e.clientX - rect.left) * scaleX)));
      const y = Math.max(0, Math.min(canvas.height - 1, Math.floor((e.clientY - rect.top) * scaleY)));

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const clamp = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0').toUpperCase();
      const hex = `#${clamp(pixel[0])}${clamp(pixel[1])}${clamp(pixel[2])}`;

      const analyzed = analyzeColor(hex);
      setSampledColor(analyzed);
      addRecentColor(analyzed);
    } catch (err) {
      console.warn('Chart pixel sample failed:', err);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-cyan-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📊</span>
          <span>Hỗ trợ đọc biểu đồ – Chart Mode</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Chuyển hóa biểu đồ phức tạp sang định dạng đa chiều kết hợp <strong>Màu sắc</strong>,{' '}
          <strong>Ký tự hoa văn Pattern</strong> và <strong>Nhãn trực tiếp</strong> để người mù
          màu không phải đoán màu huyền thoại từ thanh chú giải (legend).
        </p>
      </div>

      {/* Layer Control Panel */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono font-bold text-gray-300 uppercase">
            Bảng điều khiển các lớp hiển thị (Layer Controls)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                chartType === 'bar' ? 'bg-cyan-600 text-white' : 'bg-[#181D2A] text-gray-400'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Biểu đồ cột</span>
            </button>
            <button
              onClick={() => setChartType('donut')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                chartType === 'donut' ? 'bg-cyan-600 text-white' : 'bg-[#181D2A] text-gray-400'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>Biểu đồ tròn (Donut)</span>
            </button>
          </div>
        </div>

        {/* 4 Required Toggle Switches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-800">
          {/* 1. Pattern Toggle */}
          <button
            onClick={() => setShowPattern(!showPattern)}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              showPattern
                ? 'bg-purple-600/20 border-purple-500 text-white'
                : 'bg-[#141824] border-gray-800 text-gray-400'
            }`}
          >
            <div>
              <span className="text-xs font-bold block">1. Hoa văn (Pattern)</span>
              <span className="text-[10px] opacity-75">Ký hiệu sọc, chấm, ô</span>
            </div>
            <span className="font-mono text-xs font-bold">{showPattern ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* 2. Labels Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              showLabels
                ? 'bg-cyan-600/20 border-cyan-500 text-white'
                : 'bg-[#141824] border-gray-800 text-gray-400'
            }`}
          >
            <div>
              <span className="text-xs font-bold block">2. Tên phân mục</span>
              <span className="text-[10px] opacity-75">Gắn trực tiếp vào cột</span>
            </div>
            <span className="font-mono text-xs font-bold">{showLabels ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* 3. Values Toggle */}
          <button
            onClick={() => setShowValues(!showValues)}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              showValues
                ? 'bg-emerald-600/20 border-emerald-500 text-white'
                : 'bg-[#141824] border-gray-800 text-gray-400'
            }`}
          >
            <div>
              <span className="text-xs font-bold block">3. Giá trị số liệu</span>
              <span className="text-[10px] opacity-75">Tỷ lệ % hiển thị</span>
            </div>
            <span className="font-mono text-xs font-bold">{showValues ? 'BẬT' : 'TẮT'}</span>
          </button>

          {/* 4. Color / Monochrome Toggle */}
          <button
            onClick={() => setColorMode(colorMode === 'color' ? 'grayscale' : 'color')}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              colorMode === 'color'
                ? 'bg-amber-600/20 border-amber-500 text-white'
                : 'bg-gray-800/80 border-gray-600 text-gray-200'
            }`}
          >
            <div>
              <span className="text-xs font-bold block">4. Màu sắc</span>
              <span className="text-[10px] opacity-75">
                {colorMode === 'color' ? 'Màu quang phổ' : 'Thang độ xám'}
              </span>
            </div>
            <span className="font-mono text-xs font-bold">
              {colorMode === 'color' ? 'MÀU' : 'XÁM'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Interactive Accessible Chart Display */}
      <div className="p-6 rounded-3xl bg-[#0B0D13] border border-gray-800 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Báo cáo phân bổ kênh doanh thu năm 2026
            </h3>
            <p className="text-xs text-gray-400">
              Biểu đồ trực quan hóa dữ liệu có hỗ trợ khả năng tiếp cận chuẩn WCAG
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {colorMode === 'grayscale' ? 'Chế độ tương phản đơn sắc' : 'Chế độ màu chuẩn'}
          </span>
        </div>

        {/* BAR CHART VIEW */}
        {chartType === 'bar' && (
          <div className="space-y-4 py-4">
            {SAMPLE_DATA.map((item) => {
              const barColor = colorMode === 'grayscale' ? '#4B5563' : item.hex;
              return (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {showPattern && (
                        <span className="font-mono font-bold text-cyan-300 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px]">
                          {item.symbol}
                        </span>
                      )}
                      {showLabels ? (
                        <span className="font-bold text-white">{item.name}</span>
                      ) : (
                        <span className="text-gray-500">[Tên bị ẩn]</span>
                      )}
                    </div>

                    {showValues && (
                      <span className="font-mono font-bold text-white">{item.value}%</span>
                    )}
                  </div>

                  {/* Accessible Bar with SVG Pattern */}
                  <div className="relative w-full h-9 rounded-xl overflow-hidden bg-gray-900 border border-white/10 shadow-inner">
                    <div
                      className="h-full relative transition-all duration-500 rounded-lg flex items-center px-3"
                      style={{
                        width: `${item.value * 2}%`,
                        backgroundColor: barColor,
                      }}
                    >
                      {/* Pattern overlay */}
                      {showPattern && (
                        <svg className="absolute inset-0 w-full h-full opacity-45 mix-blend-difference pointer-events-none">
                          <rect width="100%" height="100%" fill={`url(#${item.patternType})`} />
                        </svg>
                      )}

                      {/* Internal text if wide enough */}
                      {showLabels && (
                        <span className="relative z-10 text-xs font-bold text-white drop-shadow truncate">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DONUT / PIE CHART VIEW */}
        {chartType === 'donut' && (
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
            {/* SVG Donut */}
            <div className="relative w-64 h-64 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let accumulated = 0;
                  return SAMPLE_DATA.map((item) => {
                    const strokeDasharray = `${item.value} ${100 - item.value}`;
                    const strokeDashoffset = -accumulated;
                    accumulated += item.value;
                    const strokeColor = colorMode === 'grayscale' ? '#4B5563' : item.hex;

                    return (
                      <circle
                        key={item.id}
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 hover:opacity-90"
                      />
                    );
                  });
                })()}
              </svg>

              {/* Center Hole Badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-white">100%</span>
                <span className="text-[10px] text-gray-400 font-mono">TỔNG THỂ</span>
              </div>
            </div>

            {/* Accessible Legend with Pattern Swatches */}
            <div className="space-y-3 flex-1 max-w-sm">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase block">
                Bảng chú giải có hoa văn nhận diện
              </span>
              {SAMPLE_DATA.map((item) => {
                const swatchColor = analyzeColor(colorMode === 'grayscale' ? '#4B5563' : item.hex);
                return (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-[#11141B] border border-gray-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <PatternSwatch
                        color={swatchColor}
                        size="sm"
                        showSymbol={showPattern}
                        forcePattern={showPattern}
                      />
                      {showLabels && (
                        <span className="text-xs font-bold text-white">{item.name}</span>
                      )}
                    </div>
                    {showValues && (
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {item.value}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upload Custom Chart & Click-To-Decode Tool */}
      <div className="p-6 rounded-3xl bg-[#11141B] border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🔍</span>
              <span>Giải mã màu biểu đồ tải lên từ tài liệu của bạn</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Tải ảnh biểu đồ bất kỳ, chạm vào thanh cột hoặc phần chú giải để đọc ngay tên màu và hoa văn tương ứng
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 text-xs font-semibold self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Tải ảnh biểu đồ</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Viewport & Sampled Output */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-8 rounded-2xl overflow-hidden bg-black border border-gray-800 flex items-center justify-center min-h-[220px]">
            {uploadedChart ? (
              <img
                src={uploadedChart}
                alt="Biểu đồ tải lên"
                onClick={handleChartImageClick}
                className="max-h-[350px] w-auto object-contain cursor-crosshair hover:opacity-95"
                title="Click vào thanh biểu đồ để giải mã"
              />
            ) : (
              <div className="p-8 text-center space-y-2">
                <BarChart3 className="w-10 h-10 text-gray-600 mx-auto" />
                <p className="text-xs text-gray-400">
                  Chưa có ảnh biểu đồ nào được tải lên. Nhấn nút Tải ảnh ở trên để bắt đầu thử nghiệm.
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-4 p-4 rounded-2xl bg-[#0B0D13] border border-gray-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
              Kết quả giải mã màu biểu đồ
            </span>

            {sampledColor ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <PatternSwatch color={sampledColor} size="md" showSymbol={true} forcePattern={true} />
                  <div>
                    <h4 className="text-sm font-bold text-white">{sampledColor.nameVi}</h4>
                    <p className="text-xs text-gray-400 font-mono">{sampledColor.hex}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#141824] text-xs space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">
                    Ký hiệu hoa văn đối ứng:
                  </span>
                  <span className="font-mono font-bold text-cyan-300 text-sm">
                    {sampledColor.pattern.symbol} ({sampledColor.pattern.nameVi})
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">
                Chạm vào một phần trên ảnh biểu đồ để hiển thị thông số tại đây.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

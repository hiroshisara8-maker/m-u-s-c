import React, { useState, useRef } from 'react';
import { ColorVisionDeficiency } from '../../types';
import {
  Upload,
  Eye,
  Sliders,
  AlertCircle,
  LayoutGrid,
  Columns,
  RefreshCw,
  Info,
} from 'lucide-react';

const SIM_PRESETS = [
  {
    name: 'Đĩa trái cây tươi',
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Đèn giao thông thành phố',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Vườn hoa rực rỡ',
    url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Biểu đồ doanh thu màu',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
];

const DEFICIENCY_INFO: Record<
  ColorVisionDeficiency,
  {
    title: string;
    sub: string;
    description: string;
    prevalence: string;
    filterId: string;
  }
> = {
  normal: {
    title: 'Thị giác bình thường (Trichromacy)',
    sub: 'Đầy đủ 3 loại tế bào nón L, M, S',
    description: 'Có thể tiếp nhận toàn bộ quang phổ ánh sáng từ đỏ, lục, lam đến tím.',
    prevalence: '~92% dân số nam, ~99.5% dân số nữ',
    filterId: 'none',
  },
  protanopia: {
    title: 'Mù màu đỏ (Protanopia)',
    sub: 'Thiếu hoàn toàn tế bào nón L (Long-wavelength)',
    description:
      'Màu đỏ trông tối sẫm hoặc chuyển thành nâu xám, khó phân biệt giữa đỏ và đen, đỏ và xanh lục.',
    prevalence: '~1% nam giới',
    filterId: 'url(#protanopia-filter)',
  },
  deuteranopia: {
    title: 'Mù màu xanh lục (Deuteranopia)',
    sub: 'Thiếu tế bào nón M (Medium-wavelength)',
    description:
      'Dạng phổ biến nhất. Khó phân biệt giữa đỏ, cam, vàng và xanh lá cây; tất cả thường bị nhìn thành màu vàng nâu.',
    prevalence: '~5-6% nam giới',
    filterId: 'url(#deuteranopia-filter)',
  },
  tritanopia: {
    title: 'Mù màu xanh lam (Tritanopia)',
    sub: 'Thiếu tế bào nón S (Short-wavelength)',
    description:
      'Hiếm gặp. Khó phân biệt giữa màu xanh lam và xanh lá, màu vàng và màu tím hoặc hồng.',
    prevalence: '~0.01% dân số (cả nam và nữ)',
    filterId: 'url(#tritanopia-filter)',
  },
  grayscale: {
    title: 'Mù màu hoàn toàn (Achromatopsia)',
    sub: 'Mất toàn bộ chức năng tế bào nón',
    description:
      'Chỉ nhìn thấy thế giới qua các sắc thái trắng, xám và đen dựa vào tế bào que (Rod cells).',
    prevalence: '~1 trên 30,000 người',
    filterId: 'url(#grayscale-filter)',
  },
};

export const VisionSimView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(SIM_PRESETS[0].url);
  const [activeDeficiency, setActiveDeficiency] = useState<ColorVisionDeficiency>('deuteranopia');
  const [viewMode, setViewMode] = useState<'single' | 'split' | 'grid'>('split');
  const [splitPos, setSplitPos] = useState<number>(50); // percentage

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentInfo = DEFICIENCY_INFO[activeDeficiency];

  return (
    <div className="space-y-8 pb-16">
      {/* SVG Filters for instantaneous color matrix rendering */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <filter id="protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.56667 0.43333 0 0 0
                    0.55833 0.44167 0 0 0
                    0 0.24167 0.75833 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0 0 0
                    0.700 0.300 0 0 0
                    0 0.300 0.700 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.95 0.05 0 0 0
                    0 0.43333 0.56667 0 0
                    0 0.475 0.525 0 0
                    0 0 0 1 0"
          />
        </filter>
        <filter id="grayscale-filter">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0 0 0 1 0"
          />
        </filter>
      </svg>

      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-pink-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>👁️</span>
              <span>Mô phỏng thị giác màu – Vision Simulator</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Quan sát trực quan cách hình ảnh biến đổi qua góc nhìn của từng dạng khiếm khuyết thị giác màu
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs font-semibold self-start sm:self-auto transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Tải ảnh của bạn</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* View Mode & Mode Switchers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Deficiency Type Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#11141B] border border-gray-800 rounded-2xl">
          {(Object.keys(DEFICIENCY_INFO) as ColorVisionDeficiency[]).map((mode) => {
            const info = DEFICIENCY_INFO[mode];
            const isActive = activeDeficiency === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveDeficiency(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {info.title.split(' ')[0]} {info.title.split(' ')[1] || ''}
              </button>
            );
          })}
        </div>

        {/* View Layout Controls: Split / Single / Grid */}
        <div className="flex items-center gap-1.5 p-1 bg-[#11141B] border border-gray-800 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'split'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Thanh trượt so sánh trước / sau"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Thanh trượt chia đôi</span>
          </button>

          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'single'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Xem toàn màn hình chế độ chọn"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Chế độ đơn</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            title="So sánh 4 dạng cùng lúc"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Lưới 4 góc nhìn</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="rounded-3xl bg-[#090B10] border border-gray-800 overflow-hidden shadow-2xl relative">
        {/* SPLIT SLIDER VIEW */}
        {viewMode === 'split' && (
          <div className="relative w-full h-[450px] md:h-[540px] select-none overflow-hidden bg-black flex items-center justify-center">
            {/* Background Simulated Layer */}
            <img
              src={selectedImage}
              alt="Mô phỏng thị giác"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                filter: currentInfo.filterId !== 'none' ? currentInfo.filterId : undefined,
              }}
            />

            {/* Foreground Normal Layer (Clipped by splitPos) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
            >
              <img
                src={selectedImage}
                alt="Thị giác bình thường"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-bold text-white border border-white/20">
                Thị giác bình thường
              </span>
            </div>

            {/* Simulated label on the right */}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-bold text-purple-300 border border-purple-500/30">
              {currentInfo.title}
            </span>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ left: `${splitPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black shadow-xl flex items-center justify-center font-bold text-xs">
                ↔
              </div>
            </div>

            {/* Invisible Range Slider on top */}
            <input
              type="range"
              min="0"
              max="100"
              value={splitPos}
              onChange={(e) => setSplitPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Điều chỉnh vị trí so sánh"
            />
          </div>
        )}

        {/* SINGLE VIEW */}
        {viewMode === 'single' && (
          <div className="relative w-full h-[450px] md:h-[540px] flex items-center justify-center bg-black overflow-hidden">
            <img
              src={selectedImage}
              alt="Mô phỏng"
              className="max-h-full max-w-full object-contain"
              style={{
                filter: currentInfo.filterId !== 'none' ? currentInfo.filterId : undefined,
              }}
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-xs font-bold text-white border border-white/20">
              Đang xem: {currentInfo.title}
            </div>
          </div>
        )}

        {/* 4-GRID MULTI-VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-black">
            {/* 1. Normal */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-[#11141B] border border-gray-800 flex items-center justify-center">
              <img src={selectedImage} alt="Normal" className="max-h-full max-w-full object-contain" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-bold text-white">
                Bình thường (Trichromacy)
              </span>
            </div>

            {/* 2. Protanopia */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-[#11141B] border border-gray-800 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Protanopia"
                className="max-h-full max-w-full object-contain"
                style={{ filter: 'url(#protanopia-filter)' }}
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-bold text-red-300">
                Protanopia (Mù màu đỏ)
              </span>
            </div>

            {/* 3. Deuteranopia */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-[#11141B] border border-gray-800 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Deuteranopia"
                className="max-h-full max-w-full object-contain"
                style={{ filter: 'url(#deuteranopia-filter)' }}
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-bold text-green-300">
                Deuteranopia (Mù màu xanh lục)
              </span>
            </div>

            {/* 4. Tritanopia */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-[#11141B] border border-gray-800 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Tritanopia"
                className="max-h-full max-w-full object-contain"
                style={{ filter: 'url(#tritanopia-filter)' }}
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[11px] font-bold text-blue-300">
                Tritanopia (Mù màu xanh lam)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Preset Image Chooser */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-gray-400 uppercase">
          Chọn hình ảnh mẫu để thử nghiệm
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SIM_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setSelectedImage(preset.url)}
              className={`p-2 rounded-xl border text-left transition-all group ${
                selectedImage === preset.url
                  ? 'bg-purple-600/20 border-purple-500 shadow-md'
                  : 'bg-[#11141B] border-gray-800 hover:border-gray-700'
              }`}
            >
              <img
                src={preset.url}
                alt={preset.name}
                className="w-full h-20 object-cover rounded-lg mb-2"
              />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white line-clamp-1">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scientific explanation card & Medical Disclaimer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">{currentInfo.title}</h4>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {currentInfo.description}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-gray-800">
            <span>Tỷ lệ phổ biến: <strong className="text-cyan-400">{currentInfo.prevalence}</strong></span>
            <span>Cơ chế: {currentInfo.sub}</span>
          </div>
        </div>

        {/* Required Medical Disclaimer */}
        <div className="p-5 rounded-2xl bg-[#161219] border border-amber-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="text-amber-300 block">Lưu ý y tế quan trọng:</strong>
            <p className="text-gray-400 leading-relaxed">
              Chức năng mô phỏng chỉ được sử dụng cho mục đích hỗ trợ, trải nghiệm và giáo dục. Không
              được sử dụng để thay thế chẩn đoán y khoa chính thức từ bác sĩ nhãn khoa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

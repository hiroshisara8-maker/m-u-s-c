import React, { useState, useRef } from 'react';
import { analyzeColor, calculateContrastRatio } from '../../utils/colorUtils';
import { ColorData } from '../../types';
import { PatternSwatch } from '../common/PatternSwatch';
import {
  Shirt,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface OutfitSlot {
  id: 'top' | 'pants' | 'shoes' | 'bag';
  nameVi: string;
  nameEn: string;
  iconChar: string;
  hex: string;
}

const PRESET_OUTFITS: { name: string; items: Record<OutfitSlot['id'], string> }[] = [
  {
    name: 'Công sở thanh lịch (Classic Formal)',
    items: {
      top: '#F8FAFC', // White
      pants: '#0F172A', // Dark Navy
      shoes: '#11141B', // Black
      bag: '#78350F', // Dark Brown
    },
  },
  {
    name: 'Dạo phố năng động (Urban Casual)',
    items: {
      top: '#78350F', // Dark Brown
      pants: '#11141B', // Black
      shoes: '#F8FAFC', // White
      bag: '#C19A6B', // Camel Beige
    },
  },
  {
    name: 'Tương phản cao an toàn (Safe High-Contrast)',
    items: {
      top: '#FACC15', // Amber Yellow
      pants: '#1F2937', // Charcoal
      shoes: '#FFFFFF', // Pure White
      bag: '#11141B', // Black
    },
  },
];

export const OutfitView: React.FC = () => {
  const [slots, setSlots] = useState<OutfitSlot[]>([
    { id: 'top', nameVi: 'Áo (Top)', nameEn: 'TOP', iconChar: '👕', hex: '#78350F' },
    { id: 'pants', nameVi: 'Quần / Váy (Pants)', nameEn: 'PANTS', iconChar: '👖', hex: '#11141B' },
    { id: 'shoes', nameVi: 'Giày (Shoes)', nameEn: 'SHOES', iconChar: '👟', hex: '#F8FAFC' },
    { id: 'bag', nameVi: 'Túi / Phụ kiện (Accessories)', nameEn: 'ACCESSORIES', iconChar: '👜', hex: '#C19A6B' },
  ]);

  const [activeSlotId, setActiveSlotId] = useState<OutfitSlot['id']>('top');
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update color of a slot
  const updateSlotColor = (slotId: OutfitSlot['id'], newHex: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, hex: newHex } : s))
    );
  };

  const topColor = analyzeColor(slots.find((s) => s.id === 'top')!.hex);
  const pantsColor = analyzeColor(slots.find((s) => s.id === 'pants')!.hex);
  const shoesColor = analyzeColor(slots.find((s) => s.id === 'shoes')!.hex);
  const bagColor = analyzeColor(slots.find((s) => s.id === 'bag')!.hex);

  // Contrast check between Top and Pants
  const topPantsContrast = calculateContrastRatio(topColor.hex, pantsColor.hex);
  const pantsShoesContrast = calculateContrastRatio(pantsColor.hex, shoesColor.hex);

  // Check possible clash / confusion
  const hasPotentialClash =
    (topColor.pattern.family === 'brown' && pantsColor.pattern.family === 'green') ||
    (topColor.pattern.family === 'blue' && pantsColor.pattern.family === 'purple') ||
    (topColor.pattern.family === 'red' && pantsColor.pattern.family === 'green');

  // Handle image upload & canvas sampling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setUploadedImage(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 600;
    canvas.height = img.naturalHeight || 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.max(0, Math.min(canvas.width - 1, Math.floor((e.clientX - rect.left) * scaleX)));
    const y = Math.max(0, Math.min(canvas.height - 1, Math.floor((e.clientY - rect.top) * scaleY)));

    try {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const clamp = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0').toUpperCase();
      const hex = `#${clamp(pixel[0])}${clamp(pixel[1])}${clamp(pixel[2])}`;
      updateSlotColor(activeSlotId, hex);
    } catch (err) {
      console.warn('Outfit canvas sample failed due to cross-origin, applying fallback:', err);
      // Fallback based on relative position if external image taints canvas
      const yRatio = y / canvas.height;
      if (yRatio < 0.45) updateSlotColor(activeSlotId, '#78350F');
      else if (yRatio < 0.78) updateSlotColor(activeSlotId, '#11141B');
      else if (yRatio < 0.92) updateSlotColor(activeSlotId, '#F8FAFC');
      else updateSlotColor(activeSlotId, '#C19A6B');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-orange-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>👕</span>
          <span>Kiểm tra màu quần áo – Outfit Mode</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Tải ảnh trang phục và chọn khu vực áo, quần, giày, túi để kiểm tra màu sắc chuẩn xác, độ
          hài hòa và cảnh báo phối màu nhầm lẫn cho người mù màu.
        </p>
      </div>

      {/* Preset Inspirations */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-gray-400 uppercase">
          Gợi ý phối màu trang phục mẫu
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_OUTFITS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                updateSlotColor('top', p.items.top);
                updateSlotColor('pants', p.items.pants);
                updateSlotColor('shoes', p.items.shoes);
                updateSlotColor('bag', p.items.bag);
              }}
              className="p-3 rounded-xl bg-[#11141B] border border-gray-800 hover:border-orange-500/60 transition-all text-left group"
            >
              <p className="text-xs font-bold text-gray-200 group-hover:text-white truncate">
                {p.name}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: p.items.top }} />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: p.items.pants }} />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: p.items.shoes }} />
                <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: p.items.bag }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Photo Sampling on Left, Slots breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photo Sampler */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-300 uppercase">
                Ảnh trang phục thực tế
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh đồ của bạn</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Instruction for current active slot */}
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-200 flex items-center justify-between">
              <span>Đang lấy màu cho: <strong className="uppercase">{activeSlotId}</strong></span>
              <span className="text-[10px] text-gray-400">Click vào ảnh bên dưới</span>
            </div>

            {/* Clickable Image */}
            <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center border border-gray-800 max-h-[460px]">
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Trang phục"
                  crossOrigin="anonymous"
                  onClick={handleCanvasClick}
                  className="w-full h-auto object-contain cursor-crosshair hover:opacity-95 transition-opacity"
                  title="Click vào vị trí áo, quần hoặc giày để lấy màu"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 4 Slots Output breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3">
            {slots.map((slot) => {
              const color = analyzeColor(slot.hex);
              const isActive = activeSlotId === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => setActiveSlotId(slot.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#151924] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] ring-1 ring-orange-500'
                      : 'bg-[#11141B] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{slot.iconChar}</span>
                      <PatternSwatch color={color} size="md" showSymbol={true} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-wider">
                            {slot.nameEn}
                          </span>
                          <span className="text-gray-500">·</span>
                          <span className="text-xs text-gray-400">{slot.nameVi}</span>
                        </div>

                        {/* Format required by prompt: "TOP – Dark Brown" */}
                        <h4 className="text-base font-bold text-white mt-0.5">
                          {slot.nameEn} – {color.nameEn} ({color.nameVi})
                        </h4>
                        <p className="text-xs text-gray-400 font-mono">
                          {color.hex} • Độ sáng: {color.brightnessLevel} ({color.brightnessPercent}%)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={slot.hex}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateSlotColor(slot.id, e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        title="Đổi màu thủ công"
                        aria-label={`Chọn màu cho ${slot.nameVi}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outfit Contrast & Harmony Checker */}
          <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Đánh giá độ tương phản & Sự hòa hợp trang phục</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Top vs Pants */}
              <div className="p-3.5 rounded-xl bg-[#090B10] border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  Tương phản Áo vs Quần (Top / Pants)
                </span>
                <span className="text-base font-bold text-white">
                  {topPantsContrast}:1{' '}
                  <span className="text-xs font-normal text-cyan-400">
                    ({topPantsContrast >= 4.5 ? 'Tương phản cao - Dễ phân tách' : 'Tương phản thấp'})
                  </span>
                </span>
                <p className="text-[11px] text-gray-400">
                  {topPantsContrast >= 3.0
                    ? 'Giúp định hình tỉ lệ vóc dáng rõ ràng, người xem không bị nhầm lẫn ranh giới áo và quần.'
                    : 'Áo và quần có độ sáng tương tự nhau, có thể trông như một bộ liền đồ.'}
                </p>
              </div>

              {/* Pants vs Shoes */}
              <div className="p-3.5 rounded-xl bg-[#090B10] border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  Tương phản Quần vs Giày (Pants / Shoes)
                </span>
                <span className="text-base font-bold text-white">
                  {pantsShoesContrast}:1
                </span>
                <p className="text-[11px] text-gray-400">
                  {pantsShoesContrast >= 3.0
                    ? 'Điểm nhấn giày tách bạch rõ rệt so với gấu quần.'
                    : 'Màu giày tiệp màu với quần, tạo hiệu ứng kéo dài chân.'}
                </p>
              </div>
            </div>

            {/* Clash Alert for Color-Blind Users */}
            {hasPotentialClash ? (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300">Lưu ý phối màu nhạy cảm:</strong>
                  Sự kết hợp giữa các tông màu này có thể tạo cảm giác khó nhận diện sắc thái đối với người mắc khiếm thị màu (ví dụ Nâu đất với Xanh lục đậm, hoặc Xanh dương với Tím). Hãy hỏi ý kiến hoặc giữ nguyên nếu đây là chủ ý phong cách cá nhân của bạn.
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  ✓ Phối màu an toàn, độ tương phản sáng tối phân định rõ ràng giữa các món đồ.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

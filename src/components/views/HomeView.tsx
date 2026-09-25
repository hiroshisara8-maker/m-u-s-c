import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { PatternSwatch } from '../common/PatternSwatch';
import { analyzeColor } from '../../utils/colorUtils';
import {
  Camera,
  Layers,
  Eye,
  Component,
  TrafficCone,
  Shirt,
  BarChart3,
  Volume2,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TabType } from '../../types';

export const HomeView: React.FC = () => {
  const { setCurrentTab, announceColor, addRecentColor } = useApp();

  // Interactive sample swatches on hero
  const demoHexes = ['#243B64', '#EF4444', '#22C55E', '#EAB308', '#9333EA', '#F97316'];
  const [selectedDemoHex, setSelectedDemoHex] = useState('#243B64');
  const activeColorData = analyzeColor(selectedDemoHex);

  const handleDemoSelect = (hex: string) => {
    setSelectedDemoHex(hex);
    const analyzed = analyzeColor(hex);
    addRecentColor(analyzed);
  };

  const featureCards: {
    id: TabType;
    title: string;
    sub: string;
    iconChar: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    tag: string;
  }[] = [
    {
      id: 'scanner',
      title: 'Nhận diện màu',
      sub: 'Mở camera hoặc ảnh, chạm lấy pixel màu, hiển thị tên, HEX, RGB, độ sáng & bão hòa.',
      iconChar: '📷',
      icon: Camera,
      accent: 'from-cyan-500/20 to-blue-500/5',
      tag: 'Camera & Upload',
    },
    {
      id: 'compare',
      title: 'So sánh màu',
      sub: 'Đo độ tương phản WCAG, phân tích khác biệt & cảnh báo nhầm lẫn màu Protan/Deutan.',
      iconChar: '🎨',
      icon: Layers,
      accent: 'from-purple-500/20 to-pink-500/5',
      tag: 'Tương phản & Cảnh báo',
    },
    {
      id: 'pattern-code',
      title: 'Mã màu bằng ký hiệu',
      sub: 'Chuyển nhóm màu thành ký hiệu /////, •••••, █████, xxxxx để nhận biết độc lập.',
      iconChar: '🧩',
      icon: Component,
      accent: 'from-amber-500/20 to-yellow-500/5',
      tag: 'Pattern Mode',
    },
    {
      id: 'vision-sim',
      title: 'Mô phỏng thị giác màu',
      sub: 'Xem ảnh qua lăng kính Protanopia, Deuteranopia, Tritanopia & Grayscale.',
      iconChar: '👁️',
      icon: Eye,
      accent: 'from-pink-500/20 to-rose-500/5',
      tag: 'Lăng kính mô phỏng',
    },
    {
      id: 'traffic',
      title: 'Đèn giao thông an toàn',
      sub: 'Nhận biết đèn kết hợp 3 tín hiệu: Màu sắc + Vị trí (trên/giữa/dưới) + Ký hiệu & âm thanh.',
      iconChar: '🚦',
      icon: TrafficCone,
      accent: 'from-emerald-500/20 to-green-500/5',
      tag: 'Vị trí + Ký hiệu',
    },
    {
      id: 'outfit',
      title: 'Kiểm tra màu quần áo',
      sub: 'Chọn áo, quần, giày, phụ kiện; kiểm tra độ hài hòa và tương phản trang phục.',
      iconChar: '👕',
      icon: Shirt,
      accent: 'from-orange-500/20 to-amber-500/5',
      tag: 'Phối đồ tự tin',
    },
    {
      id: 'chart',
      title: 'Hỗ trợ đọc biểu đồ',
      sub: 'Chuyển đổi các phần của biểu đồ thành hoa văn kèm chữ số để đọc dữ liệu không nhầm lẫn.',
      iconChar: '📊',
      icon: BarChart3,
      accent: 'from-cyan-500/20 to-teal-500/5',
      tag: 'Trực quan hóa số liệu',
    },
    {
      id: 'audio-color',
      title: 'Đọc màu bằng âm thanh',
      sub: 'Nghe giọng đọc mô tả tên màu, độ sáng, độ bão hòa cùng tần số âm thanh mô phỏng.',
      iconChar: '🔊',
      icon: Volume2,
      accent: 'from-violet-500/20 to-purple-500/5',
      tag: 'Text-to-Speech & Tone',
    },
    {
      id: 'game',
      title: 'Trò chơi phân biệt màu',
      sub: 'Rèn luyện khả năng quan sát tìm ô màu khác biệt với nhiều cấp độ giải trí.',
      iconChar: '🎮',
      icon: Gamepad2,
      accent: 'from-emerald-500/20 to-cyan-500/5',
      tag: 'Mini game rèn luyện',
    },
    {
      id: 'knowledge',
      title: 'Kiến thức về màu sắc',
      sub: 'Tìm hiểu về các dạng mù màu, cơ chế tế bào nón và cẩm nang thiết kế thân thiện.',
      iconChar: '📚',
      icon: BookOpen,
      accent: 'from-blue-500/20 to-indigo-500/5',
      tag: 'Cẩm nang khoa học',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#11141B] via-[#0E1118] to-[#08090D] border border-purple-500/20 p-6 md:p-10 shadow-2xl">
        {/* Glow ambient spots */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-600/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Branding, Mission, Quick Access */}
          <div className="lg:col-span-7 space-y-6">
            <Logo size="lg" />

            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Nhìn thấu màu sắc,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                  vượt qua mọi giới hạn thị giác
                </span>
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal">
                CHROMA X hỗ trợ người khiếm khuyết thị giác màu nhận diện, so sánh và
                phân biệt thế giới xung quanh qua{' '}
                <strong className="text-white">tên gọi chính xác</strong>,{' '}
                <strong className="text-[#00F0FF]">mã HEX & RGB</strong>,{' '}
                <strong className="text-purple-300">độ sáng & bão hòa</strong>,{' '}
                <strong className="text-yellow-300">hệ hoa văn ký hiệu</strong> và{' '}
                <strong className="text-emerald-300">giọng đọc âm thanh</strong>.
              </p>
            </div>

            {/* Quick Access Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('scanner')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:brightness-110 active:scale-95 transition-all"
              >
                <span>📷</span>
                <span>Quét màu</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setCurrentTab('compare')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#161B26] hover:bg-[#1E2433] text-white border border-gray-700/80 font-semibold text-sm hover:border-purple-400/50 transition-all"
              >
                <span>🎨</span>
                <span>So sánh màu</span>
              </button>

              <button
                onClick={() => setCurrentTab('vision-sim')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#161B26] hover:bg-[#1E2433] text-white border border-gray-700/80 font-semibold text-sm hover:border-pink-400/50 transition-all"
              >
                <span>👁️</span>
                <span>Mô phỏng thị giác</span>
              </button>

              <button
                onClick={() => setCurrentTab('pattern-code')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#161B26] hover:bg-[#1E2433] text-white border border-gray-700/80 font-semibold text-sm hover:border-yellow-400/50 transition-all"
              >
                <span>🧩</span>
                <span>Công cụ hỗ trợ</span>
              </button>
            </div>

            {/* Accessibility badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Không cần phụ thuộc thị giác màu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Tương thích WCAG 2.1 AAA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Hoạt động ngoại tuyến</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Swatch Widget */}
          <div className="lg:col-span-5 bg-[#121622]/90 border border-gray-800 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">
                Interactive Sampler
              </span>
              <span className="text-[11px] text-gray-400">Chạm để thử nhận diện</span>
            </div>

            {/* Swatch Demo Grid */}
            <div className="flex items-center gap-2">
              {demoHexes.map((hex) => {
                const isSelected = selectedDemoHex.toLowerCase() === hex.toLowerCase();
                const color = analyzeColor(hex);
                return (
                  <button
                    key={hex}
                    onClick={() => handleDemoSelect(hex)}
                    className={`relative p-0.5 rounded-xl transition-transform ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 scale-110 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    title={color.nameVi}
                  >
                    <PatternSwatch color={color} size="sm" showSymbol={true} />
                  </button>
                );
              })}
            </div>

            {/* Readout Card for active demo color */}
            <div className="p-4 rounded-xl bg-[#090B10] border border-gray-800/90 space-y-3">
              <div className="flex items-center gap-3">
                <PatternSwatch color={activeColorData} size="md" showSymbol={true} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-white truncate">
                      {activeColorData.nameVi}
                    </p>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {activeColorData.pattern.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    {activeColorData.nameEn} • {activeColorData.hex}
                  </p>
                </div>
              </div>

              {/* Data tags */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-[#141824] border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">
                    Độ sáng (Brightness)
                  </span>
                  <span className="text-white font-semibold">
                    {activeColorData.brightnessLevel} ({activeColorData.brightnessPercent}%)
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#141824] border border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">
                    Độ bão hòa (Saturation)
                  </span>
                  <span className="text-white font-semibold">
                    {activeColorData.saturationLevel} ({activeColorData.saturationPercent}%)
                  </span>
                </div>
              </div>

              {/* Sound Action */}
              <button
                onClick={() => announceColor(activeColorData)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Nghe đọc màu & âm tần ({activeColorData.nameVi})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of 10 Functional Modules */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white">
              Hệ thống công cụ CHROMA X
            </h3>
            <p className="text-xs text-gray-400">
              Chọn chức năng để bắt đầu nhận diện và phân tích màu sắc
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 self-start sm:self-auto">
            10 Chế độ chuyên biệt
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setCurrentTab(feat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setCurrentTab(feat.id);
                }}
                className={`group cursor-pointer rounded-2xl p-5 bg-[#11141B] border border-gray-800/80 hover:border-purple-500/50 hover:bg-gradient-to-br ${feat.accent} transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {feat.iconChar}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#181C28] flex items-center justify-center text-purple-400">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-300 border border-gray-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    {feat.sub}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-800/60 text-xs font-semibold text-gray-400 group-hover:text-cyan-400 transition-colors">
                  <span>Mở công cụ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

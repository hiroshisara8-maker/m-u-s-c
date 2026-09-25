import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PATTERN_FAMILIES, analyzeColor } from '../../utils/colorUtils';
import { PatternSwatch } from '../common/PatternSwatch';
import { PatternFamily } from '../../types';
import {
  Layers,
  Check,
  Sparkles,
  Search,
  Eye,
  ArrowRight,
  Info,
  Copy,
} from 'lucide-react';

export const PatternCodeView: React.FC = () => {
  const { settings, togglePatternMode } = useApp();
  const [testHex, setTestHex] = useState('#2563EB');
  const [copiedFamily, setCopiedFamily] = useState<string | null>(null);

  const testColor = analyzeColor(testHex);

  const patternList = Object.values(PATTERN_FAMILIES);

  const handleCopySymbol = (symbol: string, family: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(symbol).catch(() => {
        try {
          const el = document.createElement('textarea');
          el.value = symbol;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
        } catch {
          // ignore
        }
      });
    }
    setCopiedFamily(family);
    setTimeout(() => setCopiedFamily(null), 1800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Global Pattern Toggle */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#11141B] to-[#151926] border border-yellow-500/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧩</span>
              <h2 className="text-xl font-bold text-white">
                Mã màu bằng ký hiệu – Color Code System
              </h2>
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Giải pháp đột phá gán mỗi họ màu vào một hoa văn và ký hiệu độc bản. Giúp người
              khiếm khuyết thị giác màu nhận biết, ghi nhớ và đọc tài liệu mà không cần phụ
              thuộc vào khả năng phân biệt quang phổ.
            </p>
          </div>

          {/* Master Switch Button */}
          <button
            onClick={togglePatternMode}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 shrink-0 shadow-lg active:scale-95 ${
              settings.patternMode
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                : 'bg-[#181D2A] text-gray-300 hover:text-white border border-gray-700'
            }`}
          >
            <Layers className="w-5 h-5 text-yellow-400" />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-yellow-300">
                Pattern Mode
              </span>
              <span className="text-base">
                {settings.patternMode ? 'ĐANG BẬT (ACTIVE)' : 'ĐANG TẮT (INACTIVE)'}
              </span>
            </div>
          </button>
        </div>

        {/* Status Announcement Banner */}
        {settings.patternMode && (
          <div className="p-3.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <strong className="font-mono text-purple-300 uppercase tracking-wider">
                  PATTERN MODE ON
                </strong>
                <span className="mx-2 opacity-50">|</span>
                <span>Colors are now represented with patterns and labels.</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/20">
              WCAG ENHANCED
            </span>
          </div>
        )}
      </div>

      {/* Interactive Pattern Dictionary Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📖</span>
            <span>Bảng từ điển 12 ký hiệu mã hóa màu tiêu chuẩn</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">CHROMA X Standard</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {patternList.map((item) => {
            const sampleColor = analyzeColor(item.sampleHex);
            const isCopied = copiedFamily === item.family;

            return (
              <div
                key={item.family}
                className="p-4 rounded-2xl bg-[#11141B] border border-gray-800/80 hover:border-purple-500/50 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <PatternSwatch
                      color={sampleColor}
                      size="md"
                      showSymbol={false}
                      forcePattern={true}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {item.nameVi}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-mono">{item.nameEn}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopySymbol(item.symbol, item.family)}
                    className="p-1.5 rounded-lg bg-gray-800/80 text-gray-400 hover:text-white transition-colors"
                    title="Sao chép ký hiệu"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Big Symbol display */}
                <div className="p-2.5 rounded-xl bg-[#090B10] border border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono uppercase">
                    Ký hiệu
                  </span>
                  <span className="font-mono text-base font-extrabold tracking-widest text-[#00F0FF]">
                    {item.symbol}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-snug">
                  {item.descriptionVi}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Before / After Demonstration */}
      <div className="p-6 rounded-3xl bg-[#11141B] border border-gray-800 space-y-5">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>👁️</span>
            <span>Hiệu quả thực tế: So sánh trước và sau khi bật Pattern Mode</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Xem cách hoa văn giúp một biểu đồ phân khúc trở nên trực quan với người mắc chứng mù màu đỏ - xanh lá (Deuteranopia)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Pattern */}
          <div className="p-5 rounded-2xl bg-[#090B10] border border-gray-800/80 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <span className="text-xs font-mono font-bold text-red-400 uppercase">
                Chỉ dùng màu sắc thuần túy
              </span>
              <span className="text-[10px] text-gray-400 font-mono">Dễ gây nhầm lẫn</span>
            </div>

            <div className="grid grid-cols-4 gap-2 h-28 items-stretch">
              <div className="rounded-xl bg-[#EF4444] flex items-center justify-center text-xs font-bold text-white shadow">
                Đỏ
              </div>
              <div className="rounded-xl bg-[#22C55E] flex items-center justify-center text-xs font-bold text-white shadow">
                Xanh lá
              </div>
              <div className="rounded-xl bg-[#3B82F6] flex items-center justify-center text-xs font-bold text-white shadow">
                Xanh lam
              </div>
              <div className="rounded-xl bg-[#EAB308] flex items-center justify-center text-xs font-bold text-white shadow">
                Vàng
              </div>
            </div>

            <p className="text-xs text-gray-400 italic">
              * Người bị mù màu đỏ - xanh lá sẽ nhìn thấy ô Đỏ và Xanh lá có cùng sắc thái vàng úa,
              gây bối rối khi đọc sơ đồ hoặc biểu đồ.
            </p>
          </div>

          {/* With Pattern Mode */}
          <div className="p-5 rounded-2xl bg-[#090B10] border border-purple-500/40 space-y-3 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <div className="flex items-center justify-between pb-2 border-b border-purple-500/30">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                Đã áp dụng CHROMA X Pattern Mode
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Phân biệt được</span>
            </div>

            <div className="grid grid-cols-4 gap-2 h-28 items-stretch">
              <div className="relative rounded-xl bg-[#EF4444] overflow-hidden flex flex-col items-center justify-center text-white shadow">
                <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-difference">
                  <rect width="100%" height="100%" fill="url(#pat-diagonal-stripe)" />
                </svg>
                <span className="relative z-10 font-mono font-bold text-xs bg-black/60 px-1.5 py-0.5 rounded">
                  /////
                </span>
                <span className="relative z-10 text-[10px] font-bold mt-1">Đỏ</span>
              </div>

              <div className="relative rounded-xl bg-[#22C55E] overflow-hidden flex flex-col items-center justify-center text-white shadow">
                <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-difference">
                  <rect width="100%" height="100%" fill="url(#pat-dots)" />
                </svg>
                <span className="relative z-10 font-mono font-bold text-xs bg-black/60 px-1.5 py-0.5 rounded">
                  •••••
                </span>
                <span className="relative z-10 text-[10px] font-bold mt-1">Xanh lá</span>
              </div>

              <div className="relative rounded-xl bg-[#3B82F6] overflow-hidden flex flex-col items-center justify-center text-white shadow">
                <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-difference">
                  <rect width="100%" height="100%" fill="url(#pat-solid-blocks)" />
                </svg>
                <span className="relative z-10 font-mono font-bold text-xs bg-black/60 px-1.5 py-0.5 rounded">
                  █████
                </span>
                <span className="relative z-10 text-[10px] font-bold mt-1">Xanh lam</span>
              </div>

              <div className="relative rounded-xl bg-[#EAB308] overflow-hidden flex flex-col items-center justify-center text-white shadow">
                <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-difference">
                  <rect width="100%" height="100%" fill="url(#pat-crosshatch)" />
                </svg>
                <span className="relative z-10 font-mono font-bold text-xs bg-black/60 px-1.5 py-0.5 rounded">
                  xxxxx
                </span>
                <span className="relative z-10 text-[10px] font-bold mt-1">Vàng</span>
              </div>
            </div>

            <p className="text-xs text-emerald-300">
              ✓ Bằng cách nhìn vào ký hiệu ///// và •••••, người dùng phân biệt chính xác lập tức
              kể cả khi không có bất kỳ thị giác màu nào!
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Pattern Test Box */}
      <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>🔍</span>
          <span>Thử nghiệm mã hóa ký hiệu cho màu bất kỳ</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={testColor.hex}
              onChange={(e) => setTestHex(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
              aria-label="Chọn màu thử nghiệm"
            />
            <input
              type="text"
              value={testHex}
              onChange={(e) => setTestHex(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#090B10] border border-gray-700 font-mono text-sm text-white w-28 uppercase"
            />
          </div>

          <div className="flex-1 p-3.5 rounded-xl bg-[#0C0F17] border border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PatternSwatch color={testColor} size="md" showSymbol={true} forcePattern={true} />
              <div>
                <p className="text-sm font-bold text-white">
                  Được tự động gán vào: {testColor.pattern.nameVi} ({testColor.pattern.nameEn})
                </p>
                <p className="text-xs text-gray-400">
                  Ký hiệu quy chuẩn: <strong className="text-cyan-400 font-mono">{testColor.pattern.symbol}</strong>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-purple-500/20 text-purple-300">
              {testColor.pattern.patternType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

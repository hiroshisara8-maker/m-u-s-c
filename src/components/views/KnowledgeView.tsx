import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Palette,
  Layers,
} from 'lucide-react';

export const KnowledgeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'causes' | 'design-guide' | 'ishihara'>('types');

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-blue-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📚</span>
          <span>Kiến thức về màu sắc – Color Knowledge Hub</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Cẩm nang khoa học ngắn gọn, dễ hiểu về cơ chế thị giác màu, nguyên nhân gây nhầm lẫn
          sắc thái và hướng dẫn thiết kế tiếp cận toàn diện.
        </p>
      </div>

      {/* Segmented Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#11141B] border border-gray-800">
        <button
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'types'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          1. Các dạng khiếm thị màu
        </button>

        <button
          onClick={() => setActiveTab('causes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'causes'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          2. Vì sao màu sắc bị nhầm lẫn?
        </button>

        <button
          onClick={() => setActiveTab('design-guide')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'design-guide'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          3. Cẩm nang thiết kế thân thiện
        </button>

        <button
          onClick={() => setActiveTab('ishihara')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'ishihara'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          4. Giải mã bảng Ishihara
        </button>
      </div>

      {/* 1. Các dạng khiếm thị màu */}
      {activeTab === 'types' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Protanopia */}
            <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🔴</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                  L-cone defect
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Protanopia (Mù màu đỏ)</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Người mắc dạng này thiếu hụt tế bào nón L (bước sóng dài tiếp nhận ánh sáng đỏ).
                Họ nhìn màu đỏ thành màu xám đen hoặc nâu tối, và gặp khó khăn lớn khi phân biệt đỏ
                với xanh lục hoặc đen.
              </p>
              <div className="pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400">
                Tỉ lệ: ~1% nam giới
              </div>
            </div>

            {/* Deuteranopia */}
            <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🟢</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-500/20 text-green-300">
                  M-cone defect
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Deuteranopia (Mù xanh lục)</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Dạng khiếm khuyết phổ biến nhất, do tế bào nón M (bước sóng trung bình) không hoạt
                động. Các màu đỏ, cam, vàng, xanh lá đều có xu hướng hòa trộn thành các sắc độ vàng
                nâu bùn nhạt.
              </p>
              <div className="pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400">
                Tỉ lệ: ~5-6% nam giới
              </div>
            </div>

            {/* Tritanopia */}
            <div className="p-5 rounded-2xl bg-[#11141B] border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🔵</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  S-cone defect
                </span>
              </div>
              <h3 className="text-base font-bold text-white">Tritanopia (Mù xanh lam)</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rất hiếm gặp, di truyền trên nhiễm sắc thể thường (không liên kết giới tính). Người
                mắc khó phân biệt màu xanh lam với màu xanh lá cây, và màu vàng với màu tím / hồng.
              </p>
              <div className="pt-2 border-t border-gray-800 text-[11px] font-mono text-gray-400">
                Tỉ lệ: ~0.01% dân số
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Vì sao màu sắc bị nhầm lẫn */}
      {activeTab === 'causes' && (
        <div className="p-6 rounded-3xl bg-[#11141B] border border-gray-800 space-y-5 animate-in fade-in duration-200">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>Nguyên lý quang học và tế bào thị giác</span>
          </h3>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
            <p>
              Mắt người bình thường có võng mạc chứa khoảng 6-7 triệu <strong>tế bào nón (Cones)</strong>{' '}
              chia làm 3 nhóm:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-mono text-gray-300">
              <li><strong className="text-red-400">Tế bào L:</strong> Nhạy cảm với ánh sáng bước sóng dài (~560nm - Đỏ).</li>
              <li><strong className="text-emerald-400">Tế bào M:</strong> Nhạy cảm với ánh sáng bước sóng trung (~530nm - Xanh lục).</li>
              <li><strong className="text-cyan-400">Tế bào S:</strong> Nhạy cảm với ánh sáng bước sóng ngắn (~420nm - Xanh lam).</li>
            </ul>

            <div className="p-4 rounded-xl bg-[#090B10] border border-gray-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Đường nhầm lẫn (Confusion Lines)</h4>
              <p className="text-gray-400">
                Khi thiếu một loại tế bào nón, các bước sóng ánh sáng khác nhau nếu kích thích 2
                loại tế bào còn lại với tỷ lệ bằng nhau thì não bộ sẽ ghi nhận cùng một tín hiệu thị
                giác. Đó là lý do tại sao một quả dâu tây chín đỏ trên nền lá xanh có thể trở nên vô
                hình với người mắc Deuteranopia nếu chỉ dựa vào sắc màu đơn thuần mà không có sự chênh
                lệch độ sáng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Cẩm nang thiết kế thân thiện */}
      {activeTab === 'design-guide' && (
        <div className="p-6 rounded-3xl bg-[#11141B] border border-gray-800 space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>5 Nguyên tắc vàng thiết kế biểu đồ & hình ảnh thân thiện</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Áp dụng cho báo cáo doanh nghiệp, tài liệu giảng dạy, slide thuyết trình và giao diện phần mềm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0B0D13] border border-gray-800 space-y-2">
              <span className="font-mono text-xs font-bold text-cyan-400">#01. Đa phương thức (Dual Encoding)</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tuyệt đối không dùng màu sắc làm tín hiệu nhận biết duy nhất. Luôn kết hợp kèm theo
                <strong> hoa văn (stripes, dots, hatch)</strong>, <strong>ký hiệu biểu tượng</strong>{' '}
                hoặc <strong>chữ viết</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D13] border border-gray-800 space-y-2">
              <span className="font-mono text-xs font-bold text-purple-400">#02. Đảm bảo độ tương phản sáng tối (Luminance)</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Đảm bảo tỷ lệ tương phản tối thiểu <strong>4.5:1</strong> theo tiêu chuẩn WCAG 2.1 AA.
                Một cặp màu có thể nhìn nhạt nhòa nếu có cùng độ sáng (Lightness) dù sắc thái khác nhau.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D13] border border-gray-800 space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400">#03. Dán nhãn trực tiếp (Direct Labeling)</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Đặt tên và số liệu trực tiếp lên đường kẻ hoặc thanh cột biểu đồ, thay vì đặt một
                thanh chú giải rời rạc (legend) ở góc xa khiến người dùng phải đối chiếu qua lại.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D13] border border-gray-800 space-y-2">
              <span className="font-mono text-xs font-bold text-yellow-400">#04. Tránh các cặp màu cấm kỵ</span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Hạn chế dùng: Đỏ vs Xanh lá, Xanh lam vs Tím, Nâu vs Xanh lá, Xanh lam nhạt vs Xám.
                Nếu bắt buộc phải dùng, hãy làm một màu thật sáng và màu kia thật tối.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Giải mã bảng Ishihara */}
      {activeTab === 'ishihara' && (
        <div className="p-6 rounded-3xl bg-[#11141B] border border-gray-800 space-y-5 animate-in fade-in duration-200">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-pink-400" />
            <span>Cơ chế đằng sau bảng thử nghiệm Ishihara Test</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Stylized Ishihara Plate Simulation */}
            <div className="relative w-64 h-64 mx-auto rounded-full bg-[#182016] border-4 border-gray-700 flex items-center justify-center overflow-hidden shadow-2xl p-4">
              {/* Pseudo dot clusters */}
              <div className="absolute inset-0 opacity-80 flex flex-wrap gap-1 p-2 items-center justify-center">
                {[...Array(90)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: `${(i % 4) * 3 + 8}px`,
                      height: `${(i % 4) * 3 + 8}px`,
                      backgroundColor: i % 3 === 0 ? '#15803D' : i % 3 === 1 ? '#84CC16' : '#166534',
                    }}
                  />
                ))}
              </div>

              {/* Number 74 in Red/Orange dots */}
              <div className="relative z-10 font-black text-6xl tracking-tight text-[#EF4444] drop-shadow-md font-mono select-none">
                74
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-300 leading-relaxed">
              <p>
                Bác sĩ <strong>Shinobu Ishihara</strong> sáng tạo ra bảng kiểm tra thị giác màu vào
                năm 1917 tại Đại học Tokyo. Bảng gồm các vòng tròn tạo bởi hàng trăm chấm nhỏ có kích
                thước và độ sáng ngẫu nhiên:
              </p>
              <ul className="list-disc pl-5 space-y-1 font-mono">
                <li>
                  <strong>Người có thị giác bình thường:</strong> Đọc được con số <span className="text-red-400 font-bold">74</span> rõ ràng do phân biệt được sự tương phản giữa các chấm đỏ/cam và nền chấm xanh.
                </li>
                <li>
                  <strong>Người mắc mù màu đỏ - xanh lá:</strong> Chỉ đọc thành số <span className="text-yellow-400 font-bold">21</span> hoặc hoàn toàn không nhìn thấy con số nào vì các chấm đỏ và xanh bị đồng hóa sắc độ.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

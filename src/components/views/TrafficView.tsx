import React, { useState, useEffect } from 'react';
import { playTrafficTone, speakText } from '../../utils/audioUtils';
import { useApp } from '../../context/AppContext';
import {
  Volume2,
  Play,
  Pause,
  AlertTriangle,
  ShieldAlert,
  ArrowDown,
  ArrowUp,
  Minus,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

type TrafficState = 'red' | 'yellow' | 'green';

export const TrafficView: React.FC = () => {
  const { settings } = useApp();
  const [activeSignal, setActiveSignal] = useState<TrafficState>('red');
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(false);
  const [pedestrianState, setPedestrianState] = useState<'stop' | 'walk'>('stop');

  // Trigger tone and speech when signal changes
  const triggerSignal = (state: TrafficState) => {
    setActiveSignal(state);
    if (state === 'red') setPedestrianState('stop');
    else if (state === 'green') setPedestrianState('walk');
    else setPedestrianState('stop');

    if (settings.soundEffects) {
      playTrafficTone(state);
    }
    if (settings.audioDescription) {
      if (state === 'red') {
        speakText('Đèn đỏ. Dừng lại. Vị trí trên cùng.', settings.speechLanguage);
      } else if (state === 'yellow') {
        speakText('Đèn vàng. Chờ và giảm tốc. Vị trí ở giữa.', settings.speechLanguage);
      } else {
        speakText('Đèn xanh. Được đi. Vị trí dưới cùng.', settings.speechLanguage);
      }
    }
  };

  // Auto cycling
  useEffect(() => {
    if (!isAutoCycle) return;
    let timer: NodeJS.Timeout;

    if (activeSignal === 'red') {
      timer = setTimeout(() => triggerSignal('green'), 5000);
    } else if (activeSignal === 'green') {
      timer = setTimeout(() => triggerSignal('yellow'), 5000);
    } else {
      timer = setTimeout(() => triggerSignal('red'), 2500);
    }

    return () => clearTimeout(timer);
  }, [isAutoCycle, activeSignal]);

  const trafficData = {
    red: {
      colorNameVi: 'ĐỎ',
      colorNameEn: 'RED',
      actionVi: 'DỪNG LẠI (STOP)',
      actionEn: 'STOP',
      positionVi: 'VỊ TRÍ TRÊN CÙNG (TOP)',
      positionEn: 'Top Position',
      iconChar: '🛑',
      symbolPattern: '/////',
      hex: '#EF4444',
      bgGlow: 'shadow-[0_0_35px_rgba(239,68,68,0.7)]',
      borderGlow: 'border-red-500',
      description: 'Luật giao thông quốc tế quy định: Đèn ĐỎ luôn nằm ở vị trí TRÊN CÙNG (với cột đứng) hoặc BÊN TRÁI (với cột ngang). Khi đèn này sáng, bắt buộc phải dừng trước vạch.',
    },
    yellow: {
      colorNameVi: 'VÀNG',
      colorNameEn: 'YELLOW',
      actionVi: 'CHỜ / GIẢM TỐC (WAIT)',
      actionEn: 'WAIT / CAUTION',
      positionVi: 'VỊ TRÍ Ở GIỮA (MIDDLE)',
      positionEn: 'Middle Position',
      iconChar: '⚠️',
      symbolPattern: 'xxxxx',
      hex: '#FACC15',
      bgGlow: 'shadow-[0_0_35px_rgba(250,204,21,0.7)]',
      borderGlow: 'border-yellow-400',
      description: 'Đèn VÀNG luôn nằm ở vị trí Ở GIỮA. Báo hiệu sắp chuyển sang đèn đỏ, cần dừng lại trước vạch dừng, trừ khi đã đi quá vạch.',
    },
    green: {
      colorNameVi: 'XANH LÁ',
      colorNameEn: 'GREEN',
      actionVi: 'ĐƯỢC ĐI (GO)',
      actionEn: 'GO',
      positionVi: 'VỊ TRÍ DƯỚI CÙNG (BOTTOM)',
      positionEn: 'Bottom Position',
      iconChar: '🟢',
      symbolPattern: '•••••',
      hex: '#22C55E',
      bgGlow: 'shadow-[0_0_35px_rgba(34,197,94,0.7)]',
      borderGlow: 'border-green-500',
      description: 'Đèn XANH luôn nằm ở vị trí DƯỚI CÙNG (với cột đứng) hoặc BÊN PHẢI (với cột ngang). Phương tiện được phép di chuyển khi đảm bảo an toàn.',
    },
  };

  const current = trafficData[activeSignal];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-green-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🚦</span>
          <span>Chế độ đèn giao thông – Traffic Mode</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Hệ thống nhận diện tín hiệu 3 tầng đa giác quan: Kết hợp <strong>Màu sắc</strong> +{' '}
          <strong>Vị trí vật lý (Trên / Giữa / Dưới)</strong> + <strong>Ký hiệu chữ số</strong> +{' '}
          <strong>Âm thanh tần số</strong>.
        </p>
      </div>

      {/* Safety Mandatory Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-300 text-xs uppercase tracking-wide">
            Cảnh báo an toàn giao thông:
          </strong>
          <p className="text-xs text-gray-300 leading-relaxed">
            Chức năng chỉ mang tính hỗ trợ học tập, rèn luyện thói quen quan sát vị trí và tăng
            cường nhận thức. <strong>Không được sử dụng</strong> như phương tiện duy nhất để đưa ra
            quyết định điều khiển phương tiện khi đang tham gia giao thông trực tiếp trên đường phố.
          </p>
        </div>
      </div>

      {/* Main Interactive Signal Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Realistic 3-Lamp Traffic Housing */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-48 sm:w-56 p-5 rounded-[40px] bg-gradient-to-b from-[#1C1F28] via-[#10131A] to-[#0A0C10] border-4 border-[#2D3344] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center gap-4">
            {/* Top Sun Visor Caps */}
            <div className="w-28 h-2 bg-[#2D3344] rounded-t-full -mt-2" />

            {/* 1. RED LAMP (TOP) */}
            <button
              onClick={() => triggerSignal('red')}
              className={`relative w-32 h-32 rounded-full border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none ${
                activeSignal === 'red'
                  ? `bg-[#EF4444] ${trafficData.red.borderGlow} ${trafficData.red.bgGlow} scale-105`
                  : 'bg-[#3A1414] border-[#4A1D1D] opacity-40 hover:opacity-60'
              }`}
              title="Đèn Đỏ - Vị trí Trên cùng - Dừng lại"
            >
              <span className="text-xl">🛑</span>
              <span
                className={`font-mono text-xs font-black tracking-wider ${
                  activeSignal === 'red' ? 'text-white drop-shadow-md' : 'text-gray-500'
                }`}
              >
                STOP
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/90">
                /////
              </span>
            </button>

            {/* 2. YELLOW LAMP (MIDDLE) */}
            <button
              onClick={() => triggerSignal('yellow')}
              className={`relative w-32 h-32 rounded-full border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none ${
                activeSignal === 'yellow'
                  ? `bg-[#EAB308] ${trafficData.yellow.borderGlow} ${trafficData.yellow.bgGlow} scale-105`
                  : 'bg-[#332B12] border-[#453818] opacity-40 hover:opacity-60'
              }`}
              title="Đèn Vàng - Vị trí Ở giữa - Chờ"
            >
              <span className="text-xl">⚠️</span>
              <span
                className={`font-mono text-xs font-black tracking-wider ${
                  activeSignal === 'yellow' ? 'text-black drop-shadow-sm' : 'text-gray-500'
                }`}
              >
                WAIT
              </span>
              <span className="text-[10px] font-mono tracking-widest text-black/80 font-bold">
                xxxxx
              </span>
            </button>

            {/* 3. GREEN LAMP (BOTTOM) */}
            <button
              onClick={() => triggerSignal('green')}
              className={`relative w-32 h-32 rounded-full border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none ${
                activeSignal === 'green'
                  ? `bg-[#22C55E] ${trafficData.green.borderGlow} ${trafficData.green.bgGlow} scale-105`
                  : 'bg-[#102B19] border-[#163821] opacity-40 hover:opacity-60'
              }`}
              title="Đèn Xanh - Vị trí Dưới cùng - Được đi"
            >
              <span className="text-xl">🟢</span>
              <span
                className={`font-mono text-xs font-black tracking-wider ${
                  activeSignal === 'green' ? 'text-white drop-shadow-md' : 'text-gray-500'
                }`}
              >
                GO
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/90">
                •••••
              </span>
            </button>

            {/* Pole Base */}
            <div className="w-12 h-10 bg-[#1F2430] border-x-2 border-[#2D3344] -mb-5" />
          </div>

          {/* Auto Cycle Controller */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsAutoCycle(!isAutoCycle)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isAutoCycle
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#181D2A] text-gray-300 hover:text-white border border-gray-700'
              }`}
            >
              {isAutoCycle ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isAutoCycle ? 'Tạm dừng chu kỳ tự động' : 'Tự động chạy chu kỳ đèn'}</span>
            </button>

            <button
              onClick={() => {
                if (activeSignal === 'red') triggerSignal('green');
                else if (activeSignal === 'green') triggerSignal('yellow');
                else triggerSignal('red');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#181D2A] hover:bg-gray-800 text-xs font-semibold text-gray-300 border border-gray-700"
            >
              Chuyển tiếp
            </button>
          </div>
        </div>

        {/* Right: Dynamic Multi-Sensory Cue Information Board */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Status Display Board */}
          <div className="p-6 rounded-3xl bg-[#11141B] border-2 border-purple-500/40 space-y-5 shadow-2xl relative overflow-hidden">
            {/* Top Indicator Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
              style={{ backgroundColor: current.hex }}
            />

            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                Tín hiệu hiện tại
              </span>
              <button
                onClick={() => {
                  if (activeSignal === 'red') {
                    speakText('Đỏ. Dừng lại. Vị trí trên cùng.', settings.speechLanguage);
                  } else if (activeSignal === 'yellow') {
                    speakText('Đèn vàng. Chờ. Vị trí ở giữa.', settings.speechLanguage);
                  } else {
                    speakText('Đèn xanh. Được đi. Vị trí dưới cùng.', settings.speechLanguage);
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát âm thanh mô tả</span>
              </button>
            </div>

            {/* Giant Action Cue */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl shadow-lg shrink-0"
                style={{
                  backgroundColor: current.hex,
                  borderColor: '#FFFFFF',
                  color: activeSignal === 'yellow' ? '#000000' : '#FFFFFF',
                }}
              >
                {current.iconChar}
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-gray-400 block uppercase">
                  Quyết định hành động:
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  {current.actionVi}
                </h3>
                <p className="text-sm font-bold text-gray-400 font-mono">{current.actionEn}</p>
              </div>
            </div>

            {/* 3 Physical Anchor Cues: Position + Color + Symbol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* 1. Position Cue */}
              <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  1. Vị trí vật lý
                </span>
                <span className="font-extrabold text-cyan-400 text-sm block">
                  {current.positionVi}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {activeSignal === 'red'
                    ? 'Ngăn trên cùng của cột'
                    : activeSignal === 'yellow'
                    ? 'Ngăn chính giữa của cột'
                    : 'Ngăn dưới đáy của cột'}
                </span>
              </div>

              {/* 2. Color Cue */}
              <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  2. Tên màu & Mã
                </span>
                <span className="font-extrabold text-white text-sm block">
                  {current.colorNameVi} ({current.colorNameEn})
                </span>
                <span className="text-[10px] font-mono text-gray-400 block">{current.hex}</span>
              </div>

              {/* 3. Symbol Pattern Cue */}
              <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">
                  3. Ký hiệu hoa văn
                </span>
                <span className="font-mono font-black text-yellow-300 text-base block tracking-widest">
                  {current.symbolPattern}
                </span>
                <span className="text-[10px] text-gray-400 block">Mã ký hiệu CHROMA X</span>
              </div>
            </div>

            {/* In-depth advice for color-blind commuters */}
            <div className="p-3.5 rounded-xl bg-[#0C0F17] border border-gray-800 text-xs text-gray-300 leading-relaxed">
              <span className="font-bold text-white block mb-0.5">Lời khuyên phản xạ:</span>
              {current.description}
            </div>
          </div>

          {/* Pedestrian Crossing Module */}
          <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase block">
                Tín hiệu người đi bộ qua đường (Pedestrian Cue)
              </span>
              <p className="text-sm font-bold text-white mt-0.5">
                {pedestrianState === 'walk' ? '🚶 BƯỚC ĐI (WALK)' : '🛑 DỪNG LẠI (DON\'T WALK)'}
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-xl font-bold font-mono text-xs flex items-center gap-2 ${
                pedestrianState === 'walk'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              }`}
            >
              <span>{pedestrianState === 'walk' ? '🚶' : '🛑'}</span>
              <span>{pedestrianState === 'walk' ? 'WALK' : 'WAIT'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

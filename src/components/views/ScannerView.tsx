import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeColor, rgbToHex } from '../../utils/colorUtils';
import { ColorData } from '../../types';
import { PatternSwatch } from '../common/PatternSwatch';
import {
  Camera,
  Upload,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  AlertCircle,
  Eye,
  Crosshair,
  Sliders,
  Sparkles,
} from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    name: 'Hoa tulip & thiên nhiên',
    url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Đèn giao thông thành phố',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Trang phục & phụ kiện',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Trái cây rực rỡ',
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
  },
];

export const ScannerView: React.FC = () => {
  const { addRecentColor, announceColor, recentColors } = useApp();

  const [mode, setMode] = useState<'camera' | 'upload'>('upload');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraFrozen, setIsCameraFrozen] = useState(false);

  const [activeColor, setActiveColor] = useState<ColorData>(() =>
    analyzeColor('#243B64')
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Loupe pointer state
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [hoverColorHex, setHoverColorHex] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Load image to canvas
  const loadImageToCanvas = useCallback((src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Set reasonable canvas dimensions
      const maxW = 900;
      const scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Auto sample center pixel without triggering automatic toast/speech on mount
      samplePixelAt(canvas.width / 2, canvas.height / 2, false);
    };
    img.onerror = () => {
      // Draw fallback colorful test card if external image fails
      canvas.width = 600;
      canvas.height = 400;
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, 600, 400);

      // Swatches
      const colors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', '#3B82F6', '#A855F7', '#EC4899'];
      colors.forEach((c, idx) => {
        ctx.fillStyle = c;
        ctx.fillRect(40 + idx * 65, 120, 55, 160);
      });
      samplePixelAt(300, 200, false);
    };
    img.src = src;
  }, []);

  // Initial load
  useEffect(() => {
    loadImageToCanvas(SAMPLE_IMAGES[0].url);
  }, [loadImageToCanvas]);

  // Clean up camera on unmount or mode switch
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setIsCameraFrozen(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt không hỗ trợ truy cập camera.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Không thể kết nối camera.';
      setCameraError(
        `Không thể mở camera (${errorMsg}). Vui lòng cấp quyền trong cài đặt trình duyệt hoặc sử dụng tính năng tải ảnh tải lên từ thiết bị.`
      );
      setCameraActive(false);
      setMode('upload');
    }
  };

  // Capture frame from video to canvas
  const captureVideoFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setIsCameraFrozen(true);
    samplePixelAt(canvas.width / 2, canvas.height / 2, true);
  };

  // Sample pixel from canvas
  const samplePixelAt = (x: number, y: number, saveToRecent: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const clampedX = Math.max(0, Math.min(canvas.width - 1, Math.floor(x)));
    const clampedY = Math.max(0, Math.min(canvas.height - 1, Math.floor(y)));

    try {
      const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      const analyzed = analyzeColor(hex);

      setHoverColorHex(hex);
      setActiveColor(analyzed);

      if (saveToRecent) {
        addRecentColor(analyzed);
      }
    } catch (err) {
      console.warn('Canvas pixel sample failed:', err);
    }
  };

  // Handle canvas interactions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    samplePixelAt(x, y, true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    samplePixelAt(x, y, false);
  };

  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    setCursorPos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    samplePixelAt(x, y, true);
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        loadImageToCanvas(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#11141B] border border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📷</span>
            <span>Nhận diện màu – Color Scanner</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Mở camera hoặc tải hình ảnh, chạm bất kỳ điểm nào trên ảnh để kiểm tra màu sắc tức thì
          </p>
        </div>

        {/* Source switch buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('camera');
              startCamera();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'camera' && cameraActive
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'bg-[#181D2A] text-gray-300 hover:text-white border border-gray-700'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Mở Camera</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setMode('upload');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'upload'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'bg-[#181D2A] text-gray-300 hover:text-white border border-gray-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Tải hình ảnh</span>
          </button>
        </div>
      </div>

      {/* Camera Permission Alert (If camera failed/denied) */}
      {cameraError && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
          <div className="space-y-2 flex-1">
            <p className="text-xs font-semibold">{cameraError}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCameraError(null);
                  setMode('upload');
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-200 border border-amber-500/50"
              >
                Chuyển sang tải ảnh từ thiết bị
              </button>
              <button
                onClick={() => setCameraError(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-gray-200"
              >
                Bỏ qua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Scanner Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas Viewport & Camera Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl bg-[#0B0D13] border border-gray-800 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[380px]">
            {/* Live Camera View */}
            {mode === 'camera' && cameraActive && !isCameraFrozen && (
              <div className="relative w-full h-[400px] flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Target Reticle in Camera Center */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.6)] flex items-center justify-center">
                    <Crosshair className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>

                {/* Capture snapshot button */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  <button
                    onClick={captureVideoFrame}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-black font-bold text-xs shadow-lg hover:bg-cyan-400 active:scale-95 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Chụp & Lấy mẫu màu</span>
                  </button>
                </div>
              </div>
            )}

            {/* Canvas View (for Uploaded Image or Captured Frame) */}
            <div
              className={`relative w-full overflow-hidden flex items-center justify-center bg-[#090B10] cursor-crosshair ${
                mode === 'camera' && cameraActive && !isCameraFrozen ? 'hidden' : 'block'
              }`}
              onMouseLeave={() => setCursorPos(null)}
            >
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onTouchStart={handleCanvasTouch}
                onTouchMove={handleCanvasTouch}
                className="max-w-full h-auto max-h-[500px] object-contain select-none"
              />

              {/* Magnifier Reticle & Hover Color Preview */}
              {cursorPos && hoverColorHex && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                  style={{ left: cursorPos.x, top: cursorPos.y }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: hoverColorHex }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white ring-2 ring-black" />
                  </div>
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-white shadow">
                    {hoverColorHex}
                  </span>
                </div>
              )}
            </div>

            {/* Canvas overlay instructions */}
            <div className="w-full bg-[#11141B] px-4 py-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chạm hoặc click bất kỳ điểm nào trên ảnh để lấy màu</span>
              </span>

              {isCameraFrozen && (
                <button
                  onClick={() => setIsCameraFrozen(false)}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Quay lại camera động</span>
                </button>
              )}
            </div>
          </div>

          {/* Preset Sample Images & File Input */}
          <div className="p-4 rounded-xl bg-[#11141B] border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
                Chọn ảnh mẫu thử nghiệm hoặc tải ảnh của bạn
              </span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh từ máy tính / điện thoại</span>
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.name}
                  onClick={() => {
                    stopCamera();
                    setMode('upload');
                    loadImageToCanvas(img.url);
                  }}
                  className="group relative rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/80 transition-all text-left"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-16 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] text-white font-medium truncate">
                      {img.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Color Breakdown & Audio */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#11141B] border border-purple-500/30 p-5 shadow-2xl relative overflow-hidden space-y-5">
            {/* Top decorative gradient bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: activeColor.hex }}
            />

            {/* Header: Verified Color Detected */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  COLOR DETECTED
                </span>
              </div>
              <button
                onClick={() => announceColor(activeColor)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/25 border border-purple-500/40 text-purple-300 hover:bg-purple-600/40 text-xs font-semibold transition-all"
                title="Đọc thông tin màu bằng giọng nói"
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Đọc màu</span>
              </button>
            </div>

            {/* Main Swatch & Names */}
            <div className="flex items-start gap-4">
              <PatternSwatch
                color={activeColor}
                size="xl"
                showSymbol={true}
                className="ring-2 ring-white/10 shadow-lg"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-2xl font-black text-white leading-tight">
                  {activeColor.nameVi}
                </h3>
                <p className="text-sm font-semibold text-gray-400">
                  {activeColor.nameEn}
                </p>

                {/* Pattern Tag */}
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 mt-1">
                  <span className="font-mono font-bold text-xs text-purple-300">
                    {activeColor.pattern.symbol}
                  </span>
                  <span className="text-[11px] text-gray-300 font-sans">
                    {activeColor.pattern.nameVi}
                  </span>
                </div>
              </div>
            </div>

            {/* Color Codes (HEX & RGB) with Copy */}
            <div className="grid grid-cols-2 gap-3">
              {/* HEX */}
              <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Mã HEX
                  </span>
                  <span className="font-mono text-base font-bold text-white">
                    {activeColor.hex}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(activeColor.hex, 'hex')}
                  className="p-1.5 rounded-lg bg-gray-800/80 text-gray-300 hover:text-white transition-colors"
                  title="Sao chép mã HEX"
                >
                  {copiedKey === 'hex' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* RGB */}
              <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    Mã RGB
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    {activeColor.rgb.r}, {activeColor.rgb.g}, {activeColor.rgb.b}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(
                      `rgb(${activeColor.rgb.r}, ${activeColor.rgb.g}, ${activeColor.rgb.b})`,
                      'rgb'
                    )
                  }
                  className="p-1.5 rounded-lg bg-gray-800/80 text-gray-300 hover:text-white transition-colors"
                  title="Sao chép RGB"
                >
                  {copiedKey === 'rgb' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Brightness & Saturation Metrics */}
            <div className="space-y-3 p-4 rounded-xl bg-[#0C0F17] border border-gray-800/90">
              {/* Brightness */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Độ sáng (Brightness):</span>
                  </span>
                  <span className="font-bold text-white">
                    {activeColor.brightnessLevel} ({activeColor.brightnessPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-700 via-yellow-500 to-amber-300 transition-all duration-300"
                    style={{ width: `${activeColor.brightnessPercent}%` }}
                  />
                </div>
              </div>

              {/* Saturation */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Độ bão hòa (Saturation):</span>
                  </span>
                  <span className="font-bold text-white">
                    {activeColor.saturationLevel} ({activeColor.saturationPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-700 via-cyan-500 to-blue-400 transition-all duration-300"
                    style={{ width: `${activeColor.saturationPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Description Text summary according to user prompt example */}
            <div className="p-3 rounded-xl bg-[#090B10] border border-gray-800 text-xs text-gray-300 leading-relaxed font-mono">
              <span className="text-purple-400 font-bold block mb-1">
                // Tổng hợp thông tin:
              </span>
              “{activeColor.nameVi} – {activeColor.hex} – RGB {activeColor.rgb.r},{' '}
              {activeColor.rgb.g}, {activeColor.rgb.b} – Độ sáng{' '}
              {activeColor.brightnessLevel.toLowerCase()} – Độ bão hòa{' '}
              {activeColor.saturationLevel.toLowerCase()}”
            </div>
          </div>

          {/* Recent sampled history */}
          {recentColors.length > 0 && (
            <div className="p-4 rounded-xl bg-[#11141B] border border-gray-800 space-y-2">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                Lịch sử lấy mẫu gần đây
              </span>
              <div className="flex flex-wrap gap-2">
                {recentColors.slice(0, 10).map((c, i) => (
                  <button
                    key={`${c.hex}-${i}`}
                    onClick={() => setActiveColor(c)}
                    className="group relative"
                    title={`${c.nameVi} (${c.hex})`}
                  >
                    <PatternSwatch color={c} size="sm" showSymbol={true} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

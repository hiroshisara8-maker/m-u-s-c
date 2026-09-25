import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { playSuccessChime, playErrorBuzz } from '../../utils/audioUtils';
import {
  Gamepad2,
  Trophy,
  Timer,
  RefreshCw,
  CheckCircle,
  XCircle,
  Sparkles,
  HelpCircle,
  Play,
  Layers,
  AlertCircle,
} from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

interface DifficultyConfig {
  gridSize: number; // 3 -> 3x3
  deltaLightness: number; // percentage
  label: string;
}

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: { gridSize: 3, deltaLightness: 24, label: 'Dễ (3x3)' },
  medium: { gridSize: 4, deltaLightness: 14, label: 'Trung bình (4x4)' },
  hard: { gridSize: 5, deltaLightness: 8, label: 'Khó (5x5)' },
  expert: { gridSize: 6, deltaLightness: 4.5, label: 'Chuyên gia (6x6)' },
};

export const ColorGameView: React.FC = () => {
  const { settings } = useApp();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [assistMode, setAssistMode] = useState(false);

  // Round state
  const [baseColor, setBaseColor] = useState<{ h: number; s: number; l: number }>({ h: 210, s: 70, l: 50 });
  const [oddIndex, setOddIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const config = DIFFICULTIES[difficulty];

  // Generate new round
  const nextRound = useCallback(() => {
    const totalTiles = config.gridSize * config.gridSize;
    const randomOdd = Math.floor(Math.random() * totalTiles);
    setOddIndex(randomOdd);

    const randomHue = Math.floor(Math.random() * 360);
    const randomSat = 50 + Math.floor(Math.random() * 40);
    const randomLight = 35 + Math.floor(Math.random() * 30);

    setBaseColor({ h: randomHue, s: randomSat, l: randomLight });
  }, [config.gridSize]);

  // Start Game
  const startGame = () => {
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(45);
    setGameOver(false);
    setIsPlaying(true);
    nextRound();
  };

  // Timer tick
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  // Tile click handler
  const handleTileClick = (index: number) => {
    if (!isPlaying || gameOver) return;

    if (index === oddIndex) {
      // Correct
      if (settings.soundEffects) playSuccessChime();
      const points = 100 + streak * 20;
      setScore((s) => s + points);
      setStreak((st) => st + 1);
      setCorrectCount((c) => c + 1);
      nextRound();
    } else {
      // Wrong
      if (settings.soundEffects) playErrorBuzz();
      setStreak(0);
      setWrongCount((w) => w + 1);
      // Small time penalty
      setTimeLeft((t) => Math.max(0, t - 2));
    }
  };

  const totalTiles = config.gridSize * config.gridSize;
  const oddLightness =
    baseColor.l > 50
      ? Math.max(10, baseColor.l - config.deltaLightness)
      : Math.min(90, baseColor.l + config.deltaLightness);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-emerald-500/30">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🎮</span>
          <span>Trò chơi phân biệt màu – Chroma Quest</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Rèn luyện thị giác và độ nhạy màu: Tìm ô có sắc độ khác biệt trong nhóm màu.
        </p>
      </div>

      {/* Control bar: Scoreboard + Difficulty + Timer */}
      <div className="p-4 rounded-2xl bg-[#11141B] border border-gray-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Difficulty selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090B10] border border-gray-800">
            {(Object.keys(DIFFICULTIES) as Difficulty[]).map((d) => (
              <button
                key={d}
                disabled={isPlaying}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  difficulty === d
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white disabled:opacity-50'
                }`}
              >
                {DIFFICULTIES[d].label}
              </button>
            ))}
          </div>

          {/* Pattern Assist Toggle */}
          <button
            onClick={() => setAssistMode(!assistMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              assistMode
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                : 'bg-[#181D2A] text-gray-400 border border-gray-800'
            }`}
            title="Hiển thị ký hiệu trợ giúp trên ô khác biệt"
          >
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            <span>Trợ giúp Pattern: {assistMode ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>

        {/* Live Metrics: Score, Streak, Timer, Correct/Wrong */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#0C0F17] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Điểm số</span>
              <span className="text-xl font-black text-white">{score}</span>
            </div>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>

          <div className="p-3 rounded-xl bg-[#0C0F17] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Thời gian</span>
              <span
                className={`text-xl font-black ${
                  timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'
                }`}
              >
                {timeLeft}s
              </span>
            </div>
            <Timer className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="p-3 rounded-xl bg-[#0C0F17] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Đúng / Sai</span>
              <span className="text-base font-bold text-white">
                <span className="text-emerald-400">{correctCount}</span> /{' '}
                <span className="text-red-400">{wrongCount}</span>
              </span>
            </div>
            <div className="flex gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0C0F17] border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-mono block">Chuỗi combo</span>
              <span className="text-xl font-black text-purple-400">{streak}x</span>
            </div>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Main Interactive Game Board */}
      <div className="relative p-6 rounded-3xl bg-[#090B10] border border-gray-800 flex flex-col items-center justify-center min-h-[440px] shadow-2xl">
        {!isPlaying && !gameOver && (
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto shadow-lg">
              🎯
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Sẵn sàng thử thách thị giác?</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Nhấp vào ô có màu khác biệt nhanh nhất có thể trước khi hết thời gian 45 giây.
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              Bắt đầu trò chơi
            </button>
          </div>
        )}

        {/* Active Game Grid */}
        {isPlaying && !gameOver && (
          <div
            className="w-full max-w-md aspect-square grid gap-2.5 p-2 bg-[#11141B] rounded-2xl border border-gray-800 shadow-xl"
            style={{
              gridTemplateColumns: `repeat(${config.gridSize}, minmax(0, 1fr))`,
            }}
          >
            {[...Array(totalTiles)].map((_, i) => {
              const isOdd = i === oddIndex;
              const h = baseColor.h;
              const s = baseColor.s;
              const l = isOdd ? oddLightness : baseColor.l;
              const bgStyle = `hsl(${h}, ${s}%, ${l}%)`;

              return (
                <button
                  key={i}
                  onClick={() => handleTileClick(i)}
                  className="rounded-xl transition-transform active:scale-95 border border-white/10 hover:brightness-105 flex items-center justify-center relative overflow-hidden select-none"
                  style={{ backgroundColor: bgStyle }}
                  aria-label={`Ô màu số ${i + 1}`}
                >
                  {/* Assist Mode Marker */}
                  {assistMode && isOdd && (
                    <span className="font-mono text-xs font-bold px-1 py-0.5 rounded bg-black/70 text-yellow-300 border border-yellow-400/50">
                      ★
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="text-center space-y-4 max-w-md animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl mx-auto">
              🏆
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Kết thúc lượt chơi!</h3>
              <p className="text-xs text-gray-400 mt-1">
                Bạn đã đạt được số điểm ấn tượng:
              </p>
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2">
                {score} điểm
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-[#11141B] border border-gray-800">
              <div>
                <span className="text-gray-400 block font-mono">Số câu đúng:</span>
                <span className="font-bold text-emerald-400 text-base">{correctCount}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-mono">Số lần chọn sai:</span>
                <span className="font-bold text-red-400 text-base">{wrongCount}</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-lg hover:bg-purple-500 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Chơi lại lượt mới</span>
            </button>
          </div>
        )}
      </div>

      {/* Disclaimer Required by Prompt */}
      <div className="p-4 rounded-xl bg-[#141824] border border-gray-800 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400 leading-relaxed">
          * Lưu ý quan trọng: Điểm số và kết quả của trò chơi chỉ phục vụ mục đích giải trí và rèn
          luyện khả năng quan sát độ chênh lệch ánh sáng. <strong>Không được sử dụng</strong> để
          kết luận hoặc chẩn đoán người dùng có bị mù màu hay không.
        </p>
      </div>
    </div>
  );
};

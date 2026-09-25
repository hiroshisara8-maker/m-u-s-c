import { ColorData } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playColorTone(color: ColorData) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Map Hue (0-360) and Lightness (0-100) to musical frequency (180Hz - 900Hz)
    // Warm colors (red, orange, yellow) and bright colors have higher frequencies
    const baseFreq = 220 + (color.hsl.h / 360) * 440;
    const lightnessMod = (color.hsl.l / 100) * 160;
    const finalFreq = Math.min(1000, Math.max(120, baseFreq + lightnessMod));

    osc.type = color.hsl.s > 50 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(finalFreq, ctx.currentTime);

    // Envelope
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.48);
  } catch (err) {
    console.warn('Audio tone could not play', err);
  }
}

export function playTrafficTone(state: 'red' | 'yellow' | 'green') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (state === 'red') {
      // Urgent, low-double pulsed tone (Stop!)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (state === 'yellow') {
      // Caution warble
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(390, now + 0.25);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } else {
      // Pleasant rising chime (Go!)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (err) {
    console.warn('Traffic audio could not play', err);
  }
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  } catch (err) {
    console.warn(err);
  }
}

export function playErrorBuzz() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  } catch (err) {
    console.warn(err);
  }
}

export function speakColorDescription(
  color: ColorData,
  lang: 'vi' | 'en' = 'vi'
): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      let textToSpeak = '';
      let speechLang = 'vi-VN';

      if (lang === 'vi') {
        textToSpeak = `${color.nameVi}. Mã màu ${color.hex.replace('#', '')}. Độ sáng ${color.brightnessLevel}. Độ bão hòa ${color.saturationLevel}. Ký hiệu hoa văn: ${color.pattern.nameVi}.`;
        speechLang = 'vi-VN';
      } else {
        textToSpeak = `${color.nameEn}. Hex ${color.hex.replace('#', '')}. ${color.brightnessLevelEn} brightness. ${color.saturationLevelEn} saturation. Pattern: ${color.pattern.nameEn}.`;
        speechLang = 'en-US';
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = speechLang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select best voice if available
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find((v) => v.lang.startsWith(lang));
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
      resolve(false);
    }
  });
}

export function speakText(text: string, lang: 'vi' | 'en' = 'vi'): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(false);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
      utterance.rate = 1.0;
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      resolve(false);
    }
  });
}

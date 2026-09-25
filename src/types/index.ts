export type TabType = 
  | 'home'
  | 'scanner'
  | 'compare'
  | 'pattern-code'
  | 'vision-sim'
  | 'traffic'
  | 'outfit'
  | 'chart'
  | 'audio-color'
  | 'game'
  | 'knowledge'
  | 'settings';

export type PatternFamily = 
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'gray'
  | 'black'
  | 'white';

export interface PatternInfo {
  family: PatternFamily;
  nameVi: string;
  nameEn: string;
  symbol: string;
  patternType: 'diagonal-stripe' | 'reverse-stripe' | 'crosshatch' | 'dots' | 'grid' | 'solid-blocks' | 'diamonds' | 'hearts' | 'waves' | 'dashed' | 'solid-dark' | 'solid-light';
  descriptionVi: string;
  descriptionEn: string;
  hueRange: [number, number]; // in degrees 0-360
  sampleHex: string;
}

export interface ColorData {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  nameVi: string;
  nameEn: string;
  brightnessPercent: number;
  brightnessLevel: 'Thấp' | 'Trung bình' | 'Cao';
  brightnessLevelEn: 'Low' | 'Medium' | 'High';
  saturationPercent: number;
  saturationLevel: 'Thấp' | 'Trung bình' | 'Cao';
  saturationLevelEn: 'Low' | 'Medium' | 'High';
  pattern: PatternInfo;
  isDarkTextPreferred: boolean;
}

export type ColorVisionDeficiency = 
  | 'normal'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'grayscale';

export interface AppSettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  highContrast: boolean;
  reducedMotion: boolean;
  patternMode: boolean;
  audioDescription: boolean;
  soundEffects: boolean;
  speechLanguage: 'vi' | 'en';
  theme: 'dark' | 'contrast' | 'neon';
}

export interface ToastMessage {
  id: string;
  type: 'color-detected' | 'pattern-toggle' | 'info' | 'warning';
  title: string;
  message: string;
  subtext?: string;
  hex?: string;
  duration?: number;
}

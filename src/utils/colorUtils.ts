import { ColorData, ColorVisionDeficiency, PatternFamily, PatternInfo } from '../types';

export const PATTERN_FAMILIES: Record<PatternFamily, PatternInfo> = {
  red: {
    family: 'red',
    nameVi: 'Đỏ',
    nameEn: 'Red',
    symbol: '/////',
    patternType: 'diagonal-stripe',
    descriptionVi: 'Vạch chéo đơn /////',
    descriptionEn: 'Diagonal stripes /////',
    hueRange: [345, 15],
    sampleHex: '#EF4444',
  },
  orange: {
    family: 'orange',
    nameVi: 'Cam',
    nameEn: 'Orange',
    symbol: '\\\\\\\\\\',
    patternType: 'reverse-stripe',
    descriptionVi: 'Vạch chéo ngược \\\\\\\\\\',
    descriptionEn: 'Reverse diagonal stripes \\\\\\\\\\',
    hueRange: [15, 45],
    sampleHex: '#F97316',
  },
  yellow: {
    family: 'yellow',
    nameVi: 'Vàng',
    nameEn: 'Yellow',
    symbol: 'xxxxx',
    patternType: 'crosshatch',
    descriptionVi: 'Ký hiệu chữ x xxxxx',
    descriptionEn: 'Crosshatch xxxxx',
    hueRange: [45, 70],
    sampleHex: '#EAB308',
  },
  green: {
    family: 'green',
    nameVi: 'Xanh lá / Lục',
    nameEn: 'Green',
    symbol: '•••••',
    patternType: 'dots',
    descriptionVi: 'Chấm tròn •••••',
    descriptionEn: 'Dotted pattern •••••',
    hueRange: [70, 165],
    sampleHex: '#22C55E',
  },
  cyan: {
    family: 'cyan',
    nameVi: 'Xanh ngọc / Cyan',
    nameEn: 'Cyan',
    symbol: '⊞⊞⊞⊞⊞',
    patternType: 'grid',
    descriptionVi: 'Lưới ô vuông ⊞⊞⊞⊞⊞',
    descriptionEn: 'Grid boxes ⊞⊞⊞⊞⊞',
    hueRange: [165, 195],
    sampleHex: '#06B6D4',
  },
  blue: {
    family: 'blue',
    nameVi: 'Xanh dương / Lam',
    nameEn: 'Blue',
    symbol: '█████',
    patternType: 'solid-blocks',
    descriptionVi: 'Khối đặc █████',
    descriptionEn: 'Solid blocks █████',
    hueRange: [195, 260],
    sampleHex: '#3B82F6',
  },
  purple: {
    family: 'purple',
    nameVi: 'Tím / Violet',
    nameEn: 'Purple',
    symbol: '✦✦✦✦✦',
    patternType: 'diamonds',
    descriptionVi: 'Hình ngôi sao / thoi ✦✦✦✦✦',
    descriptionEn: 'Diamonds / Stars ✦✦✦✦✦',
    hueRange: [260, 310],
    sampleHex: '#A855F7',
  },
  pink: {
    family: 'pink',
    nameVi: 'Hồng / Magenta',
    nameEn: 'Pink',
    symbol: '♡♡♡♡♡',
    patternType: 'hearts',
    descriptionVi: 'Hình trái tim / Vòng ♡♡♡♡♡',
    descriptionEn: 'Hearts / Rings ♡♡♡♡♡',
    hueRange: [310, 345],
    sampleHex: '#EC4899',
  },
  brown: {
    family: 'brown',
    nameVi: 'Nâu / Nâu đất',
    nameEn: 'Brown',
    symbol: '≈≈≈≈≈',
    patternType: 'waves',
    descriptionVi: 'Đường lượn sóng ≈≈≈≈≈',
    descriptionEn: 'Wave ripples ≈≈≈≈≈',
    hueRange: [15, 45],
    sampleHex: '#78350F',
  },
  gray: {
    family: 'gray',
    nameVi: 'Xám',
    nameEn: 'Gray',
    symbol: '-----',
    patternType: 'dashed',
    descriptionVi: 'Gạch ngang đứt khúc -----',
    descriptionEn: 'Dashed line -----',
    hueRange: [0, 360],
    sampleHex: '#6B7280',
  },
  black: {
    family: 'black',
    nameVi: 'Đen',
    nameEn: 'Black',
    symbol: '░░░░░',
    patternType: 'solid-dark',
    descriptionVi: 'Lưới tối đặc ░░░░░',
    descriptionEn: 'Dark shade ░░░░░',
    hueRange: [0, 360],
    sampleHex: '#0F172A',
  },
  white: {
    family: 'white',
    nameVi: 'Trắng',
    nameEn: 'White',
    symbol: '▫▫▫▫▫',
    patternType: 'solid-light',
    descriptionVi: 'Ô vuông rỗng ▫▫▫▫▫',
    descriptionEn: 'Hollow squares ▫▫▫▫▫',
    hueRange: [0, 360],
    sampleHex: '#F8FAFC',
  },
};

// Curated dictionary of common named colors
interface NamedColorRef {
  hex: string;
  nameVi: string;
  nameEn: string;
  family: PatternFamily;
}

const COLOR_DICTIONARY: NamedColorRef[] = [
  // Reds
  { hex: '#FF0000', nameVi: 'Đỏ tươi', nameEn: 'Bright Red', family: 'red' },
  { hex: '#DC2626', nameVi: 'Đỏ chuẩn', nameEn: 'Red', family: 'red' },
  { hex: '#991B1B', nameVi: 'Đỏ thẫm', nameEn: 'Dark Red', family: 'red' },
  { hex: '#7F1D1D', nameVi: 'Đỏ bầm', nameEn: 'Maroon', family: 'red' },
  { hex: '#B91C1C', nameVi: 'Đỏ gạch', nameEn: 'Brick Red', family: 'red' },
  { hex: '#F87171', nameVi: 'Đỏ nhạt', nameEn: 'Light Coral Red', family: 'red' },
  { hex: '#881337', nameVi: 'Đỏ rượu vang', nameEn: 'Wine Red', family: 'red' },

  // Oranges
  { hex: '#FF7F00', nameVi: 'Cam tươi', nameEn: 'Bright Orange', family: 'orange' },
  { hex: '#EA580C', nameVi: 'Cam đậm', nameEn: 'Deep Orange', family: 'orange' },
  { hex: '#FB923C', nameVi: 'Cam san hô', nameEn: 'Coral Orange', family: 'orange' },
  { hex: '#FFedd5', nameVi: 'Cam đào nhạt', nameEn: 'Peach', family: 'orange' },
  { hex: '#C2410C', nameVi: 'Cam đất', nameEn: 'Rust Orange', family: 'orange' },

  // Yellows
  { hex: '#FFFF00', nameVi: 'Vàng tươi', nameEn: 'Pure Yellow', family: 'yellow' },
  { hex: '#FACC15', nameVi: 'Vàng rực rỡ', nameEn: 'Bright Yellow', family: 'yellow' },
  { hex: '#CA8A04', nameVi: 'Vàng mù tạt', nameEn: 'Mustard Yellow', family: 'yellow' },
  { hex: '#FEF08A', nameVi: 'Vàng chanh nhạt', nameEn: 'Pastel Yellow', family: 'yellow' },
  { hex: '#D97706', nameVi: 'Vàng hổ phách', nameEn: 'Amber', family: 'yellow' },
  { hex: '#EAB308', nameVi: 'Vàng kim loại', nameEn: 'Gold', family: 'yellow' },

  // Greens
  { hex: '#00FF00', nameVi: 'Xanh lá dạ quang', nameEn: 'Neon Lime Green', family: 'green' },
  { hex: '#16A34A', nameVi: 'Xanh lục chuẩn', nameEn: 'Emerald Green', family: 'green' },
  { hex: '#15803D', nameVi: 'Xanh lá cây', nameEn: 'Forest Green', family: 'green' },
  { hex: '#14532D', nameVi: 'Xanh rêu đậm', nameEn: 'Dark Forest Green', family: 'green' },
  { hex: '#84CC16', nameVi: 'Xanh nõn chuối', nameEn: 'Lime Green', family: 'green' },
  { hex: '#4ADE80', nameVi: 'Xanh bạc hà', nameEn: 'Mint Green', family: 'green' },
  { hex: '#059669', nameVi: 'Xanh ngọc bích', nameEn: 'Teal Green', family: 'green' },
  { hex: '#65A30D', nameVi: 'Xanh ô liu', nameEn: 'Olive Green', family: 'green' },

  // Cyan / Teal
  { hex: '#00FFFF', nameVi: 'Xanh lơ cyan', nameEn: 'Pure Cyan', family: 'cyan' },
  { hex: '#0891B2', nameVi: 'Xanh ngọc biển', nameEn: 'Ocean Teal', family: 'cyan' },
  { hex: '#0E7490', nameVi: 'Xanh ngọc đậm', nameEn: 'Deep Cyan', family: 'cyan' },
  { hex: '#67E8F9', nameVi: 'Xanh lơ nhạt', nameEn: 'Sky Cyan', family: 'cyan' },

  // Blues
  { hex: '#0000FF', nameVi: 'Xanh lam thuần', nameEn: 'Pure Blue', family: 'blue' },
  { hex: '#2563EB', nameVi: 'Xanh dương hoàng gia', nameEn: 'Royal Blue', family: 'blue' },
  { hex: '#1D4ED8', nameVi: 'Xanh lam đậm', nameEn: 'Medium Blue', family: 'blue' },
  { hex: '#1E3A8A', nameVi: 'Xanh lam bóng đêm', nameEn: 'Midnight Blue', family: 'blue' },
  { hex: '#243B64', nameVi: 'Xanh dương thẫm', nameEn: 'Dark Blue', family: 'blue' },
  { hex: '#0F172A', nameVi: 'Xanh đen hải quân', nameEn: 'Navy Deep Blue', family: 'blue' },
  { hex: '#38BDF8', nameVi: 'Xanh da trời neon', nameEn: 'Neon Sky Blue', family: 'blue' },
  { hex: '#0284C7', nameVi: 'Xanh biển sâu', nameEn: 'Cerulean Blue', family: 'blue' },

  // Purples
  { hex: '#800080', nameVi: 'Tím đậm', nameEn: 'Purple', family: 'purple' },
  { hex: '#9333EA', nameVi: 'Tím neon', nameEn: 'Electric Violet', family: 'purple' },
  { hex: '#7C3AED', nameVi: 'Tím hoa cà', nameEn: 'Deep Purple', family: 'purple' },
  { hex: '#581C87', nameVi: 'Tím than đậm', nameEn: 'Dark Grape Purple', family: 'purple' },
  { hex: '#C084FC', nameVi: 'Tím oải hương', nameEn: 'Lavender', family: 'purple' },
  { hex: '#6366F1', nameVi: 'Xanh tím Indigo', nameEn: 'Indigo', family: 'purple' },

  // Pinks
  { hex: '#FF1493', nameVi: 'Hồng cánh sen', nameEn: 'Deep Pink', family: 'pink' },
  { hex: '#EC4899', nameVi: 'Hồng tươi', nameEn: 'Hot Pink', family: 'pink' },
  { hex: '#F472B6', nameVi: 'Hồng phấn', nameEn: 'Light Pink', family: 'pink' },
  { hex: '#BE185D', nameVi: 'Hồng mận thẫm', nameEn: 'Magenta Rose', family: 'pink' },
  { hex: '#FB7185', nameVi: 'Hồng san hô', nameEn: 'Watermelon Pink', family: 'pink' },

  // Browns
  { hex: '#78350F', nameVi: 'Nâu cà phê', nameEn: 'Coffee Brown', family: 'brown' },
  { hex: '#92400E', nameVi: 'Nâu đỏ', nameEn: 'Chestnut Brown', family: 'brown' },
  { hex: '#451A03', nameVi: 'Nâu sô cô la', nameEn: 'Dark Chocolate Brown', family: 'brown' },
  { hex: '#B45309', nameVi: 'Nâu đất nung', nameEn: 'Terra Cotta Brown', family: 'brown' },
  { hex: '#D97706', nameVi: 'Nâu da bò', nameEn: 'Caramel Brown', family: 'brown' },
  { hex: '#C19A6B', nameVi: 'Nâu be vàng', nameEn: 'Camel Beige', family: 'brown' },

  // Neutrals: Grays, Black, White
  { hex: '#000000', nameVi: 'Đen tuyền', nameEn: 'Pure Black', family: 'black' },
  { hex: '#11141B', nameVi: 'Đen than', nameEn: 'Charcoal Black', family: 'black' },
  { hex: '#1F2937', nameVi: 'Xám khói đậm', nameEn: 'Dark Slate Gray', family: 'gray' },
  { hex: '#4B5563', nameVi: 'Xám chì', nameEn: 'Medium Gray', family: 'gray' },
  { hex: '#9CA3AF', nameVi: 'Xám bạc', nameEn: 'Silver Gray', family: 'gray' },
  { hex: '#E5E7EB', nameVi: 'Xám khói nhạt', nameEn: 'Light Platinum', family: 'gray' },
  { hex: '#FFFFFF', nameVi: 'Trắng tinh', nameEn: 'Pure White', family: 'white' },
  { hex: '#F8FAFC', nameVi: 'Trắng tuyết', nameEn: 'Snow White', family: 'white' },
];

export function hexToRgb(hexInput: string): { r: number; g: number; b: number } {
  let hex = hexInput.replace(/^#/, '').trim();
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }
  if (hex.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((val) => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Number(ratio.toFixed(2));
}

// Determine best matching pattern family based on HSL & RGB
export function determinePatternFamily(r: number, g: number, b: number, h: number, s: number, l: number): PatternFamily {
  // Grayscale & extremes
  if (l <= 12) return 'black';
  if (l >= 93) return 'white';
  if (s < 14) return 'gray';

  // Brown detection (warm low-saturation / dark orange-yellow)
  if (h >= 15 && h <= 45 && l < 42 && s >= 20) {
    return 'brown';
  }

  // Hue based
  if (h >= 345 || h < 15) return 'red';
  if (h >= 15 && h < 45) return 'orange';
  if (h >= 45 && h < 70) return 'yellow';
  if (h >= 70 && h < 165) return 'green';
  if (h >= 165 && h < 195) return 'cyan';
  if (h >= 195 && h < 260) return 'blue';
  if (h >= 260 && h < 310) return 'purple';
  if (h >= 310 && h < 345) return 'pink';

  return 'gray';
}

export function analyzeColor(hexInput: string): ColorData {
  const rgb = hexToRgb(hexInput);
  const canonicalHex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Perceived Brightness (WCAG perceived luminance % + Lightness)
  const relLum = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const brightnessPercent = Math.round(relLum * 100);

  let brightnessLevel: 'Thấp' | 'Trung bình' | 'Cao' = 'Trung bình';
  let brightnessLevelEn: 'Low' | 'Medium' | 'High' = 'Medium';
  if (hsl.l < 33 || brightnessPercent < 25) {
    brightnessLevel = 'Thấp';
    brightnessLevelEn = 'Low';
  } else if (hsl.l > 68 || brightnessPercent > 65) {
    brightnessLevel = 'Cao';
    brightnessLevelEn = 'High';
  }

  const saturationPercent = hsl.s;
  let saturationLevel: 'Thấp' | 'Trung bình' | 'Cao' = 'Trung bình';
  let saturationLevelEn: 'Low' | 'Medium' | 'High' = 'Medium';
  if (saturationPercent < 28) {
    saturationLevel = 'Thấp';
    saturationLevelEn = 'Low';
  } else if (saturationPercent > 68) {
    saturationLevel = 'Cao';
    saturationLevelEn = 'High';
  }

  // Find closest named color
  let minDistance = Infinity;
  let closestRef = COLOR_DICTIONARY[0];

  for (const ref of COLOR_DICTIONARY) {
    const refRgb = hexToRgb(ref.hex);
    // Weighted Euclidean RGB distance
    const rDiff = rgb.r - refRgb.r;
    const gDiff = rgb.g - refRgb.g;
    const bDiff = rgb.b - refRgb.b;
    const distance = Math.sqrt(2 * rDiff * rDiff + 4 * gDiff * gDiff + 3 * bDiff * bDiff);
    if (distance < minDistance) {
      minDistance = distance;
      closestRef = ref;
    }
  }

  const familyKey = determinePatternFamily(rgb.r, rgb.g, rgb.b, hsl.h, hsl.s, hsl.l);
  const pattern = PATTERN_FAMILIES[familyKey];

  // Specific modifier names for accuracy
  let nameVi = closestRef.nameVi;
  let nameEn = closestRef.nameEn;

  // Add brightness qualifier if significant
  if (hsl.l < 25 && !nameVi.includes('Đen') && !nameVi.includes('thẫm') && !nameVi.includes('đậm')) {
    nameVi = `${nameVi} đậm`;
    nameEn = `Dark ${nameEn}`;
  } else if (hsl.l > 75 && !nameVi.includes('Trắng') && !nameVi.includes('nhạt') && !nameVi.includes('Pastel')) {
    nameVi = `${nameVi} nhạt`;
    nameEn = `Light ${nameEn}`;
  }

  return {
    hex: canonicalHex,
    rgb,
    hsl,
    nameVi,
    nameEn,
    brightnessPercent,
    brightnessLevel,
    brightnessLevelEn,
    saturationPercent,
    saturationLevel,
    saturationLevelEn,
    pattern,
    isDarkTextPreferred: hsl.l > 60,
  };
}

// Color blindness simulation transform matrices (Brettel / Machado standard)
export function simulateDeficiencyRGB(
  r: number,
  g: number,
  b: number,
  type: ColorVisionDeficiency
): { r: number; g: number; b: number } {
  if (type === 'normal') {
    return { r, g, b };
  }

  // Linearize RGB from gamma 2.2
  const toLinear = (c: number) => {
    const norm = c / 255;
    return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
  };

  const toGamma = (c: number) => {
    const clamped = Math.max(0, Math.min(1, c));
    const val = clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(val * 255)));
  };

  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  let sr = lr;
  let sg = lg;
  let sb = lb;

  switch (type) {
    case 'protanopia': // L-cone missing (red-blind)
      sr = 0.56667 * lr + 0.43333 * lg + 0.0 * lb;
      sg = 0.55833 * lr + 0.44167 * lg + 0.0 * lb;
      sb = 0.0 * lr + 0.24167 * lg + 0.75833 * lb;
      break;

    case 'deuteranopia': // M-cone missing (green-blind)
      sr = 0.625 * lr + 0.375 * lg + 0.0 * lb;
      sg = 0.70 * lr + 0.30 * lg + 0.0 * lb;
      sb = 0.0 * lr + 0.30 * lg + 0.70 * lb;
      break;

    case 'tritanopia': // S-cone missing (blue-blind)
      sr = 0.95 * lr + 0.05 * lg + 0.0 * lb;
      sg = 0.0 * lr + 0.43333 * lg + 0.56667 * lb;
      sb = 0.0 * lr + 0.475 * lg + 0.525 * lb;
      break;

    case 'grayscale': // Achromatopsia (monochromacy)
      {
        const gray = 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
        sr = gray;
        sg = gray;
        sb = gray;
      }
      break;
  }

  return {
    r: toGamma(sr),
    g: toGamma(sg),
    b: toGamma(sb),
  };
}

export function simulateColorHex(hex: string, type: ColorVisionDeficiency): string {
  const rgb = hexToRgb(hex);
  const sim = simulateDeficiencyRGB(rgb.r, rgb.g, rgb.b, type);
  return rgbToHex(sim.r, sim.g, sim.b);
}

// Compare two colors for color blindness confusion
export interface ComparisonAnalysis {
  contrastRatio: number;
  contrastRating: string;
  isAccessibleAA: boolean;
  isAccessibleAAA: boolean;
  hueDelta: number;
  lightnessDelta: number;
  protanopiaDiff: number;
  deuteranopiaDiff: number;
  tritanopiaDiff: number;
  confusionAlerts: {
    type: 'warning' | 'info' | 'success';
    title: string;
    messageVi: string;
    messageEn: string;
  }[];
}

export function analyzeComparison(colorA: ColorData, colorB: ColorData): ComparisonAnalysis {
  const contrastRatio = calculateContrastRatio(colorA.hex, colorB.hex);
  const isAccessibleAA = contrastRatio >= 4.5;
  const isAccessibleAAA = contrastRatio >= 7.0;

  let contrastRating = 'Rất thấp (Không đạt WCAG)';
  if (contrastRatio >= 7.0) contrastRating = 'Xuất sắc (Đạt WCAG AAA)';
  else if (contrastRatio >= 4.5) contrastRating = 'Tốt (Đạt WCAG AA)';
  else if (contrastRatio >= 3.0) contrastRating = 'Đạt cho văn bản lớn (3:1)';

  const hueDelta = Math.abs(colorA.hsl.h - colorB.hsl.h);
  const lightnessDelta = Math.abs(colorA.hsl.l - colorB.hsl.l);

  // Simulate both under deficiencies
  const simA_protan = simulateDeficiencyRGB(colorA.rgb.r, colorA.rgb.g, colorA.rgb.b, 'protanopia');
  const simB_protan = simulateDeficiencyRGB(colorB.rgb.r, colorB.rgb.g, colorB.rgb.b, 'protanopia');
  const protanDiff = Math.sqrt(
    Math.pow(simA_protan.r - simB_protan.r, 2) +
    Math.pow(simA_protan.g - simB_protan.g, 2) +
    Math.pow(simA_protan.b - simB_protan.b, 2)
  );

  const simA_deutan = simulateDeficiencyRGB(colorA.rgb.r, colorA.rgb.g, colorA.rgb.b, 'deuteranopia');
  const simB_deutan = simulateDeficiencyRGB(colorB.rgb.r, colorB.rgb.g, colorB.rgb.b, 'deuteranopia');
  const deutanDiff = Math.sqrt(
    Math.pow(simA_deutan.r - simB_deutan.r, 2) +
    Math.pow(simA_deutan.g - simB_deutan.g, 2) +
    Math.pow(simA_deutan.b - simB_deutan.b, 2)
  );

  const simA_tritan = simulateDeficiencyRGB(colorA.rgb.r, colorA.rgb.g, colorA.rgb.b, 'tritanopia');
  const simB_tritan = simulateDeficiencyRGB(colorB.rgb.r, colorB.rgb.g, colorB.rgb.b, 'tritanopia');
  const tritanDiff = Math.sqrt(
    Math.pow(simA_tritan.r - simB_tritan.r, 2) +
    Math.pow(simA_tritan.g - simB_tritan.g, 2) +
    Math.pow(simA_tritan.b - simB_tritan.b, 2)
  );

  const confusionAlerts: ComparisonAnalysis['confusionAlerts'] = [];

  // Red - Green confusion check
  const isRedFamilyA = colorA.pattern.family === 'red' || colorA.pattern.family === 'orange';
  const isGreenFamilyB = colorB.pattern.family === 'green';
  const isRedFamilyB = colorB.pattern.family === 'red' || colorB.pattern.family === 'orange';
  const isGreenFamilyA = colorA.pattern.family === 'green';

  if ((isRedFamilyA && isGreenFamilyB) || (isRedFamilyB && isGreenFamilyA)) {
    if (protanDiff < 60 || deutanDiff < 60) {
      confusionAlerts.push({
        type: 'warning',
        title: 'Cảnh báo nhầm lẫn Đỏ – Xanh lá (Protanopia / Deuteranopia)',
        messageVi:
          'Hai màu Đỏ và Xanh lá này có độ sáng gần tương đồng. Người mắc khiếm khuyết tế bào nón L hoặc M có thể nhìn cả hai thành các sắc thái vàng nâu mờ nhạt, khó phân biệt. Khuyên dùng thêm ký hiệu Pattern hoặc độ lệch sáng lớn hơn.',
        messageEn:
          'These Red and Green shades share similar luminance. People with Protanopia or Deuteranopia may perceive both as muted brownish-yellow tones. Consider adding patterns or increasing brightness contrast.',
      });
    }
  }

  // Blue - Purple confusion check
  const isBlueA = colorA.pattern.family === 'blue' || colorA.pattern.family === 'cyan';
  const isPurpleB = colorB.pattern.family === 'purple' || colorB.pattern.family === 'pink';
  const isBlueB = colorB.pattern.family === 'blue' || colorB.pattern.family === 'cyan';
  const isPurpleA = colorA.pattern.family === 'purple' || colorA.pattern.family === 'pink';

  if ((isBlueA && isPurpleB) || (isBlueB && isPurpleA)) {
    if (protanDiff < 50 || deutanDiff < 50) {
      confusionAlerts.push({
        type: 'warning',
        title: 'Cảnh báo nhầm lẫn Xanh dương – Tím',
        messageVi:
          'Màu tím là sự pha trộn giữa đỏ và xanh dương. Do người khiếm thị sắc đỏ khó nhận diện phần sắc tố đỏ, màu tím có xu hướng bị nhìn giống hệt xanh dương.',
        messageEn:
          'Purple contains red light. Because red-cone deficient viewers miss the red component, purple often looks identical to blue.',
      });
    }
  }

  // Blue - Green / Yellow - Violet (Tritanopia)
  if (tritanDiff < 45 && ((colorA.pattern.family === 'blue' && colorB.pattern.family === 'green') || (colorA.pattern.family === 'yellow' && colorB.pattern.family === 'purple'))) {
    confusionAlerts.push({
      type: 'warning',
      title: 'Cảnh báo nhầm lẫn Tritanopia (Xanh dương – Vàng)',
      messageVi:
        'Cặp màu này có nguy cơ gây khó phân biệt cho người mắc Tritanopia (khiếm khuyết tế bào nón S). Hãy kết hợp thêm văn bản hoặc biểu tượng.',
      messageEn:
        'This color pair may pose confusion for individuals with Tritanopia (blue-yellow deficiency). Accompany with textual labels or icons.',
    });
  }

  // General low contrast alert
  if (contrastRatio < 3.0) {
    confusionAlerts.push({
      type: 'warning',
      title: 'Độ tương phản thấp',
      messageVi:
        'Tỷ lệ tương phản chỉ đạt ' +
        contrastRatio +
        ':1 (dưới mức khuyến nghị WCAG 4.5:1). Ngay cả người có thị giác bình thường cũng có thể thấy mờ nhạt nếu đặt cạnh nhau trong biểu đồ hoặc văn bản.',
      messageEn:
        'Low contrast ratio of ' + contrastRatio + ':1. Hard to distinguish in charts or reading text.',
    });
  }

  if (confusionAlerts.length === 0) {
    confusionAlerts.push({
      type: 'success',
      title: 'Cặp màu có độ phân biệt tốt',
      messageVi:
        'Cặp màu này có sự khác biệt rõ về sắc độ và độ sáng. Người dùng thuộc đa số các dạng khiếm thị màu vẫn có thể phân biệt tương đối ổn định.',
      messageEn:
        'Good differentiation across hue and luminance across most color vision profiles.',
    });
  }

  return {
    contrastRatio,
    contrastRating,
    isAccessibleAA,
    isAccessibleAAA,
    hueDelta,
    lightnessDelta,
    protanopiaDiff: Math.round(protanDiff),
    deuteranopiaDiff: Math.round(deutanDiff),
    tritanopiaDiff: Math.round(tritanDiff),
    confusionAlerts,
  };
}

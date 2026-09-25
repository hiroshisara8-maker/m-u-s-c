import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppSettings, ColorData, TabType, ToastMessage } from '../types';
import { playColorTone, speakColorDescription } from '../utils/audioUtils';

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  togglePatternMode: () => void;
  toast: ToastMessage | null;
  showToast: (msg: Omit<ToastMessage, 'id'>) => void;
  dismissToast: () => void;
  recentColors: ColorData[];
  addRecentColor: (color: ColorData) => void;
  announceColor: (color: ColorData) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 'md',
  highContrast: false,
  reducedMotion: false,
  patternMode: true,
  audioDescription: true,
  soundEffects: true,
  speechLanguage: 'vi',
  theme: 'dark',
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('chromax_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [recentColors, setRecentColors] = useState<ColorData[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('chromax_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }

    // Apply high contrast and font size classes on root HTML
    const root = document.documentElement;
    if (settings.highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const showToast = (msg: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString();
    const duration = msg.duration || 3200;
    setToast({ ...msg, id });

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, duration);
  };

  const dismissToast = () => {
    setToast(null);
  };

  const togglePatternMode = () => {
    const nextVal = !settings.patternMode;
    updateSettings({ patternMode: nextVal });
    showToast({
      type: 'pattern-toggle',
      title: nextVal ? 'PATTERN MODE ON' : 'PATTERN MODE OFF',
      message: nextVal
        ? 'Colors are now represented with patterns and labels.'
        : 'Patterns hidden. Standard color view active.',
      duration: 3500,
    });
  };

  const addRecentColor = (color: ColorData) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c.hex !== color.hex);
      return [color, ...filtered].slice(0, 16);
    });

    showToast({
      type: 'color-detected',
      title: '✓ COLOR DETECTED',
      message: `${color.nameVi} (${color.nameEn})`,
      subtext: `${color.hex} • RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}) • Độ sáng: ${color.brightnessLevel} • Bão hòa: ${color.saturationLevel}`,
      hex: color.hex,
      duration: 3800,
    });

    if (settings.audioDescription) {
      announceColor(color);
    }
  };

  const announceColor = (color: ColorData) => {
    if (settings.soundEffects) {
      playColorTone(color);
    }
    speakColorDescription(color, settings.speechLanguage);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        settings,
        updateSettings,
        togglePatternMode,
        toast,
        showToast,
        dismissToast,
        recentColors,
        addRecentColor,
        announceColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

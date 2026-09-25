import { TabType } from '../../types';
import {
  Home,
  Camera,
  Layers,
  Component,
  Eye,
  TrafficCone,
  Shirt,
  BarChart3,
  Volume2,
  Gamepad2,
  BookOpen,
  Settings,
} from 'lucide-react';
import React from 'react';

export interface NavItemConfig {
  id: TabType;
  labelVi: string;
  labelEn: string;
  iconChar: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'home',
    labelVi: 'Trang chủ',
    labelEn: 'Home',
    iconChar: '🏠',
    icon: Home,
    accentColor: '#38BDF8',
  },
  {
    id: 'scanner',
    labelVi: 'Nhận diện màu',
    labelEn: 'Color Scanner',
    iconChar: '📷',
    icon: Camera,
    accentColor: '#00F0FF',
    badge: 'LIVE',
  },
  {
    id: 'compare',
    labelVi: 'So sánh màu',
    labelEn: 'Color Compare',
    iconChar: '🎨',
    icon: Layers,
    accentColor: '#A855F7',
  },
  {
    id: 'pattern-code',
    labelVi: 'Mã màu ký hiệu',
    labelEn: 'Color Code',
    iconChar: '🧩',
    icon: Component,
    accentColor: '#EAB308',
  },
  {
    id: 'vision-sim',
    labelVi: 'Mô phỏng thị giác',
    labelEn: 'Vision Simulator',
    iconChar: '👁️',
    icon: Eye,
    accentColor: '#EC4899',
  },
  {
    id: 'traffic',
    labelVi: 'Đèn giao thông',
    labelEn: 'Traffic Mode',
    iconChar: '🚦',
    icon: TrafficCone,
    accentColor: '#22C55E',
  },
  {
    id: 'outfit',
    labelVi: 'Màu quần áo',
    labelEn: 'Outfit Mode',
    iconChar: '👕',
    icon: Shirt,
    accentColor: '#FB923C',
  },
  {
    id: 'chart',
    labelVi: 'Đọc biểu đồ',
    labelEn: 'Chart Mode',
    iconChar: '📊',
    icon: BarChart3,
    accentColor: '#06B6D4',
  },
  {
    id: 'audio-color',
    labelVi: 'Đọc màu âm thanh',
    labelEn: 'Audio Color',
    iconChar: '🔊',
    icon: Volume2,
    accentColor: '#A855F7',
  },
  {
    id: 'game',
    labelVi: 'Trò chơi màu',
    labelEn: 'Color Game',
    iconChar: '🎮',
    icon: Gamepad2,
    accentColor: '#00FF87',
  },
  {
    id: 'knowledge',
    labelVi: 'Kiến thức màu sắc',
    labelEn: 'Color Knowledge',
    iconChar: '📚',
    icon: BookOpen,
    accentColor: '#93C5FD',
  },
  {
    id: 'settings',
    labelVi: 'Cài đặt',
    labelEn: 'Settings',
    iconChar: '⚙️',
    icon: Settings,
    accentColor: '#A7ACB8',
  },
];

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SvgPatternDefs } from './components/common/SvgPatternDefs';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';

import { HomeView } from './components/views/HomeView';
import { ScannerView } from './components/views/ScannerView';
import { CompareView } from './components/views/CompareView';
import { PatternCodeView } from './components/views/PatternCodeView';
import { VisionSimView } from './components/views/VisionSimView';
import { TrafficView } from './components/views/TrafficView';
import { OutfitView } from './components/views/OutfitView';
import { ChartView } from './components/views/ChartView';
import { AudioColorView } from './components/views/AudioColorView';
import { ColorGameView } from './components/views/ColorGameView';
import { KnowledgeView } from './components/views/KnowledgeView';
import { SettingsView } from './components/views/SettingsView';

const MainAppContent: React.FC = () => {
  const { currentTab, settings } = useApp();

  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div
      className={`min-h-screen flex bg-[#08090D] text-white selection:bg-purple-600/30 selection:text-white ${
        fontSizeClasses[settings.fontSize] || 'text-base'
      } ${settings.highContrast ? 'high-contrast-mode' : ''}`}
    >
      {/* Hidden Global SVG Pattern definitions */}
      <SvgPatternDefs />

      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Header */}
        <Header />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {currentTab === 'home' && <HomeView />}
          {currentTab === 'scanner' && <ScannerView />}
          {currentTab === 'compare' && <CompareView />}
          {currentTab === 'pattern-code' && <PatternCodeView />}
          {currentTab === 'vision-sim' && <VisionSimView />}
          {currentTab === 'traffic' && <TrafficView />}
          {currentTab === 'outfit' && <OutfitView />}
          {currentTab === 'chart' && <ChartView />}
          {currentTab === 'audio-color' && <AudioColorView />}
          {currentTab === 'game' && <ColorGameView />}
          {currentTab === 'knowledge' && <KnowledgeView />}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Persistent Bottom Navigation */}
      <BottomNav />

      {/* Accessible Floating Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

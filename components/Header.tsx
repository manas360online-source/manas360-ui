
import React, { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// --- THEME ICONS ---
const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="relative text-center pt-6 pb-4 animate-fade-in-down">
      <div className="absolute top-4 right-4 md:right-6 z-50 flex items-center gap-3">
        {/* LanguageSwitcher removed from here */}
        
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-full text-[#0A3A78] dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-sm shadow-sm"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Nazar Bottu / Evil Eye Icon - Fixed Top Right */}
        <div className="select-none pointer-events-none drop-shadow-sm text-[28px] leading-none">
          🧿
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="inline-block relative">
          <div className="font-serif text-[1.6rem] md:text-[1.8rem] font-medium text-wellness-slate dark:text-white tracking-[0.2em] uppercase transition-colors">
            {t('logo_text')}<span className="font-semibold text-[#0A4E89] dark:text-sky-300">360</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-sky-200/60 dark:bg-sky-500/60 rounded-full transition-colors"></div>
        </div>
        
        {/* Language Switcher Placed Here */}
        <div className="mt-6">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

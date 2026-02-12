
import React, { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// --- THEME ICONS ---
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FDB813" stroke="#FDB813" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
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
    <header className="relative text-center pt-2 pb-4 animate-fade-in-down w-full">
      {/* Top Right Controls - Fixed Position to ensure no overlap */}
      <div className="absolute top-2 right-2 md:top-6 md:right-8 z-50 flex items-center gap-2 md:gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2 md:p-2.5 rounded-full text-[#0A3A78] dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-colors backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Nazar Bottu / Evil Eye Icon - Fixed Top Right */}
        <div className="select-none pointer-events-none drop-shadow-sm text-[24px] md:text-[28px] leading-none">
          🧿
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Added top margin on mobile (mt-14) to clear the top-right icons so they don't overlap the logo */}
        <div className="inline-block relative mt-14 md:mt-4">
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

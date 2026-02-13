
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

interface HeaderProps {
  onLoginClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
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

  // Responsive sizing: Smaller (px-5 py-2 text-sm) on mobile, Bigger (px-8 py-3 text-base) on desktop
  const gradientBtnClass = "px-5 py-2 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white font-bold shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_8px_25px_rgba(0,118,255,0.35)] hover:-translate-y-0.5 hover:brightness-105 transition-all duration-300 ease-out tracking-wide text-sm md:text-base flex items-center justify-center active:scale-95";

  return (
    <header className="relative w-full px-4 py-4 md:px-10 md:py-6 flex flex-col md:flex-row justify-between items-center animate-fade-in-down gap-6 md:gap-0 max-w-[1400px] mx-auto">
      
      {/* Left: Logo & Language Switcher Stack */}
      <div className="flex flex-col items-center gap-3">
        <div className="font-serif text-[1.8rem] font-bold text-[#0A3A78] dark:text-white tracking-tight cursor-pointer leading-none transition-colors">
          {t('logo_text')}<span className="text-[#1FA2DE]">360</span>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Right: Actions - Adjusted gap for mobile */}
      <div className="flex items-center gap-3 md:gap-6 md:mr-4 flex-wrap justify-center">
        
        <button 
          onClick={() => window.location.hash = '#/subscribe'} 
          className={`${gradientBtnClass}`}
        >
          {t('subscribe', 'Subscribe')}
        </button>

        <button 
          onClick={onLoginClick} 
          className={`${gradientBtnClass}`}
        >
          {t('login', 'Log In')}
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 md:p-3 rounded-full text-[#0A3A78] dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-colors backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Nazar Bottu */}
        <div className="select-none pointer-events-none drop-shadow-sm text-[22px] md:text-[26px] leading-none text-[#0A3A78] dark:text-white">
          🧿
        </div>
      </div>
    </header>
  );
};

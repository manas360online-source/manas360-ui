
import React, { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// --- THEME ICONS ---
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FDB813" stroke="#FDB813" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);
const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0E5F6F] dark:text-white opacity-80"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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

  const navLinks = [
    { icon: '💚', label: 'I Need Support', href: '#/subscribe/patients' },
    { icon: '🤖', label: 'AI & Self-Help', href: '#/meera-chat' },
    { icon: '❤️', label: 'For Relationships', href: '#/subscribe/patients' },
    { icon: '🏢', label: 'For Professionals', href: '#/subscribe/corporate' },
    { icon: '🌱', label: 'Learn & Grow', href: '#/certifications/' },
  ];

  return (
    <header className="w-full flex flex-col items-center relative z-50">

      {/* TOP ROW: Logo, Language, Actions */}
      <div className="w-full px-4 py-3 md:px-8 md:py-5 flex flex-col xl:flex-row justify-between items-center max-w-[1600px] mx-auto gap-4 md:gap-0">

        {/* Left Section: Logo + Language Switcher */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full xl:w-auto justify-center xl:justify-start">
          <div className="font-serif text-[2.2rem] font-bold tracking-tight cursor-pointer leading-none whitespace-nowrap">
            {/* Updated Logo Colors: Teal and Gold */}
            <span className="text-[#0E5F6F] dark:text-white">MANAS</span>
            <span className="text-[#D4A017]">360</span>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2"></div>

          <LanguageSwitcher />
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center mt-2 xl:mt-0">

          {/* Search Icon */}
          <button className="p-3 rounded-full bg-blue-50/50 dark:bg-slate-800/50 hover:bg-blue-100 dark:hover:bg-slate-800 transition-all shadow-sm backdrop-blur-sm border border-blue-100 dark:border-slate-700 group">
            <SearchIcon />
          </button>

          {/* Subscribe Button - Dark Teal matching Logo */}
          <button
            onClick={() => window.location.hash = '#/subscribe'}
            className="px-6 py-2.5 rounded-full bg-[#0E5F6F] hover:bg-[#094552] text-white font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 tracking-wide"
          >
            {t('subscribe', 'Subscribe')}
          </button>

          {/* Log In Button */}
          <button
            onClick={onLoginClick}
            className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 text-[#0E5F6F] dark:text-white font-bold text-sm md:text-base border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all active:scale-95 flex items-center gap-1"
          >
            {t('login', 'Log In')}
            <span className="text-xs">▼</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-[#0E5F6F] dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-colors backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Nazar Bottu */}
          <div className="select-none pointer-events-none drop-shadow-sm text-[24px] leading-none text-[#0E5F6F] dark:text-white ml-1">
            🧿
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Navigation Links */}
      <div className="w-full max-w-[1400px] mx-auto mt-4 px-4 pb-2">
        <nav className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-4 items-center">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => window.location.hash = item.href}
              className="flex items-center gap-2.5 text-[#334155] dark:text-slate-300 font-bold text-[0.95rem] md:text-[1.05rem] hover:text-[#0E5F6F] dark:hover:text-white transition-all group"
            >
              <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform filter drop-shadow-sm">{item.icon}</span>
              <span className="whitespace-nowrap tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

    </header>
  );
};

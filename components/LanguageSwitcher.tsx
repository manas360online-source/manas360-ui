
import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' }
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    const currentHash = window.location.hash;
    const match = currentHash.match(/^#\/([a-z]{2})\/(.*)$/);
    
    if (match) {
      const currentView = match[2];
      window.location.hash = `#/${langCode}/${currentView}`;
    } else {
      window.location.hash = `#/${langCode}/landing`;
    }
  };

  const getPillClass = (code: string) => {
    const isSelected = i18n.language === code;
    return `
      cursor-pointer
      px-4 py-1.5 md:px-5 md:py-2
      rounded-full
      text-sm md:text-base font-bold
      transition-all duration-300
      border
      shadow-sm hover:shadow-md
      flex items-center justify-center
      min-w-[80px] md:min-w-[90px]
      force-light-btn
      ${isSelected 
        ? 'bg-[#1FA2DE] text-white border-[#1FA2DE] shadow-md transform scale-105' 
        : '!bg-white/90 !text-[#0A3A78] border-slate-100 hover:bg-sky-50'
      }
    `;
  };

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 animate-fade-in">
      {/* First Row: 3 Languages */}
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {LANGUAGES.slice(0, 3).map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={getPillClass(lang.code)}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      {/* Second Row: 2 Languages */}
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {LANGUAGES.slice(3, 5).map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={getPillClass(lang.code)}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

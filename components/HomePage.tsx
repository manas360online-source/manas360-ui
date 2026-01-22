
import React, { useState, useEffect } from 'react';
import { storageService } from '../utils/storageService';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { shopService } from '../utils/shopService'; // Import shopService

// --- ICONS ---
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
);
const EmailIcon = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l9 6 9-6M1 1v14h18V1M1 1h18"/></svg>
);
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.415 23.094 10.125 23.991V15.563H7.078V12.073H10.125V9.429C10.125 6.423 11.916 4.761 14.656 4.761C15.97 4.761 17.344 4.996 17.344 4.996V7.948H15.83C14.34 7.948 13.875 8.873 13.875 9.822V12.073H17.203L16.67 15.563H13.875V23.991C19.585 23.094 24 18.1 24 12.073Z" /></svg>
);
const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
);
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);

const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isDark, setIsDark] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Cart Count state
  
  // Modal flow state
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInState, setCheckInState] = useState<'form' | 'success' | 'already'>('form');
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [checkInNote, setCheckInNote] = useState('');
  const [hasCheckedToday, setHasCheckedToday] = useState(false);

  // Streak Risk State
  const [isStreakAtRisk, setIsStreakAtRisk] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setHasCheckedToday(storageService.hasCheckedInToday());

    // Initialize cart count
    const updateCartCount = () => {
      const items = shopService.getCart();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-1000', 'ease-out');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  // Timer logic for streak risk calculation
  useEffect(() => {
    const updateRiskState = () => {
      const hours = new Date().getHours();
      setIsStreakAtRisk(!hasCheckedToday && hours >= 18);
    };
    updateRiskState();
    const interval = setInterval(updateRiskState, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [hasCheckedToday]);

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

  const handleLogin = (provider: string) => {
    setLoginStatus('loading');
    setTimeout(() => {
      setLoginStatus('success');
    }, 1500);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    setTimeout(() => setLoginStatus('idle'), 300);
  };

  const navigateToSubscribe = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.location.hash = '#/subscribe';
  };

  const navigateToSoundTherapy = () => {
    window.location.hash = '#/sound-therapy';
  };

  const navigateToShop = () => {
    window.location.hash = '#/shop';
  };

  const handleOpenCheckIn = () => {
    const alreadyDone = storageService.hasCheckedInToday();
    if (alreadyDone) {
      window.location.hash = '#/streaks';
      return;
    } else {
      setCheckInState('form');
    }
    setIsCheckInOpen(true);
  };

  const handleCompleteCheckIn = () => {
    storageService.saveCheckIn({ feeling: selectedEmoji?.toString(), note: checkInNote });
    setHasCheckedToday(true);
    setCheckInState('success');
  };

  const closeCheckIn = () => {
    setIsCheckInOpen(false);
    // Reset form after exit
    setTimeout(() => {
      setSelectedEmoji(null);
      setCheckInNote('');
    }, 300);
  };

  // --- Styled Blue Button Class ---
  const gradientBtnClass = "px-6 md:px-8 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white font-bold shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_8px_25px_rgba(0,118,255,0.35)] hover:-translate-y-0.5 hover:brightness-105 transition-all duration-300 ease-out tracking-wide text-[0.85rem] md:text-[0.95rem] flex items-center justify-center active:scale-95";

  const emojis = ['🤩', '😐', '😟', '😌', '😩'];

  return (
    <div className="font-sans text-[#1A1A1A] bg-[#FDFCF8] selection:bg-blue-100 selection:text-[#0A3A78] overflow-x-hidden transition-colors duration-500 dark:bg-[#030712] dark:text-white">
      
      {/* ABSOLUTE NAZAR BOTTU - TOP RIGHT CORNER OF PAGE */}
      <div className="absolute top-6 right-6 z-[2000] select-none pointer-events-none drop-shadow-sm">
        <span className="text-[28px] leading-none">🧿</span>
      </div>

      {/* STREAK RISK BANNER */}
      {isStreakAtRisk && (
        <div className="relative w-full z-[50] bg-red-600 text-white py-4 px-6 flex items-center justify-center gap-3 animate-fade-in-down shadow-xl">
          <span className="text-xl">🔥</span>
          <span className="font-bold tracking-wide text-sm md:text-base text-center">
            {t('home_streak_risk')}
          </span>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[3000] flex flex-col bg-white dark:bg-[#030712] animate-fade-in transition-colors duration-300">
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 dark:border-slate-800">
            <div className="font-serif text-[1.8rem] font-bold text-[#0A3A78] dark:text-white tracking-tight"> 
              {t('logo_text')}<span className="text-[#1FA2DE]">360</span>
            </div>
            <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><CloseIcon /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">{t('solutions', 'Our Solutions')}</h4>
              <div className="grid grid-cols-1 gap-2">
                <MobileMenuItem icon="🧘" label={t('wellness_seekers', 'Wellness Seekers')} />
                <MobileMenuItem icon="👩‍⚕️" label={t('providers', 'Providers')} />
                <MobileMenuItem icon="🏢" label={t('corporates', 'Corporates')} />
                <MobileMenuItem icon="🎓" label={t('education', 'Education')} />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">{t('resources', 'Resources')}</h4>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); navigateToSoundTherapy(); }}
                  className="flex items-center gap-3 p-3 w-full text-left rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="text-xl">🔊</span>
                  <span className="text-[1.05rem] font-medium text-slate-700 dark:text-slate-200">{t('resource_sound', 'Sound Therapy')}</span>
                </button>
                <MobileMenuItem icon="🐕" label={t('resource_pet', 'Pet Therapy')} />
                <MobileMenuItem icon="🤖" label={t('resource_bot', 'Therapist Bot')} />
                <MobileMenuItem icon="👥" label={t('resource_group', 'Group Sessions')} />
                <MobileMenuItem icon="🌿" label={t('resource_ayurveda', 'Ayurveda')} />
                <MobileMenuItem icon="🛌" label={t('resource_sleep', 'Sleep Care')} />
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" className="block text-xl font-bold text-[#0A3A78] dark:text-white text-left">{t('about_us', 'About Us')}</button>
              <button type="button" onClick={(e) => { setIsMobileMenuOpen(false); navigateToSubscribe(e); }} className="block text-xl font-bold text-[#0A3A78] dark:text-white text-left">{t('subscribe', 'Subscribe')}</button>
              <button type="button" onClick={() => { setIsMobileMenuOpen(false); navigateToShop(); }} className="flex items-center gap-3 text-xl font-bold text-[#0A3A78] dark:text-white">
                <span>🛒</span> {t('nav_shopping_cart', 'Shopping Cart')} {cartCount > 0 && <span className="bg-[#1FA2DE] text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>}
              </button>
            </div>
          </div>
          <div className="p-6 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} className={gradientBtnClass + " w-full py-4 text-lg"}>{t('login', 'Log In')}</button>
          </div>
        </div>
      )}

      {/* CHECK-IN MODAL */}
      {isCheckInOpen && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 px-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeCheckIn}></div>
           <div className="relative bg-white dark:bg-[#1E293B] w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-fade-in-up border border-white/20 dark:border-slate-800">
              {checkInState === 'form' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#0A3A78] dark:text-white font-serif">{t('modal_daily_checkin', 'Daily Check-In')}</h3>
                    <button onClick={closeCheckIn} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><CloseIcon /></button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium mb-6 text-center">{t('modal_how_feeling', 'How are you feeling today?')}</p>
                  <div className="flex justify-between mb-8 px-2">
                    {emojis.map((emoji, index) => (
                      <button 
                        key={index}
                        onClick={() => setSelectedEmoji(index)}
                        className={`text-3xl md:text-4xl transition-transform hover:scale-125 ${selectedEmoji === index ? 'scale-125 drop-shadow-md grayscale-0' : 'grayscale-[0.5] hover:grayscale-0'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <textarea 
                    value={checkInNote}
                    onChange={(e) => setCheckInNote(e.target.value)}
                    placeholder={t('modal_note_placeholder', 'Write a short note (optional)')}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[#1A1A1A] dark:text-white"
                    rows={3}
                  />
                  <button 
                    onClick={handleCompleteCheckIn}
                    disabled={selectedEmoji === null}
                    className={`w-full py-4 rounded-full font-bold text-white transition-all ${selectedEmoji !== null ? 'bg-[#1FA2DE] hover:bg-[#0A4E89] shadow-lg hover:shadow-xl' : 'bg-slate-300 cursor-not-allowed'}`}
                  >
                    {t('modal_complete_btn', "Complete Check-In")}
                  </button>
                </>
              )}

              {checkInState === 'success' && (
                <div className="text-center py-4">
                  <div className="text-6xl mb-4 animate-bounce">🔥</div>
                  <h3 className="text-2xl font-bold text-[#0A3A78] dark:text-white mb-2 font-serif">{t('modal_completed_title', 'Check-In Completed')}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">{t('modal_showed_up', 'You showed up for yourself today')}</p>
                  <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold px-4 py-2 rounded-full inline-block mb-8">
                    {t('modal_streak_continued', 'Streak Continued!')}
                  </div>
                  <button onClick={closeCheckIn} className="w-full py-4 rounded-full bg-[#1FA2DE] text-white font-bold hover:bg-[#0A4E89] transition-all">
                    {t('modal_done', 'Done')}
                  </button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={handleCloseLogin}></div>
          <div className="relative bg-white dark:bg-[#111827] w-full max-w-[440px] rounded-[32px] shadow-2xl overflow-hidden animate-fade-in-up border border-white/20 dark:border-slate-800">
            <div className="p-6 md:p-8">
              {loginStatus === 'idle' && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-8"></div>
                    <h2 className="text-[1.35rem] font-bold text-[#1A1A1A] dark:text-white font-serif tracking-tight">{t('login_title')}</h2>
                    <button type="button" onClick={handleCloseLogin} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all"><CloseIcon /></button>
                  </div>
                  <div className="space-y-4">
                    <button type="button" onClick={() => handleLogin('Email')} className="w-full flex items-center justify-center gap-3 bg-[#1e2a3b] dark:bg-slate-900 hover:bg-[#2c3b52] text-white text-[1.05rem] font-medium py-4 rounded-full transition-all shadow-md active:scale-[0.98]"><EmailIcon /> {t('login_email')}</button>
                    <button type="button" onClick={() => handleLogin('Facebook')} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1A1A1A] dark:text-white text-[1.05rem] font-medium py-4 rounded-full transition-all relative active:scale-[0.98]"><div className="absolute left-6"><FacebookIcon /></div> {t('login_facebook')}</button>
                    <button type="button" onClick={() => handleLogin('Apple')} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1A1A1A] dark:text-white text-[1.05rem] font-medium py-4 rounded-full transition-all relative active:scale-[0.98]"><div className="absolute left-6"><AppleIcon /></div> {t('login_apple')}</button>
                    <button type="button" onClick={() => handleLogin('Google')} className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1A1A1A] dark:text-white text-[1.05rem] font-medium py-4 rounded-full transition-all relative active:scale-[0.98]"><div className="absolute left-6"><GoogleIcon /></div> {t('login_google')}</button>
                  </div>
                </>
              )}
              {loginStatus === 'loading' && (
                <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-[#1E59FF] rounded-full animate-spin mb-6"></div>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-400">{t('login_loading')}</p>
                </div>
              )}
              {loginStatus === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                   <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm"> ✅ </div>
                   <h2 className="text-[2rem] font-serif font-bold text-[#0A3A78] dark:text-white mb-4">{t('login_welcome')}</h2>
                   <button type="button" onClick={handleCloseLogin} className={gradientBtnClass + " w-full py-4"}> {t('login_continue')} </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HERO & NAV */}
      <div 
        className="relative w-full min-h-[105vh] md:min-h-[95vh] flex flex-col transition-all duration-700 z-[100]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2560&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE]/40 via-transparent to-[#FDFCF8] dark:from-slate-900/60 dark:to-[#030712] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/90 to-transparent dark:from-[#030712] dark:via-[#030712]/90 pointer-events-none z-0"></div>

        <nav className="relative z-[1500] flex items-start justify-between px-6 md:px-10 py-6 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col items-center gap-3">
            <div className="font-serif text-[1.8rem] font-bold text-[#0A3A78] dark:text-white tracking-tight cursor-pointer"> 
              {t('logo_text')}<span className="text-[#1FA2DE]">360</span>
            </div>
            <LanguageSwitcher />
          </div>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-medium text-[#0A3A78] dark:text-white text-[1.05rem] pt-2">
            <DropdownButton title={t('solutions', 'Our Solutions')}>
              <div className="grid grid-cols-2 min-w-[500px] p-2">
                <DropdownItem icon="🧘" label={t('wellness_seekers', 'Wellness Seekers')} />
                <DropdownItem icon="👩‍⚕️" label={t('providers', 'Providers')} />
                <DropdownItem icon="🏢" label={t('corporates', 'Corporates')} />
                <DropdownItem icon="🎓" label={t('education', 'Education')} />
              </div>
            </DropdownButton>
            <DropdownButton title={t('resources', 'Resources')}>
              <div className="grid grid-cols-2 min-w-[500px] p-2">
                {/* DIRECT LINK FOR SOUND THERAPY */}
                <button 
                  onClick={navigateToSoundTherapy}
                  className="flex items-center gap-3 px-5 py-3 w-full text-left text-[0.95rem] font-medium text-[#2E3A48] dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-[#0A3A78] dark:hover:text-white rounded-xl transition-all"
                > 
                  <span className="text-lg">🔊</span> <span>{t('resource_sound', 'Sound Therapy')}</span>
                </button>
                <DropdownItem icon="🐕" label={t('resource_pet', 'Pet Therapy')} />
                <DropdownItem icon="🤖" label={t('resource_bot', 'Therapist Bot')} />
                <DropdownItem icon="👥" label={t('resource_group', 'Group Sessions')} />
                <DropdownItem icon="🌿" label={t('resource_ayurveda', 'Ayurveda')} />
                <DropdownItem icon="🛌" label={t('resource_sleep', 'Sleep Care')} />
              </div>
            </DropdownButton>
            <button type="button" className="px-4 py-2 rounded-full hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300">{t('about_us', 'About Us')}</button>
            <button type="button" onClick={navigateToSubscribe} className={gradientBtnClass}>{t('subscribe', 'Subscribe')}</button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 xl:gap-5">
            {/* LanguageSwitcher Removed from here */}
            
            <button type="button" onClick={toggleTheme} className="p-2.5 rounded-full text-[#0A3A78] dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all backdrop-blur-sm border border-white/20 dark:border-slate-800/50">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            
            <button type="button" onClick={() => setIsLoginOpen(true)} className={`${gradientBtnClass} hidden md:flex`}> {t('login', 'Log In')} </button>
            
            {/* Shopping Cart Icon */}
            <button 
              type="button" 
              onClick={navigateToShop}
              className="hidden lg:block text-[#0A3A78] dark:text-white text-2xl hover:scale-110 transition-transform p-2 relative"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1FA2DE] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button type="button" onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-[#0A3A78] dark:text-white p-2">
              <MenuIcon />
            </button>
          </div>
        </nav>

        <div className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto pb-48 md:pb-64">
          <div className="hero-box relative z-10 p-8 rounded-[3rem]">
            <h1 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-normal text-[#0A3A78] dark:text-white leading-[1.05] mb-8 drop-shadow-lg tracking-tight"> 
              {t('home_hero_title')}
            </h1>
            <p className="text-[1.15rem] md:text-[1.4rem] text-[#2E3A48] dark:text-slate-300 leading-[1.65] max-w-4xl mx-auto mb-14 font-medium opacity-90 drop-shadow-sm">
               {t('home_hero_subtitle')}
            </p>
            <button type="button" onClick={() => window.location.hash = '#/onboarding/name'} className="px-16 py-6 text-[1.3rem] rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white font-bold shadow-[0_10px_30px_rgba(30,89,255,0.4)] hover:shadow-xl hover:-translate-y-1 hover:brightness-105 transition-all uppercase tracking-wider"> {t('start_checkin')} </button>
          </div>

          {/* FLOATING SHIP - REDESIGNED TO MATCH USER'S MOTORBOAT IMAGE */}
          <div 
            onClick={handleOpenCheckIn}
            className="absolute -bottom-16 right-4 md:bottom-52 md:-right-8 lg:-right-12 z-[100] cursor-pointer group"
          >
            {/* Subtle Floating Animation */}
            <div className="animate-float flex flex-col items-center">
              <div className="relative w-[180px] md:w-[195px] transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl">
                
                {/* 1. Flag Section (Topmost) */}
                <div className="absolute -top-12 md:-top-12 left-1/2 -translate-x-1/2 z-0">
                   <div className="w-1 md:w-1 h-12 md:h-12 bg-[#5D4037] rounded-full shadow-sm"></div>
                   {/* STREAK RISK LOGIC: Color turns red after 6:00 PM if check-in is not complete */}
                   <div className={`absolute top-1.5 left-1 w-10 md:w-12 h-6 md:h-7 rounded-sm skew-x-12 animate-pulse shadow-md transition-colors duration-500 ${isStreakAtRisk ? 'bg-[#EF4444] border-r border-red-700/20' : 'bg-[#FFC107] border-r border-yellow-600/20'}`}></div>
                </div>

                {/* 2. Top Cabin (Tier 1) */}
                <div className="relative w-[45%] mx-auto h-10 md:h-10 bg-[#F5F5F5] rounded-t-[10px] md:rounded-t-[12px] border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 shadow-lg z-10">
                   {/* Three rounded blue windows */}
                   {[1, 2, 3].map((win) => (
                     <div key={win} className="w-4 h-4 md:w-4.5 md:h-5 bg-[#2196F3] rounded-[4px] shadow-inner"></div>
                   ))}
                </div>

                {/* 3. Middle Tier (White Body with "Check Today's" text) */}
                <div className="relative w-[75%] mx-auto bg-white h-12 md:h-12 flex items-center justify-center px-4 shadow-xl border-x border-slate-100 z-20"
                     style={{ borderRadius: '4px 4px 0 0' }}>
                   <div className="flex items-center gap-1.5 md:gap-1.5">
                     {hasCheckedToday ? (
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 md:w-7 md:h-7 bg-emerald-500 rounded-md flex items-center justify-center shadow-sm">
                           <span className="text-white text-xs md:text-lg">✓</span>
                         </div>
                         <span className="font-bold text-[#2C3E50] text-[0.8rem] md:text-[0.9rem] whitespace-nowrap tracking-tight">{t('home_today_checked')}</span>
                       </div>
                     ) : (
                       <div className="flex items-center gap-1 md:gap-1.5">
                         <span className="text-lg md:text-xl drop-shadow-sm">🔥</span>
                         <span className="font-bold text-[#2C3E50] text-[0.85rem] md:text-[0.95rem] whitespace-nowrap tracking-tight font-sans">{t('home_check_todays')}</span>
                       </div>
                     )}
                   </div>
                </div>

                {/* 4. Bottom Hull (Blue Body with "Streak" text) */}
                <div className="relative w-full bg-gradient-to-b from-[#1E88E5] to-[#1565C0] h-12 md:h-14 shadow-2xl flex items-center justify-center overflow-hidden z-[5] border-t-2 border-[#64B5F6]/30"
                     style={{ borderRadius: '0 0 60% 60% / 0 0 100% 100%' }}>
                   {!hasCheckedToday ? (
                     <span className="text-white font-bold text-[1rem] md:text-[1.2rem] tracking-wide drop-shadow-md">
                       {t('home_streak')}
                     </span>
                   ) : (
                     <span className="text-white font-bold text-[0.8rem] md:text-[0.9rem] opacity-80 uppercase tracking-widest">
                       {t('home_excellent')}
                     </span>
                   )}
                   {/* Wake/Ripples effect at bottom */}
                   <div className="absolute bottom-0 w-full h-4 bg-white/20 blur-md animate-pulse"></div>
                </div>

                {/* Underwater Shadow & Wake */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-[#B3E5FC]/40 blur-xl rounded-full -z-10 animate-pulse"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full h-8 bg-blue-900/10 blur-[40px] rounded-full -z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOLUTIONS GRID */}
      <section className="py-24 px-6 relative dark:bg-[#030712] z-[50]">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <h2 className="reveal-on-scroll font-serif text-[2.8rem] md:text-[3.2rem] text-[#0A3A78] dark:text-white mb-16 text-center tracking-tight"> {t('solutions')} </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <SolutionCard title={t('wellness_seekers')} icon="🧘‍♀️" delay="0ms" />
            <SolutionCard title={t('providers')} subtitle={t('sol_sub_providers')} icon="👩‍⚕️" delay="100ms" />
            <SolutionCard title={t('corporates')} subtitle={t('sol_sub_corporates')} icon="🏢" delay="200ms" />
            <SolutionCard title={t('education')} subtitle={t('sol_sub_education')} icon="🎓" delay="300ms" />
          </div>
        </div>
      </section>

      {/* BOT & PET SECTION */}
      <section className="py-24 px-6 bg-[#F0F9FF] dark:bg-[#020617] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 relative z-10">
          <div className="reveal-on-scroll group bg-white dark:bg-[#111827] rounded-[40px] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500">
            <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-5xl mb-10"> 🤖 </div>
            <h3 className="font-serif text-[2.4rem] text-[#0A3A78] dark:text-white mb-6">{t('virtual_bot')}</h3>
            <p className="text-[#475569] dark:text-slate-400 text-[1.15rem] mb-12"> {t('virtual_bot_desc')} </p>
            <button type="button" className="px-10 py-5 rounded-full bg-white dark:bg-slate-800 text-[#1E59FF] dark:text-sky-400 font-bold border-2 border-blue-100 dark:border-slate-700 hover:bg-[#1E59FF] hover:text-white transition-all"> {t('chat_now')} </button>
          </div>
          <div className="reveal-on-scroll group bg-white dark:bg-[#111827] rounded-[40px] p-10 md:p-14 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500">
            <div className="w-24 h-24 bg-amber-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-5xl mb-10"> 🐕 </div>
            <h3 className="font-serif text-[2.4rem] text-[#0A3A78] dark:text-white mb-6">{t('pet_therapy')}</h3>
            <p className="text-[#475569] dark:text-slate-400 text-[1.15rem] mb-12"> {t('pet_therapy_desc')} </p>
            <button type="button" className="px-10 py-5 rounded-full bg-white dark:bg-slate-800 text-[#D97706] dark:text-amber-400 font-bold border-2 border-amber-100 dark:border-slate-700 hover:bg-[#D97706] hover:text-white transition-all"> {t('meet_fluffy')} </button>
          </div>
        </div>
      </section>

      {/* SOUND THERAPY - UPDATED SECTION WITH DIRECT LINK */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F0F9FF] to-[#FDFCF8] dark:from-[#020617] dark:to-[#030712]">
        <div className="max-w-[1280px] mx-auto reveal-on-scroll">
          <div className="bg-white dark:bg-[#111827] rounded-[50px] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex-1">
              <span className="inline-block px-6 py-2 rounded-full bg-blue-50 dark:bg-slate-800 text-[#0A3A78] dark:text-sky-300 text-xs font-bold uppercase mb-10 border border-blue-50 dark:border-slate-700"> {t('footer_featured')} </span>
              <h2 className="font-serif text-[3rem] md:text-[4rem] text-[#0A3A78] dark:text-white leading-[1.1] mb-8"> {t('sound_therapy')} </h2>
              <p className="text-[1.25rem] text-[#475569] dark:text-slate-400 leading-relaxed mb-12"> {t('sound_therapy_desc')} </p>
              
              {/* Main Button Link for Sound Therapy */}
              <button 
                type="button" 
                onClick={navigateToSoundTherapy}
                className="text-[#1E59FF] dark:text-sky-400 font-bold text-xl flex items-center gap-3 hover:gap-5 transition-all"
              > 
                {t('explore_library')} <span>→</span> 
              </button>
            </div>
            
            <div className="flex-1 flex justify-center">
              {/* Play Button Link for Sound Therapy */}
              <div 
                onClick={navigateToSoundTherapy}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#1E59FF] to-[#004BCE] dark:bg-slate-800 dark:bg-none flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-500 cursor-pointer group"
              >
                <div className="w-0 h-0 border-t-[25px] border-t-transparent border-l-[45px] border-l-white border-b-[25px] border-b-transparent ml-4 transition-transform group-hover:scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Statement */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto reveal-on-scroll">
          <h2 className="font-serif text-[2.8rem] text-[#0A3A78] dark:text-white mb-8">{t('support_statement_title')}</h2>
          <p className="text-lg text-[#475569] dark:text-slate-400 leading-relaxed">{t('support_statement_desc')}</p>
        </div>
      </section>

      {/* MISSING CTA SECTION FROM IMAGE */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-white dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto relative z-10 reveal-on-scroll">
          <h2 className="font-serif text-[3.2rem] md:text-[4.5rem] text-[#0A3A78] dark:text-white mb-6 leading-[1.1] tracking-tight transition-colors">
            {t('final_cta_title')} {t('final_cta_better')}{t('final_cta_title_end')}
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-2 transition-colors">
            {t('join_thousands')}
          </p>
          <p className="text-xl font-bold text-[#1E59FF] dark:text-sky-400 mb-12 transition-colors">
            {t('first_assessment_free')}
          </p>
          <div className="flex flex-col items-center gap-6">
            <button 
              type="button"
              onClick={() => window.location.hash = '#/onboarding/name'} 
              className="px-16 py-6 rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white text-xl font-bold shadow-[0_15px_35px_-5px_rgba(30,89,255,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(30,89,255,0.5)] hover:-translate-y-1 hover:brightness-105 transition-all duration-300 ring-4 ring-blue-500/10"
            >
              {t('begin_journey')}
            </button>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium tracking-wide transition-colors">
              {t('final_cta_sub')}
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#F8FAFC] dark:bg-[#020617] pt-24 pb-12 px-6 border-t border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mb-20">
            <div>
              <h4 className="font-bold text-[#0A3A78] dark:text-white mb-8 text-lg">Manas360</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-500 font-medium">
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">{t('about_us')}</li>
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0A3A78] dark:text-white mb-8 text-lg">{t('solutions')}</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-500 font-medium">
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">For Individuals</li>
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">For Business</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0A3A78] dark:text-white mb-8 text-lg">{t('support')}</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-500 font-medium">
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0A3A78] dark:text-white mb-8 text-lg">{t('legal')}</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-500 font-medium">
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-[#1E59FF] cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>
          </div>
          <div className="py-10 border-t border-slate-200 dark:border-slate-900">
            <p className="text-slate-500 dark:text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed"> If you're experiencing a life-threatening emergency or crisis, please call 911 or the National Suicide Prevention Lifeline at 988. </p>
          </div>
          <div className="text-slate-400 dark:text-slate-700 text-xs font-bold tracking-widest"> © 2024 Manas360 Wellness. All rights reserved. </div>
        </div>
      </footer>
    </div>
  );
};

const MobileMenuItem: React.FC<{ icon: string, label: string }> = ({ icon, label }) => (
  <button type="button" className="flex items-center gap-3 p-3 w-full text-left rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <span className="text-xl">{icon}</span>
    <span className="text-[1.05rem] font-medium text-slate-700 dark:text-slate-200">{label}</span>
  </button>
);

const DropdownButton: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button type="button" className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-all focus:outline-none dark:text-white"> {title} <span className={`text-[0.7rem] transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span> </button>
      <div className={`absolute top-full left-0 pt-5 transition-all z-[5000] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 min-w-[200px]"> {children} </div>
      </div>
    </div>
  );
};

const DropdownItem: React.FC<{ icon?: string; label: string }> = ({ icon, label }) => (
  <button type="button" className="flex items-center gap-3 px-5 py-3 w-full text-left text-[0.95rem] font-medium text-[#2E3A48] dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-[#0A3A78] dark:hover:text-white rounded-xl transition-all"> 
    {icon && <span className="text-lg">{icon}</span>} <span>{label}</span>
  </button>
);

const SolutionCard: React.FC<{ title: string; subtitle?: string; icon: string; delay?: string }> = ({ title, subtitle, icon, delay }) => (
  <div 
    className={`reveal-on-scroll bg-[#F0F7FF] dark:bg-[#111827] p-10 rounded-[32px] flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-white dark:border-slate-800 shadow-sm group transition-colors duration-300`} 
    style={{ transitionDelay: delay }}
  >
    <div className="text-5xl mb-8 bg-white dark:bg-slate-800 w-24 h-24 rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-transparent dark:border-slate-700 transition-colors"> {icon} </div>
    <h3 className="font-serif text-[1.6rem] font-bold text-[#0A3A78] dark:text-white mb-2 leading-tight transition-colors">{title}</h3>
    {subtitle && <p className="text-[1rem] text-[#475569] dark:text-slate-400 font-medium transition-colors">{subtitle}</p>}
  </div>
);

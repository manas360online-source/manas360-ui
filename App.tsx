import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { HowItWorks } from './components/HowItWorks';
import { Testimonial } from './components/Testimonial';
import { FinalCTA } from './components/FinalCTA';
import { CrisisBanner } from './components/CrisisBanner';
import { Assessment } from './components/Assessment';
import { ResultsPage } from './components/ResultsPage';
import { CrisisPage } from './components/CrisisPage';
import { HomePage } from './components/HomePage';
import { OnboardingName } from './components/OnboardingName';
import { OnboardingEmail } from './components/OnboardingEmail';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { TherapistDashboard } from './components/TherapistDashboard';
import { SessionBuilder } from './components/SessionBuilder';
import { SessionRunner } from './components/SessionRunner';
import { SessionResultsView } from './components/SessionResultsView';
import { SubscribePage } from './components/SubscribePage';
import { PatientPlansPage } from './components/PatientPlansPage';
import { TherapistPlansPage } from './components/TherapistPlansPage';
import { CorporatePlansPage } from './components/CorporatePlansPage';
import { GuruPlansPage } from './components/GuruPlansPage';
import { BillingHistoryPage } from './components/BillingHistoryPage';
import { StreaksJourney } from './components/StreaksJourney';
import { SoundTherapyLanding } from './components/SoundTherapyLanding';
import { SoundPricingPage } from './components/SoundPricingPage';
import { SoundCategoryPage } from './components/SoundCategoryPage';
import { DeveloperApiResourcesPage } from './components/DeveloperApiResourcesPage';
import { CancellationRefundPolicy } from './components/CancellationRefundPolicy';
import { ARThemedRoomLanding } from './components/ARThemedRoomLanding';
import { ARPlansPage } from './components/ARPlansPage';
import { ARThemePlayer } from './components/ARThemePlayer';
import { ARRealRoomPlayer } from './components/ARRealRoomplayer';
import { FreeToolsPage } from './components/FreeToolsPage';
import { QuickLaunchDock } from './components/QuickLaunchDock';
import { LoginModal } from './components/LoginModal';
import { RoleSelection } from './components/RoleSelection';
import { ProfileSetup } from './components/ProfileSetup';
import { TherapistRegistration } from './components/TherapistRegistration';
import TherapistRegistrationFlow from './TherapistRegistrationFlow/TherapistRegistrationFlow';
import { Session } from './types';
import { storageService } from './utils/storageService';
import CertificationApp from './certification-platform/CertificationApp';
import MatchingApp from './connecting patients to mached therapists/App';
import CBTApp from './CBTSessionEngine/CBTApp';
import MeeraApp from './MeeraAI chatbot/MeeraApp';

export type ViewState =
  | 'landing'
  | 'assessment'
  | 'results'
  | 'crisis'
  | 'home'
  | 'onboarding-name'
  | 'onboarding-email'
  | 'full-assessment'
  | 'run-assessment'
  | 'therapist-dashboard'
  | 'session-builder'
  | 'session-preview'
  | 'session-results'
  | 'subscribe'
  | 'subscribe-patients'
  | 'subscribe-therapists'
  | 'subscribe-corporate'
  | 'subscribe-guru'
  | 'billing'
  | 'streaks-journey'
  | 'sound-therapy'
  | 'sound-therapy-plans'
  | 'sound-therapy-category'
  | 'sound-billing'
  | 'developer-api-resources'
  | 'cancellation-refund-policy'
  | 'ar-themed-room'
  | 'ar-plans'
  | 'ar-billing'
  | 'ar-player'
  | 'ar-real-room'
  | 'free-tools'
  | 'role-selection'
  | 'profile-setup'
  | 'therapist-registration'
  | 'certifications'
  | 'therapist-matching'
  | 'therapist-registration-flow'
  | 'cbt-sessions'
  | 'meera-chat';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [currentSoundCategory, setCurrentSoundCategory] = useState<string>('');
  const [currentARThemeId, setCurrentARThemeId] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});

  const [editingSession, setEditingSession] = useState<Session | undefined>(undefined);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<any>(null);

  // Landing Page Login State
  const [showLandingLogin, setShowLandingLogin] = useState(false);

  // Helper to get base path with current language
  const getPath = (view: string) => `#/${i18n.language}/${view}`;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Redirect singular or missing trailing slash
      if (hash === '#/certification' || hash === '#/certifications') {
        window.location.hash = '#/certifications/';
        return;
      }

      if (hash.startsWith('#/therapist-matching')) {
        setCurrentView('therapist-matching'); // Direct switch, inner router handles rest
        return;
      }

      if (hash.startsWith('#/certifications')) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentView('certifications');
          setIsTransitioning(false);
          window.scrollTo(0, 0);
        }, 300);
        return;
      }

      // Regex to parse #/lang/view
      const match = hash.match(/^#\/([a-z]{2})\/(.*)$/);

      if (match) {
        const lang = match[1];
        const view = match[2];

        if (view.startsWith('certifications')) {
          // Ensure trailing slash for sub-router to work correctly
          if (view === 'certifications' && !hash.endsWith('/')) {
            window.location.hash = '#/certifications/';
            return;
          }
          // If it already has slash or is a sub-route, let it pass through to view mapper
        }

        // Sync i18n language if URL differs
        if (lang !== i18n.language) {
          i18n.changeLanguage(lang);
        }

        setIsTransitioning(true);
        setTimeout(() => {
          // Check for Sound Therapy Category
          if (view.startsWith('sound-therapy/plans')) {
            mapView('sound-therapy-plans');
          } else if (view.startsWith('sound-therapy/billing')) {
            mapView('sound-billing');
          } else if (view.startsWith('sound-therapy/')) {
            const category = view.split('/')[1];
            setCurrentSoundCategory(category);
            mapView('sound-therapy-category');
          } else if (view.startsWith('ar-themed-room/plans')) {
            mapView('ar-plans');
          } else if (view.startsWith('ar-themed-room/billing')) {
            mapView('ar-billing');
          } else if (view.startsWith('ar-themed-room/real-ar')) {
            mapView('ar-real-room');
          } else if (view.startsWith('ar-themed-room/player/')) {
            const themeId = view.split('/')[2];
            setCurrentARThemeId(themeId);
            mapView('ar-player');
          } else if (view.startsWith('ar-themed-room')) {
            mapView('ar-themed-room');
          } else {
            // Strip query params for basic view mapping
            const baseView = view.split('?')[0];
            mapView(baseView as ViewState);
          }
          setIsTransitioning(false);
          window.scrollTo(0, 0);
        }, 300);
      } else {
        // Handle routes without lang prefix if any, or redirect defaults
        const currentLang = i18n.language || 'en';
        // Handle root case
        if (hash === '' || hash === '#/') {
          window.location.hash = `#/${currentLang}/landing`;
        } else {
          // Try to preserve view if it looks like a legacy route
          const legacyView = hash.replace('#/', '');
          if (!legacyView.includes('/')) {
            window.location.hash = `#/${currentLang}/${legacyView || 'landing'}`;
          }
        }
      }
    };

    // View Mapper
    const mapView = (viewPath: string) => {
      if (viewPath === 'assessment') setCurrentView('assessment');
      else if (viewPath === 'results') setCurrentView('results');
      else if (viewPath === 'crisis') setCurrentView('crisis');
      else if (viewPath === 'home') setCurrentView('home');
      else if (viewPath === 'onboarding/name') setCurrentView('onboarding-name');
      else if (viewPath === 'onboarding/email') setCurrentView('onboarding-email');
      else if (viewPath === 'full-assessment') setCurrentView('full-assessment');
      else if (viewPath === 'assessment/run') setCurrentView('run-assessment');
      else if (viewPath === 'assessment/view') setCurrentView('session-results');
      else if (viewPath === 'therapist') setCurrentView('therapist-dashboard');
      else if (viewPath === 'therapist/builder') setCurrentView('session-builder');
      else if (viewPath === 'therapist/preview') setCurrentView('session-preview');
      else if (viewPath === 'subscribe') setCurrentView('subscribe');
      else if (viewPath === 'subscribe/patients') setCurrentView('subscribe-patients');
      else if (viewPath === 'subscribe/therapists') setCurrentView('subscribe-therapists');
      else if (viewPath === 'subscribe/corporate') setCurrentView('subscribe-corporate');
      else if (viewPath === 'subscribe/guru') setCurrentView('subscribe-guru');
      else if (viewPath === 'billing') setCurrentView('billing');
      else if (viewPath === 'streaks') setCurrentView('streaks-journey');
      else if (viewPath === 'sound-therapy') setCurrentView('sound-therapy');
      else if (viewPath === 'sound-therapy-plans') setCurrentView('sound-therapy-plans');
      else if (viewPath === 'sound-therapy-category') setCurrentView('sound-therapy-category');
      else if (viewPath === 'sound-billing') setCurrentView('sound-billing');
      else if (viewPath === 'ar-themed-room') setCurrentView('ar-themed-room');
      else if (viewPath === 'ar-plans') setCurrentView('ar-plans');
      else if (viewPath === 'ar-billing') setCurrentView('ar-billing');
      else if (viewPath === 'ar-player') setCurrentView('ar-player');
      else if (viewPath === 'ar-real-room') setCurrentView('ar-real-room');
      else if (viewPath === 'developer-api-resources') setCurrentView('developer-api-resources');
      else if (viewPath === 'cancellation-refund-policy') setCurrentView('cancellation-refund-policy');
      else if (viewPath === 'free-tools') setCurrentView('free-tools');
      else if (viewPath === 'role-selection') setCurrentView('role-selection');
      else if (viewPath === 'profile-setup') setCurrentView('profile-setup');
      else if (viewPath === 'therapist-registration') setCurrentView('therapist-registration');
      else if (viewPath.startsWith('therapist-registration-flow')) setCurrentView('therapist-registration-flow');
      else if (viewPath.startsWith('certifications')) setCurrentView('certifications');
      else if (viewPath === 'cbt-sessions') setCurrentView('cbt-sessions');
      else if (viewPath === 'meera-chat') setCurrentView('meera-chat');

      else setCurrentView('landing');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [i18n]);

  useEffect(() => {
    if (currentView !== 'landing') return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);

  const navigate = (view: string) => {
    window.location.hash = getPath(view);
  };

  const handleStartAssessment = () => {
    // Open Login Modal to start the journey instead of going directly to assessment
    setShowLandingLogin(true);
  };

  const handleAssessmentSubmit = (data: any, isCritical: boolean) => {
    setAssessmentData(data);
    if (isCritical) {
      navigate('crisis');
    } else {
      navigate('results');
    }
  };

  const handleUpdateUser = (data: any) => {
    setUserData({ ...userData, ...data });
  };

  const handleStartSession = (session: Session) => {
    setActiveSession(session);
    navigate('assessment/run');
  };

  const handleSessionComplete = (answers: any) => {
    if (activeSession) {
      storageService.saveHistory({
        sessionTitle: activeSession.title,
        sessionId: activeSession.id,
        answers: answers
      });
    }
    navigate('full-assessment');
  };

  const handleViewHistory = (record: any) => {
    setViewingHistoryRecord(record);
    navigate('assessment/view');
  };

  const handleCreateSession = () => {
    setEditingSession(undefined);
    navigate('therapist/builder');
  };

  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    navigate('therapist/builder');
  };

  const handlePreviewSession = (session: Session) => {
    setActiveSession(session);
    navigate('therapist/preview');
  };

  const handleFloatingCloudClick = () => {
    window.location.hash = '#/free-tools';
  };

  return (
    <div
      className={`
        relative min-h-screen font-sans 
        text-wellness-slate dark:text-slate-100
        bg-wellness-bg dark:bg-[#030712]
        transition-colors duration-500 ease-in-out
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* FLOATING CLOUD CTA (PERSISTENT IN APP, VISIBLE ONLY ON HOME) */}
      <div
        className={`fixed top-40 md:top-24 right-0 md:right-0 lg:right-0 z-[2500] cursor-pointer group flex flex-col items-center animate-float transition-opacity duration-300 ${(currentView === 'home') ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleFloatingCloudClick}
        style={{ animationDuration: '6s' }}
      >
        <div className="relative w-[130px] md:w-[170px] lg:w-[370px] hover:scale-105 transition-transform duration-500 filter drop-shadow-2xl">
          <img
            src="/images/floating-cloud.png"
            alt="Start Free"
            loading="eager"
            className="w-full h-auto object-contain opacity-100 brightness-110 contrast-125 relative z-10"
          />
          {/* Text Overlay on Cloud */}
          <div className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full pt-2 z-20">
            {/* Added 'force-cloud-text' class to prevent white text in dark mode */}
            <p className="font-serif font-bold text-[#0A3A78] force-cloud-text text-[0.8rem] md:text-[0.9rem] lg:text-[2.2rem] leading-[1.1] tracking-tight drop-shadow-md whitespace-nowrap lg:whitespace-normal">
              Click to<br />Start Free
            </p>
          </div>

          {/* Shiny Blowing Thunder Effect */}
          <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 z-0 flex justify-center">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-8 md:h-8 lg:w-20 lg:h-20 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)] animate-pulse"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {/* Glow effect backing */}
              <div className="absolute inset-0 bg-sky-400 blur-xl opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {currentView === 'landing' && (
        <>
          <QuickLaunchDock />
          <LoginModal isOpen={showLandingLogin} onClose={() => setShowLandingLogin(false)} />

          <div
            className="landing relative w-full transition-colors duration-500 overflow-hidden"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2560&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll',
            }}
          >
            <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 backdrop-brightness-100 dark:backdrop-brightness-[0.3]"></div>
            <div className="absolute inset-0 bg-[#E0F2FE]/30 dark:bg-slate-950/70 mix-blend-overlay dark:mix-blend-normal pointer-events-none z-[1] transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB]/40 via-[#E0F2FE]/40 to-[#FDFCF8] dark:from-slate-950/90 dark:via-slate-900/50 dark:to-[#030712] pointer-events-none z-[2] transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent dark:from-[#030712] dark:via-[#030712]/95 transition-all duration-500 z-10"></div>
            <BackgroundParticles />

            <div className="landing-content relative z-20 w-full max-w-[1400px] mx-auto px-4 py-4 pb-32 md:pb-48">
              <Header
                onLoginClick={() => setShowLandingLogin(true)}
                onCertificationsClick={() => { window.location.hash = '#/certifications/'; }}
              />
              <Hero onStartClick={handleStartAssessment} />
            </div>
          </div>

          <main className="relative z-30 flex flex-col gap-32 w-full max-w-[1280px] mx-auto px-6 -mt-24 pb-24">
            <div className="reveal"><TrustBar /></div>
            <div className="reveal"><HowItWorks /></div>
            <div className="reveal"><Testimonial /></div>
            <FinalCTA onStartClick={handleStartAssessment} />
          </main>
          <CrisisBanner />
        </>
      )}

      {currentView === 'assessment' && <Assessment onSubmit={handleAssessmentSubmit} />}
      {currentView === 'results' && <ResultsPage data={assessmentData} />}
      {currentView === 'full-assessment' && <AssessmentDashboard onStartSession={handleStartSession} onViewHistory={handleViewHistory} onBack={() => navigate('results')} />}
      {currentView === 'run-assessment' && activeSession && <SessionRunner session={activeSession} onComplete={handleSessionComplete} onExit={() => navigate('full-assessment')} />}
      {currentView === 'session-results' && viewingHistoryRecord && <SessionResultsView historyRecord={viewingHistoryRecord} onBack={() => navigate('full-assessment')} />}
      {currentView === 'crisis' && <CrisisPage />}
      {currentView === 'home' && <HomePage />}
      {currentView === 'onboarding-name' && <OnboardingName onNext={(data) => { handleUpdateUser(data); navigate('onboarding/email'); }} />}
      {currentView === 'onboarding-email' && <OnboardingEmail userName={userData.firstName} />}
      {currentView === 'therapist-dashboard' && <TherapistDashboard onCreate={handleCreateSession} onEdit={handleEditSession} onPreview={handlePreviewSession} />}
      {currentView === 'session-builder' && <SessionBuilder initialSession={editingSession} onSave={() => navigate('therapist')} onCancel={() => navigate('therapist')} />}
      {currentView === 'session-preview' && activeSession && <SessionRunner session={activeSession} onExit={() => navigate('therapist')} onComplete={() => { alert('Preview Complete!'); navigate('therapist'); }} />}
      {currentView === 'subscribe' && <SubscribePage />}
      {currentView === 'subscribe-patients' && <PatientPlansPage />}
      {currentView === 'subscribe-therapists' && <TherapistPlansPage />}
      {currentView === 'subscribe-corporate' && <CorporatePlansPage />}
      {currentView === 'subscribe-guru' && <GuruPlansPage />}
      {currentView === 'billing' && <BillingHistoryPage context="general" />}
      {currentView === 'streaks-journey' && <StreaksJourney />}
      {currentView === 'sound-therapy' && <SoundTherapyLanding />}
      {currentView === 'sound-therapy-plans' && <SoundPricingPage />}
      {currentView === 'sound-therapy-category' && <SoundCategoryPage category={currentSoundCategory} />}
      {currentView === 'sound-billing' && <BillingHistoryPage context="sound" />}
      {currentView === 'developer-api-resources' && <DeveloperApiResourcesPage />}
      {currentView === 'cancellation-refund-policy' && <CancellationRefundPolicy />}
      {currentView === 'ar-themed-room' && <ARThemedRoomLanding />}
      {currentView === 'ar-plans' && <ARPlansPage />}
      {currentView === 'ar-billing' && <BillingHistoryPage context="ar" />}
      {currentView === 'ar-player' && <ARThemePlayer themeId={currentARThemeId} />}
      {currentView === 'ar-real-room' && <ARRealRoomPlayer />}
      {currentView === 'free-tools' && <FreeToolsPage />}
      {currentView === 'role-selection' && <RoleSelection />}
      {currentView === 'profile-setup' && <ProfileSetup />}
      {currentView === 'therapist-registration' && <TherapistRegistration />}
      {currentView === 'therapist-registration-flow' && <TherapistRegistrationFlow onBack={() => navigate('therapist-registration')} />}
      {currentView === 'therapist-matching' && <MatchingApp />}
      {currentView === 'certifications' && <CertificationApp />}
      {currentView === 'cbt-sessions' && <CBTApp onBack={() => navigate('home')} />}
      {currentView === 'meera-chat' && <MeeraApp onBack={() => navigate('home')} />}
    </div>
  );
};

export default App;
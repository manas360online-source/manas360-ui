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
import { ShopProductList } from './components/ShopProductList';
import { ShopProductDetail } from './components/ShopProductDetail';
import { ShopCart } from './components/ShopCart';
import { ShopCheckout } from './components/ShopCheckout';
import { ShopPaymentDemo } from './components/ShopPaymentDemo';
import { ShopOrderSuccess, ShopPaymentFailed } from './components/ShopOrderResult';
import { ShopOrders } from './components/ShopOrders';
import { Session } from './types';
import { storageService } from './utils/storageService';

export type ViewState = 'landing' | 'assessment' | 'results' | 'crisis' | 'home' | 'onboarding-name' | 'onboarding-email' | 'full-assessment' | 'run-assessment' | 'therapist-dashboard' | 'session-builder' | 'session-preview' | 'session-results' | 'subscribe' | 'subscribe-patients' | 'subscribe-therapists' | 'subscribe-corporate' | 'subscribe-guru' | 'billing' | 'streaks-journey' | 'sound-therapy' | 'sound-therapy-plans' | 'sound-therapy-category' | 'sound-billing' | 'shop' | 'shop-product' | 'cart' | 'checkout' | 'payment-demo' | 'order-success' | 'payment-failed' | 'orders';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [currentSoundCategory, setCurrentSoundCategory] = useState<string>('');
  const [currentProductId, setCurrentProductId] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});
  
  const [editingSession, setEditingSession] = useState<Session | undefined>(undefined);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<any>(null);

  // Helper to get base path with current language
  const getPath = (view: string) => `#/${i18n.language}/${view}`;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // Regex to parse #/lang/view
      const match = hash.match(/^#\/([a-z]{2})\/(.*)$/);
      
      // Handle legacy routes like #/shop-product/123 without lang prefix sometimes
      // Or just standard routes
      
      if (match) {
        const lang = match[1];
        const view = match[2];

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
          } else if (view.startsWith('shop-product/')) {
            const id = view.split('/')[1];
            setCurrentProductId(id);
            mapView('shop-product');
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
        } else if (hash.startsWith('#/shop-product/')) {
           // Handle legacy link structure if manually typed
           const id = hash.split('/')[2];
           setCurrentProductId(id);
           setCurrentView('shop-product');
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
      
      // E-Commerce Routes
      else if (viewPath === 'shop') setCurrentView('shop');
      else if (viewPath === 'shop-product') setCurrentView('shop-product');
      else if (viewPath === 'cart') setCurrentView('cart');
      else if (viewPath === 'checkout') setCurrentView('checkout');
      else if (viewPath === 'payment-demo') setCurrentView('payment-demo');
      else if (viewPath === 'order-success') setCurrentView('order-success');
      else if (viewPath === 'payment-failed') setCurrentView('payment-failed');
      else if (viewPath === 'orders') setCurrentView('orders');
      
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

  const handleStartAssessment = () => navigate('assessment');

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

  return (
    <div 
      className={`
        relative min-h-screen font-sans 
        text-wellness-slate dark:text-slate-100
        bg-wellness-bg dark:bg-[#1a1c22]
        transition-colors duration-500 ease-in-out
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {currentView === 'landing' && (
        <>
          <div 
            className="landing relative w-full transition-colors duration-500 overflow-hidden"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2560&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll',
            }}
          >
            <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 backdrop-brightness-100 dark:backdrop-brightness-[0.45]"></div>
            <div className="absolute inset-0 bg-[#E0F2FE]/30 dark:bg-slate-900/60 mix-blend-overlay dark:mix-blend-normal pointer-events-none z-[1] transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB]/40 via-[#E0F2FE]/40 to-[#FDFCF8] dark:from-slate-950/70 dark:via-slate-900/40 dark:to-[#1a1c22] pointer-events-none z-[2] transition-all duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent dark:from-[#1a1c22] dark:via-[#1a1c22]/95 transition-all duration-500 z-10"></div>
            <BackgroundParticles />
            
            <div className="landing-content relative z-20 w-full max-w-[1280px] mx-auto px-6 py-8 pb-32 md:pb-48">
              <Header />
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
      
      {/* E-Commerce Components */}
      {currentView === 'shop' && <ShopProductList />}
      {currentView === 'shop-product' && <ShopProductDetail productId={currentProductId} />}
      {currentView === 'cart' && <ShopCart />}
      {currentView === 'checkout' && <ShopCheckout />}
      {currentView === 'payment-demo' && <ShopPaymentDemo />}
      {currentView === 'order-success' && <ShopOrderSuccess />}
      {currentView === 'payment-failed' && <ShopPaymentFailed />}
      {currentView === 'orders' && <ShopOrders />}
    </div>
  );
};

export default App;
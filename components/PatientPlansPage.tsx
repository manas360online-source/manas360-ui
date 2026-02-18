
import React, { useState, useEffect } from 'react';
import { storageService } from '../utils/storageService';
import { SubscriptionSuccessModal } from './SubscriptionSuccessModal';

export const PatientPlansPage: React.FC = () => {
  const [successData, setSuccessData] = useState<{ category: string; planName: string; price: string } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1] || '';
    const params = new URLSearchParams(queryString);

    if (params.get('success') === 'true') {
      const planName = params.get('planName');
      const price = params.get('price');
      if (planName && price) {
        setSuccessData({ category: 'Patients', planName, price });
      }
    }
  }, []);

  const handleBack = () => {
    window.location.hash = '#/subscribe';
  };

  const handleBilling = () => {
    window.location.hash = '#/billing';
  };

  const handleSubscribe = (planName: string, price: string) => {
    const currentPath = window.location.hash.split('?')[0];
    const returnUrl = `${currentPath}?planName=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}`;
    window.location.hash = `#/payment-landing?planName=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}&returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  const onConfirmOk = () => {
    if (successData) {
      storageService.saveSubscription({
        category: successData.category,
        planName: successData.planName,
        price: successData.price
      });
      setSuccessData(null);
    }
  };

  const subscribeBtnClass = "w-full py-3 rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white font-bold shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all text-base";

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-x-hidden dark:bg-[#030712]">
      {/* Success Modal */}
      {successData && (
        <SubscriptionSuccessModal
          category={successData.category}
          planName={successData.planName}
          onOk={onConfirmOk}
        />
      )}

      {/* Background Image logic */}
      <div
        className="absolute inset-0 z-0 bg-[#EBF5FF] dark:bg-[#030712]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2560&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: document.documentElement.classList.contains('dark') ? 'blur(4px) brightness(0.2)' : 'blur(2px) brightness(1.05)',
        }}
      ></div>

      {/* Glass Container - Adjusted for mobile growth */}
      <div className="relative z-10 w-full max-w-[1180px] bg-white/80 dark:bg-[#0A0F1D]/90 backdrop-blur-3xl rounded-[32px] sm:rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/60 dark:border-slate-800/80 flex flex-col transition-all duration-500 my-8 lg:my-0">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 md:px-10 py-4 md:py-4 border-b border-slate-200/50 dark:border-slate-800/50 gap-4">
          <button onClick={handleBack} className="flex items-center gap-2 text-[#1E59FF] dark:text-white font-bold text-[0.9rem] sm:text-[1rem] hover:opacity-75 transition-all self-start sm:self-center">
            <span className="text-xl">←</span> Back
          </button>

          <h1 className="font-serif text-lg sm:text-xl font-bold text-[#0A3A78] dark:text-white tracking-widest uppercase text-center">
            PATIENTS
          </h1>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <button onClick={handleBilling} className="px-5 py-2 rounded-xl border border-[#0A3A78]/10 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-[#0A3A78] dark:text-sky-300 font-bold text-[0.65rem] sm:text-[0.7rem] flex items-center gap-2 hover:bg-white dark:hover:bg-slate-700 transition-all whitespace-nowrap">
              <span className="text-base">📋</span> Billing History
            </button>

            {/* Nazar Bottu / Evil Eye Icon */}
            <div className="select-none pointer-events-none drop-shadow-sm">
              <span className="text-[28px] leading-none">🧿</span>
            </div>
          </div>
        </div>

        {/* Content - Removed justify-center on mobile to prevent clipping and added pt-8 for clearance */}
        <div className="pt-8 pb-6 px-4 sm:pt-10 sm:px-6 lg:p-8 flex flex-col lg:flex-row gap-4 md:gap-5 lg:justify-center items-stretch max-h-[80vh] lg:max-h-none overflow-y-auto lg:overflow-visible">

          <PlanOptionCard
            title="Healer"
            items={[
              "Assessment – AI",
              "Access to Therapists",
              "Therapist Sessions – Rs 499/session",
              "Dr. Arya – IVR Bot (limited network access)",
              "Couple Therapy – Rs 1499/session",
              "Performance Tracker",
              "Review by Manas360 Coach",
              "Daily Practices – Audio"
            ]}
            pricing="(No monthly subscription – pay per session only)"
            btnClass={subscribeBtnClass}
            onSubscribe={() => handleSubscribe('Healer', '₹499/session')}
          />

          <PlanOptionCard
            title="Buddy"
            items={[
              "Assessment – AI",
              "Therapist Sessions – Rs 699/session",
              "Performance Tracker",
              "Daily Practices – Dr. Maya AR",
              "AR/VR on Smartphone with 4G/5G",
              "AnytimeBUDDY – 24x7",
              "Access to Talk2Buddy (Digital Human)",
              "Dr. Manu – Mood Chatbot",
              "Preview Aatman Engineering",
              "Couple Therapy – Rs 1499/session"
            ]}
            pricing="Rs 199/month locked for 4 months"
            btnClass={subscribeBtnClass}
            onSubscribe={() => handleSubscribe('Buddy', '₹199/month')}
          />

          <PlanOptionCard
            title="Guru"
            items={[
              "Assessment – AI",
              "Therapist Sessions – Rs 999/session",
              "Daily Practices – Dr. Maya AR",
              "Crisis Predictor – AI Avatar",
              "NLP & Behavioral Science",
              "Quantum Meditation",
              "Right Diet & SleepWell",
              "Digital Detox",
              "Aatman Engineering",
              "Reiki Coaching",
              "Couple Therapy – Rs 1499/session"
            ]}
            pricing="Rs 299/month locked for 4 months"
            btnClass={subscribeBtnClass}
            onSubscribe={() => handleSubscribe('Guru', '₹299/month')}
          />

        </div>
      </div>
    </div>
  );
};

interface PlanOptionCardProps {
  title: string;
  items: string[];
  pricing?: string;
  btnClass: string;
  onSubscribe: () => void;
}

const PlanOptionCard: React.FC<PlanOptionCardProps> = ({ title, items, pricing, btnClass, onSubscribe }) => (
  <div className="flex-1 bg-white dark:bg-[#0F172A] p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col hover:shadow-lg transition-all">
    <h3 className="font-serif text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] font-bold text-[#0A3A78] dark:text-white mb-3 sm:mb-4 text-center">{title}</h3>

    <div className="flex-grow">
      <ul className="space-y-1.5 mb-6">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] text-slate-700 dark:text-slate-300 leading-tight">
            <span className="text-[#1E59FF] dark:text-sky-400 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-auto">
      {pricing && (
        <p className="text-center text-slate-700 dark:text-slate-400 text-[0.7rem] sm:text-xs md:text-sm mb-4 font-medium italic">
          {pricing}
        </p>
      )}
      <button className={`${btnClass} py-2.5 sm:py-3 text-[0.9rem] sm:text-[1rem]`} onClick={onSubscribe}>
        Subscribe Now
      </button>
    </div>
  </div>
);

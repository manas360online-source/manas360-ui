import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ChoosePlanPage: React.FC = () => {
    const { i18n } = useTranslation();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        // Check for payment success
        const hash = window.location.hash;
        if (hash.includes('success=true')) {
            setShowSuccessPopup(true);
            // Optional: Clean up URL if desired, but might be safer to leave for now to ensure popup stays if they reload
            // window.location.hash = `#/${i18n.language}/choose-plan`;
        }
    }, []);

    const handleBack = () => {
        // Navigate back to Profile Setup
        window.location.hash = `#/${i18n.language}/profile-setup`;
    };

    const handleSubscribe = () => {
        // Navigate to payment gateway
        // Passing returnUrl pointing back to this page
        const returnUrl = encodeURIComponent(`#/${i18n.language}/choose-plan`);
        const planName = encodeURIComponent("Quarterly Premium");
        const price = encodeURIComponent("₹297");

        window.location.hash = `#/payment-landing?planName=${planName}&price=${price}&returnUrl=${returnUrl}`;
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        // Navigate to Assessment (Wellness Check)
        window.location.hash = `#/${i18n.language}/assessment`;
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] dark:bg-[#020617] flex justify-center items-center p-4 font-sans text-slate-900 dark:text-slate-100 relative">

            {/* Back Button - Positioned Top Left */}
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg hover:opacity-75 transition-opacity z-10"
            >
                <span className="text-2xl">←</span> Choose Plan
            </button>

            {/* Main Centered Card */}
            <div className="w-full max-w-[390px] bg-white dark:bg-[#1E293B] rounded-[24px] p-8 shadow-xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 transition-colors mt-8 md:mt-0">

                {/* Title Section */}
                <div className="text-center mb-6">
                    <h2 className="text-[#5850EC] font-bold tracking-wider text-[0.7rem] mb-1 uppercase">PLATFORM ACCESS</h2>
                    <div className="flex justify-center items-baseline gap-1">
                        <span className="text-[3rem] font-bold text-[#5850EC] leading-tight">₹99</span>
                        <span className="text-lg text-slate-500 font-medium">/month</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">Billed quarterly · ₹297 for 3 months</p>
                </div>

                {/* Included Features */}
                <div className="space-y-3 mb-8">
                    <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-3">INCLUDED:</p>

                    <FeatureCard
                        icon="🆓"
                        title="Free Assessments"
                        description="PHQ-9, GAD-7, wellness screenings"
                        iconBg="bg-blue-500 text-white"
                    />
                    <FeatureCard
                        icon="🤖"
                        title="AI Chatbot 24/7"
                        description="Instant support in your language"
                        iconBg="bg-purple-100 text-purple-600"
                    />
                    <FeatureCard
                        icon="📊"
                        title="Daily Monitoring"
                        description="Mood tracker, sleep log, dashboard"
                        iconBg="bg-green-100 text-green-600"
                    />
                    <FeatureCard
                        icon="📚"
                        title="Wellness Library"
                        description="CBT exercises, guided meditation"
                        iconBg="bg-orange-100 text-orange-600"
                    />
                    <FeatureCard
                        icon="🐕"
                        title="Digital Pet Hub"
                        description="Hormone companions for daily wellness"
                        iconBg="bg-yellow-100 text-yellow-600"
                    />
                </div>

                {/* Subscribe Button */}
                <button
                    onClick={handleSubscribe}
                    className="w-full py-3.5 rounded-xl bg-[#5850EC] text-white font-bold text-lg shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                >
                    Subscribe ₹297 for 3 months →
                </button>

            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-[#1E293B] rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all scale-100 animate-scale-in text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl text-green-600 dark:text-green-400">✓</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Successfully Subscribed!</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">
                            You now have full access to all platform features.
                        </p>
                        <button
                            onClick={handlePopupClose}
                            className="w-full py-3 rounded-xl bg-[#5850EC] text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            Continue to Assessment
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    iconBg?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, iconBg = "bg-blue-50 dark:bg-slate-800" }) => {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-transparent hover:shadow-sm transition-shadow">
            <div className={`w-9 h-9 min-w-[2.25rem] rounded-lg flex items-center justify-center text-base ${iconBg}`}>
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-[0.7rem] leading-tight mt-0.5">{description}</p>
            </div>
        </div>
    );
};

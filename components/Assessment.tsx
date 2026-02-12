
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AssessmentProps {
  onSubmit: (data: any, isCritical: boolean) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  // State now stores IDs, not displayed strings
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [impact, setImpact] = useState<string>('');
  const [selfHarm, setSelfHarm] = useState<string>('');

  const toggleSymptom = (id: string) => {
    if (symptoms.includes(id)) {
      setSymptoms(symptoms.filter((s) => s !== id));
    } else {
      setSymptoms([...symptoms, id]);
    }
  };

  const handleFinish = () => {
    // Basic validation
    if (!selfHarm || !impact) {
      alert(t('assessment_alert'));
      return;
    }

    // Critical check using ID
    const isCritical = selfHarm === 'harm_3';
    
    // Submit IDs
    onSubmit({
      symptoms,
      impact,
      selfHarm
    }, isCritical);
  };

  const handleLogoClick = () => {
    // Check if user came from Free Tools
    if (window.location.hash.includes('source=free-tools')) {
      window.location.hash = `#/${i18n.language}/free-tools`;
    } else {
      window.location.hash = ''; // Go to home/landing
    }
  };

  // Define keys for options
  const symptomKeys = [
    'symptom_1', 'symptom_2', 'symptom_3', 'symptom_4',
    'symptom_5', 'symptom_6', 'symptom_7', 'symptom_8',
    'symptom_9', 'symptom_10', 'symptom_11', 'symptom_12'
  ];

  const impactKeys = [
    'impact_1', 'impact_2', 'impact_3', 'impact_4', 'impact_5'
  ];

  const selfHarmKeys = [
    'harm_1', 'harm_2', 'harm_3'
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#030712] flex flex-col items-center py-12 px-6 animate-fade-in transition-colors duration-500 ease-in-out relative">
      
      {/* Absolute Top Right Icon - Adjusted for Mobile Right Alignment */}
      <div className="absolute top-2 right-4 md:top-6 md:right-8 select-none pointer-events-none drop-shadow-sm z-50 text-black dark:text-white">
        <span className="text-[26px] md:text-[28px] leading-none">🧿</span>
      </div>

      {/* Header */}
      <div className="w-full max-w-3xl mb-12 flex justify-between items-center mt-8 md:mt-0">
        <div className="font-serif text-[1.4rem] font-medium text-[#000000] dark:text-slate-100 tracking-[0.1em] uppercase cursor-pointer transition-colors" onClick={handleLogoClick}>
          {t('logo_text')}<span className="font-semibold text-[#0A4E89] dark:text-sky-400">360</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-[#1A1A1A] dark:text-sky-200 uppercase tracking-widest bg-[#F1F4F6] dark:bg-slate-900 px-4 py-1 rounded-full border border-transparent dark:border-slate-800 transition-colors">
            {t('assessment_title')}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-16">
        
        {/* Question 1 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            {t('q1_text')}
            <span className="block text-sm font-sans text-[#475569] dark:text-slate-400 font-normal mt-2 tracking-wide uppercase">{t('q1_sub')}</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {symptomKeys.map((key) => {
              const isSelected = symptoms.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleSymptom(key)}
                  className={`
                    px-6 py-3 rounded-full text-[1rem] font-medium transition-all duration-300 border
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md transform scale-105' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-200 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question 2 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            {t('q2_text')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {impactKeys.map((key) => {
              const isSelected = impact === key;
              return (
                <button
                  key={key}
                  onClick={() => setImpact(key)}
                  className={`
                    flex-1 min-w-[120px] px-4 py-3 rounded-full text-[1rem] font-medium transition-all duration-300 border text-center whitespace-nowrap
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-200 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question 3 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            {t('q3_text')}
          </h2>
          <div className="flex flex-col gap-3 max-w-md">
            {selfHarmKeys.map((key) => {
              const isSelected = selfHarm === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelfHarm(key)}
                  className={`
                    w-full px-6 py-4 rounded-full text-[1.1rem] font-medium transition-all duration-300 border text-left flex justify-between items-center
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-200 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {t(key)}
                  {isSelected && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Submit */}
        <div className="pt-8 pb-20">
          <button
            onClick={handleFinish}
            disabled={!selfHarm || !impact}
            className={`
              w-full py-5 rounded-full text-[1.2rem] font-bold tracking-widest uppercase transition-all duration-300 shadow-lg
              ${(!selfHarm || !impact)
                ? 'bg-[#E2E8F0] dark:bg-slate-800 text-[#94A3B8] dark:text-slate-500 cursor-not-allowed border border-transparent dark:border-slate-700'
                : 'bg-[#0A3157] dark:bg-sky-600 text-white hover:bg-[#124A85] dark:hover:bg-sky-500 hover:shadow-xl hover:-translate-y-1'
              }
            `}
          >
            {t('submit_analyze')}
          </button>
        </div>

      </div>
    </div>
  );
};

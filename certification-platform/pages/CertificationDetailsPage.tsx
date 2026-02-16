import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CERTIFICATIONS } from '../CertificationConstants';
import { Breadcrumbs } from '../components/CertificationBreadcrumbs';
import { Skeleton, TextSkeleton } from '../components/CertificationSkeleton';
import { Check, Clock, Calendar, DollarSign, Award, ChevronDown, ChevronUp, PlayCircle, FileText, Star, ShieldCheck, QrCode } from 'lucide-react';
import { SEO } from '../components/CertificationSEO';

export const CertificationDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'modules' | 'faq'>('modules');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const cert = CERTIFICATIONS.find(c => c.slug === slug);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [slug]);

  const handleEnroll = () => {
    if (cert) {
        navigate(`/checkout/${cert.slug}`);
    }
  };

  if (!cert && !loading) return <div className="p-20 text-center">Certification not found</div>;

  const schema = cert ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": cert.name,
    "description": cert.description,
    "provider": {
        "@type": "Organization",
        "name": "MANAS360",
        "sameAs": "https://manas360.com"
    }
  } : undefined;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 md:pb-20">
      {cert && (
        <SEO 
            title={`${cert.name} | MANAS360 Certification`}
            description={cert.description}
            schema={schema}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
            {!loading && cert && (
                <div className="hidden md:block">
                    <Breadcrumbs 
                        items={[
                            { label: 'Certifications', path: '/' },
                            { label: cert.name }
                        ]} 
                    />
                </div>
            )}
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2 md:mt-6">
            <div className="w-full md:w-2/3">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-24 rounded-full mb-4" />
                  <Skeleton className="h-12 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 md:mb-4 ${
                    cert!.tier === 'Mastery' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {cert!.tier} Level
                  </span>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3 md:mb-4 leading-tight">{cert!.name}</h1>
                  <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">{cert!.description}</p>
                </>
              )}
            </div>
            
            <div className="hidden md:block bg-slate-50 p-6 rounded-2xl border border-slate-100 min-w-[250px]">
                {loading ? (
                    <>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-32" />
                    </>
                ) : (
                    <>
                        <p className="text-slate-500 text-sm mb-1">Investment</p>
                        <p className="text-3xl font-bold text-slate-900">
                            {cert!.price_inr === 0 ? 'Free' : `₹${cert!.price_inr.toLocaleString()}`}
                        </p>
                        {cert!.price_inr > 0 && <p className="text-xs text-purple-600 mt-1 font-medium">EMI Available</p>}
                    </>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        
        {/* Mobile Price Card (Visible only on small screens) */}
        <div className="md:hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                 <div>
                    <p className="text-slate-500 text-sm">Investment</p>
                    <p className="text-3xl font-bold text-slate-900">
                        {cert!.price_inr === 0 ? 'Free' : `₹${cert!.price_inr.toLocaleString()}`}
                    </p>
                 </div>
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                    ${cert?.badgeColor === 'purple' ? 'bg-purple-600' : 'bg-blue-500'}
                 `}>
                    {cert?.name.charAt(0)}
                 </div>
             </div>
             <button 
                onClick={handleEnroll}
                className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-md"
            >
                Enroll Now
            </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8 md:space-y-10">
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {loading ? (
                 Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-24 flex flex-col justify-center">
                        <Skeleton className="h-4 w-8 mb-2" />
                        <Skeleton className="h-3 w-16 mb-1" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                 ))
            ) : (
                <>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <Clock className="text-purple-500 mb-2" size={20} />
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="font-bold text-slate-800">{cert!.duration_weeks} Weeks</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <Calendar className="text-teal-500 mb-2" size={20} />
                        <p className="text-xs text-slate-500">Modules</p>
                        <p className="font-bold text-slate-800">{cert!.modulesCount}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <DollarSign className="text-green-500 mb-2" size={20} />
                        <p className="text-xs text-slate-500">Potential</p>
                        <p className="font-bold text-slate-800">₹{(cert!.monthly_income_max_inr/1000).toFixed(0)}k/mo</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <Award className="text-orange-500 mb-2" size={20} />
                        <p className="text-xs text-slate-500">Badge</p>
                        <p className="font-bold text-slate-800 capitalize">{cert!.badgeColor}</p>
                    </div>
                </>
            )}
          </div>

          {/* Requirements Checklist */}
          {loading ? (
             <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <Skeleton className="h-8 w-48 mb-6" />
                <TextSkeleton />
             </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                <h3 className="font-serif font-bold text-xl md:text-2xl text-slate-800 mb-6">Certification Requirements</h3>
                <ul className="space-y-4">
                    {cert!.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 bg-green-100 rounded-full p-1 flex-shrink-0">
                            <Check size={14} className="text-green-600" />
                        </div>
                        <span className="text-slate-700 text-sm md:text-base">{req}</span>
                    </li>
                    ))}
                    {cert!.prerequisites.length > 0 && cert!.prerequisites[0] !== "None" && (
                         <li className="flex items-start gap-3">
                            <div className="mt-1 bg-amber-100 rounded-full p-1 flex-shrink-0">
                                <ShieldCheck size={14} className="text-amber-600" />
                            </div>
                            <span className="text-slate-700 font-medium text-sm md:text-base">Prerequisite: {cert!.prerequisites.join(", ")}</span>
                        </li>
                    )}
                </ul>
                <div className="mt-8">
                    <button onClick={() => window.open(cert!.syllabusPdfUrl, '_blank')} className="flex items-center text-purple-600 font-bold hover:text-purple-700 transition text-sm md:text-base">
                        <FileText size={18} className="mr-2" />
                        Download Detailed Syllabus (PDF)
                    </button>
                </div>
            </div>
          )}

          {/* Certificate Preview - Hidden on small mobile to save space, shown on md+ */}
          {!loading && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-center text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                    <Award size={40} className="mx-auto text-yellow-400 mb-4" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl mb-2">Earn Your Certificate</h3>
                    <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm md:text-base">
                        Upon successful completion, you will receive a verifiable digital certificate.
                    </p>
                    
                    {/* Tiny Certificate Preview - Hidden on very small screens, visible on larger */}
                    <div className="hidden sm:flex bg-white text-slate-900 p-6 rounded-sm shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full max-w-[280px] aspect-[1/1.414] relative text-[0.5rem] flex-col items-center border border-slate-200">
                         {/* Border */}
                         <div className="absolute inset-2 border border-blue-100 pointer-events-none"></div>
                         
                         {/* Badge */}
                         <div className="absolute top-4 right-4 bg-purple-600 text-white px-1.5 py-0.5 rounded-full text-[6px] font-bold flex items-center gap-0.5">
                            <Check size={6} /> CERTIFIED
                         </div>

                         {/* Header */}
                         <div className="mt-6 text-center">
                             <div className="font-serif font-bold text-blue-900 text-xs tracking-wide">MANAS360</div>
                         </div>

                         {/* Title */}
                         <div className="mt-3 font-serif font-bold text-blue-600 text-[8px] text-center px-4 leading-tight">
                             {cert!.name}
                         </div>

                         {/* Body */}
                         <div className="mt-4 flex-1 flex flex-col items-center justify-center w-full px-4 text-center">
                             <p className="font-serif font-bold text-sm text-slate-900 mb-2">Sudhanshu</p>
                             <p className="font-bold text-blue-600 mb-2">{cert!.name}</p>
                         </div>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
          )}

          {/* Tabs */}
          <div>
            <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('modules')}
                    className={`pb-3 pr-6 font-medium text-base md:text-lg transition-colors whitespace-nowrap ${activeTab === 'modules' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Curriculum
                </button>
                <button 
                    onClick={() => setActiveTab('faq')}
                    className={`pb-3 px-6 font-medium text-base md:text-lg transition-colors whitespace-nowrap ${activeTab === 'faq' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    FAQ
                </button>
            </div>

            {loading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                 </div>
            ) : (
                <>
                    {activeTab === 'modules' && (
                        <div className="space-y-4">
                            {cert!.modules.map((module, i) => (
                                <div key={module.id} className="bg-white border border-slate-100 rounded-xl p-4 md:p-5 hover:border-purple-200 transition-colors shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-800 text-base md:text-lg flex items-center">
                                            <span className="bg-slate-100 text-slate-500 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm mr-3 flex-shrink-0">
                                                {i + 1}
                                            </span>
                                            {module.title}
                                        </h3>
                                        <span className="text-slate-400 text-xs md:text-sm flex items-center whitespace-nowrap ml-2">
                                            <PlayCircle size={14} className="mr-1" />
                                            {module.duration_minutes} min
                                        </span>
                                    </div>
                                    <div className="pl-9 md:pl-11">
                                        <ul className="list-disc list-inside text-slate-600 text-xs md:text-sm space-y-1">
                                            {module.topics.map((topic, idx) => (
                                                <li key={idx}>{topic}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'faq' && (
                        <div className="space-y-4">
                            {cert!.faqs.map((faq, i) => (
                                <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full text-left p-4 md:p-5 flex justify-between items-center font-medium text-slate-800 text-sm md:text-base"
                                    >
                                        {faq.question}
                                        {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    {openFaq === i && (
                                        <div className="px-4 pb-4 md:px-5 md:pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/50">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
          </div>

        </div>

        {/* Sidebar / Bottom Sticky Area */}
        <div className="md:col-span-1 space-y-8">
            {/* Enrollment Card (Desktop Sticky) */}
            {!loading && (
                <div className="hidden md:block bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 sticky top-24 border border-slate-100">
                    <h3 className="font-bold text-xl text-slate-900 mb-4">Ready to start?</h3>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Check size={18} className="text-green-500" />
                            <span>Instant Access</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Check size={18} className="text-green-500" />
                            <span>Mobile Friendly</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Check size={18} className="text-green-500" />
                            <span>Official Certification</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleEnroll}
                        className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Enroll Now
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3">30-day money-back guarantee</p>
                </div>
            )}

            {/* Testimonials */}
            <div>
                <h4 className="font-serif font-bold text-slate-800 text-lg mb-4">What Students Say</h4>
                <div className="space-y-4">
                    {loading ? (
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                             <TextSkeleton />
                        </div>
                    ) : (
                        cert!.testimonials.map(t => (
                            <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex text-yellow-400 mb-2">
                                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-slate-600 italic text-sm mb-3">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{t.name}</p>
                                        <p className="text-xs text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {/* Mobile Sticky Enrollment Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button 
            onClick={handleEnroll}
            className="w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg"
        >
            Enroll Now
        </button>
      </div>
    </div>
  );
};
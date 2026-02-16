
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TherapistRegistration: React.FC = () => {
    const { i18n } = useTranslation();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        qualification: '',
        rciReg: '',
        yearsExp: '',
        specialization: '',
        language: '' // Default empty to show placeholder
    });

    const handleBack = () => {
        window.location.hash = `#/${i18n.language}/role-selection`;
    };

    const handleSubmit = () => {
        if (!formData.fullName || !formData.email || !formData.language) {
            alert("Please fill in basic details and select a preferred language.");
            return;
        }
        // Navigate with the selected language code and user details
        const params = new URLSearchParams({
            name: formData.fullName,
            mobile: formData.mobile
        });
        window.location.hash = `#/${formData.language}/therapist-registration-flow?${params.toString()}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Shared Input Styles
    const inputClass = "w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-medium text-[0.95rem] " +
        "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#1FA2DE] focus:ring-4 focus:ring-[#1FA2DE]/10 " +
        "dark:bg-[#0F172A] dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/20";

    return (
        <div className="min-h-screen bg-[#F0F9FF] dark:bg-[#020617] flex flex-col items-center justify-center px-4 py-8 transition-colors duration-500 relative">

            {/* Back Button */}
            <button
                onClick={handleBack}
                className="absolute top-6 left-6 flex items-center gap-2 text-[#0A3A78] dark:text-sky-400 font-bold text-lg hover:opacity-75 transition-opacity z-10"
            >
                <span className="text-2xl">←</span> Back
            </button>

            {/* Main Card */}
            <div className="w-full max-w-[480px] bg-white dark:bg-[#1E293B] rounded-[32px] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 transition-colors mt-12 md:mt-0">

                <h1 className="text-[2rem] font-serif font-bold text-[#0A3A78] dark:text-white mb-2">Therapist Registration</h1>
                <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Join MANS360 as Therapist</p>

                <div className="space-y-4">

                    {/* Full Name */}
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={inputClass}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={inputClass}
                    />

                    {/* Mobile */}
                    <div className="relative">
                        <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold pointer-events-none">+91</span>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className={`${inputClass} pl-14`}
                        />
                    </div>

                    {/* Qualification */}
                    <div className="relative">
                        <select
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none cursor-pointer ${!formData.qualification ? 'text-slate-400 dark:text-slate-500' : ''}`}
                        >
                            <option value="" disabled>Qualification</option>
                            <option value="MD Psychiatry">MD Psychiatry / DPM</option>
                            <option value="M.Phil">M.Phil Clinical Psychology</option>
                            <option value="MSc">MSc Psychology</option>
                            <option value="PhD">PhD</option>
                            <option value="Diploma">Diploma in Counseling</option>
                        </select>
                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</div>
                    </div>

                    {/* RCI & Experience Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="rciReg"
                            value={formData.rciReg}
                            onChange={handleChange}
                            placeholder="RCI Reg No."
                            className={inputClass}
                        />
                        <input
                            type="number"
                            name="yearsExp"
                            value={formData.yearsExp}
                            onChange={handleChange}
                            placeholder="Years Exp."
                            className={inputClass}
                        />
                    </div>

                    {/* Specialization */}
                    <div className="relative">
                        <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none cursor-pointer ${!formData.specialization ? 'text-slate-400 dark:text-slate-500' : ''}`}
                        >
                            <option value="" disabled>Specialization</option>
                            <option value="CBT">CBT</option>
                            <option value="DBT">DBT</option>
                            <option value="EMDR">EMDR</option>
                        </select>
                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</div>
                    </div>

                    {/* Preferred Language */}
                    <div className="relative">
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className={`${inputClass} appearance-none cursor-pointer ${!formData.language ? 'text-slate-400 dark:text-slate-500' : ''}`}
                        >
                            <option value="" disabled>Preferred Language</option>
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="ta">Tamil</option>
                            <option value="te">Telugu</option>
                            <option value="kn">Kannada</option>
                        </select>
                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</div>
                    </div>

                </div>

                {/* Navigation Buttons */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-[#0052CC] to-[#2684FF] text-white font-bold text-lg hover:shadow-lg hover:brightness-105 active:scale-95 transition-all shadow-md"
                    >
                        Next → Upload Documents
                    </button>
                </div>

            </div>
        </div>
    );
};

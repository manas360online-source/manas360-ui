import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Calendar, ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DoctorSelectionProps {
    role: 'Psychologist' | 'Psychiatrist';
}

export const DoctorSelection: React.FC<DoctorSelectionProps> = ({ role }) => {
    const navigate = useNavigate();
    const { currentUserId, patients, confirmBooking } = useApp();
    const [view, setView] = useState<'card' | 'booking' | 'confirm'>('card');

    // Date & Time State
    const [selectedFullDate, setSelectedFullDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isManualTime, setIsManualTime] = useState(false);

    // Confirmation State
    const [confirmName, setConfirmName] = useState(patients.find(p => p.id === currentUserId)?.name || '');
    const [confirmPhone, setConfirmPhone] = useState(patients.find(p => p.id === currentUserId)?.phoneNumber || '');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Doctor Data Configuration
    const doctor = role === 'Psychologist' ? {
        name: 'Dr. Sanky',
        role: 'Psychologist',
        focus: 'Foundation Therapy, CBT Skills, Weekly Support',
        price: 1499,
        icon: '👩‍⚕️'
    } : {
        name: 'Dr. Mahantesh Totanagouda Patil',
        role: 'Psychiatrist',
        focus: 'Medication Management, Complex Review',
        price: 2499,
        icon: '👨‍⚕️'
    };

    const getMockDates = () => {
        const today = new Date();
        return Array.from({ length: 4 }).map((_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            return {
                day: d.toLocaleString('en-US', { weekday: 'short' }), // Mon
                date: d.getDate(), // 20
                fullDate: d,
                isToday: i === 0
            };
        });
    };

    const mockDates = getMockDates();
    const times = ['09:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'];

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.toDateString() === d2.toDateString();
    };

    const handleDateClick = (fullDate: Date) => {
        setSelectedFullDate(fullDate);
    };

    const handleManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.valueAsDate) {
            setSelectedFullDate(e.target.valueAsDate);
        }
    };

    const getMonthName = (date: Date) => {
        return date.toLocaleString('default', { month: 'long' }).toUpperCase();
    };

    const handlePayment = () => {
        // Skip confirmation screen if details exist
        if (confirmName && confirmPhone) {
            const dateString = selectedFullDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            confirmBooking(
                currentUserId,
                doctor.name,
                role,
                dateString,
                selectedTime || '10:00 AM',
                doctor.price,
                confirmPhone
            );
            setShowSuccessPopup(true);
        } else {
            setView('confirm');
        }
    };

    const handleFinalConfirm = () => {
        if (!confirmName || !confirmPhone) return;
        const dateString = selectedFullDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        confirmBooking(
            currentUserId,
            doctor.name,
            role,
            dateString,
            selectedTime || '10:00 AM',
            doctor.price,
            confirmPhone
        );
        setShowSuccessPopup(true);
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        navigate('/patient');
    };

    const isCustomDate = !mockDates.some(d => isSameDay(d.fullDate, selectedFullDate));
    const containerClass = "w-full max-w-lg bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-blue-50";

    // VIEW COMPONENTS
    const renderView = () => {
        // VIEW 1: DOCTOR CARD
        if (view === 'card') {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
                    <div className={`${containerClass} text-center`}>
                        <div className="w-32 h-32 bg-blue-100 rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-6xl shadow-inner">
                            {doctor.icon}
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-3 leading-tight">{doctor.name}</h2>
                        <p className="text-brand-blue font-bold uppercase tracking-wider text-sm mb-8">{doctor.role}</p>
                        <div className="bg-slate-50 p-8 rounded-3xl mb-12">
                            <p className="text-slate-600 text-lg leading-relaxed font-medium">Focus: {doctor.focus}</p>
                        </div>
                        <Button fullWidth onClick={() => setView('booking')} className="text-xl py-5 rounded-2xl">
                            Book Session
                        </Button>
                    </div>
                </div>
            );
        }

        // VIEW 2: BOOKING CALENDAR
        if (view === 'booking') {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
                    <div className={containerClass}>
                        <button onClick={() => setView('card')} className="text-slate-400 hover:text-brand-blue flex items-center gap-2 mb-8 transition-colors">
                            <ArrowLeft size={24} /> <span className="font-bold text-lg">Back</span>
                        </button>

                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-10 flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-2xl text-brand-blue"><Calendar size={32} /></div>
                            Select Slot
                        </h2>

                        {/* Date Section */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    {getMonthName(selectedFullDate)}
                                </p>

                                {/* Manual Date Picker */}
                                <div className="relative">
                                    <div className="text-brand-blue hover:bg-blue-50 p-3 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold cursor-pointer bg-blue-50/50">
                                        <span>Full Month</span>
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleManualDateChange}
                                        title="Select Date"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                                {mockDates.map((d, i) => {
                                    const selected = isSameDay(d.fullDate, selectedFullDate);
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleDateClick(d.fullDate)}
                                            className={`min-w-[5.5rem] flex-1 p-5 rounded-3xl flex flex-col items-center transition-all border-2 ${selected
                                                ? 'bg-brand-blue text-white shadow-xl shadow-blue-300 scale-105 border-brand-blue'
                                                : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:bg-blue-50'
                                                }`}
                                        >
                                            <span className={`text-xs font-bold uppercase mb-2 ${selected ? 'text-blue-100' : 'text-slate-400'}`}>{d.day}</span>
                                            <span className="text-2xl font-bold">{d.date}</span>
                                        </button>
                                    );
                                })}

                                {isCustomDate && (
                                    <button
                                        className="min-w-[5.5rem] flex-1 p-5 rounded-3xl flex flex-col items-center bg-brand-blue text-white shadow-xl shadow-blue-300 scale-105 border-2 border-brand-blue"
                                    >
                                        <span className="text-xs font-bold uppercase mb-2 text-blue-100">{selectedFullDate.toLocaleString('en-US', { weekday: 'short' })}</span>
                                        <span className="text-2xl font-bold">{selectedFullDate.getDate()}</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Time Section */}
                        <div className="mb-12">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Available Times</p>

                            {!isManualTime ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {times.map((t, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedTime(t)}
                                            className={`p-5 rounded-2xl text-lg font-bold border-2 transition-all ${t === selectedTime
                                                ? 'border-brand-blue text-brand-blue bg-blue-50 shadow-lg'
                                                : 'border-slate-100 text-slate-600 hover:border-blue-200'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Select Time</label>
                                    <input
                                        type="time"
                                        className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none text-xl font-bold text-slate-800"
                                        onChange={(e) => {
                                            if (!e.target.value) return;
                                            const [hours, minutes] = e.target.value.split(':');
                                            const h = parseInt(hours);
                                            const ampm = h >= 12 ? 'PM' : 'AM';
                                            const h12 = h % 12 || 12;
                                            setSelectedTime(`${h12}:${minutes} ${ampm}`);
                                        }}
                                    />
                                </div>
                            )}

                            <button
                                onClick={() => { setIsManualTime(!isManualTime); setSelectedTime(null); }}
                                className="mt-6 text-base text-brand-blue font-bold flex items-center gap-1 hover:underline p-2"
                            >
                                {isManualTime ? 'Back to slots' : 'Set time manually'} <ChevronRight size={18} />
                            </button>
                        </div>

                        <Button fullWidth onClick={handlePayment} disabled={!selectedTime} className="text-xl py-5 shadow-xl shadow-blue-200">
                            Pay ₹{doctor.price} & Continue
                        </Button>
                    </div>
                </div>
            )
        }

        // VIEW 3: CONFIRM DETAILS
        if (view === 'confirm') {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center px-4 relative py-8">
                    <div className={containerClass}>
                        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-8">Confirm Details</h2>

                        <div className="space-y-8 mb-12">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-blue text-xl font-bold text-slate-800 border border-transparent focus:bg-white transition-all"
                                    value={confirmName}
                                    onChange={(e) => setConfirmName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 99999 99999"
                                    className="w-full p-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-brand-blue text-xl font-bold text-slate-800 border border-transparent focus:bg-white transition-all"
                                    value={confirmPhone}
                                    onChange={(e) => setConfirmPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button fullWidth onClick={handleFinalConfirm} disabled={!confirmName || !confirmPhone} className="text-xl py-5 shadow-xl shadow-blue-200">
                            Done
                        </Button>
                    </div>
                </div>
            )
        }
        return null;
    };

    return (
        <>
            {renderView()}

            {/* SUCCESS POPUP - Now Rendered Globally */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-10 rounded-[3rem] w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-slate-800 mb-4">Booking Successful</h3>
                        <p className="text-slate-500 text-lg mb-10 leading-relaxed">Session confirmed with<br /><span className="font-bold text-slate-800">{doctor.name}</span>.</p>
                        <Button fullWidth onClick={handlePopupClose} className="text-xl py-5">OK</Button>
                    </div>
                </div>
            )}
        </>
    );
};
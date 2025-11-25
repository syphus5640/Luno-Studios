
import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowLeft, Briefcase, User, Building, Loader2, CheckCircle, Phone, Mail, ChevronDown } from 'lucide-react';
import { useBooking } from '../src/context/BookingContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'details' | 'date' | 'time' | 'success';

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  date: Date | null;
  time: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { bookingType } = useBooking();
  const [step, setStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Animation States
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Dropdown state
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    date: null,
    time: null
  });

  // Handle Animation Life Cycle
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
      // Use setTimeout to ensure the browser paints the initial "opacity-0" state
      // before transitioning to "opacity-100". This guarantees the fade-in plays.
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 50); 
      return () => clearTimeout(timer);
    } else {
      setIsActive(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
        document.body.style.overflow = '';
      }, 500); // Match duration-500
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsIndustryOpen(false);
      }
    };

    if (isOpen) {
        document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, isIndustryOpen]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        industry: '',
        date: null,
        time: null
      });
      setError('');
      setIsIndustryOpen(false);
    }
  }, [isOpen]);

  // Fetch slots when date is selected
  useEffect(() => {
    if (formData.date && step === 'date') {
      fetchAvailability(formData.date);
    }
  }, [formData.date]);

  const fetchAvailability = async (date: Date) => {
    setAvailabilityLoading(true);
    setAvailableSlots([]);
    try {
      const res = await fetch(`/api/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: date.toISOString() })
      });
      const data = await res.json();
      if (data.slots) {
        setAvailableSlots(data.slots);
        setStep('time');
      }
    } catch (err) {
      console.error("Failed to fetch availability", err);
      const simSlots = [];
      for (let i = 9; i < 17; i++) {
          const h = i > 12 ? i - 12 : i;
          const ampm = i >= 12 ? 'PM' : 'AM';
          simSlots.push(`${h}:00 ${ampm}`);
      }
      setAvailableSlots(simSlots);
      setStep('time');
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const handleBook = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          industry: formData.industry,
          date: formData.date,
          time: formData.time,
          type: bookingType
        })
      });

      const data = await res.json();

      if (data.success) {
        setStep('success');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
        setStep('success');
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= days; i++) daysArray.push(new Date(year, month, i));
    return daysArray;
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen overflow-y-scroll cursor-default">
      <style>{`
        .luno-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .luno-scrollbar::-webkit-scrollbar-track {
          background: #0f1229;
          border-radius: 0 0 12px 0;
        }
        .luno-scrollbar::-webkit-scrollbar-thumb {
          background-color: #1a1f4b;
          border-radius: 4px;
          border: 2px solid #0f1229;
        }
        .luno-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #2d3580;
        }
      `}</style>

      {/* Backdrop with Transition */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose}
      />
      
      {/* Main Scroll Container */}
      <div 
        className="flex min-h-full items-center justify-center p-4 text-center relative z-[102]" 
        onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}
      >
        
        {/* Modal Card with Scale/Opacity Transition */}
        <div 
          className={`relative w-full max-w-lg bg-luno-dark rounded-2xl shadow-2xl border border-white/10 flex flex-col text-left overflow-visible transition-all duration-500 ease-in-out transform ${
            isActive ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-luno-base shrink-0 rounded-t-2xl">
            <div className="flex items-center gap-3">
              {step !== 'details' && step !== 'success' && (
                <button onClick={() => setStep(step === 'time' ? 'date' : 'details')} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowLeft size={18} />
                </button>
              )}
              <h2 className="text-lg font-bold text-white">
                {step === 'details' && `Book ${bookingType === 'website' ? 'Web Design' : 'Consultation'}`}
                {step === 'date' && 'Select a Date'}
                {step === 'time' && 'Select a Time'}
                {step === 'success' && 'Booking Confirmed!'}
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-5">
            
            {/* STEP 1: DETAILS */}
            {step === 'details' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-luno-accent focus:ring-1 focus:ring-luno-accent transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 text-gray-500" size={16} />
                      <input 
                        type="email" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-luno-accent focus:ring-1 focus:ring-luno-accent transition-all"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                   <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 text-gray-500" size={16} />
                      <input 
                        type="tel" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-luno-accent focus:ring-1 focus:ring-luno-accent transition-all"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Business Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-luno-accent focus:ring-1 focus:ring-luno-accent transition-all"
                      placeholder="Acme Corp"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Industry</label>
                  <div className="relative" ref={dropdownRef}>
                    <Briefcase className="absolute left-3 top-2.5 text-gray-500" size={16} />
                    
                    <button
                      onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                      className={`w-full bg-white/5 border cursor-pointer ${isIndustryOpen ? 'border-luno-accent' : 'border-white/10'} rounded-lg py-2.5 pl-9 pr-3 text-sm text-left text-white focus:outline-none transition-all flex justify-between items-center`}
                    >
                      <span className={formData.industry ? 'text-white' : 'text-gray-400'}>
                          {formData.industry || 'Select an industry'}
                      </span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isIndustryOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isIndustryOpen && (
                      <div className="absolute z-50 top-full left-0 w-full mt-1 bg-luno-dark border border-white/10 rounded-xl shadow-2xl animate-fade-in overflow-hidden">
                         <div className="max-h-[160px] overflow-y-auto luno-scrollbar p-1">
                            {['Real Estate', 'Healthcare', 'Legal', 'Home Services', 'E-Commerce', 'Other'].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setFormData({...formData, industry: option});
                                        setIsIndustryOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between cursor-pointer mb-0.5 group
                                        ${formData.industry === option 
                                            ? 'bg-white/5 text-luno-accent font-medium' 
                                            : 'text-gray-300 hover:bg-luno-accent hover:text-luno-dark'}
                                    `}
                                >
                                    {option}
                                    {formData.industry === option && <CheckCircle size={14} />}
                                </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  disabled={!formData.name || !formData.email || !formData.businessName || !formData.phone || !formData.industry}
                  onClick={() => setStep('date')}
                  className="w-full mt-2 bg-luno-accent text-luno-dark font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-luno-accent/20"
                >
                  Next Step
                </button>
              </div>
            )}

            {/* STEP 2: CALENDAR */}
            {step === 'date' && (
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={prevMonth} className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"><ChevronLeft size={18} /></button>
                  <h3 className="text-base font-bold tracking-wide text-white">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                  <button onClick={nextMonth} className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"><ChevronRight size={18} /></button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                    <span key={d} className="text-[9px] uppercase tracking-wider text-luno-accent/70 font-bold">{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((date, i) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    const isDisabled = !date || date <= today;
                    const isSelected = formData.date?.getTime() === date?.getTime();
                    const isToday = date?.getTime() === today.getTime();

                    return (
                      <button 
                        key={i}
                        disabled={isDisabled}
                        onClick={() => {
                          if(date) {
                            setFormData({...formData, date});
                            fetchAvailability(date);
                          }
                        }}
                        className={`
                          relative aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 border
                          ${!date ? 'invisible border-none' : ''}
                          ${isSelected 
                            ? 'bg-luno-accent text-luno-dark font-bold shadow-[0_0_15px_rgba(255,212,59,0.5)] scale-105 border-luno-accent' 
                            : isToday 
                              ? 'bg-white/5 border-white/5 text-gray-500 cursor-not-allowed'
                              : isDisabled 
                                ? 'border-transparent text-gray-700 cursor-not-allowed opacity-30'
                                : 'bg-white/5 border-white/10 text-white hover:border-luno-accent/50 hover:bg-white/10 hover:scale-105'
                          }
                        `}
                      >
                        {date?.getDate()}
                        {isToday && !isSelected && (
                          <div className="absolute bottom-1.5 w-1 h-1 bg-luno-accent rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {availabilityLoading && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-luno-accent bg-white/5 py-1.5 rounded-lg">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-xs">Checking availability...</span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: TIME SLOTS */}
            {step === 'time' && (
              <div>
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-xs">Available times for</p>
                  <h3 className="text-lg font-bold text-white">{formData.date?.toDateString()}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSlots.length > 0 ? availableSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({...formData, time})}
                      className={`py-2.5 px-3 rounded-lg border transition-all flex items-center justify-center gap-2 text-sm
                        ${formData.time === time 
                          ? 'bg-luno-accent text-luno-dark border-luno-accent font-bold shadow-lg shadow-luno-accent/20' 
                          : 'border-white/10 hover:border-luno-accent/50 hover:bg-white/5 text-gray-300'}
                      `}
                    >
                      <Clock size={14} />
                      {time}
                    </button>
                  )) : (
                    <p className="col-span-full text-center text-gray-500 py-6 bg-white/5 rounded-lg border border-white/5 text-sm">
                      No slots available for this date.
                    </p>
                  )}
                </div>

                <button 
                  disabled={!formData.time || loading}
                  onClick={handleBook}
                  className="w-full mt-6 bg-luno-accent text-luno-dark font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Confirm Booking'}
                </button>
                {error && <p className="text-red-400 text-center mt-4 text-xs bg-red-500/10 py-2 rounded border border-red-500/20">{error}</p>}
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-3">Booking Confirmed!</h2>
                <p className="text-gray-300 mb-6 leading-relaxed max-w-md mx-auto text-sm">
                  We have sent a confirmation email to <strong className="text-white">{formData.email}</strong>. 
                  We look forward to speaking with you on <strong className="text-luno-accent">{formData.date?.toDateString()}</strong> at <strong className="text-luno-accent">{formData.time}</strong>.
                </p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10 text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

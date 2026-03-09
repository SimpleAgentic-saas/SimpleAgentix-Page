
import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Sparkles, Loader2, Check, MessageSquare, Video, Copy, ExternalLink } from 'lucide-react';
import { parseBookingRequest } from '../services/geminiService';

export const BookingSection: React.FC = () => {
  const [nlInput, setNlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    topic: ''
  });
  const [success, setSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAiFill = async () => {
    if (!nlInput.trim()) return;
    setLoading(true);
    try {
      const data = await parseBookingRequest(nlInput);
      setFormData(prev => ({
        ...prev,
        name: data.name || prev.name,
        date: data.date || prev.date,
        time: data.time || prev.time,
        topic: data.topic || prev.topic
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Use the specific Google Meet Link provided
    setTimeout(() => {
        setMeetLink('meet.google.com/mzg-jyop-mhn');
        setSuccess(true);
        setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
     setSuccess(false);
     setFormData({ name: '', email: '', date: '', time: '', topic: '' });
     setNlInput('');
     setMeetLink('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row transition-colors duration-300">
        {/* Left Side - Context */}
        <div className="bg-navy-900 dark:bg-slate-950 p-8 md:w-2/5 flex flex-col justify-between text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                    <Calendar className="w-6 h-6 text-vibrant-green" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Book a Consultation</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Schedule a 1-on-1 with our automation experts. Tell our AI assistant when you're free, and we'll handle the logistics.
                </p>
                
                <div className="bg-navy-800/50 dark:bg-slate-800/50 rounded-lg p-4 border border-navy-700/50 dark:border-slate-700/50 backdrop-blur-sm">
                   <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-[1.25rem]"><Sparkles className="w-4 h-4 text-vibrant-orange" /></div>
                      <div className="text-xs text-slate-300 italic">
                        "I want to book a call next Tuesday at 3pm to discuss Enterprise plans with John."
                      </div>
                   </div>
                </div>
             </div>

             <div className="relative z-10 mt-8">
                 <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Current Availability</div>
                 <div className="flex items-center gap-2 text-sm text-white">
                     <div className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse"></div>
                     Online & Scheduling for This Week
                 </div>
             </div>
             
             {/* Decorative Background Elements */}
             <div className="absolute top-1/2 right-[-50px] w-64 h-64 bg-teal-500/20 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-vibrant-orange/10 rounded-full blur-[60px]"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:w-3/5 bg-white dark:bg-slate-800 flex flex-col justify-center transition-colors duration-300">
            {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 text-vibrant-green rounded-full flex items-center justify-center mb-2">
                        <Check className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Booking Confirmed!</h4>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">We've sent a calendar invitation and confirmation details to your email.</p>
                        
                        {/* Google Meet Link Card */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm mx-auto mb-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Video className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-navy-900 dark:text-white">Founder's Meeting Room</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Join via Google Meet</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                                <code className="flex-1 text-xs font-mono text-slate-600 dark:text-slate-300 truncate">{meetLink}</code>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(`https://${meetLink}`)} 
                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 transition-colors"
                                    title="Copy Link"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <a 
                                    href={`https://${meetLink}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-blue-600 dark:text-blue-400 transition-colors"
                                    title="Open Meet"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={resetForm}
                        className="text-sm font-semibold text-navy-900 dark:text-white hover:text-vibrant-orange transition-colors"
                    >
                        Book another appointment
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* AI Input Section */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="px-4 py-2 flex items-center justify-between">
                             <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-2">
                                 <Sparkles className="w-3 h-3 text-vibrant-orange" />
                                 Smart Auto-Fill
                            </label>
                        </div>
                        <div className="p-2 pt-0 flex gap-2">
                            <input 
                                type="text"
                                value={nlInput}
                                onChange={(e) => setNlInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiFill()}
                                placeholder="e.g. Next Monday at 10am for Project Review"
                                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange/20 focus:border-vibrant-orange transition-all placeholder:text-slate-400"
                            />
                            <button 
                                onClick={handleAiFill}
                                disabled={loading || !nlInput}
                                className="bg-navy-900 dark:bg-white dark:text-navy-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-navy-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap shadow-sm"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fill Form'}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-navy-900 dark:text-white">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-navy-900 dark:text-white">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                    <input 
                                        required
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-navy-900 dark:text-white">Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                    <input 
                                        required
                                        type="date" 
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-navy-900 dark:text-white">Time</label>
                                <div className="relative group">
                                    <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                    <input 
                                        required
                                        type="time" 
                                        value={formData.time}
                                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-navy-900 dark:text-white">Topic of Discussion</label>
                            <div className="relative group">
                                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                <input 
                                    required
                                    type="text" 
                                    value={formData.topic}
                                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-none transition-all placeholder:text-slate-300"
                                    placeholder="e.g. Product Demo, Pricing, Integration Support"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-vibrant-green hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 transition-all mt-2 transform active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Appointment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};

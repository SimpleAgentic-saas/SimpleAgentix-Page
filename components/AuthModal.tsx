
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Loader2, CheckCircle2, ShieldCheck, ArrowLeft, Globe, Shield, KeyRound, MapPin, Smartphone, Briefcase, MessageSquare, Zap, LayoutGrid, CheckSquare, Plus, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserRole, UserProfile, UserLocation } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Mumbai"
];

const INTEGRATION_APPS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'text-green-500' },
  { id: 'gmail', name: 'Gmail', icon: Mail, color: 'text-red-500' },
  { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'text-purple-500' },
  { id: 'crm', name: 'CRM Suite', icon: Briefcase, color: 'text-blue-500' },
  { id: 'sheets', name: 'Google Sheets', icon: LayoutGrid, color: 'text-green-600' },
  { id: 'shopify', name: 'Shopify', icon: Zap, color: 'text-emerald-500' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  // Stages: 'credentials' -> 'onboarding' (location/apps) -> 'success'
  const [authStep, setAuthStep] = useState<'credentials' | 'onboarding' | 'success'>('credentials');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
  
  // Helper to check success state
  const isSuccess = (step: string) => step === 'success';

  // Basic Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    language: 'English',
    role: 'User' as UserRole,
    agreedToTerms: false
  });

  // Location Data
  const [locationData, setLocationData] = useState<UserLocation>({
    state: '',
    city: '',
    zipCode: '',
    country: 'India'
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // App Connections
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [connectionDetails, setConnectionDetails] = useState({
    mobileNumber: '',
    workEmail: ''
  });

  const [emailError, setEmailError] = useState('');
  const [termsError, setTermsError] = useState('');

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setAuthStep('credentials');
      setIsForgotPassword(false);
      setFormData({ name: '', email: '', password: '', language: 'English', role: 'User', agreedToTerms: false });
      setLocationData({ state: '', city: '', zipCode: '', country: 'India' });
      setSelectedApps([]);
      setEmailError('');
      setTermsError('');
      setSocialLoading(null);
      setIsLoading(false);
      setLocationError('');
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // --- Helpers ---

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const getStrengthColor = (score: number) => {
      if (score <= 1) return 'bg-red-500';
      if (score === 2) return 'bg-orange-500';
      if (score === 3) return 'bg-yellow-400';
      return 'bg-green-500';
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const detectLocation = () => {
    setIsLocating(true);
    setLocationError('');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulation of Reverse Geocoding since we don't have a real maps API key
          // In a real app, we would send lat/long to a backend or Google Maps API
          setTimeout(() => {
             setLocationData({
                 state: 'Karnataka',
                 city: 'Bengaluru',
                 zipCode: '560001',
                 country: 'India'
             });
             setIsLocating(false);
          }, 1500);
        },
        (error) => {
          console.error("Location access denied or failed", error.message);
          setLocationError("Access denied. Please enter manually.");
          setIsLocating(false);
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
      );
    } else {
      setLocationError("Geolocation not supported.");
      setIsLocating(false);
    }
  };

  const toggleApp = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  // --- Handlers ---

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setSocialLoading(provider);
    
    // Simulate Realistic OAuth Redirect & Callback
    setTimeout(() => {
      setSocialLoading(null);
      
      const simulatedName = provider === 'github' ? "DevUser_Git" : "Google Account";
      
      // If Signup, move to Onboarding
      if (mode === 'signup') {
         setFormData(prev => ({ ...prev, name: simulatedName, email: `${provider}@example.com` }));
         setAuthStep('onboarding');
      } else {
         // Login Direct Success
         handleFinalSuccess({
             name: simulatedName,
             email: `${provider}@example.com`,
             role: 'User',
             language: 'English',
             isNewUser: false
         });
      }
    }, 2000);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Forgot Password Logic
    if (isForgotPassword) {
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setAuthStep('success'); // Reusing success step for reset message
        }, 1500);
        return;
    }

    // Validation
    if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }
    setEmailError('');
    
    if (mode === 'signup' && !formData.agreedToTerms) {
        setTermsError('You must agree to the Terms & Privacy Policy.');
        return;
    }
    setTermsError('');

    setIsLoading(true);

    // Logic Switch
    setTimeout(() => {
        setIsLoading(false);
        if (mode === 'signup') {
            // Move to Onboarding
            setAuthStep('onboarding');
        } else {
            // Sign In Success
            let displayRole = formData.role;
            // Admin backdoor for demo purposes
            if (formData.email.includes('admin')) displayRole = 'Admin';

            handleFinalSuccess({
                name: formData.name || formData.email.split('@')[0],
                email: formData.email,
                role: displayRole,
                language: formData.language,
                isNewUser: false
            });
        }
    }, 1500);
  };

  const handleOnboardingSubmit = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          handleFinalSuccess({
              name: formData.name,
              email: formData.email,
              role: formData.role,
              language: formData.language,
              location: locationData,
              connectedApps: selectedApps,
              isNewUser: true
          });
      }, 2000);
  };

  const handleFinalSuccess = (profile: UserProfile) => {
      setAuthStep('success');
      setTimeout(() => {
          onAuthSuccess(profile);
          onClose();
      }, 1500);
  }

  // --- Render Steps ---

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/60 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Visual */}
        <div className="hidden md:flex w-5/12 bg-navy-900 relative flex-col justify-between p-10 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-vibrant-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <BrandLogo className="w-14 h-14 mb-8 text-white" />
            <h2 className="text-3xl font-bold leading-tight mb-4">
              {authStep === 'onboarding' 
                 ? "Setup Your Profile" 
                 : (mode === 'signup' ? "Start Automating Today." : "Welcome Back.")}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {authStep === 'onboarding'
                 ? "Connect your daily tools and set your location for a personalized experience."
                 : "Join thousands of businesses using SimpleAgentix to 10x their productivity."}
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 mt-8">
            <div className="flex gap-1 mb-3">
               {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-3 rounded-full bg-yellow-400"></div>)}
            </div>
            <p className="text-sm italic text-slate-200 leading-relaxed">"The most seamless onboarding experience I've ever had. Connected my WhatsApp and CRM in seconds."</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center font-bold text-navy-900 text-xs">R</div>
              <div>
                  <div className="text-xs font-bold text-white">Rahul Mehta</div>
                  <div className="text-[10px] text-teal-200">CEO, TechScale India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors relative overflow-y-auto max-h-[90vh]">
          
          {/* Back Button */}
          {((mode === 'signup' && authStep === 'onboarding') || isForgotPassword) && !isSuccess(authStep) && (
             <button 
                type="button"
                onClick={() => {
                    if (isForgotPassword) {
                        setIsForgotPassword(false);
                        setMode('signin');
                    } else if (authStep === 'onboarding') {
                        setAuthStep('credentials');
                    }
                }}
                className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-500 hover:text-navy-900 dark:hover:text-white transition-colors"
             >
                 <ArrowLeft className="w-4 h-4" /> Back
             </button>
          )}

          {/* SUCCESS STATE */}
          {authStep === 'success' ? (
             <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in zoom-in fade-in duration-300">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                   <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                        {isForgotPassword ? "Reset Link Sent" : "Setup Complete!"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        {isForgotPassword 
                           ? `We've sent password reset instructions to ${formData.email}.`
                           : "Your personal workspace is ready. Redirecting you to the dashboard..."}
                    </p>
                </div>
                {!isForgotPassword && (
                    <div className="flex gap-2 mt-4">
                        {locationData.city && <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">{locationData.city}</span>}
                        {selectedApps.length > 0 && <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs font-bold text-blue-600">{selectedApps.length} Apps Connected</span>}
                    </div>
                )}
             </div>
          ) : authStep === 'onboarding' ? (
            
            // --- ONBOARDING STEP (Location & Apps) ---
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">Personalize Your Experience</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Tell us where you are and what tools you use daily.</p>
                </div>

                {/* Location Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                         <div className="flex flex-col">
                            <h4 className="text-sm font-bold text-navy-900 dark:text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-vibrant-orange" /> Location Details
                            </h4>
                            {locationError && <span className="text-[10px] text-red-500 mt-1">{locationError}</span>}
                         </div>
                         <button 
                           onClick={detectLocation}
                           disabled={isLocating}
                           className="text-xs flex items-center gap-1 text-vibrant-orange font-bold hover:underline disabled:opacity-50"
                         >
                            {isLocating ? <Loader2 className="w-3 h-3 animate-spin"/> : <Zap className="w-3 h-3"/>}
                            Auto-Detect
                         </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="col-span-2 md:col-span-1">
                             <label className="block text-xs font-bold text-slate-500 mb-1">State</label>
                             <select 
                                value={locationData.state}
                                onChange={(e) => setLocationData({...locationData, state: e.target.value})}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-vibrant-orange/50 outline-none"
                             >
                                 <option value="">Select State</option>
                                 {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                             </select>
                         </div>
                         <div className="col-span-2 md:col-span-1">
                             <label className="block text-xs font-bold text-slate-500 mb-1">City</label>
                             <input 
                                type="text"
                                value={locationData.city}
                                onChange={(e) => setLocationData({...locationData, city: e.target.value})}
                                placeholder="e.g. Mumbai"
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-vibrant-orange/50 outline-none"
                             />
                         </div>
                         <div className="col-span-2">
                             <label className="block text-xs font-bold text-slate-500 mb-1">Zip Code</label>
                             <input 
                                type="text"
                                value={locationData.zipCode}
                                onChange={(e) => setLocationData({...locationData, zipCode: e.target.value})}
                                placeholder="e.g. 400001"
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-vibrant-orange/50 outline-none"
                             />
                         </div>
                    </div>
                </div>

                {/* App Integration Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-navy-900 dark:text-white flex items-center gap-2 mb-4">
                        <LayoutGrid className="w-4 h-4 text-teal-500" /> One-Click Integrations
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {INTEGRATION_APPS.map(app => (
                            <button
                                key={app.id}
                                onClick={() => toggleApp(app.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                    selectedApps.includes(app.id) 
                                    ? 'bg-white dark:bg-slate-900 border-vibrant-orange shadow-md scale-105' 
                                    : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-white hover:border-slate-200 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <app.icon className={`w-6 h-6 mb-2 ${selectedApps.includes(app.id) ? app.color : 'text-slate-400'}`} />
                                <span className={`text-xs font-bold ${selectedApps.includes(app.id) ? 'text-navy-900 dark:text-white' : 'text-slate-500'}`}>{app.name}</span>
                                {selectedApps.includes(app.id) && <div className="absolute top-1 right-1 w-2 h-2 bg-vibrant-orange rounded-full"></div>}
                            </button>
                        ))}
                    </div>
                    
                    {/* Connection Details (Conditional) */}
                    {selectedApps.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4 animate-in fade-in">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">WhatsApp Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-2 top-2.5 w-3 h-3 text-slate-400" />
                                    <input 
                                        type="tel" 
                                        placeholder="+91 999..." 
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-7 pr-3 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={connectionDetails.mobileNumber}
                                        onChange={(e) => setConnectionDetails({...connectionDetails, mobileNumber: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-2.5 w-3 h-3 text-slate-400" />
                                    <input 
                                        type="email" 
                                        placeholder="work@..." 
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-7 pr-3 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={connectionDetails.workEmail}
                                        onChange={(e) => setConnectionDetails({...connectionDetails, workEmail: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                  onClick={handleOnboardingSubmit}
                  disabled={isLoading}
                  className="w-full bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Setup & Enter Dashboard"}
                </button>
            </div>

          ) : (

            // --- CREDENTIALS STEP ---
            <div className="animate-in slide-in-from-left-4 duration-300">
              <div className="text-center md:text-left mb-6">
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                  {isForgotPassword 
                    ? "Reset Your Password" 
                    : (mode === 'signin' ? "Log In" : "Create Account")}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {isForgotPassword 
                    ? "Enter your email to receive a secure reset link."
                    : (mode === 'signin' ? "Welcome back to your AI workspace." : "No credit card required. Free forever plan available.")}
                </p>
              </div>

              {/* Tally Link Insertion Point */}
              {!isForgotPassword && mode === 'signup' && (
                 <a href="https://tally.so/r/yPJ7N0" target="_blank" rel="noopener noreferrer" className="mb-6 block p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Join Priority Waitlist</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Get early access via our Tally form</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                 </a>
              )}

              {/* Social Logins */}
              {!isForgotPassword && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading || socialLoading !== null}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium disabled:opacity-50"
                    >
                      {socialLoading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Chrome className="w-4 h-4" />} 
                      Google
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSocialLogin('github')}
                      disabled={isLoading || socialLoading !== null}
                      className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium disabled:opacity-50"
                    >
                      {socialLoading === 'github' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />} 
                      GitHub
                    </button>
                </div>
              )}

              {/* Divider */}
              {!isForgotPassword && (
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-medium">Or continue with email</span>
                    </div>
                </div>
              )}

              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                
                {/* Sign Up Specific Fields */}
                {!isForgotPassword && mode === 'signup' && (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-navy-900 dark:text-white ml-1">Full Name</label>
                            <div className="relative group">
                            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange/50 transition-all placeholder:text-slate-400"
                                placeholder="John Doe"
                            />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="space-y-1 flex-1">
                                <label className="text-xs font-bold text-navy-900 dark:text-white ml-1">Language</label>
                                <div className="relative group">
                                <Globe className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                                <select
                                    value={formData.language}
                                    onChange={e => setFormData({...formData, language: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi (हिंदी)</option>
                                    <option value="Bengali">Bengali (বাংলা)</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Common Fields */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-900 dark:text-white ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className={`absolute left-3 top-3 w-5 h-5 transition-colors ${emailError ? 'text-red-500' : 'text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white'}`} />
                        <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => {
                            setFormData({...formData, email: e.target.value});
                            if (emailError) setEmailError('');
                        }}
                        className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${emailError ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 dark:border-slate-700 focus:ring-vibrant-orange/50'}`}
                        placeholder="name@company.com"
                        />
                    </div>
                    {emailError && <p className="text-xs text-red-500 ml-1 mt-1">{emailError}</p>}
                </div>

                {!isForgotPassword && (
                    <div className="space-y-1">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-navy-900 dark:text-white">Password</label>
                            {mode === 'signin' && (
                            <button 
                                type="button" 
                                onClick={() => setIsForgotPassword(true)}
                                className="text-xs text-vibrant-orange hover:underline"
                            >
                                Forgot password?
                            </button>
                            )}
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-navy-900 dark:group-focus-within:text-white transition-colors" />
                            <input 
                                type="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-orange/50 transition-all placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        {/* Password Strength */}
                        {mode === 'signup' && formData.password.length > 0 && (
                            <div className="mt-2 px-1">
                                <div className="flex gap-1 h-1.5 mb-1.5">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div 
                                            key={step} 
                                            className={`flex-1 rounded-full transition-all duration-300 ${
                                                step <= strength ? getStrengthColor(strength) : 'bg-slate-200 dark:bg-slate-700'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-slate-400">Use 8+ chars, numbers & symbols</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Terms Checkbox for Signup */}
                {!isForgotPassword && mode === 'signup' && (
                    <div className="pt-1">
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="mt-0.5 rounded border-slate-300 text-vibrant-orange focus:ring-vibrant-orange"
                                checked={formData.agreedToTerms}
                                onChange={(e) => {
                                    setFormData({...formData, agreedToTerms: e.target.checked});
                                    setTermsError('');
                                }}
                            />
                            <span className="text-xs text-slate-500">
                                I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                            </span>
                        </label>
                        {termsError && <p className="text-xs text-red-500 mt-1 ml-6">{termsError}</p>}
                    </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      {isForgotPassword ? 'Send Reset Link' : (mode === 'signup' ? 'Create Account & Setup Profile' : 'Sign In')} 
                      {!isForgotPassword && <ArrowRight className="w-4 h-4" />}
                      {isForgotPassword && <KeyRound className="w-4 h-4" />}
                    </>
                  )}
                </button>
              </form>
              
              {!isForgotPassword && (
                  <div className="mt-6 text-center">
                     <p className="text-sm text-slate-500">
                        {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                        <button 
                            type="button"
                            onClick={() => {
                                setMode(mode === 'signin' ? 'signup' : 'signin');
                                setEmailError('');
                            }}
                            className="ml-1 text-vibrant-orange font-bold hover:underline"
                        >
                            {mode === 'signin' ? "Sign up free" : "Log in"}
                        </button>
                     </p>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

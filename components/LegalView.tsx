
import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Globe, FileText, Scale, X, CheckCircle, ChevronRight, Share2, Printer, Clock, Sparkles, Wand2, Info } from 'lucide-react';
import { translations } from '../translations';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'about';
  language: 'English' | 'Hindi' | 'Bengali';
  setLanguage: (lang: 'English' | 'Hindi' | 'Bengali') => void;
  onClose: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, language, setLanguage, onClose }) => {
  const t = translations[language].legal;
  const isPrivacy = type === 'privacy';
  const isTerms = type === 'terms';
  const isAbout = type === 'about';

  // Prevent background scrolling when legal view is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white dark:bg-[#020617] overflow-y-auto scroll-smooth animate-in fade-in slide-in-from-bottom-6 duration-500">
      
      {/* 4K/Desktop Optimized Premium Sticky Header */}
      <nav className="sticky top-0 z-[1000] w-full h-20 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-4 sm:px-8 md:px-12">
          
          <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-vibrant-orange transition-all group"
              >
                <div className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="hidden sm:inline">Back to Hub</span>
              </button>
              <div className="hidden lg:flex items-center gap-2 text-slate-300 dark:text-slate-700">
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    {isAbout ? 'Company Profile' : 'Legal Documents'}
                  </span>
              </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
             <div className="flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-1 border border-slate-200 dark:border-slate-700">
                {(['English', 'Hindi', 'Bengali'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 ${
                      language === lang 
                      ? 'bg-white dark:bg-slate-700 text-vibrant-orange shadow-md scale-105' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {lang === 'English' ? 'EN' : lang === 'Hindi' ? 'HI' : 'BN'}
                  </button>
                ))}
             </div>
             
             <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
             
             <button onClick={handlePrint} className="p-2.5 text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors hidden md:block" title="Print Document">
                <Printer className="w-5 h-5" />
             </button>
             
             <button onClick={onClose} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition-all">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>
      </nav>

      <main className="relative min-h-screen">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-20 left-0 w-[30%] h-[30%] bg-vibrant-orange/5 rounded-full blur-[100px]" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-24">
            
            <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
                
                {/* HERO VISUAL WITH GENIE IMAGE */}
                <div className="relative mb-10 group cursor-default">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-125 animate-pulse"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border-2 border-emerald-500/30 rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 transition-transform duration-500 group-hover:scale-105">
                         <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg ${isAbout ? 'bg-vibrant-orange shadow-orange-500/40' : 'bg-emerald-500 shadow-emerald-500/40'}`}>
                            <img src="https://i.ibb.co/k60hZRq6/image.png" alt="Genie Sarathi" className="w-16 h-16 object-contain" />
                         </div>
                         <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${isAbout ? 'text-vibrant-orange' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {isAbout ? 'SimpleAgentix Sarathi' : t.dpdpBadge}
                         </span>
                         <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            <CheckCircle className="w-3 h-3 text-vibrant-green" /> {isAbout ? 'MISSION 2026' : 'VERIFIED 2024'}
                         </div>
                    </div>
                </div>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-navy-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                    {isPrivacy ? t.privacyTitle : isTerms ? t.termsTitle : t.aboutHeadline}
                </h1>
                
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        {isAbout ? <Wand2 className="w-4 h-4 text-vibrant-orange" /> : <FileText className="w-4 h-4 text-vibrant-orange" />}
                        {isAbout ? 'Innovation' : `Ref: SAX-${isPrivacy ? 'PRV' : 'TRM'}-2024`}
                    </span>
                    <span className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <Clock className="w-4 h-4 text-emerald-500" /> {t.lastUpdated}
                    </span>
                </div>

                {isAbout && (
                    <p className="mt-8 text-xl md:text-2xl text-vibrant-green font-bold max-w-3xl animate-pulse">
                        {t.aboutTagline}
                    </p>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-12 md:p-20 shadow-2xl relative overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                
                <div className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none relative z-10">
                    <div className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-[1.6] font-medium whitespace-pre-wrap selection:bg-emerald-500/20">
                        {isAbout ? t.aboutContent : isPrivacy ? t.privacyContent : t.termsContent}
                    </div>
                </div>

                <div className="mt-20 pt-20 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    <div className="flex gap-5 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all group">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-vibrant-orange h-fit group-hover:scale-110 transition-transform">
                            {isAbout ? <BrainCircuit className="w-7 h-7" /> : <Scale className="w-7 h-7" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-navy-900 dark:text-white text-lg mb-2">
                                {isAbout ? 'Core Cognitive Engine' : 'Legal Jurisdiction'}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {isAbout 
                                    ? 'Powered by a proprietary 38-layer logic architecture, our agents think like business owners, not just software.'
                                    : 'SimpleAgentix is operated under the regulatory framework of India. Any disputes are subject to the exclusive jurisdiction of courts in Kolkata/Mumbai.'
                                }
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-5 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all group">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-emerald-500 h-fit group-hover:scale-110 transition-transform">
                            {isAbout ? <Users className="w-7 h-7" /> : <Globe className="w-7 h-7" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-navy-900 dark:text-white text-lg mb-2">
                                {isAbout ? 'MSME Empowerment' : 'Data Residency'}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                {isAbout 
                                    ? 'Our mission is to ensure every business in Bharat has a world-class digital backbone, regardless of technical background.'
                                    : 'All business data residency for Indian MSMEs is managed through secure local infrastructure within Indian territory for DPDP compliance.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 sm:mt-32 pb-12 flex flex-col items-center">
                <div className="p-10 bg-navy-900 dark:bg-slate-950 rounded-[3rem] w-full text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-vibrant-orange/5 pointer-events-none"></div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
                        {isAbout ? 'Ready to Join the Revolution?' : 'Have Questions?'}
                    </h3>
                    <p className="text-slate-400 mb-10 max-w-lg mx-auto relative z-10 leading-relaxed">
                        {isAbout 
                            ? 'Our leadership team is dedicated to building the future of work for India.'
                            : 'Our compliance team is here to help you understand your data rights and our platform obligations.'
                        }
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <a 
                            href={isAbout ? "#booking" : "mailto:legal@simpleagentix.com"} 
                            onClick={isAbout ? onClose : undefined}
                            className="px-10 py-5 bg-vibrant-orange hover:bg-orange-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-orange-900/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                        >
                            {isAbout ? 'Request a Demo' : 'Email Compliance Officer'} <Share2 className="w-4 h-4" />
                        </a>
                        <button 
                            onClick={onClose}
                            className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl text-xs uppercase tracking-widest border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3"
                        >
                            {isAbout ? 'Back to Home' : 'Accept & Close'}
                        </button>
                    </div>
                </div>
                
                <p className="mt-12 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">
                    © 2025 SimpleAgentix SaaS • {isAbout ? 'Digital Sarathi for Bharat' : 'Next-Gen Agentic Compliance'}
                </p>
            </div>
        </div>
      </main>
      
      <style>{`
        @media print {
            nav, .fixed, button, .group-hover\:scale-105 { display: none !important; }
            main { padding: 0 !important; }
            .bg-white { background: white !important; color: black !important; }
            .prose { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

// Internal icon helpers for extended LegalView
function BrainCircuit(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 5.236 5.236 4 4 0 0 0 8.105.52 4 4 0 0 0 5.77-2.526 3 3 0 1 0 .125-5.997A4 4 0 0 0 21 10.23a4 4 0 0 0-5.236-5.236 3.003 3.003 0 0 0-3.764 0z"/>
      <path d="m9 13 2 2 4-4"/>
    </svg>
  );
}

function Users(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    );
}

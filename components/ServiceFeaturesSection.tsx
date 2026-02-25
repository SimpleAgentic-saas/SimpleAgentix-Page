
import React from 'react';
import { Mic, Languages } from 'lucide-react';

interface ServiceFeaturesSectionProps {
  onLanguageChange?: (lang: 'English' | 'Hindi' | 'Bengali') => void;
}

export const ServiceFeaturesSection: React.FC<ServiceFeaturesSectionProps> = ({ onLanguageChange }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-100/40 dark:bg-teal-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-vibrant-orange/10 dark:bg-vibrant-orange/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Multi-Language Section - Matches Screenshot */}
        <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-12 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-transparent to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wide">
                <Languages className="w-3.5 h-3.5" />
                <span>Localization Ready</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Voice-fast & Regional Language<br/>
                <span className="text-emerald-400">of Zero Complexity</span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Empowering every Indian MSME with easy-to-use agentic workflows. Speak naturally in your native tongue—we handle the rest.
              </p>
              
              {/* Language Buttons matching screenshot */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => onLanguageChange?.('Hindi')}
                  className="flex items-center gap-3 bg-[#1e293b] border border-slate-700/50 px-5 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-700 active:scale-95 transition-all cursor-pointer group/btn shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl filter drop-shadow-md group-hover/btn:scale-110 transition-transform">🇮🇳</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">HINDI</span>
                    <span className="font-medium text-white text-sm">नमस्ते (Namaste)</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => onLanguageChange?.('Bengali')}
                  className="flex items-center gap-3 bg-[#1e293b] border border-slate-700/50 px-5 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-700 active:scale-95 transition-all cursor-pointer group/btn shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl filter drop-shadow-md group-hover/btn:scale-110 transition-transform">🇧🇩</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">BENGALI</span>
                    <span className="font-medium text-white text-sm">হ্যালো (Hello)</span>
                  </div>
                </button>

                <button 
                  onClick={() => onLanguageChange?.('English')}
                  className="flex items-center gap-3 bg-[#1e293b] border border-slate-700/50 px-5 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-700 active:scale-95 transition-all cursor-pointer group/btn shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl filter drop-shadow-md group-hover/btn:scale-110 transition-transform">🇺🇸</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ENGLISH</span>
                    <span className="font-medium text-white text-sm">Hello</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Visual Representation Card */}
            <div className="relative flex-shrink-0 w-full md:w-auto flex justify-center">
               <div className="w-80 relative">
                  {/* Background glow effects */}
                  <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-3xl scale-125"></div>
                  
                  {/* Card Interface */}
                  <div className="bg-[#1e293b] rounded-2xl shadow-2xl p-6 relative z-20 w-full border border-slate-700/50">
                        
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Input Audio</span>
                            <Mic className="w-4 h-4 text-orange-500 animate-pulse" />
                        </div>
                        
                        {/* Audio Waveform visualization */}
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-1 h-8">
                                {[...Array(20)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-1.5 rounded-full bg-slate-600 animate-pulse" 
                                        style={{ 
                                            height: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.05}s`,
                                            opacity: Math.random() > 0.5 ? 0.7 : 0.3
                                        }} 
                                    />
                                ))}
                            </div>
                            <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 w-2/3 rounded-full"></div>
                            </div>
                        </div>

                        {/* Detection Result */}
                        <div className="pt-2">
                            <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Detected: Bengali</div>
                            <div className="p-4 bg-[#0f172a] rounded-xl border border-teal-500/20 shadow-inner">
                                <span className="text-lg text-teal-400 font-medium tracking-wide">
                                    "বিক্রয় রিপোর্ট পাঠান"
                                </span>
                            </div>
                        </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

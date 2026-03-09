
import React from 'react';
import { CheckCircle2, ArrowRight, Zap, TrendingUp, ShieldCheck, Users } from 'lucide-react';

export const AffiliateSection: React.FC = () => {
  return (
    <section className="py-24 bg-emerald-50/50 dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-5%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide mb-4">
                <Users className="w-3 h-3" /> Partner Program
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-6 leading-tight">
                Partner with <span className="text-emerald-600">SimpleAgentix</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                Digitize Indian MSMEs and ensure lifetime <span className="text-emerald-600 dark:text-emerald-400 font-bold">Passive Income</span>.
            </p>
        </div>

        {/* Commission Slabs Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
            
            {/* Industrial Slab */}
            <div className="flex-1 min-w-[260px] max-w-[300px] bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="inline-block px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 shadow-md">
                    Industrial
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-extrabold text-navy-900 dark:text-white">25%</h3>
                    <span className="text-sm font-bold text-slate-400">Comm.</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Earn up to <br/>
                    <strong className="text-lg text-emerald-600 dark:text-emerald-400">₹1,249.75</strong> per sale!
                </p>
            </div>

            {/* Business Slab */}
            <div className="flex-1 min-w-[260px] max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
                <div className="inline-block px-4 py-1.5 bg-navy-900 dark:bg-slate-700 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                    Business
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-extrabold text-navy-900 dark:text-white">20%</h3>
                    <span className="text-sm font-bold text-slate-400">Comm.</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Earn up to <br/>
                    <strong className="text-lg text-navy-900 dark:text-white">₹399.80</strong> per sale!
                </p>
            </div>

            {/* Vyapaar Slab */}
            <div className="flex-1 min-w-[260px] max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
                <div className="inline-block px-4 py-1.5 bg-orange-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                    Vyapaar
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-extrabold text-navy-900 dark:text-white">15%</h3>
                    <span className="text-sm font-bold text-slate-400">Comm.</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Earn up to <br/>
                    <strong className="text-lg text-orange-500">₹74.85</strong> per sale!
                </p>
            </div>

            {/* Starter Slab */}
            <div className="flex-1 min-w-[260px] max-w-[300px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
                <div className="inline-block px-4 py-1.5 bg-slate-400 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                    Starter
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <h3 className="text-5xl font-extrabold text-navy-900 dark:text-white">10%</h3>
                    <span className="text-sm font-bold text-slate-400">Comm.</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Earn commission even when <br/>
                    <strong className="text-slate-700 dark:text-slate-300">Free Users Upgrade!</strong>
                </p>
            </div>
        </div>

        {/* Features & Call to Action */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            
            {/* Content Side */}
            <div className="flex-1 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white mb-6">
                    Why join our Affiliate Team?
                </h3>
                <ul className="space-y-6 mb-10">
                    {[
                        { title: "Transparent Dashboard", desc: "Track clicks, leads, and commissions in real-time.", icon: TrendingUp },
                        { title: "Indian Pocket-Friendly", desc: "Plans start at ₹499, making it easy to sell to any MSME.", icon: Zap },
                        { title: "Instant Payout", desc: "Direct bank transfer at the end of every month.", icon: CheckCircle2 },
                        { title: "Lifetime Tracking", desc: "Earn commission even if your referral upgrades 1 year later.", icon: ShieldCheck }
                    ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 mt-1">
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy-900 dark:text-white text-sm">{feature.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={() => window.open('/affiliate-signup', '_blank')}
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                    Join Affiliate Team Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Visual Side */}
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl scale-90 animate-pulse"></div>
                    <img 
                        src="https://i.ibb.co/k60hZRq6/image.png" 
                        alt="Genie Partner" 
                        className="w-full h-full object-contain drop-shadow-2xl animate-[float-pulse_5s_ease-in-out_infinite]"
                    />
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm mt-6 tracking-wide">
                    "Let's Grow the Indian Business Ecosystem Together"
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};


import React from 'react';
import { Repeat, AlertTriangle, TrendingDown, Clock, Zap, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface ProblemSectionProps {
  t?: {
    badge: string;
    title: string;
    desc: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  }
}

const problems = [
  {
    key: "p1",
    fallback: "Is your team's creativity wasted on repetitive data entry?",
    icon: Repeat,
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-500/20",
    hoverBorder: "group-hover:border-orange-500/50"
  },
  {
    key: "p2",
    fallback: "Are projects delayed due to human error?",
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    hoverBorder: "group-hover:border-red-500/50"
  },
  {
    key: "p3",
    fallback: "Is profit margin shrinking due to overhead costs?",
    icon: TrendingDown,
    color: "text-rose-500",
    bg: "bg-rose-500/10 border-rose-500/20",
    hoverBorder: "group-hover:border-rose-500/50"
  },
  {
    key: "p4",
    fallback: "Wasting hours on manual customer support?",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    hoverBorder: "group-hover:border-amber-500/50"
  }
];

export const ProblemSection: React.FC<ProblemSectionProps> = ({ t }) => {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
       
       {/* Ultra Modern Background Effects */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40rem] h-[40rem] bg-rose-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
          {/* Subtle Grid & Noise Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              
              {/* LEFT: Content */}
              <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-8 animate-in slide-in-from-left-4 duration-700 backdrop-blur-sm">
                    <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                    {t ? t.badge : "The Real Problem"}
                 </div>
                 
                 <h2 className="text-4xl md:text-6xl font-bold text-navy-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                    {t ? t.title : "Is your business stuck in the "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 relative">
                        Manual Trap?
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                           <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>
                 </h2>
                 
                 <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-lg border-l-4 border-slate-200 dark:border-slate-800 pl-6">
                   {t ? t.desc : "Inefficiency isn't just annoying—it's expensive. While you focus on growth, manual workflows are silently draining your time, budget, and team morale."}
                 </p>

                 <div className="space-y-4">
                    {problems.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`group relative p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-1 ${item.hoverBorder}`}
                        >
                            <div className="flex items-start gap-5">
                                <div className={`mt-1 p-3.5 rounded-xl border transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-3 ${item.bg} ${item.color}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-base font-bold text-navy-900 dark:text-white mb-1.5 group-hover:text-red-500 transition-colors">
                                        {t ? (t as any)[item.key] : item.fallback}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Critical</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-4 h-4 text-navy-900 dark:text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
              </div>

              {/* RIGHT: Next-Gen Visualization */}
              <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 perspective-1000">
                  {/* Floating Elements Behind */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
                  
                  {/* Glass Card Container */}
                  <div className="relative w-full aspect-[4/5] md:aspect-square max-w-[550px] mx-auto transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-[#0B1120]/90 dark:from-[#0B1120]/95 dark:to-black/95 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col group ring-1 ring-white/5">
                          
                          {/* Browser-like Bar */}
                          <div className="h-14 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center px-6 justify-between z-20">
                              <div className="flex gap-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-vibrant-green animate-pulse"></span>
                                  agent_core_monitor.exe
                              </div>
                          </div>

                          {/* Visualization Canvas */}
                          <div className="flex-1 relative p-8 z-10">
                              {/* Animated Grid Background */}
                              <div className="absolute inset-0 opacity-20" 
                                   style={{
                                       backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                                       backgroundSize: '20px 20px',
                                       maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                                   }}>
                              </div>

                              <div className="absolute inset-0 flex items-center justify-center">
                                  
                                  {/* Dynamic Connecting Lines */}
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                      <defs>
                                          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                              <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                                              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
                                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                                          </linearGradient>
                                      </defs>
                                      {/* Left Top to Center */}
                                      <path d="M80,140 Q 150,140 250,250" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="opacity-40" />
                                      {/* Left Bottom to Center */}
                                      <path d="M80,360 Q 150,360 250,250" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="opacity-40" />
                                  </svg>

                                  {/* Chaos Nodes (Left Side) */}
                                  <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8">
                                      <div className="relative group/node">
                                          <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-red-500/30 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.1)] w-40 transform hover:scale-105 transition-all duration-300">
                                              <div className="flex items-center gap-3 mb-3">
                                                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400"><AlertTriangle className="w-4 h-4" /></div>
                                                  <span className="text-xs font-bold text-red-100">Manual Errors</span>
                                              </div>
                                              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                                  <div className="h-full bg-red-500 w-[80%] animate-pulse"></div>
                                              </div>
                                          </div>
                                          <div className="absolute top-1/2 -right-12 h-[1px] w-12 bg-gradient-to-r from-red-500/50 to-transparent"></div>
                                      </div>

                                      <div className="relative group/node">
                                          <div className="p-4 bg-slate-900/80 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.1)] w-40 transform hover:scale-105 transition-all duration-300 delay-150">
                                              <div className="flex items-center gap-3 mb-3">
                                                  <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400"><Clock className="w-4 h-4" /></div>
                                                  <span className="text-xs font-bold text-orange-100">Delay Risk</span>
                                              </div>
                                              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                                  <div className="h-full bg-orange-500 w-[60%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                              </div>
                                          </div>
                                          <div className="absolute top-1/2 -right-12 h-[1px] w-12 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                                      </div>
                                  </div>

                                  {/* Central AI Core */}
                                  <div className="relative z-10">
                                      <div className="w-28 h-28 rounded-3xl bg-[#0B1120] border border-slate-700 shadow-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500 z-20">
                                          <div className="absolute inset-0 bg-vibrant-green/20 blur-2xl rounded-full animate-pulse"></div>
                                          <Zap className="w-12 h-12 text-vibrant-green relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                          
                                          {/* Orbiting Rings */}
                                          <div className="absolute -inset-4 border border-vibrant-green/20 rounded-[2rem] rotate-45 animate-[spin_8s_linear_infinite]"></div>
                                          <div className="absolute -inset-4 border border-dashed border-vibrant-green/20 rounded-[2rem] -rotate-12 animate-[spin_12s_linear_infinite_reverse]"></div>
                                      </div>
                                      
                                      {/* Output Line */}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-vibrant-green to-transparent"></div>
                                  </div>

                                  {/* Success Output (Bottom) */}
                                  <div className="absolute bottom-10 bg-[#0B1120] border border-green-500/30 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 backdrop-blur-xl">
                                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                          <ShieldCheck className="w-5 h-5 text-vibrant-green" />
                                      </div>
                                      <div>
                                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                                          <span className="text-sm font-bold text-white">System Optimized</span>
                                      </div>
                                      <div className="w-px h-8 bg-white/10 mx-2"></div>
                                      <div className="text-right">
                                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Efficiency</div>
                                          <span className="text-sm font-bold text-vibrant-green">+400%</span>
                                      </div>
                                  </div>

                              </div>
                          </div>
                          
                          {/* Bottom Glow */}
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vibrant-green to-transparent opacity-50"></div>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </section>
  );
};


import React from 'react';
import { Briefcase, Code, Users, TrendingUp, Award, Globe, ExternalLink, Cloud, Sparkles, Zap, MessageSquare, Database, Github, Box, Server } from 'lucide-react';

const techStack = [
  { name: 'AWS', icon: Cloud, color: 'text-[#FF9900]' },
  { name: 'Google Gemini', icon: Sparkles, color: 'text-[#1a73e8]' },
  { name: 'OpenAI', icon: Zap, color: 'text-[#10a37f]' },
  { name: 'Claude', icon: MessageSquare, color: 'text-[#d97757]' },
  { name: 'Supabase', icon: Database, color: 'text-[#3ecf8e]' },
  { name: 'GitHub', icon: Github, color: 'text-[#181717] dark:text-white' },
  { name: 'Docker', icon: Box, color: 'text-[#2496ed]' },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wide mb-4">
            <Users className="w-3 h-3" />
            <span>World-Class Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            Experienced Leaders Team
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            SimpleAgentix is led by a team of seasoned professionals with extensive backgrounds in technology, business development, and finance to drive our vision forward.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Somnath Saha */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
            <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform duration-300 relative bg-gradient-to-br from-navy-800 to-navy-900 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
               <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                   <img 
                      src="https://i.ibb.co/0jy5Y3cZ/image.png" 
                      alt="Somnath Saha - Founder & CEO" 
                      className="w-full h-full object-cover" 
                   />
               </div>
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-1">Somnath Saha</h3>
            <p className="text-vibrant-orange font-bold text-xs mb-6 uppercase tracking-widest">Founder & CEO</p>
            
            <div className="w-full border-t border-slate-100 dark:border-slate-700 my-2"></div>
            
            <div className="pt-4 flex flex-col items-center">
              <div className="mb-3 text-slate-400">
                  <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                5 Years of Business Consultancy & Retail Management expertise. Driving the strategic vision of SimpleAgentix.
              </p>
            </div>
          </div>

          {/* Prateek Chaturvedi */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
            <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform duration-300 relative bg-gradient-to-br from-navy-800 to-navy-900 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
               <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600">
                   <span className="text-4xl font-bold text-white tracking-widest">PC</span>
               </div>
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-1">Prateek Chaturvedi</h3>
            <p className="text-teal-600 dark:text-teal-400 font-bold text-xs mb-6 uppercase tracking-widest">Tech Team & Dev Partner</p>
            
            <div className="w-full border-t border-slate-100 dark:border-slate-700 my-2"></div>

            <div className="pt-4 flex flex-col items-center">
              <div className="mb-3 text-slate-400">
                  <Code className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Project Manager with 17 Years of Full Stack Development experience. Architecting scalable solutions.
              </p>
            </div>
          </div>

          {/* Open Roles */}
          <div className="bg-navy-900 dark:bg-slate-950 rounded-2xl p-8 shadow-xl text-white flex flex-col justify-center relative overflow-hidden group border border-navy-800 dark:border-slate-800 text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all"></div>
            
            <div className="relative z-10 flex flex-col items-center h-full justify-center">
               <div className="w-16 h-16 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                  <TrendingUp className="w-8 h-8 text-vibrant-green" />
               </div>
               <h3 className="text-xl font-bold mb-2">Join Leadership</h3>
               <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                 We are expanding our core team. Flexibility of Working & Equity Partnership available.
               </p>
               
               <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {['CFO', 'CMO', 'CHRO', 'SE', 'CTO', 'CXO'].map(role => (
                    <span key={role} className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/10 hover:bg-white/20 cursor-default transition-colors">
                      {role}
                    </span>
                  ))}
               </div>

               <a 
                 href="https://meet.google.com/mzg-jyop-mhn"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-3 bg-vibrant-green hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer gap-2"
               >
                 Apply for Leadership <ExternalLink className="w-4 h-4" />
               </a>
               <p className="text-[10px] text-slate-400 mt-3 font-medium tracking-wide">MAX GROWTH & LIFE FREEDOM</p>
            </div>
          </div>
        </div>

        {/* Additional Info & Advisory Board */}
        <div className="grid md:grid-cols-2 gap-8">
           {/* Deep Experience */}
           <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                 <Award className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Deep Industry Experience & Expertise</h4>
                 <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Our team possesses a robust understanding of market dynamics, allowing us to navigate challenges and capitalize on opportunities within the industry effectively.
                 </p>
              </div>
           </div>

           {/* Advisory Board */}
           <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                 <Globe className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-2">Strategic Advisory Board</h4>
                 <ul className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                        <span>Composed of industry veterans and thought leaders</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                        <span>Providing guidance on market trends and strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                        <span>Enhancing credibility and connections for the business</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        {/* NEW SECTION: Empowering Next Generation SaaS Startups */}
        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
             <div className="text-center mb-10">
                 <p className="text-xs font-bold text-vibrant-orange uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                     <Sparkles className="w-4 h-4" /> Built on Giants
                 </p>
                 <h3 className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white mb-3">
                    Empowering the Next Generation of SaaS Startups
                 </h3>
                 <p className="text-slate-500 dark:text-slate-400">
                    Leveraging world-class infrastructure and AI models to deliver excellence.
                 </p>
             </div>

             <div className="relative w-full overflow-hidden py-4">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex w-max animate-scroll-tech hover:[animation-play-state:paused]">
                   {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                       <div key={i} className="flex flex-col items-center justify-center gap-3 mx-8 opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 group cursor-default">
                           <div className={`p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:-translate-y-1 transition-transform`}>
                               <tech.icon className={`w-8 h-8 ${tech.color}`} />
                           </div>
                           <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide group-hover:text-navy-900 dark:group-hover:text-white transition-colors">{tech.name}</span>
                       </div>
                   ))}
                </div>
             </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-tech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-tech {
          animation: scroll-tech 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

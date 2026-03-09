
import React, { useState } from 'react';
import { 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Store, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle,
  ArrowUp,
  FileText,
  Info
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/somnath-saha-028538236', color: 'text-blue-400' },
  { name: 'Facebook', icon: Facebook, url: '#', color: 'text-blue-500' },
  { name: 'Instagram', icon: Instagram, url: '#', color: 'text-pink-400' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'text-sky-400' },
  { name: 'YouTube', icon: Youtube, url: '#', color: 'text-red-500' },
  { name: 'Google Business', icon: Store, url: 'https://share.google/tg9rrj8483wSbQaQL', color: 'text-green-500' },
];

interface SocialsSectionProps {
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onAboutClick?: () => void; // New prop
}

export const SocialsSection: React.FC<SocialsSectionProps> = ({ onPrivacyClick, onTermsClick, onAboutClick }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="bg-navy-900 dark:bg-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center justify-between mb-24 border border-slate-800 ring-1 ring-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-vibrant-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="w-full lg:w-5/12 relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Weekly Workflow Digest</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Join our Global AI Community</h2>
                <p className="text-slate-300 mb-10 leading-relaxed font-medium"> Get the latest agentic templates, industry-specific automation tips, and product updates delivered to your inbox.</p>
                <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto lg:mx-0">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter business email" className="w-full pl-6 pr-32 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-vibrant-orange/50 focus:bg-white/10 transition-all backdrop-blur-sm shadow-inner" />
                    <button type="submit" className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${isSubscribed ? 'bg-emerald-500 text-white' : 'bg-vibrant-orange hover:bg-orange-600 text-white'}`}>
                        {isSubscribed ? <CheckCircle className="w-4 h-4"/> : 'Subscribe'} 
                    </button>
                </form>
            </div>
            <div className="hidden lg:block w-px h-72 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            <div className="w-full lg:w-6/12 relative z-10">
                <div className="text-center lg:text-left mb-10"><h3 className="text-2xl font-bold text-white mb-2">Connect with SimpleAgentix</h3><p className="text-slate-400 text-sm font-medium">Follow us for real-time roadmap updates and priority support.</p></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {socialLinks.map((social) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white text-white hover:text-navy-900 transition-all duration-500 hover:-translate-y-1`}>
                            <div className={`p-2.5 rounded-xl bg-white/10 group-hover:bg-slate-100 transition-colors ${social.color}`}><social.icon className="w-5 h-5" /></div>
                            <span className="font-bold text-sm">{social.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-auto text-slate-400 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center text-center pb-12 relative">
            <h2 className="text-4xl md:text-7xl font-black text-navy-900 dark:text-white mb-8 leading-[1.1] tracking-tighter">How Much More Time will you <br className="hidden md:block" /> Waste on Manual Work?</h2>
            <p className="text-2xl md:text-4xl text-vibrant-orange font-black mb-12 animate-pulse tracking-tight">The Future is Now in Your Hands.</p>
            <button onClick={scrollToTop} className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-vibrant-orange hover:bg-white dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-xl group mb-4"><ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" /></button>
        </div>
      </div>

      <div className="w-full bg-[#0B1120] dark:bg-black border-t border-slate-800/50 py-16 relative z-[50] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex items-center gap-5 order-1">
                      <div className="p-2 bg-white rounded-xl shadow-lg"><BrandLogo className="w-10 h-10" /></div>
                      <div className="flex flex-col"><span className="font-black text-2xl text-white tracking-tighter leading-none">SimpleAgentix</span><span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Next-Gen Agentic SaaS</span></div>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 order-2">
                      <button onClick={onAboutClick} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-vibrant-orange transition-all group"><Info className="w-4 h-4 text-vibrant-green opacity-50 group-hover:opacity-100" />About Us</button>
                      <button onClick={onPrivacyClick} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-vibrant-orange transition-all group"><ShieldCheck className="w-4 h-4 text-vibrant-orange opacity-50 group-hover:opacity-100" />Privacy Policy</button>
                      <button onClick={onTermsClick} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-vibrant-orange transition-all group"><FileText className="w-4 h-4 text-blue-400 opacity-50 group-hover:opacity-100" />Terms & Conditions</button>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3 order-3">
                      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"><ShieldCheck className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">DPDP Act 2023 Certified</span></div>
                      <div className="flex flex-col items-center md:items-end"><div className="text-[11px] font-bold text-slate-400">© 2025 SimpleAgentix SaaS. All rights reserved.</div><div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Engineered for Indian MSME Digitization</div></div>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BookOpen, 
  Smartphone, 
  Wrench, 
  Menu, 
  X, 
  ArrowRight, 
  Play, 
  LogIn, 
  Globe,
  Sun,
  Moon,
  Gift,
  Info 
} from 'lucide-react';
import { translations } from './translations';
import { BrandLogo } from './components/BrandLogo';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { ServiceFeaturesSection } from './components/ServiceFeaturesSection';
import { AgenticWorkflowsSection } from './components/AgenticWorkflowsSection';
import { UseCasesSection } from './components/UseCasesSection';
import { ProblemSection } from './components/ProblemSection';
import { GallerySection } from './components/GallerySection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { TeamSection } from './components/TeamSection';
import { BlogsSection } from './components/BlogsSection';
import { BookingSection } from './components/BookingSection';
import { SocialsSection } from './components/SocialsSection';
import { LegalView } from './components/LegalView';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Bengali'>('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeLegalView, setActiveLegalView] = useState<'privacy' | 'terms' | 'about' | null>(null);
  
  // State to bridge Gallery and Agentic Workflows
  const [pendingNicheSelection, setPendingNicheSelection] = useState<{ industry: string, segments: string[] } | null>(null);

  // Load user from local storage (simulation)
  useEffect(() => {
    const savedUser = localStorage.getItem('simpleagentix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Theme Initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = (userProfile: UserProfile) => {
    setUser(userProfile);
    localStorage.setItem('simpleagentix_user', JSON.stringify(userProfile));
    if (userProfile.language && ['English', 'Hindi', 'Bengali'].includes(userProfile.language)) {
        setLanguage(userProfile.language as any);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('simpleagentix_user');
    window.location.reload();
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    }
  };

  const handleNicheHandoff = (industry: string, segments: string[]) => {
    setPendingNicheSelection({ industry, segments });
    scrollToSection('workflows');
  };

  const t = translations[language];

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white font-sans selection:bg-vibrant-orange/30 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <BrandLogo className="w-10 h-10" />
              <span className="text-xl font-bold tracking-tight text-navy-900 dark:text-white">SimpleAgentix</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-vibrant-orange transition-colors">{t.nav.features}</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-vibrant-orange transition-colors">{t.nav.pricing}</button>
              <button onClick={() => setActiveLegalView('about')} className="text-sm font-bold text-vibrant-green hover:text-vibrant-orange transition-colors">About Us</button>
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Switcher */}
              <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-vibrant-orange transition-colors">
                      <Globe className="w-4 h-4" />
                      {language === 'English' ? 'EN' : language === 'Hindi' ? 'HI' : 'BN'}
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                      {['English', 'Hindi', 'Bengali'].map(lang => (
                          <button 
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${language === lang ? 'text-vibrant-orange' : 'text-slate-600 dark:text-slate-400'}`}
                          >
                              {lang}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
              
              <button onClick={() => openAuth('signin')} className="text-sm font-bold text-navy-900 dark:text-white hover:text-vibrant-orange transition-colors">
                {t.nav.signin}
              </button>
              <button onClick={() => openAuth('signup')} className="px-5 py-2.5 bg-vibrant-orange hover:bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5">
                {t.nav.getstarted}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
           <div className="md:hidden bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top-4 shadow-2xl">
              <button onClick={() => scrollToSection('features')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-300 py-2">{t.nav.features}</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-300 py-2">{t.nav.pricing}</button>
              <button onClick={() => { setActiveLegalView('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-bold text-vibrant-green py-2">About Us</button>
              
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-b border-slate-100 dark:border-slate-800">
                 <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Appearance</span>
                 <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                 >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                 </button>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
              <button onClick={() => openAuth('signin')} className="block w-full text-left text-sm font-bold text-navy-900 dark:text-white py-2">{t.nav.signin}</button>
              <button onClick={() => openAuth('signup')} className="w-full py-3 bg-vibrant-orange text-white text-sm font-bold rounded-xl">{t.nav.getstarted}</button>
           </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-[#020617]">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-8">
               <span className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse"></span>
               AI-Agentic Automation for MSME
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-navy-900 dark:text-white leading-[1.1] mb-8 tracking-tight max-w-4xl">
               {t.hero.headline} <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-orange to-red-500">
                 {t.hero.subhead}
               </span>
            </h1>
            
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed px-4">
               {t.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => openAuth('signup')}
                  className="w-full sm:w-auto px-8 py-4 bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm"
                >
                   {t.hero.cta_book} <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-navy-900 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 text-sm"
                >
                   <Play className="w-4 h-4 fill-current" /> {t.hero.cta_demo}
                </button>
            </div>

            <div className="mt-8 flex items-center gap-4 opacity-80">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#020617] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {t.hero.trusted} <span className="text-vibrant-orange">★★★★★</span>
                </div>
            </div>
          </div>

           <div className="relative w-full max-w-4xl perspective-1000 mt-4 animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="relative w-full aspect-square md:aspect-[16/9] flex items-center justify-center">
                  <div className="absolute inset-0 bg-teal-500/5 dark:bg-teal-500/5 rounded-full blur-[100px] scale-75"></div>
                  <img 
                    src="https://i.ibb.co/8LSS9pJ3/Genie.png"
                    alt="SimpleAgentix Genie" 
                    className="relative z-10 h-full object-contain drop-shadow-2xl animate-[float-pulse_6s_ease-in-out_infinite]"
                    style={{ maxHeight: '600px' }} 
                  />
                  
                  {/* Floating Workflow Tools */}
                  <div className="absolute top-1/4 left-0 md:left-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-[float-pulse_5s_ease-in-out_infinite] z-20 hidden sm:flex" style={{ animationDelay: '0s' }}>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-500 rounded-xl"><FileText className="w-6 h-6" /></div>
                      <div><div className="text-[10px] font-bold text-slate-400 uppercase">Manage</div><div className="text-sm font-bold text-navy-900 dark:text-white">Invoices</div></div>
                  </div>
                  <div className="absolute top-1/3 right-0 md:right-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-[float-pulse_5s_ease-in-out_infinite] z-20 hidden sm:flex" style={{ animationDelay: '1s' }}>
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-500 rounded-xl"><BookOpen className="w-6 h-6" /></div>
                      <div><div className="text-[10px] font-bold text-slate-400 uppercase">Track</div><div className="text-sm font-bold text-navy-900 dark:text-white">Ledgers</div></div>
                  </div>
                  <div className="absolute bottom-1/4 left-4 md:left-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-[float-pulse_5s_ease-in-out_infinite] z-20 hidden sm:flex" style={{ animationDelay: '2s' }}>
                      <div className="p-3 bg-green-100 dark:bg-green-900/50 text-green-500 rounded-xl"><Smartphone className="w-6 h-6" /></div>
                      <div><div className="text-[10px] font-bold text-slate-400 uppercase">Connect</div><div className="text-sm font-bold text-navy-900 dark:text-white">WhatsApp</div></div>
                  </div>
                  <div className="absolute bottom-1/4 right-4 md:right-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-[float-pulse_5s_ease-in-out_infinite] z-20 hidden sm:flex" style={{ animationDelay: '1.5s' }}>
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl"><Wrench className="w-6 h-6" /></div>
                      <div><div className="text-[10px] font-bold text-slate-400 uppercase">Fix</div><div className="text-sm font-bold text-navy-900 dark:text-white">Problems</div></div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <ProblemSection t={t.problem} />
      <div id="features"><ServiceFeaturesSection onLanguageChange={setLanguage} /></div>
      <UseCasesSection />
      <GallerySection language={language} onGeneratePlan={handleNicheHandoff}/>
      <div id="workflows">
        <AgenticWorkflowsSection 
          language={language} 
          externalNicheSelection={pendingNicheSelection}
          onAnalysisClear={() => setPendingNicheSelection(null)}
        />
      </div>
      <IntegrationsSection />
      <TestimonialsSection />
      <div id="pricing"><PricingSection language={language} /></div>
      <TeamSection />
      <BlogsSection language={language} />
      <div id="booking" className="py-24 bg-white dark:bg-[#0f172a]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Ready to Automate?</h2>
            <BookingSection />
          </div>
      </div>

      <section className="py-16 px-4 bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto bg-[#f0fdf4] dark:bg-emerald-950/20 rounded-[30px] border border-dashed border-[#00b894] dark:border-emerald-500/50 p-10 text-center relative overflow-hidden transition-colors duration-300">
           <div className="relative z-10 flex flex-col items-center">
              <img src="https://i.ibb.co/k60hZRq6/image.png" alt="Genie Partner" className="w-20 mb-4 drop-shadow-md animate-[float-pulse_4s_ease-in-out_infinite]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#065f46] dark:text-emerald-400 mb-3">{t.affiliate.title}</h2>
              <p className="text-[#374151] dark:text-slate-300 max-w-xl mx-auto mb-6 text-base leading-relaxed font-medium">
                 {t.affiliate.desc_part1} <b className="text-[#00b894]">{t.affiliate.desc_highlight}</b> {t.affiliate.desc_part2}
              </p>
              <a href="/affiliate.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#00b894] hover:bg-[#00997a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5">
                 {t.affiliate.cta} <ArrowRight className="w-4 h-4" />
              </a>
           </div>
        </div>
      </section>

      <SocialsSection 
        onPrivacyClick={() => setActiveLegalView('privacy')} 
        onTermsClick={() => setActiveLegalView('terms')}
        onAboutClick={() => setActiveLegalView('about')} 
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} onAuthSuccess={handleLogin} />

      {activeLegalView && (
        <LegalView 
            type={activeLegalView} 
            language={language} 
            setLanguage={setLanguage}
            onClose={() => setActiveLegalView(null)} 
        />
      )}
    </div>
  );
};

export default App;

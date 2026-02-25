
import React, { useState } from 'react';
import { 
  Check, 
  Zap, 
  Coins, 
  Crown, 
  Factory, 
  Building2, 
  Rocket, 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  History,
  Shield,
  Cpu,
  Globe,
  Database,
  Lock,
  Activity,
  CheckCircle,
  PhoneCall,
  CheckCircle2,
  PhoneOff
} from 'lucide-react';

interface PricingSectionProps {
    language?: 'English' | 'Hindi' | 'Bengali';
}

type BillingCycle = 'monthly' | 'yearly';

export const PricingSection: React.FC<PricingSectionProps> = ({ language = 'English' }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const isYearly = billingCycle === 'yearly';

  // Updated Plan Data Structure including Starter and specific Voice Consulting statuses
  const plans = {
    starter: {
      name: "STARTER (FREE)",
      label: "Basic Automation",
      color: "slate",
      monthlyPrice: 0,
      yearlyPrice: 0,
      monthlyCoins: "20",
      yearlyCoins: "20",
      rollover: false,
      features: [
        "20 Monthly Coins", 
        "7-Day History", 
        "Web Access Only", 
        "Community Support", 
        "☎️ Voice Calling: ❌ Deactivate"
      ]
    },
    vyapaar: {
      name: "VYAPAAR (PRO)",
      label: "Perfect for Shopkeepers",
      color: "orange",
      monthlyPrice: 499,
      yearlyPrice: 4990, 
      monthlyCoins: "300",
      yearlyCoins: "3,600",
      rollover: false,
      features: [
        "Full WhatsApp Access", 
        "6-Month History", 
        "Standard Support", 
        "Daily Sales Alerts", 
        "☎️ Voice Calling: ❌ Deactivate"
      ]
    },
    business: {
      name: "BUSINESS (GROWTH)",
      label: "Most Popular for Teams",
      color: "navy",
      monthlyPrice: 1999,
      yearlyPrice: 19990,
      monthlyCoins: "1,500",
      yearlyCoins: "18,000",
      rollover: true,
      features: [
        "Credit Rollover Enabled", 
        "3-Year History", 
        "Team Access (5 Users)", 
        "Custom Workflow Builder", 
        "☎️ Voice Calling: ✅ Limited Access"
      ]
    },
    industrial: {
      name: "INDUSTRIAL PLAN",
      label: "Direct ERP/Tally Sync",
      color: "green",
      monthlyPrice: 4999,
      yearlyPrice: 49900,
      monthlyCoins: "4,350",
      yearlyCoins: "52,200",
      rollover: true,
      features: [
        "Real-time ERP/Tally Sync", 
        "Direct Bank Sync (Auto-Reco)", 
        "Priority AI Processing", 
        "Unlimited Team Roles", 
        "☎️ Voice Calling: ✅ Priority Access"
      ]
    }
  };

  return (
    <div id="pricing" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide mb-4">
                    Transparent Pricing for Every Team
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-navy-900 dark:text-white mb-6 tracking-tight text-center">Simple Pricing, Agentic Power</h2>
                
                {/* BILLING TOGGLE */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-navy-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
                    <button 
                        onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
                        className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-1 transition-all duration-300 hover:border-vibrant-orange"
                    >
                        <div className={`w-6 h-6 rounded-full bg-vibrant-orange shadow-md transition-all duration-500 transform ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
                    </button>
                    <div className="flex flex-col items-start text-left">
                        <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-navy-900 dark:text-white' : 'text-slate-400'}`}>
                            Yearly <span className="text-vibrant-green ml-1 font-black">Save ~16%</span>
                        </span>
                        <span className="text-[10px] font-bold text-vibrant-orange uppercase tracking-wider">12 Months for the price of 10</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
                
                {/* STARTER PLAN */}
                <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                            {plans.starter.name}
                        </span>
                    </div>
                    <div className="mb-4">
                        <div className="text-4xl font-black text-navy-900 dark:text-white">₹0</div>
                        <div className="text-slate-400 text-[10px] font-bold uppercase mt-2">Free Forever</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 mb-6 border border-slate-100 dark:border-slate-800">
                        <div className="text-slate-600 dark:text-slate-400 font-bold text-xs mb-1 flex items-center gap-2">
                           <Coins className="w-3.5 h-3.5" /> {plans.starter.monthlyCoins} Coins / Mo
                        </div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{plans.starter.label}</div>
                    </div>
                    <div className="space-y-2 mb-8 flex-1">
                        {plans.starter.features.map((f, i) => (
                            <FeatureItem key={i} text={f} color="slate" />
                        ))}
                    </div>
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-all text-xs uppercase tracking-widest">
                        Get Started Free
                    </button>
                </div>

                {/* VYAPAAR PLAN */}
                <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-200 dark:border-orange-800">
                            {plans.vyapaar.name}
                        </span>
                    </div>
                    <div className="mb-4">
                        <div className="text-4xl font-black text-navy-900 dark:text-white transition-all">
                            ₹{isYearly ? plans.vyapaar.yearlyPrice : plans.vyapaar.monthlyPrice}
                        </div>
                        <div className="text-slate-400 text-[10px] font-bold uppercase mt-2">
                            Per {isYearly ? 'Year' : 'Month'}
                        </div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-3 mb-6 border border-orange-100 dark:border-orange-900/20">
                        <div className="text-orange-600 dark:text-orange-400 font-bold text-xs mb-1 flex items-center gap-2">
                           <Coins className="w-3.5 h-3.5" /> {isYearly ? plans.vyapaar.yearlyCoins : plans.vyapaar.monthlyCoins} Coins
                        </div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{plans.vyapaar.label}</div>
                    </div>
                    <div className="space-y-2 mb-8 flex-1">
                        {plans.vyapaar.features.map((f, i) => (
                            <FeatureItem key={i} text={f} color="orange" />
                        ))}
                    </div>
                    <button className="w-full py-3 bg-white dark:bg-slate-800 hover:bg-orange-500 hover:text-white border-2 border-orange-500 text-orange-500 font-black rounded-xl transition-all text-xs uppercase tracking-widest">
                        Start Vyapaar
                    </button>
                </div>

                {/* BUSINESS PLAN */}
                <div className="flex flex-col bg-navy-900 dark:bg-slate-950 border-2 border-vibrant-orange rounded-[2.5rem] p-6 shadow-2xl transition-all duration-500 relative transform lg:-translate-y-4">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-vibrant-orange text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-orange-900/20 whitespace-nowrap">
                        Most Popular
                    </div>
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                            {plans.business.name}
                        </span>
                    </div>
                    <div className="mb-4 text-white">
                        <div className="text-4xl font-black transition-all">
                            ₹{isYearly ? plans.business.yearlyPrice : plans.business.monthlyPrice}
                        </div>
                        <div className="text-slate-400 text-[10px] font-bold uppercase mt-2">
                            Per {isYearly ? 'Year' : 'Month'}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 mb-6 border border-white/10 relative overflow-hidden">
                        <div className="text-vibrant-orange font-bold text-xs mb-1 flex items-center gap-2">
                           <Coins className="w-3.5 h-3.5 fill-current" /> {isYearly ? plans.business.yearlyCoins : plans.business.monthlyCoins} Coins
                        </div>
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{plans.business.label}</div>
                        
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3 text-vibrant-green animate-spin-slow" />
                            <span className="text-[9px] font-black text-vibrant-green uppercase tracking-widest">
                                Rollover Enabled
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8 flex-1">
                        {plans.business.features.map((f, i) => (
                            <FeatureItem key={i} text={f} color="white" />
                        ))}
                    </div>
                    <button className="w-full py-4 bg-vibrant-orange hover:bg-orange-600 text-white font-black rounded-xl shadow-xl shadow-orange-900/20 transition-all text-xs uppercase tracking-widest transform active:scale-95">
                        Upgrade Now
                    </button>
                </div>

                {/* INDUSTRIAL PLAN */}
                <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
                    <div className="mb-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                            {plans.industrial.name}
                        </span>
                    </div>
                    <div className="mb-4">
                        <div className="text-4xl font-black text-navy-900 dark:text-white transition-all">
                            ₹{isYearly ? plans.industrial.yearlyPrice : plans.industrial.monthlyPrice}
                        </div>
                        <div className="text-slate-400 text-[10px] font-bold uppercase mt-2">
                            Per {isYearly ? 'Year' : 'Month'}
                        </div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3 mb-6 border border-emerald-100 dark:border-emerald-900/20">
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1 flex items-center gap-2">
                           <Factory className="w-3.5 h-3.5" /> {isYearly ? plans.industrial.yearlyCoins : plans.industrial.monthlyCoins} Coins
                        </div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{plans.industrial.label}</div>
                    </div>
                    <div className="space-y-2 mb-8 flex-1">
                        {plans.industrial.features.map((f, i) => (
                            <FeatureItem key={i} text={f} color="green" />
                        ))}
                    </div>
                    <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all text-xs uppercase tracking-widest">
                        Go Industrial
                    </button>
                </div>

            </div>

            {/* --- INDUSTRIAL PLAN DEEP-DIVE FEATURES SECTION --- */}
            <div className="max-w-6xl mx-auto mb-20 bg-slate-900 dark:bg-black rounded-[3rem] p-10 md:p-16 relative overflow-hidden border border-slate-800 shadow-2xl">
                 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                     <Cpu className="w-64 h-64 text-emerald-500 animate-pulse" />
                 </div>
                 <div className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                <ShieldCheck className="w-4 h-4" /> Enterprise Ready
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Heavy Industrial <br/> Automation & Sync
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10">
                                The ultimate plan for manufacturing units, large distributors, and multi-location businesses needing zero-latency data integrity across 30+ platforms.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <IndustrialHighlight icon={Globe} title="Multi-Location Sync" desc="Connect infinite warehouses & store fronts." />
                                <IndustrialHighlight icon={Database} title="Tally Prime Direct" desc="Zero-manual data entry for your accounts." />
                                <IndustrialHighlight icon={PhoneCall} title="Priority Voice Support" desc="Instant 1-on-1 Consulting Access." />
                                <IndustrialHighlight icon={Activity} title="15-Min Scans" desc="Real-time stock monitoring & auto-ordering." />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-vibrant-orange" /> Exclusive Features List
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Custom AI Agent Training for Your Niche",
                                    "☎️ Agent Voice Consulting: Priority Access",
                                    "Direct UPI & Net-banking Auto-Reconciliation",
                                    "Dedicated Solutions Architect (Personal Support)",
                                    "Advanced Audit Trails & Compliance Reports",
                                    "SSO & Directory Sync (Azure/Google)",
                                    "Custom Service Level Agreements (SLA)"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 p-4 rounded-2xl bg-vibrant-orange/10 border border-vibrant-orange/20">
                                <p className="text-xs text-vibrant-orange font-bold text-center">
                                    Trusted by 500+ Indian Manufacturing Factories & Warehouses
                                </p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            {/* --- COIN USAGE TRANSPARENCY SECTION --- */}
            <div className="max-w-6xl mx-auto mb-20 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-navy-900 dark:text-white mb-2">Coin Usage Transparency</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest text-center">Know exactly where your coins go.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Menu Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5"><History className="w-32 h-32"/></div>
                        <h4 className="text-xl font-black text-navy-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-2 h-8 bg-vibrant-orange rounded-full"></span>
                            Menu Card (Coin Cost)
                        </h4>
                        
                        <div className="space-y-5">
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <span className="text-navy-900 dark:text-white font-bold flex items-center gap-2">
                                        💬 Simple Chat
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Query Handling</span>
                                </div>
                                <span className="font-black text-vibrant-orange bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">1 Coin 🪙</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <span className="text-navy-900 dark:text-white font-bold flex items-center gap-2">
                                        📩 Send Message
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Invoice, Live Consulting</span>
                                </div>
                                <span className="font-black text-vibrant-orange bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">3 Coins 🪙</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col">
                                    <span className="text-navy-900 dark:text-white font-bold flex items-center gap-2">
                                        📑 Make (Auto)
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Multiple Tools, Invoice, PDF, Live Data</span>
                                </div>
                                <span className="font-black text-vibrant-orange bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">7 Coins 🪙</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-6 flex items-start gap-2 leading-relaxed font-bold uppercase tracking-widest">
                            <Sparkles className="w-4 h-4 text-vibrant-orange flex-shrink-0" />
                            *Inventory Alarm + MONITORING + Calculation + Sending + Dashboard Analyze, & Multi Levels Complex Task's.
                        </p>
                    </div>

                    {/* Low Balance Alert */}
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] p-10 border-2 border-dashed border-red-500 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform"><AlertTriangle className="w-40 h-40 text-red-500"/></div>
                        <div className="shrink-0 mb-6 relative">
                                <img src="https://i.ibb.co/k60hZRq6/image.png" alt="Genie Alert" className="w-32 h-auto drop-shadow-2xl animate-bounce-slow" />
                        </div>
                        <h4 className="text-2xl font-black text-red-600 dark:text-red-400 mb-4 uppercase tracking-tighter">
                            Low Balance Alert! 🚨
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-bold leading-relaxed mb-6 max-w-xs">
                            Your Genie Agent will automatically alert you when your balance drops below 50 coins.
                        </p>
                        <button className="px-8 py-3 bg-red-600 text-white font-black rounded-xl uppercase text-xs tracking-widest shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all">
                            Set Alert Threshold
                        </button>
                    </div>
                </div>
            </div>

            {/* Top-up Packs */}
            <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-[3rem] p-12 text-center relative overflow-hidden">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-black text-navy-900 dark:text-white mb-4">Running Low? Grab a Top-up!</h3>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest text-center">Add more coins instantly. Credits never expire for active plans.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TopupPack price="49" coins="20" title="Mini Pack" color="teal" />
                    <TopupPack price="199" coins="100" title="Standard" color="blue" isPopular />
                    <TopupPack price="899" coins="500" title="Jumbo Pack" color="orange" />
                </div>
            </div>
        </div>
        
        <style>{`
            .animate-bounce-slow {
                animation: bounce 3s infinite;
            }
            .animate-spin-slow {
                animation: spin 6s linear infinite;
            }
        `}</style>
    </div>
  );
};

// Enhanced FeatureItem to Highlight Voice Consulting and Support Icons
const FeatureItem: React.FC<{ text: string; color: string }> = ({ text, color = "orange" }) => {
    const isVoice = text.includes('☎️');
    const isDeactivated = text.includes('❌');
    
    const dotColor = 
        color === 'white' ? 'bg-vibrant-orange' : 
        color === 'green' ? 'bg-emerald-500' : 
        color === 'slate' ? 'bg-slate-400' :
        'bg-orange-500';
    
    // Custom logic for highlighted voice item
    const highlightClasses = isVoice 
        ? (color === 'white' 
            ? 'bg-white/10 border border-white/20 shadow-lg scale-[1.02]' 
            : 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 shadow-sm scale-[1.02]')
        : '';

    const textColor = isVoice
        ? (isDeactivated ? 'text-slate-400 opacity-70' : (color === 'white' ? 'text-white' : 'text-navy-900 dark:text-white'))
        : (color === 'white' ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400');

    return (
        <div className={`flex items-start gap-3 p-2 rounded-xl transition-all duration-300 ${highlightClasses}`}>
            {!isVoice && <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`}></div>}
            <span className={`text-[11px] font-bold ${textColor} leading-tight`}>{text}</span>
        </div>
    );
};

const IndustrialHighlight = ({ icon: Icon, title, desc }: any) => (
    <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <div className="text-white font-bold text-sm leading-none mb-1">{title}</div>
            <div className="text-slate-500 text-[10px] leading-tight font-medium uppercase">{desc}</div>
        </div>
    </div>
);

const TopupPack = ({ price, coins, title, color, isPopular = false }: any) => {
    return (
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 transition-all hover:scale-105 cursor-pointer ${isPopular ? 'border-vibrant-orange shadow-xl' : 'border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100 shadow-sm'}`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{title}</div>
            <div className="text-3xl font-black text-navy-900 dark:text-white mb-2">₹{price}</div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-4">
                <Coins className="w-3 h-3" /> {coins} Credits
            </div>
            <button className="w-full py-2.5 bg-navy-900 dark:bg-slate-800 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-navy-800 transition-colors">
                Buy Pack
            </button>
        </div>
    );
};

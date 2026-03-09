
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Database, 
  CheckCircle2, 
  Zap, 
  FileText, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight,
  FileSpreadsheet,
  Phone,
  Mic,
  BrainCircuit,
  Layout,
  IndianRupee,
  Play,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wand2,
  Loader2,
  RefreshCw,
  Search,
  Users,
  TrendingUp,
  Settings,
  PhoneCall,
  X
} from 'lucide-react';
import { analyzeSelectedAssets } from '../services/geminiService';
import { translations } from '../translations';

const LiveVoiceWaveform = () => (
  <div className="flex items-center gap-0.5 h-6">
    {[...Array(12)].map((_, i) => (
      <div 
        key={i} 
        className="w-1 bg-emerald-400 rounded-full animate-pulse" 
        style={{ 
          height: `${20 + Math.random() * 80}%`,
          animationDuration: `${0.5 + Math.random() * 1}s`,
          animationDelay: `${i * 0.05}s`
        }} 
      />
    ))}
  </div>
);

const workflows = [
  {
    id: 'tax_gst',
    label: 'Tax & GST Filing',
    subLabel: 'Compliance Automation',
    description: 'Auto-scan ledgers, identify mismatches, and prepare GSTR filings.',
    icon: FileText,
    badge: 'NEW: GST 2.0 READY',
    steps: [
      { id: 1, title: 'Voice Input', desc: 'User: "Prepare my GSTR-1 for March"', icon: Mic, isVoice: true },
      { id: 2, title: 'Data Fetch', desc: 'Connects to Tally/Vyapar API to fetch sales data', icon: Database },
      { id: 3, title: 'AI Audit', desc: 'Identifies missing GSTINs or HSN mismatches', icon: BrainCircuit },
      { id: 4, title: 'JSON Prep', desc: 'Generates GST-compliant JSON for portal upload', icon: FileSpreadsheet },
      { id: 5, title: 'Verification', desc: 'Owner gets summary for one-click approval', icon: CheckCircle2 }
    ]
  },
  {
    id: 'payment_recovery',
    label: 'Payment Tracking',
    subLabel: 'Dues Recovery Agent',
    description: 'Auto-detect overdue payments and send polite voice/text nudges.',
    icon: IndianRupee,
    badge: 'POPULAR',
    steps: [
      { id: 1, title: 'Voice Query', desc: 'User: "Check who owes me more than 10k"', icon: Mic, isVoice: true },
      { id: 2, title: 'Scanner', desc: 'Agent scans accounts for overdue > 30 days', icon: Search },
      { id: 3, title: 'Auto-Msg', desc: 'Sends WhatsApp with UPI Link & Invoice', icon: MessageSquare },
      { id: 4, title: 'Voice Nudge', desc: 'Triggers AI Voice call for High-Value dues', icon: Phone },
      { id: 5, title: 'Ledger Update', desc: 'Marks as paid once bank sync confirms credit', icon: Database }
    ]
  },
  {
    id: 'stock_management',
    label: 'Stockout Prevention',
    subLabel: 'Smart Inventory',
    description: 'Predictive inventory tracking to eliminate stock-outs.',
    icon: ShoppingBag,
    steps: [
      { id: 1, title: 'Voice Check', desc: 'User: "What items are running low?"', icon: Mic, isVoice: true },
      { id: 2, title: 'Forecast', desc: 'AI predicts stock exhaustion based on sales trend', icon: BrainCircuit },
      { id: 3, title: 'Vendor Order', desc: 'Drafts PO for top 5 fast-moving items', icon: FileText },
      { id: 4, title: 'Negotiate', desc: 'Scans IndiaMART for better vendor pricing', icon: Database },
      { id: 5, title: 'Approval', desc: 'Owner confirms PO via WhatsApp tap', icon: Zap }
    ]
  },
  {
    id: 'sales_marketing',
    label: 'Sales Campaigns',
    subLabel: '10x Outreach',
    description: 'Voice-to-Campaign: Create and run marketing in seconds.',
    icon: Zap,
    steps: [
      { id: 1, title: 'Voice Goal', desc: 'User: "Run a 20% off campaign for Diwali"', icon: Mic, isVoice: true },
      { id: 2, title: 'Creative Gen', desc: 'Auto-generates Canva graphics & copy', icon: Layout },
      { id: 3, title: 'Targeting', desc: 'Filters active customers in CRM list', icon: Users },
      { id: 4, title: 'Dispatch', desc: 'Blasts WhatsApp & Email sequences', icon: MessageSquare },
      { id: 5, title: 'ROI Tracker', desc: 'Live dashboard showing converted sales', icon: TrendingUp }
    ]
  }
];

const INDUSTRIES: Record<string, string[]> = {
  "Retail & E-commerce": ["Grocery / Kirana", "Fashion & Apparel", "Electronics", "Pharmacy"],
  "Manufacturing": ["Textile", "Auto Parts", "Chemicals", "Food Processing"],
  "Services": ["Legal", "Consulting", "Real Estate", "Education"],
  "Logistics": ["Fleet Management", "Warehouse", "Last Mile Delivery", "Cold Chain"],
  "Healthcare": ["Clinic Management", "Pharmacy Chain", "Diagnostic Lab", "Hospital Ops"]
};

function SearchIcon(props: any) { return <Database {...props} /> }
function UsersIcon(props: any) { return <BrainCircuit {...props} /> }
function TrendingUpIcon(props: any) { return <Zap {...props} /> }

interface AgenticWorkflowsSectionProps {
    language?: 'English' | 'Hindi' | 'Bengali';
    externalNicheSelection?: { industry: string, segments: string[] } | null;
    onAnalysisClear?: () => void;
    onLaunch?: (workflowId?: string) => void;
    onFeatureSelect?: (feature: string) => void;
}

export const AgenticWorkflowsSection: React.FC<AgenticWorkflowsSectionProps> = ({ 
    language = 'English', 
    externalNicheSelection,
    onAnalysisClear,
    onLaunch,
    onFeatureSelect
}) => {
  const [activeTab, setActiveTab] = useState('custom'); 
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generationStep, setGenerationStep] = useState<string | null>(null);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [isProcessingPlan, setIsProcessingPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const t = translations[language].workflows;

  // Watch for external niche selection handoff
  useEffect(() => {
      if (externalNicheSelection) {
          setActiveTab('custom');
          setSelectedIndustry(externalNicheSelection.industry);
          setSelectedSegment(externalNicheSelection.segments.join(', '));
          
          // Auto-trigger analysis
          const runAutoGenerate = async () => {
              setIsAnalyzing(true);
              try {
                  const result = await analyzeSelectedAssets([
                      `Industry: ${externalNicheSelection.industry}`,
                      `Niche Segments: ${externalNicheSelection.segments.join(', ')}`
                  ], language);
                  setCustomAnalysis(result);
              } catch (e) {
                  setCustomAnalysis("Unable to generate analysis at this moment. Please try again.");
              } finally {
                  setIsAnalyzing(false);
              }
          };
          runAutoGenerate();
      }
  }, [externalNicheSelection, language]);

  const activeWorkflow = activeTab === 'custom' 
    ? {
        id: 'custom',
        label: t.custom_label,
        description: t.custom_desc,
        icon: Wand2,
        steps: customAnalysis ? [
            { id: 1, title: 'Context Input', desc: `${selectedSegment || 'Business'} Context`, icon: Mic, isVoice: true },
            { id: 2, title: 'AI Analysis', desc: 'Deep Niche Analysis of Pain Points', icon: BrainCircuit },
            { id: 3, title: 'Strategy', desc: 'Generates optimized workflow map', icon: Layout },
            { id: 4, title: 'Integration', desc: 'Connects relevant apps (ERP/CRM)', icon: Database },
            { id: 5, title: 'Execution', desc: 'Deploys autonomous agent', icon: Zap }
        ] : []
      }
    : workflows.find(w => w.id === activeTab) || workflows[0];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleGenerateCustom = async () => {
      if (!selectedIndustry || !selectedSegment) return;
      setIsAnalyzing(true);
      setCustomAnalysis(null);
      try {
          setGenerationStep("Fetching Validated Data (Name, Location, Apps)...");
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          setGenerationStep("Analyzing Business Type & Generating Plan...");
          const promptContext = [
              `User Name: Demo User`,
              `Location: Mumbai, India`,
              `Business Type: ${selectedIndustry} - ${selectedSegment}`,
              `Selected Apps: WhatsApp, Tally, Gmail`,
              `Generate a highly personalized Custom Agentic AI Automation integration plan based on this validated data.`
          ];
          const result = await analyzeSelectedAssets(promptContext, language);
          setCustomAnalysis(result);
      } catch (e) {
          setCustomAnalysis("Unable to generate analysis at this moment. Please try again.");
      } finally {
          setIsAnalyzing(false);
          setGenerationStep(null);
      }
  };

  const handleActionClick = (action: string) => {
      if (!selectedPlan) {
          setPendingAction(action);
          setShowBillingModal(true);
      } else {
          if (onFeatureSelect) {
              onFeatureSelect(action);
          } else {
              setActiveFeature(action);
          }
      }
  };

  const handlePlanSelect = (plan: string) => {
      setIsProcessingPlan(true);
      // Simulate enabling the feature
      setTimeout(() => {
          setSelectedPlan(plan);
          setIsProcessingPlan(false);
          setShowBillingModal(false);
          if (pendingAction) {
              if (onFeatureSelect) {
                  onFeatureSelect(pendingAction);
              } else {
                  setActiveFeature(pendingAction);
              }
              setPendingAction(null);
          }
      }, 1500);
  };

  const resetCustom = () => {
      setCustomAnalysis(null);
      setSelectedIndustry('');
      setSelectedSegment('');
      if (onAnalysisClear) onAnalysisClear();
  };

  return (
    <section className="py-24 bg-[#020617] border-t border-slate-800 relative overflow-hidden font-sans selection:bg-teal-500/30">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/5 rounded-full blur-[160px]"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-vibrant-orange/5 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <Sparkles className="w-4 h-4" />
                    <span>{t.badge}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
                    {t.headline}
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                    {t.desc}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-stretch">
                <div className="w-full lg:w-[400px] flex flex-col gap-3 md:gap-4">
                    <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 md:mb-2 flex items-center gap-2">
                        <ArrowRight className="w-3 h-3"/> Choose Your Pain Point
                    </div>

                    <button
                        onClick={() => setActiveTab('custom')}
                        className={`group relative p-4 md:p-6 rounded-2xl md:rounded-3xl text-left transition-all duration-500 border w-full overflow-hidden ${
                            activeTab === 'custom'
                            ? 'bg-[#0f172a] border-vibrant-orange shadow-[0_0_40px_rgba(249,115,22,0.15)] z-10' 
                            : 'bg-gradient-to-r from-[#0f172a] to-transparent border-slate-800/50 hover:border-vibrant-orange/50'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                activeTab === 'custom' ? 'bg-vibrant-orange text-white shadow-lg' : 'bg-slate-800 text-slate-500 group-hover:text-vibrant-orange'
                            }`}>
                                <Wand2 className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="px-2 py-1 md:px-2.5 md:py-1 rounded-lg text-[8px] md:text-[9px] font-bold uppercase tracking-wider bg-vibrant-orange/10 text-vibrant-orange border border-vibrant-orange/20">
                                AI Builder
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h3 className={`text-base md:text-lg font-bold mb-1 md:mb-1.5 transition-colors ${activeTab === 'custom' ? 'text-white' : 'text-slate-400'}`}>
                                {t.custom_label}
                            </h3>
                            <p className="text-[10px] md:text-xs text-slate-500 leading-snug font-medium">
                                {t.custom_desc}
                            </p>
                        </div>
                    </button>

                    {workflows.map((workflow) => {
                        const isActive = activeTab === workflow.id;
                        return (
                            <button
                                key={workflow.id}
                                onClick={() => setActiveTab(workflow.id)}
                                className={`group relative p-4 md:p-6 rounded-2xl md:rounded-3xl text-left transition-all duration-500 border w-full overflow-hidden ${
                                    isActive 
                                    ? 'bg-[#0f172a] border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)] z-10' 
                                    : 'bg-transparent border-slate-800/50 hover:bg-[#0f172a]/40 hover:border-slate-700'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 rotate-3' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                                    }`}>
                                        <workflow.icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    {workflow.badge && (
                                        <span className={`px-2 py-1 md:px-2.5 md:py-1 rounded-lg text-[8px] md:text-[9px] font-bold uppercase tracking-wider ${isActive ? 'bg-vibrant-orange text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
                                            {workflow.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="relative z-10">
                                    <h3 className={`text-base md:text-lg font-bold mb-1 md:mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                        {workflow.label}
                                    </h3>
                                    <p className={`text-[10px] md:text-xs leading-relaxed transition-colors ${isActive ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {workflow.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="flex-1 bg-[#0f172a]/30 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-slate-800/50 p-6 md:p-14 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[500px] md:min-h-[600px]">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.02)_50%,transparent_100%)] bg-[size:100%_4px] animate-[pulse_3s_infinite] pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 relative z-10 gap-4 sm:gap-0">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center shrink-0 ${activeTab === 'custom' ? 'bg-vibrant-orange/10 border-vibrant-orange/20 text-vibrant-orange' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                                {activeTab === 'custom' ? <Wand2 className="w-5 h-5 md:w-6 md:h-6" /> : <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg">{activeWorkflow.label}</h4>
                                <div className="flex items-center gap-2 mt-0.5 md:mt-0">
                                    <span className={`text-[8px] md:text-[10px] font-mono px-2 py-0.5 rounded border ${activeTab === 'custom' ? 'text-vibrant-orange bg-vibrant-orange/10 border-vibrant-orange/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'}`}>
                                        {activeTab === 'custom' ? 'AI BUILDER MODE' : 'LIVE-VOICE ENGINE ACTIVE'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:hidden md:flex flex-col items-start sm:items-end">
                            <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t.latency}</div>
                            <div className="text-lg md:text-xl font-mono font-bold text-white">0.02s <span className="text-emerald-500 text-xs md:text-sm ml-1">{t.fast}</span></div>
                        </div>
                    </div>

                    <div className="flex-1 relative z-10 py-6">
                        {activeTab === 'custom' && !customAnalysis && (
                            <div className="h-full flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="max-w-md mx-auto w-full space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Industry</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {Object.keys(INDUSTRIES).map(ind => (
                                                    <button key={ind} onClick={() => { setSelectedIndustry(ind); setSelectedSegment(''); }} className={`p-2.5 md:p-3 rounded-xl border text-left text-[10px] md:text-xs font-bold transition-all ${selectedIndustry === ind ? 'bg-white text-navy-900 border-white' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>{ind}</button>
                                                ))}
                                            </div>
                                        </div>
                                        {selectedIndustry && (
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Select Niche Segment</label>
                                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                    {INDUSTRIES[selectedIndustry].map(seg => (
                                                        <button key={seg} onClick={() => setSelectedSegment(seg)} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-[10px] md:text-xs font-bold transition-all ${selectedSegment === seg ? 'bg-vibrant-orange text-white border-vibrant-orange' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>{seg}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={handleGenerateCustom} disabled={!selectedIndustry || !selectedSegment || isAnalyzing} className="w-full py-3 md:py-4 bg-gradient-to-r from-vibrant-orange to-red-500 text-white font-bold rounded-xl md:rounded-2xl shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 transition-all transform hover:scale-[1.02] text-xs md:text-sm">
                                        {isAnalyzing ? <><Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> {generationStep}</> : <><Sparkles className="w-4 h-4 md:w-5 md:h-5" /> Generate Agent Workflow</>}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'custom' && customAnalysis && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-vibrant-orange/30">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-vibrant-orange/10 rounded-lg text-vibrant-orange mt-1"><BrainCircuit className="w-6 h-6" /></div>
                                        <div>
                                            <h5 className="text-white font-bold text-sm mb-2">Highly Personalized Integration Plan</h5>
                                            <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">{customAnalysis}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-slate-800">
                                        <h6 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Next Steps: Explore Features</h6>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <button onClick={() => handleActionClick('update_planning')} className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-vibrant-orange hover:bg-slate-800 transition-all group">
                                                <Settings className="w-6 h-6 text-slate-400 group-hover:text-vibrant-orange mb-2" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center">Update Planning</span>
                                            </button>
                                            <button onClick={() => handleActionClick('ask_consulting')} className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-emerald-500 hover:bg-slate-800 transition-all group">
                                                <PhoneCall className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 mb-2" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center">Ask in consulting</span>
                                            </button>
                                            <button onClick={() => handleActionClick('instant_generator')} className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group">
                                                <Zap className="w-6 h-6 text-slate-400 group-hover:text-blue-500 mb-2" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center">Instant Generator Workflow</span>
                                            </button>
                                        </div>
                                    </div>

                                    <button onClick={resetCustom} className="mt-6 text-xs font-bold text-slate-500 hover:text-white flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Reset Builder</button>
                                </div>
                            </div>
                        )}

                        {((activeTab !== 'custom') || (activeTab === 'custom' && customAnalysis)) && (
                            <div className={`w-full flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8 md:gap-0 transition-opacity duration-500 ${isAnimating ? 'opacity-20' : 'opacity-100'}`}>
                                <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[1px] bg-slate-800 z-0"></div>
                                {activeWorkflow.steps.map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-6 flex-1 group">
                                        <div className="relative">
                                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] border flex items-center justify-center transition-all duration-700 ${idx === 0 ? 'bg-emerald-500 border-emerald-400 text-navy-900 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-110 z-20' : 'bg-[#1e293b] border-slate-700 text-slate-400 group-hover:border-slate-500'}`}>
                                                {step.isVoice ? <LiveVoiceWaveform /> : <step.icon className="w-8 h-8" />}
                                            </div>
                                            {idx === 0 && <div className="absolute inset-0 rounded-[2rem] bg-emerald-500/20 animate-ping -z-10"></div>}
                                        </div>
                                        <div className="flex-1 text-left md:text-center md:px-2">
                                            <h5 className={`text-sm font-bold mb-1 transition-colors ${idx === 0 ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h5>
                                            <p className="text-[11px] text-slate-500 leading-snug font-medium max-w-[140px] md:mx-auto">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative z-10 animate-in slide-in-from-bottom-4 duration-700 shadow-inner">
                        <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)] shrink-0"><ShieldCheck className="w-5 h-5 md:w-8 md:h-8" /></div>
                            <div>
                                <div className="text-white font-bold text-sm md:text-base mb-0.5">{activeTab === 'custom' && !customAnalysis ? 'Ready to Build' : 'Workflow Optimized & Deployed'}</div>
                                <p className="text-slate-500 text-[10px] md:text-xs">{activeTab === 'custom' && !customAnalysis ? 'Select parameters to initialize AI.' : 'No manual intervention required.'}</p>
                            </div>
                        </div>
                        {((activeTab !== 'custom') || (activeTab === 'custom' && customAnalysis)) && (
                            <button 
                                onClick={() => onLaunch && onLaunch(activeTab)}
                                className="w-full md:w-auto justify-center whitespace-nowrap px-6 md:px-8 py-3 md:py-3.5 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl md:rounded-2xl text-[10px] md:text-xs uppercase tracking-widest shadow-xl shadow-orange-900/20 transition-all flex items-center gap-2 group transform active:scale-95"
                            >
                                {t.launch_btn} <Play className="w-3 h-3 fill-current group-hover:translate-x-0.5 transition-transform"/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Billing Modal */}
        {showBillingModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                    <button onClick={() => setShowBillingModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
                    
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-black text-white mb-3">Select a Plan to Continue</h3>
                        <p className="text-slate-400 text-sm">Choose the STARTER (FREE) plan to enable options and explore features immediately.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {isProcessingPlan ? (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
                                <Loader2 className="w-12 h-12 text-vibrant-orange animate-spin" />
                                <p className="text-white font-bold animate-pulse">Enabling Features & Activating Plan...</p>
                            </div>
                        ) : (
                            <>
                                <div onClick={() => handlePlanSelect('starter')} className="cursor-pointer p-6 rounded-2xl border border-slate-700 hover:border-slate-400 bg-slate-800/50 hover:bg-slate-800 transition-all flex flex-col items-center text-center group">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">STARTER (FREE)</div>
                                    <div className="text-3xl font-black text-white mb-6">₹0</div>
                                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-700 text-white group-hover:bg-slate-600 transition-colors">Select Plan</button>
                                </div>
                                <div onClick={() => handlePlanSelect('vyapaar')} className="cursor-pointer p-6 rounded-2xl border border-slate-700 hover:border-vibrant-orange bg-slate-800/50 hover:bg-slate-800 transition-all flex flex-col items-center text-center group">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-vibrant-orange mb-2">VYAPAAR (PRO)</div>
                                    <div className="text-3xl font-black text-white mb-6">₹499</div>
                                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-700 text-white group-hover:bg-vibrant-orange transition-colors">Select Plan</button>
                                </div>
                                <div onClick={() => handlePlanSelect('business')} className="cursor-pointer p-6 rounded-2xl border border-slate-700 hover:border-blue-500 bg-slate-800/50 hover:bg-slate-800 transition-all flex flex-col items-center text-center group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase">Popular</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">BUSINESS</div>
                                    <div className="text-3xl font-black text-white mb-6">₹1999</div>
                                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-700 text-white group-hover:bg-blue-500 transition-colors">Select Plan</button>
                                </div>
                                <div onClick={() => handlePlanSelect('industrial')} className="cursor-pointer p-6 rounded-2xl border border-slate-700 hover:border-emerald-500 bg-slate-800/50 hover:bg-slate-800 transition-all flex flex-col items-center text-center group">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">INDUSTRIAL</div>
                                    <div className="text-3xl font-black text-white mb-6">₹4999</div>
                                    <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-700 text-white group-hover:bg-emerald-500 transition-colors">Select Plan</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}

    </section>
  );
};

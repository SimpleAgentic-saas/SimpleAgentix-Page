
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart2, 
  CreditCard, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Mic, 
  Paperclip, 
  Send, 
  Bot, 
  MoreHorizontal,
  ChevronRight, 
  Sparkles,
  Zap, 
  ArrowRight, 
  TrendingUp,
  Clock,
  DollarSign,
  Briefcase,
  Headphones,
  Users,
  FileText,
  Video,
  Globe,
  X,
  LayoutGrid, 
  Shield,
  LayoutTemplate,
  CheckCircle,
  Activity,
  ArrowLeft,
  PieChart as PieChartIcon,
  Download,
  AlertTriangle,
  Pencil,
  Play,
  Save,
  Trash2,
  Calendar,
  Layers,
  Grid,
  Bell,
  Command,
  HelpCircle,
  Wrench,
  PenTool,
  FileCheck,
  AlertOctagon,
  MousePointer2,
  Move
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { UserProfile, ChatMessage } from '../types';
import { chatWithBot, FINAL_CONSTITUTION_PROMPT } from '../services/geminiService';
import { translations } from '../translations';
import { BrandLogo } from './BrandLogo';
import { SettingsView } from './SettingsView';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

type View = 'chat' | 'overview' | 'analytics' | 'subscriptions' | 'billing' | 'compliance' | 'workflow_detail' | 'settings';
type AgentType = 'Sales' | 'Support' | 'HR' | 'Operations' | 'Tax/GST' | 'Marketing' | 'Help' | 'Data Analyst' | 'Meeting' | string;

const AGENT_CONFIGS: Record<string, { desc: string, templates: {title: string, desc: string, icon: any}[] }> = {
    'Sales': {
        desc: "Qualify leads, CRM updates, Automate invoice generation & Schedule follow-ups",
        templates: [
            { title: "Qualify New Leads", desc: "Scan website form submissions & score intent.", icon: Users },
            { title: "Auto Invoice Gen", desc: "Create PDF invoice for client Acme Corp.", icon: FileText },
            { title: "Follow-up Sequence", desc: "Send WhatsApp nudge to hot leads.", icon: MessageSquare }
        ]
    },
    'Support': {
        desc: "Ticket resolution, Refunds & Auto-Replies for customer queries.",
        templates: [
            { title: "Refund Request", desc: "Process refund for order #1023.", icon: CreditCard },
            { title: "Summarize Feedback", desc: "Analyze last 50 customer emails.", icon: BarChart2 },
            { title: "FAQ Auto-Reply", desc: "Draft response for shipping query.", icon: MessageSquare }
        ]
    },
    'Tax/GST': {
        desc: "Automate GST filing, Tax calculations, and Compliance checks.",
        templates: [
            { title: "GSTR-1 Filing", desc: "Prepare GSTR-1 data from sales ledger.", icon: FileText },
            { title: "Tax Liability", desc: "Calculate estimated tax for this quarter.", icon: DollarSign },
            { title: "Vendor Compliance", desc: "Check GST status of new vendors.", icon: Shield }
        ]
    },
    'HR': {
        desc: "Recruitment pipelines, Payroll automation, and Employee onboarding.",
        templates: [
            { title: "Screen Resumes", desc: "Filter last 50 applications for keywords.", icon: Users },
            { title: "Schedule Interviews", desc: "Coordinate times with candidates.", icon: Clock },
            { title: "Offer Letter", desc: "Generate offer for selected candidate.", icon: FileText }
        ]
    },
    'Operations': {
        desc: "Inventory management, Logistics coordination, and Supply chain optimization.",
        templates: [
            { title: "Stock Alert", desc: "Check low stock items in inventory.", icon: Activity },
            { title: "Shipment Tracking", desc: "Get status of pending deliveries.", icon: TruckIcon },
            { title: "Vendor Order", desc: "Draft purchase order for restock.", icon: ShoppingBagIcon }
        ]
    },
    'default': {
        desc: "Automate your daily workflows and connect your apps.",
        templates: [
            { title: "Daily Report", desc: "Summarize today's activities.", icon: FileText },
            { title: "Schedule Meeting", desc: "Find time for team sync.", icon: Clock },
            { title: "Data Entry", desc: "Extract data from PDF to Sheets.", icon: DatabaseIcon }
        ]
    }
};

const RECENT_LOGS = [
    { 
        id: '1',
        name: "Sync Shopify Orders to Zoho CRM", 
        status: "Success", 
        time: "2m ago", 
        agent: "Operations",
        trigger: "New Order (Shopify)",
        last_executed: "Oct 24, 2024, 10:45 AM",
        time_saved: "45",
        stats: {
            success_rate: 98.5,
            total_volume: "5,421",
            failed_count: 83,
            failed_rate: 1.5
        },
        apps: ["Shopify", "Zoho CRM", "Slack"],
        history: [
            { 
                id: "EXEC-001", 
                date: "Oct 24, 10:45 AM", 
                status: "Success", 
                input: JSON.stringify({ event: "order_created", data: { id: 1024, amount: 4500, currency: "INR", customer: "Rahul M." } }, null, 2), 
                error: null, 
                executionTime: "1.2s", 
                output: JSON.stringify({ crm_id: "LEAD-9982", status: "created", timestamp: "2024-10-24T10:45:01Z" }, null, 2)
            },
            { 
                id: "EXEC-002", 
                date: "Oct 24, 10:30 AM", 
                status: "Success", 
                input: JSON.stringify({ event: "order_created", data: { id: 1023, amount: 1200, currency: "INR", customer: "Priya S." } }, null, 2), 
                error: null, 
                executionTime: "0.9s", 
                output: JSON.stringify({ crm_id: "LEAD-9981", status: "created", timestamp: "2024-10-24T10:30:01Z" }, null, 2)
            },
            { 
                id: "EXEC-003", 
                date: "Oct 24, 10:15 AM", 
                status: "Failed", 
                input: JSON.stringify({ event: "order_created", data: { id: 1022, amount: 3400, currency: "INR", customer: "Amit K." } }, null, 2), 
                error: "API Timeout: Zoho CRM endpoint not reachable after 30s connection attempt.", 
                executionTime: "30.1s", 
                output: null 
            },
            { 
                id: "EXEC-004", 
                date: "Oct 24, 10:00 AM", 
                status: "Success", 
                input: JSON.stringify({ event: "order_created", data: { id: 1021, amount: 999, currency: "INR", customer: "Sneha R." } }, null, 2), 
                error: null, 
                executionTime: "1.1s", 
                output: JSON.stringify({ crm_id: "LEAD-9980", status: "created", timestamp: "2024-10-24T10:00:01Z" }, null, 2)
            },
        ]
    },
    { 
        id: '2',
        name: "Invoice Extraction #884", 
        status: "Success", 
        time: "15m ago", 
        agent: "Tax/GST",
        trigger: "New Email Attachment",
        last_executed: "Oct 24, 2024, 10:30 AM",
        time_saved: "12",
        stats: { success_rate: 100, total_volume: "120", failed_count: 0, failed_rate: 0 },
        apps: ["Gmail", "Vyapar", "Google Drive"],
        history: []
    },
    { 
        id: '3',
        name: "Lead Qualification - Acme", 
        status: "Success", 
        time: "1h ago", 
        agent: "Sales",
        trigger: "Form Submission",
        last_executed: "Oct 24, 2024, 09:15 AM",
        time_saved: "25",
        stats: { success_rate: 92, total_volume: "850", failed_count: 68, failed_rate: 8 },
        apps: ["Website", "Zoho CRM", "WhatsApp"],
        history: []
    }
];

const MOCK_PERFORMANCE_DATA = [
  { day: '1', success: 95, failed: 5 },
  { day: '5', success: 98, failed: 2 },
  { day: '10', success: 92, failed: 8 },
  { day: '15', success: 99, failed: 1 },
  { day: '20', success: 96, failed: 4 },
  { day: '25', success: 98, failed: 2 },
  { day: '30', success: 98.5, failed: 1.5 },
];

const INVOICES = [
    { id: "INV-2024-001", date: "Oct 24, 2024", amount: "₹999", status: "Paid" },
    { id: "INV-2024-002", date: "Sep 24, 2024", amount: "₹999", status: "Paid" },
    { id: "INV-2024-003", date: "Aug 24, 2024", amount: "₹999", status: "Paid" },
];

// Icons helper
function DatabaseIcon(props: any) { return <Layers {...props}/> }
function MailIcon(props: any) { return <FileText {...props}/> }
function TruckIcon(props: any) { return <Activity {...props}/> } 
function ShoppingBagIcon(props: any) { return <CreditCard {...props}/> }

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<View>('overview');
  const [sidebarMode, setSidebarMode] = useState<'agents' | 'dashboard'>('dashboard');
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'English' | 'Hindi' | 'Bengali'>('English');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [viewLogDetail, setViewLogDetail] = useState<any | null>(null);
  
  // Custom Agent State
  const [customAgents, setCustomAgents] = useState<string[]>([]);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');

  // Editor State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAppsLibrary, setShowAppsLibrary] = useState(false);
  const [showTemplatesLibrary, setShowTemplatesLibrary] = useState(false);
  const [showVideoLibrary, setShowVideoLibrary] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Toast State
  const [toast, setToast] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial State Setup
  useEffect(() => {
    if (user.language && (user.language === 'English' || user.language === 'Hindi' || user.language === 'Bengali')) {
        setCurrentLanguage(user.language as any);
    }
  }, [user.language]);

  // Derived Translations
  const t = translations[currentLanguage].dashboard;

  const showToast = (msg: string) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
  };

  const handleLanguageChange = (lang: 'English' | 'Hindi' | 'Bengali') => {
      setCurrentLanguage(lang);
      setIsLangMenuOpen(false);
      showToast(`Language changed successfully to ${lang}.`);
  };

  const handleAgentSelect = (agent: AgentType) => {
    if (activeAgent !== agent) {
        setMessages([]); 
        setActiveAgent(agent);
    }
    setActiveView('chat');
  };

  const handleCreateAgent = (e: React.FormEvent) => {
      e.preventDefault();
      if (newAgentName.trim()) {
          setCustomAgents([...customAgents, newAgentName.trim()]);
          setNewAgentName('');
          setIsCreatingAgent(false);
          handleAgentSelect(newAgentName.trim());
      }
  };

  const switchToDashboard = () => {
      setSidebarMode('dashboard');
      setActiveView('overview');
      setActiveAgent(null);
  };

  const switchToChat = () => {
      setSidebarMode('agents');
      if (!activeAgent) handleAgentSelect('Sales');
      else setActiveView('chat');
  };

  const handleWorkflowLogClick = (log: any) => {
      setSelectedWorkflow(log);
      setActiveView('workflow_detail');
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowAppsLibrary(false); 
    setShowTemplatesLibrary(false);

    try {
        const historyForModel = messages
            .filter((msg) => msg.role !== 'model' || !msg.text.includes('Hello! I am your')) 
            .map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

        const responseText = await chatWithBot(
            historyForModel, 
            textToSend, 
            'gemini-3-pro-preview', 
            currentLanguage,
            FINAL_CONSTITUTION_PROMPT
        );

        setMessages(prev => [...prev, {
            role: 'model',
            text: responseText,
            timestamp: Date.now()
        }]);
    } catch (error) {
        setMessages(prev => [...prev, {
            role: 'model',
            text: currentLanguage === 'Hindi' ? "कनेक्शन बाधित। कृपया पुनः प्रयास करें।" : currentLanguage === 'Bengali' ? "কানেকশন বিচ্ছিন্ন হয়েছে। আবার চেষ্টা করুন।" : "Connection interrupted. Please try again.",
            timestamp: Date.now()
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isLoading) return;
    setIsRecording(!isRecording);
    
    if (!isRecording) {
        setTimeout(() => {
            setIsRecording(false);
            const voicePrompts = [
                "I need to automate my GST filing for this month.",
                "Recover pending payments from customers overdue by 5 days.",
                "Create a new marketing campaign for Diwali using Canva."
            ];
            const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
            handleSendMessage(randomPrompt);
        }, 3000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const activeConfig = (activeAgent && AGENT_CONFIGS[activeAgent]) ? AGENT_CONFIGS[activeAgent] : AGENT_CONFIGS['default'];
  const translatedAgentName = activeAgent ? (t.agent_names[activeAgent] || activeAgent) : '';

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-vibrant-orange/30">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-[#0f172a] flex flex-col border-r border-slate-800 shrink-0 z-20">
         <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800/50">
            <div className="p-1.5 bg-vibrant-green rounded-lg">
                <Bot className="w-5 h-5 text-navy-900" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">SimpleAgentix</span>
         </div>

         <div className="px-4 py-6 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder={t.find_agent}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-vibrant-green transition-all"
                />
            </div>
            
            {!isCreatingAgent ? (
                <button 
                    onClick={() => setIsCreatingAgent(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#1e293b] hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-all group shadow-sm"
                >
                    <Plus className="w-4 h-4 text-vibrant-green" /> {t.create_agent}
                </button>
            ) : (
                <form onSubmit={handleCreateAgent} className="space-y-2 animate-in fade-in zoom-in duration-200">
                    <input 
                        autoFocus
                        type="text" 
                        value={newAgentName}
                        onChange={e => setNewAgentName(e.target.value)}
                        placeholder="Agent Name (e.g. Legal)"
                        className="w-full bg-[#1e293b] border border-vibrant-orange rounded-xl py-2 px-3 text-sm text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-1.5 bg-vibrant-orange text-white text-xs font-bold rounded-lg">Add</button>
                        <button type="button" onClick={() => setIsCreatingAgent(false)} className="flex-1 py-1.5 bg-slate-700 text-slate-300 text-xs font-bold rounded-lg">Cancel</button>
                    </div>
                </form>
            )}
         </div>

         {sidebarMode === 'agents' ? (
            <div className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-hide pb-4">
                <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.smart_agents}</div>
                
                {[
                    { type: 'Sales', icon: TrendingUp, color: 'text-green-400' },
                    { type: 'Support', icon: Headphones, color: 'text-blue-400' },
                    { type: 'HR', icon: Users, color: 'text-purple-400' },
                    { type: 'Operations', icon: Briefcase, color: 'text-orange-400' },
                    { type: 'Tax/GST', icon: DollarSign, color: 'text-yellow-400' },
                    { type: 'Data Analyst', icon: BarChart2, color: 'text-teal-400' },
                    { type: 'Meeting', icon: Clock, color: 'text-pink-400' },
                    { type: 'Marketing', icon: Video, color: 'text-rose-400' },
                    { type: 'Help', icon: HelpCircle, color: 'text-slate-400' },
                    ...customAgents.map(name => ({ type: name, icon: Bot, color: 'text-white' }))
                ].map((agent) => (
                    <button
                        key={agent.type}
                        onClick={() => handleAgentSelect(agent.type as AgentType)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                            activeAgent === agent.type
                            ? 'bg-[#1e293b] text-white shadow-lg border border-slate-700/50' 
                            : 'text-slate-400 hover:bg-[#1e293b]/50 hover:text-slate-200'
                        }`}
                    >
                        <div className={`p-2 rounded-lg bg-slate-900/50 border border-slate-800 ${activeAgent === agent.type ? 'border-slate-600' : ''}`}>
                            <agent.icon className={`w-4 h-4 ${agent.color}`} />
                        </div>
                        <span className="text-sm font-medium text-left truncate">{(t.agent_names[agent.type] || agent.type)} {t.agent}</span>
                        {activeAgent === agent.type && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-vibrant-green shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>}
                    </button>
                ))}
            </div>
         ) : (
            <div className="p-4 space-y-1">
                <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.dashboard_menu}</div>
                <MenuButton active={activeView === 'overview'} onClick={() => setActiveView('overview')} icon={Grid} label={t.overview} />
                <MenuButton active={activeView === 'analytics'} onClick={() => setActiveView('analytics')} icon={BarChart2} label={t.deep_analytics} />
                <MenuButton active={activeView === 'subscriptions'} onClick={() => setActiveView('subscriptions')} icon={CreditCard} label={t.subscriptions} />
                <MenuButton active={activeView === 'billing'} onClick={() => setActiveView('billing')} icon={DollarSign} label={t.billing} />
                <MenuButton active={activeView === 'compliance'} onClick={() => setActiveView('compliance')} icon={Shield} label={t.compliance} />
                <MenuButton active={activeView === 'settings'} onClick={() => setActiveView('settings')} icon={Settings} label="Global Settings" />
            </div>
         )}

         <div className="p-4 border-t border-slate-800 mt-auto bg-[#0f172a]">
            {sidebarMode === 'agents' ? (
                <button 
                    onClick={switchToDashboard}
                    className="w-full py-3 bg-vibrant-green hover:bg-emerald-500 text-navy-900 font-bold rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 text-sm transition-all"
                >
                    <LayoutDashboard className="w-4 h-4" /> {t.my_dashboard}
                </button>
            ) : (
                <button 
                    onClick={switchToChat}
                    className="w-full py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.back_agents}
                </button>
            )}
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0B1120]">
         
         <header className="h-20 flex items-center justify-between px-8 shrink-0 z-30 border-b border-slate-800/50 bg-[#0B1120]/80 backdrop-blur-sm">
             <div className="flex items-center gap-4">
                 {activeView === 'chat' && activeAgent ? (
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#1e293b] rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                            <Bot className="w-5 h-5 text-vibrant-green" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white leading-none mb-1">{translatedAgentName} {t.agent}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-500 bg-[#1e293b] px-1.5 py-0.5 rounded border border-slate-800">AI-2.5</span>
                                <button 
                                    onClick={() => setShowVideoLibrary(true)}
                                    className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                >
                                    <Play className="w-2 h-2 fill-current"/> {t.video_tutorials}
                                </button>
                                <button className="p-1 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-500 transition-colors" title="Delete Workflow">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                     </div>
                 ) : (
                     <h2 className="text-2xl font-bold text-white tracking-tight">
                         {activeView === 'overview' && t.overview}
                         {activeView === 'analytics' && t.deep_analytics}
                         {activeView === 'subscriptions' && t.subscriptions}
                         {activeView === 'billing' && t.billing}
                         {activeView === 'compliance' && t.compliance}
                         {activeView === 'settings' && "Global Settings"}
                         {activeView === 'workflow_detail' && (
                             <span className="flex items-center gap-2 cursor-pointer hover:text-vibrant-orange" onClick={() => setActiveView('overview')}>
                                <ArrowLeft className="w-5 h-5"/> Workflow Performance
                             </span>
                         )}
                     </h2>
                 )}
             </div>

             <div className="flex items-center gap-4">
                 <div className="relative">
                    <button 
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b] border border-slate-700 text-slate-300 text-xs font-bold hover:text-white transition-colors"
                    >
                        <Globe className="w-3 h-3" /> {currentLanguage === 'English' ? 'EN' : currentLanguage === 'Hindi' ? 'HI' : 'BN'}
                    </button>
                    {isLangMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-32 bg-[#1e293b] border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            {['English', 'Hindi', 'Bengali'].map(l => (
                                <button 
                                    key={l} 
                                    onClick={() => handleLanguageChange(l as any)}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-700 transition-colors ${currentLanguage === l ? 'text-vibrant-orange' : 'text-slate-300'}`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    )}
                 </div>
                 
                 <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500/30 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    {user.name.charAt(0)}
                 </div>
                 <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                     <LogOut className="w-5 h-5" />
                 </button>
             </div>
         </header>

         {toast && (
             <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-vibrant-green text-navy-900 font-bold shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-2">
                 <CheckCircle className="w-4 h-4" />
                 {toast}
             </div>
         )}

         <div className="flex-1 overflow-hidden relative">
            {activeView === 'chat' && (
                <div className="h-full flex flex-col relative">
                    <div className="flex-1 overflow-y-auto px-8 pb-32 pt-4 scrollbar-hide space-y-6">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center pb-20 animate-in fade-in zoom-in duration-500">
                                <div className="relative mb-8 group cursor-default">
                                     <div className="w-24 h-24 bg-[#0f172a] rounded-[2rem] flex items-center justify-center shadow-2xl border border-slate-800 relative z-10 group-hover:scale-105 transition-transform duration-500">
                                        <Bot className="w-10 h-10 text-vibrant-green" />
                                     </div>
                                     <div className="absolute inset-0 bg-vibrant-green/10 blur-3xl rounded-full"></div>
                                     <div className="absolute -top-2 -right-2 px-2.5 py-0.5 bg-green-500 text-navy-900 text-[10px] font-bold rounded-full z-20 shadow-lg border border-navy-900 tracking-wide uppercase">{t.online}</div>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">
                                    {t.hello} <span className="text-vibrant-green">{translatedAgentName} {t.agent}</span>
                                </h3>
                                <p className="text-slate-400 text-lg max-w-lg text-center leading-relaxed mb-12">
                                    {activeConfig.desc}
                                </p>
                                <div className="w-full max-w-4xl">
                                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest px-1">
                                        {t.quick_run} {t.template}S
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        {activeConfig.templates.slice(0, 3).map((template, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => handleSendMessage(template.desc)}
                                                className="flex items-center gap-4 bg-[#1e293b]/50 hover:bg-[#1e293b] border border-slate-800 hover:border-slate-600 p-5 rounded-2xl text-left transition-all group relative overflow-hidden"
                                            >
                                                <div className="p-3 bg-[#0f172a] rounded-xl border border-slate-700 text-slate-400 group-hover:text-vibrant-green group-hover:border-vibrant-green/30 transition-colors">
                                                    <template.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{t.template}</div>
                                                    <div className="font-bold text-white text-sm">{template.title}</div>
                                                </div>
                                                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Zap className="w-4 h-4 text-vibrant-orange" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                    <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl p-5 shadow-lg ${
                                        msg.role === 'user' 
                                        ? 'bg-vibrant-green text-navy-900 font-medium' 
                                        : 'bg-[#1e293b] border border-slate-700 text-slate-300'
                                    }`}>
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#1e293b] rounded-2xl p-4 border border-slate-700 flex gap-2 items-center">
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-6 pt-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent z-30">
                        <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-2xl p-2 border border-slate-700 shadow-2xl flex items-center gap-2 relative">
                             <button onClick={() => {setShowAppsLibrary(!showAppsLibrary); setShowTemplatesLibrary(false);}} className={`p-3 rounded-xl transition-all ${showAppsLibrary ? 'bg-vibrant-orange text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><LayoutGrid className="w-5 h-5" /></button>
                             <button onClick={() => {setShowTemplatesLibrary(!showTemplatesLibrary); setShowAppsLibrary(false);}} className={`p-3 rounded-xl transition-all ${showTemplatesLibrary ? 'bg-vibrant-orange text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><LayoutTemplate className="w-5 h-5" /></button>
                             <div className="h-8 w-px bg-slate-700 mx-1"></div>
                             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={isRecording ? t.listening : t.input_placeholder} className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-white placeholder:text-slate-500" />
                             <button onClick={handleMicClick} className={`relative p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500/20 text-red-500' : 'text-vibrant-orange bg-orange-500/10 hover:bg-orange-500/20'}`}>{isRecording && <span className="absolute inset-0 rounded-xl border border-red-500/50 animate-ping"></span>}<Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} /></button>
                             <button onClick={() => handleSendMessage()} disabled={!input.trim()} className="p-3 bg-vibrant-green hover:bg-emerald-500 text-navy-900 rounded-xl transition-all disabled:opacity-50"><Send className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'overview' && (
                <div className="p-8 h-full overflow-y-auto pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Workflows" value="198" sub="12 Running" icon={Zap} color="text-white" bg="bg-[#1e293b]" />
                        <StatCard title="Success Rate" value="79.3%" sub="+5% vs last week" icon={CheckCircle} color="text-vibrant-green" bg="bg-[#1e293b]" />
                        <StatCard title="Time Saved" value="226 hrs" sub="Automation" icon={Clock} color="text-blue-400" bg="bg-[#1e293b]" />
                        <StatCard title="Est. Cost Saved" value="₹1,13,217" sub="Calculated ROI" icon={DollarSign} color="text-yellow-400" bg="bg-[#1e293b]" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                         <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                             <div className="flex items-center justify-between mb-6">
                                 <h3 className="text-white font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-vibrant-orange" /> Recent Workflow Logs</h3>
                                 <button className="text-xs text-slate-400 hover:text-white">View All</button>
                             </div>
                             <div className="space-y-4">
                                 {RECENT_LOGS.map((log, i) => (
                                     <div key={i} onClick={() => handleWorkflowLogClick(log)} className="flex items-center justify-between p-3 rounded-xl bg-[#0f172a] border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors group">
                                         <div className="flex items-center gap-3">
                                             <div className={`w-2 h-2 rounded-full ${log.status === 'Success' ? 'bg-vibrant-green' : log.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                                             <div>
                                                 <div className="text-sm font-bold text-slate-200 group-hover:text-white">{log.name}</div>
                                                 <div className="text-[10px] text-slate-500">{t.agent_names[log.agent] || log.agent} {t.agent}</div>
                                             </div>
                                         </div>
                                         <div className="text-right">
                                             <div className="text-xs font-bold text-white">{log.status}</div>
                                             <div className="text-[10px] text-slate-500">{log.time}</div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                </div>
            )}

            {activeView === 'workflow_detail' && selectedWorkflow && (
                <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in zoom-in duration-300">
                    <button onClick={() => setActiveView('overview')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Overview</button>
                    
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                        <Zap className="w-5 h-5 text-vibrant-orange" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{selectedWorkflow.name}</h2>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Last Executed: {selectedWorkflow.last_executed}</span>
                                    <span className="flex items-center gap-1 text-vibrant-green"><TrendingUp className="w-3 h-3"/> Time Saved: {selectedWorkflow.time_saved} mins</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-6 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-900/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                            >
                                <Pencil className="w-4 h-4" /> Edit Workflow
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <KPI_Card title="Sync Status" value={`${selectedWorkflow.stats?.success_rate || 98}% Success`} icon={CheckCircle} color="text-vibrant-green" bg="bg-green-500/10" border="border-green-500/20" />
                            <KPI_Card title="Total Volume" value={selectedWorkflow.stats?.total_volume || "N/A"} icon={Layers} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
                            <KPI_Card title="Error Rate" value={`Failed: ${selectedWorkflow.stats?.failed_rate || 0}% (${selectedWorkflow.stats?.failed_count || 0})`} icon={AlertTriangle} color="text-red-400" bg="bg-red-500/10" border="border-red-500/20" />
                        </div>
                        <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-vibrant-orange" /> Daily Performance (Last 30 Days)</h3>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_PERFORMANCE_DATA}>
                                        <defs>
                                            <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} itemStyle={{ fontSize: '12px' }} />
                                        <Area type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSuccess)" />
                                        <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'subscriptions' && (
                <div className="p-8 h-full overflow-y-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">Subscriptions & Usage</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5"><Zap className="w-32 h-32 text-vibrant-orange"/></div>
                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 bg-vibrant-orange/20 text-vibrant-orange rounded-full text-xs font-bold uppercase tracking-wider mb-4">Current Plan</div>
                                <h3 className="text-4xl font-extrabold text-white mb-2">PRO PLAN</h3>
                                <div className="text-slate-400 text-sm mb-8">Next Billing Date: <span className="text-white font-bold">Nov 24, 2024</span></div>
                                <button className="w-full py-4 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20">Upgrade / Change Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'billing' && (
                <div className="p-8 h-full overflow-y-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">Billing & Invoices</h2>
                    <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-700">
                            <h3 className="text-white font-bold">Invoice History</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#0f172a] text-slate-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Invoice ID</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-sm">
                                {INVOICES.map((inv, i) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 text-white font-mono">{inv.id}</td>
                                        <td className="px-6 py-4 text-slate-300">{inv.date}</td>
                                        <td className="px-6 py-4 text-white font-bold">{inv.amount}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase">{inv.status}</span></td>
                                        <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"><Download className="w-4 h-4" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'compliance' && (
                <div className="p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Compliance Calendar</h2>
                    </div>
                    <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Upcoming Deadlines</h3>
                    </div>
                </div>
            )}

            {activeView === 'settings' && (
                <SettingsView 
                    user={user} 
                    onSave={(updates) => {
                        showToast("Settings updated successfully");
                    }} 
                />
            )}
         </div>
      </main>
    </div>
  );
};

const MenuButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-[#1e293b] text-white font-bold border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-[#1e293b]/50'}`}>
        <Icon className={`w-4 h-4 ${active ? 'text-vibrant-orange' : 'text-slate-500'}`} />
        <span className="text-sm">{label}</span>
    </button>
);

const StatCard = ({ title, value, sub, icon: Icon, color, bg }: any) => (
    <div className={`${bg} p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all`}>
        <div className={`absolute top-0 right-0 p-4 opacity-10 ${color} group-hover:scale-110 transition-transform duration-500`}><Icon className="w-16 h-16" /></div>
        <div className="relative z-10">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{title}</div>
            <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
            <div className="text-[10px] font-medium text-slate-400">{sub}</div>
        </div>
    </div>
);

const KPI_Card = ({ title, value, icon: Icon, color, bg, border }: any) => (
    <div className={`${bg} p-6 rounded-2xl border ${border} flex items-center justify-between`}>
        <div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
        </div>
        <div className={`p-3 rounded-xl bg-[#0f172a] ${color} border border-slate-700`}><Icon className="w-6 h-6" /></div>
    </div>
);

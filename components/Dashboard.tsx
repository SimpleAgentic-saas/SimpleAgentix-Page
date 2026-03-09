
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
  User,
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
  Move,
  Key,
  Menu,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { UserProfile, ChatMessage } from '../types';
import { chatWithBot, FINAL_CONSTITUTION_PROMPT } from '../services/geminiService';
import { translations } from '../translations';
import { BrandLogo } from './BrandLogo';
import { UserProfileDashboard } from './UserProfileDashboard';

interface WorkflowData {
    trigger: string;
    apps: string[];
    inputs: string;
    steps: string[];
    logic: string;
    actions: string;
    notifications: string;
    schedule: string;
    result: string;
}

const WorkflowVisualizer: React.FC<{ data: WorkflowData }> = ({ data }) => {
    return (
        <div className="w-full bg-[#0f172a] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="bg-gradient-to-r from-vibrant-orange/20 to-vibrant-green/20 p-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-vibrant-orange animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">Agentic Workflow Overview</span>
                </div>
                <div className="px-2 py-0.5 bg-vibrant-green/20 border border-vibrant-green/30 rounded text-[10px] font-bold text-vibrant-green uppercase">End-to-End Executed</div>
            </div>
            
            <div className="p-6 space-y-6">
                {/* Visual Flow */}
                <div className="relative flex flex-col items-center space-y-8">
                    {/* Trigger */}
                    <div className="relative z-10 w-full max-w-md p-4 bg-[#1e293b] border border-vibrant-orange/50 rounded-xl shadow-lg text-center group hover:border-vibrant-orange transition-colors">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-vibrant-orange text-white text-[10px] font-black rounded-full uppercase">Trigger</div>
                        <p className="text-sm font-bold text-white">{data.trigger}</p>
                    </div>

                    <div className="w-0.5 h-8 bg-gradient-to-b from-vibrant-orange to-vibrant-green"></div>

                    {/* Processing */}
                    <div className="relative z-10 w-full p-5 bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-black rounded-full uppercase">AI Processing & Logic</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Processing Steps
                                </div>
                                <ul className="space-y-2">
                                    {data.steps.map((step, i) => (
                                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                            <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500 shrink-0 mt-0.5">{i+1}</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                        <Shield className="w-3 h-3" /> Business Logic
                                    </div>
                                    <div className="p-3 bg-[#0f172a] rounded-lg border border-slate-800 text-xs text-slate-400 italic">
                                        {data.logic}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                                        <LayoutGrid className="w-3 h-3" /> Apps Detected
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.apps.map((app, i) => (
                                            <span key={i} className="px-2 py-1 bg-vibrant-green/10 border border-vibrant-green/20 rounded text-[10px] font-bold text-vibrant-green">{app}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-0.5 h-8 bg-gradient-to-b from-vibrant-green to-vibrant-orange"></div>

                    {/* Output Actions */}
                    <div className="relative z-10 w-full max-w-md p-4 bg-[#1e293b] border border-vibrant-green/50 rounded-xl shadow-lg text-center group hover:border-vibrant-green transition-colors">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-vibrant-green text-navy-900 text-[10px] font-black rounded-full uppercase">Output Actions</div>
                        <p className="text-sm font-bold text-white mb-2">{data.actions}</p>
                        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1"><Bell className="w-3 h-3" /> {data.notifications}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {data.schedule}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-vibrant-green/5 border border-vibrant-green/10 rounded-xl">
                    <div className="text-[10px] font-bold text-vibrant-green uppercase tracking-widest mb-1">Result for User</div>
                    <p className="text-sm text-slate-300 leading-relaxed">{data.result}</p>
                </div>
            </div>
            
            <div className="bg-[#0f172a] p-4 border-t border-slate-800 flex justify-between items-center">
                <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors">
                    <Download className="w-3 h-3" /> Export Workflow PDF
                </button>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold rounded-lg transition-all">Edit Flow</button>
                    <button 
                        onClick={() => {
                            const anyWindow = window as any;
                            if (anyWindow.showToast) anyWindow.showToast("Workflow Execution Started...");
                            // Simulate execution
                            setTimeout(() => {
                                if (anyWindow.showToast) anyWindow.showToast("Workflow Successfully Deployed & Running!");
                            }, 2000);
                        }}
                        className="px-3 py-1.5 bg-vibrant-orange text-white text-[10px] font-bold rounded-lg transition-all shadow-lg shadow-orange-900/20"
                    >
                        Run Now
                    </button>
                </div>
            </div>
        </div>
    );
};

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onViewLanding?: (section?: string) => void;
  initialWorkflow?: string | null;
  initialNiche?: { industry: string, segments: string[] } | null;
  initialFeature?: string | null;
  onHandoffComplete?: () => void;
}

type View = 'chat' | 'overview' | 'analytics' | 'subscriptions' | 'billing' | 'compliance' | 'workflow_detail' | 'settings' | 'update_planning' | 'ask_consulting' | 'instant_generator';
type AgentType = 'Sales' | 'Support' | 'HR' | 'Operations' | 'Tax/GST' | 'Data Analyst' | 'Meeting' | 'Marketing' | 'Live Calling' | string;

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
            { title: "Shipment Tracking", desc: "Get status of pending deliveries.", icon: Activity },
            { title: "Vendor Order", desc: "Draft purchase order for restock.", icon: CreditCard }
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
    'Data Analyst': {
        desc: "Deep data mining, trend analysis, and automated business reporting.",
        templates: [
            { title: "Revenue Trend", desc: "Analyze sales growth over the last 6 months.", icon: TrendingUp },
            { title: "Customer Churn", desc: "Identify users at risk of leaving.", icon: AlertTriangle },
            { title: "Market Analysis", desc: "Compare pricing with top competitors.", icon: Globe }
        ]
    },
    'Meeting': {
        desc: "AI-driven scheduling, meeting summaries, and action item tracking.",
        templates: [
            { title: "Schedule Sync", desc: "Find a slot for the weekly team meeting.", icon: Calendar },
            { title: "Meeting Recap", desc: "Summarize the transcript of the last Zoom call.", icon: FileText },
            { title: "Action Items", desc: "Extract tasks from meeting notes.", icon: CheckCircle }
        ]
    },
    'Marketing': {
        desc: "Social media automation, ad campaign management, and content generation.",
        templates: [
            { title: "Ad Campaign", desc: "Draft copy for a new Facebook ad.", icon: Video },
            { title: "Post Scheduler", desc: "Plan Instagram posts for next week.", icon: Clock },
            { title: "SEO Audit", desc: "Analyze top keywords for the landing page.", icon: Search }
        ]
    },
    'Live Calling': {
        desc: "Automated voice calls, lead qualification over phone, and customer follow-ups.",
        templates: [
            { title: "Qualify Lead", desc: "Initiate a qualification call for new leads.", icon: Mic },
            { title: "Payment Reminder", desc: "Call clients with pending invoices.", icon: DollarSign },
            { title: "Feedback Call", desc: "Collect verbal feedback from recent customers.", icon: MessageSquare }
        ]
    },
    'default': {
        desc: "Automate your daily workflows and connect your apps.",
        templates: [
            { title: "Daily Report", desc: "Summarize today's activities.", icon: FileText },
            { title: "Schedule Meeting", desc: "Find time for team sync.", icon: Clock },
            { title: "Data Entry", desc: "Extract data from PDF to Sheets.", icon: Layers }
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

const MOCK_ROI_DATA = [
    { month: 'Jan', savings: 45000, cost: 12000 },
    { month: 'Feb', savings: 52000, cost: 12000 },
    { month: 'Mar', savings: 48000, cost: 12000 },
    { month: 'Apr', savings: 61000, cost: 15000 },
    { month: 'May', savings: 59000, cost: 15000 },
    { month: 'Jun', savings: 72000, cost: 15000 },
];

const MOCK_WORKFLOW_STATS = [
    { name: 'GST Filing', volume: 450, efficiency: 94 },
    { name: 'Invoice Gen', volume: 1200, efficiency: 99 },
    { name: 'Lead Qual', volume: 850, efficiency: 88 },
    { name: 'Stock Alert', volume: 320, efficiency: 96 },
];

const SWOT_DATA = {
    strengths: ["High automation accuracy (98%)", "Low latency responses", "Multi-language support"],
    weaknesses: ["Dependency on third-party APIs", "Initial setup time for complex flows"],
    opportunities: ["Expansion to mobile-first markets", "Integration with more local ERPs"],
    threats: ["Changing regulatory compliance", "Competitor AI advancements"]
};

const INVOICES = [
    { id: "INV-2026-001", date: "Feb 24, 2026", amount: "₹1,999", status: "Paid", plan: "Pro" },
    { id: "INV-2026-002", date: "Jan 24, 2026", amount: "₹1,999", status: "Paid", plan: "Pro" },
    { id: "INV-2025-012", date: "Dec 24, 2025", amount: "₹499", status: "Paid", plan: "Starter" },
];

const SUBSCRIPTION_PLANS = [
    { name: "Free", price: "₹0", features: ["100 Coins/mo", "Basic Agents", "Community Support"], color: "text-slate-400" },
    { name: "Starter", price: "₹499", features: ["1,000 Coins/mo", "Priority Agents", "Email Support"], color: "text-blue-400" },
    { name: "Pro", price: "₹1,999", features: ["5,000 Coins/mo", "Custom Workflows", "24/7 Support"], color: "text-vibrant-orange" },
    { name: "Enterprise", price: "₹4,999", features: ["Unlimited Coins", "Dedicated Sarathi", "On-premise Option"], color: "text-vibrant-green" },
];

// Icons helper
function DatabaseIcon(props: any) { return <Layers {...props}/> }
function MailIcon(props: any) { return <FileText {...props}/> }
function TruckIcon(props: any) { return <Activity {...props}/> } 
function ShoppingBagIcon(props: any) { return <CreditCard {...props}/> }

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onViewLanding, initialWorkflow, initialNiche, initialFeature, onHandoffComplete }) => {
  const [activeView, setActiveView] = useState<View>((initialFeature as View) || 'chat');
  const [sidebarMode, setSidebarMode] = useState<'agents' | 'dashboard'>('agents');
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'English' | 'Hindi' | 'Bengali'>('English');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [viewLogDetail, setViewLogDetail] = useState<any | null>(null);
  
  // Custom Agent State - DEPRECATED
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Toast State
  const [toast, setToast] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialFeature) {
      setActiveView(initialFeature as View);
    }
  }, [initialFeature]);

  // Initial State Setup
  useEffect(() => {
    if (user.language && (user.language === 'English' || user.language === 'Hindi' || user.language === 'Bengali')) {
        setCurrentLanguage(user.language as any);
    }
    
    // Handle initial workflow mapping
    if (initialWorkflow) {
        const mapping: Record<string, AgentType> = {
            'tax_gst': 'Tax/GST',
            'payment_recovery': 'Sales',
            'stock_management': 'Operations',
            'sales_marketing': 'Marketing',
            'custom': 'Sales'
        };
        setActiveAgent(mapping[initialWorkflow] || 'Sales');
    } else if (!activeAgent) {
        setActiveAgent('Sales');
    }
  }, [user.language, initialWorkflow]);

  // Launch Trigger
  useEffect(() => {
    const checkLaunch = async () => {
        if (!activeAgent) return;
        
        const launchKey = `simpleagentix_launched_${user.email}_${activeAgent}`;
        const alreadyLaunched = localStorage.getItem(launchKey);
        
        // If we have an initial workflow or niche handoff, we should ALWAYS trigger the launch sequence
        // even if the agent was previously launched, to provide the specific context requested.
        const isForcedLaunch = !!(initialWorkflow || initialNiche);

        if (activeView === 'chat' && (messages.length === 0 || isForcedLaunch) && !isLoading) {
            // If it's a forced launch and we already have messages, we should clear them for a clean state
            if (isForcedLaunch && messages.length > 0) {
                setMessages([]);
                // The effect will re-run when messages.length becomes 0
                return;
            }

            // If we have a niche handoff, trigger the consulting flow immediately
            if (initialNiche && activeAgent === 'Sales') {
                handleSendMessage(`VOICE_CONNECT_ACTIVATE: Start Deep Niche Analysis Consulting for Industry: ${initialNiche.industry}, Segments: ${initialNiche.segments.join(', ')}`);
                localStorage.setItem(launchKey, 'true');
                if (onHandoffComplete) onHandoffComplete();
                return;
            }

            if (alreadyLaunched && !isForcedLaunch) {
                // Show a standard welcome message if already launched
                setMessages([{
                    role: 'model',
                    text: currentLanguage === 'Hindi' 
                        ? `वापस स्वागत है! मैं आपका ${activeAgent} एजेंट हूँ। मैं आपकी कैसे सहायता कर सकता हूँ?` 
                        : currentLanguage === 'Bengali' 
                        ? `ফিরে আসার জন্য ধন্যবাদ! আমি আপনার ${activeAgent} এজেন্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?` 
                        : `Welcome back! I am your ${activeAgent} Agent. How can I help you today?`,
                    timestamp: Date.now()
                }]);
                return;
            }

            // Clear handoff data after we've decided to proceed with a full AI launch
            if (initialWorkflow && onHandoffComplete) {
                onHandoffComplete();
            }

            // Add a temporary "Initializing" message to the UI
            setMessages([{
                role: 'model',
                text: currentLanguage === 'Hindi' ? `${activeAgent} एजेंट इनिशियलाइज़ हो रहा है...` : currentLanguage === 'Bengali' ? `${activeAgent} এজেন্ট ইনিশিয়ালাইজ হচ্ছে...` : `${activeAgent} Agent Initializing...`,
                timestamp: Date.now()
            }]);
            
            // Use a more descriptive prompt for the AI
            const launchPrompt = isForcedLaunch && initialWorkflow
                ? `SYSTEM_LAUNCH_COMMAND: Please perform the INITIAL LAUNCH SEQUENCE for the ${activeAgent} Agent. Specifically, the user is interested in the "${initialWorkflow}" workflow. Output the 'System Launch Workflow' for ${activeAgent} immediately.`
                : `SYSTEM_LAUNCH_COMMAND: Please perform the INITIAL LAUNCH SEQUENCE for the ${activeAgent} Agent. Output the 'System Launch Workflow' for ${activeAgent} immediately.`;
            
            try {
                const responseText = await chatWithBot(
                    [], 
                    launchPrompt, 
                    'gemini-3-flash-preview', 
                    currentLanguage,
                    `${FINAL_CONSTITUTION_PROMPT}\n\nCURRENT ACTIVE AGENT: ${activeAgent}`
                );
                
                if (responseText.startsWith('QUOTA_EXHAUSTED_ERROR_FLAG:')) {
                    // Fallback welcome if quota is hit during launch
                    const fallbackMsg = currentLanguage === 'Bengali' 
                        ? `স্বাগতম! আমি আপনার ${activeAgent} এজেন্ট। বর্তমানে আমাদের এপিআই কোটা শেষ হয়ে গেছে, তবে আপনি ড্যাশবোর্ডটি ঘুরে দেখতে পারেন। পূর্ণ এআই ফিচারের জন্য আপনার নিজস্ব এপিআই কী সেট করুন।`
                        : currentLanguage === 'Hindi'
                        ? `स्वागत है! मैं आपका ${activeAgent} एजेंट हूँ। वर्तमान में हमारा एपीआई कोटा समाप्त हो गया है, लेकिन आप डैशबोर्ड देख सकते हैं। पूर्ण एआई क्षमताओं के लिए अपनी एपीआई कुंजी चुनें।`
                        : `Welcome! I am your ${activeAgent} Agent. Currently, our shared API quota is exhausted, but you can still explore the dashboard. To enable full AI capabilities, please select your own API key.`;

                    setMessages([
                        {
                            role: 'model',
                            text: fallbackMsg,
                            timestamp: Date.now()
                        },
                        {
                            role: 'model',
                            text: responseText,
                            timestamp: Date.now()
                        }
                    ]);
                } else {
                    // Replace the initializing message with the real one
                    setMessages([{
                        role: 'model',
                        text: responseText,
                        timestamp: Date.now()
                    }]);
                    
                    // Persist launch state for this specific agent only on successful AI response
                    localStorage.setItem(launchKey, 'true');
                }
            } catch (error) {
                console.error("Launch Error:", error);
                setMessages([{
                    role: 'model',
                    text: currentLanguage === 'Hindi' ? "लॉन्च विफल रहा।" : currentLanguage === 'Bengali' ? "লঞ্চ ব্যর্থ হয়েছে।" : "Launch failed.",
                    timestamp: Date.now()
                }]);
            }
        }
    };
    
    checkLaunch();
  }, [activeView, activeAgent, messages.length, isLoading, user.email, currentLanguage, initialWorkflow, initialNiche]);

  // Derived Translations
  const t = translations[currentLanguage].dashboard;

  const showToast = (msg: string) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    (window as any).showToast = showToast;
  }, []);

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
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
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
      setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const switchToChat = () => {
      setSidebarMode('agents');
      if (!activeAgent) handleAgentSelect('Sales');
      else setActiveView('chat');
      setIsSidebarOpen(false); // Close sidebar on mobile
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
        // Filter history and ensure it starts with a 'user' message
        let historyForModel = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        // Find the first user message index
        const firstUserIdx = historyForModel.findIndex(m => m.role === 'user');
        
        if (firstUserIdx === -1) {
            // If no user message exists in history, send an empty history
            historyForModel = [];
        } else {
            // Slice history to start from the first user message
            historyForModel = historyForModel.slice(firstUserIdx);
        }

        const responseText = await chatWithBot(
            historyForModel, 
            textToSend, 
            'gemini-3.1-pro-preview', 
            currentLanguage,
            `${FINAL_CONSTITUTION_PROMPT}\n\nCURRENT ACTIVE AGENT: ${activeAgent}`
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
        // Simulation of voice processing
        setTimeout(() => {
            setIsRecording(false);
            
            // If it's the first message, trigger the "Consulting" (Niche Analysis) flow
            if (messages.length <= 1) {
                handleSendMessage("VOICE_CONNECT_ACTIVATE: Start Deep Niche Analysis Consulting.");
            } else {
                const voicePrompts = [
                    "I need to automate my GST filing for this month.",
                    "Recover pending payments from customers overdue by 5 days.",
                    "Create a new marketing campaign for Diwali using Canva."
                ];
                const randomPrompt = voicePrompts[Math.floor(Math.random() * voicePrompts.length)];
                handleSendMessage(randomPrompt);
            }
        }, 2000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const activeConfig = (activeAgent && AGENT_CONFIGS[activeAgent]) ? AGENT_CONFIGS[activeAgent] : AGENT_CONFIGS['Sales'];
  const translatedAgentName = activeAgent ? (t.agent_names[activeAgent] || activeAgent) : '';

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-vibrant-orange/30 w-full">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] flex flex-col border-r border-slate-800 shrink-0 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
                <div className="p-1.5 bg-vibrant-green rounded-lg">
                    <Bot className="w-5 h-5 text-navy-900" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">SimpleAgentix</span>
            </div>
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
         </div>

         <div className="px-4 py-6 space-y-4">
            <div className="space-y-1 mb-6 border-b border-slate-800/50 pb-6">
                <MenuButton active={activeView === 'settings'} onClick={() => {setSidebarMode('dashboard'); setActiveView('settings');}} icon={User} label="Profile" />
                <MenuButton active={sidebarMode === 'agents' && activeView === 'chat'} onClick={switchToChat} icon={Bot} label="Smart Agent" />
                <MenuButton active={sidebarMode === 'dashboard' && activeView !== 'settings'} onClick={switchToDashboard} icon={LayoutDashboard} label="My Dashboard" />
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder={t.find_agent}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-vibrant-green transition-all"
                />
            </div>
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
                    { type: 'Live Calling', icon: Mic, color: 'text-vibrant-orange' }
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
            </div>
         )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0B1120] w-full">
         
         <header className="h-20 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30 border-b border-slate-800/50 bg-[#0B1120]/80 backdrop-blur-sm">
             <div className="flex items-center gap-3 lg:gap-4">
                 <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
                    <Menu className="w-6 h-6" />
                 </button>
                 {activeView === 'chat' && activeAgent ? (
                     <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#1e293b] rounded-xl flex items-center justify-center border border-slate-700 shadow-inner shrink-0">
                            <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-vibrant-green" />
                        </div>
                        <div>
                            <h2 className="text-base lg:text-lg font-bold text-white leading-none mb-1 truncate max-w-[150px] sm:max-w-[200px] lg:max-w-none">{translatedAgentName} {t.agent}</h2>
                            <div className="flex items-center gap-2">
                                <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-[#1e293b] px-1.5 py-0.5 rounded border border-slate-800">AI-2.5</span>
                                <button 
                                    onClick={() => setShowVideoLibrary(true)}
                                    className="hidden sm:flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                >
                                    <Play className="w-2 h-2 fill-current"/> {t.video_tutorials}
                                </button>
                                <button 
                                    onClick={() => {
                                        if (activeAgent) {
                                            const launchKey = `simpleagentix_launched_${user.email}_${activeAgent}`;
                                            localStorage.removeItem(launchKey);
                                            setMessages([]);
                                            showToast(`${activeAgent} Agent has been reset. Re-launching...`);
                                        }
                                    }}
                                    className="p-1 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-500 transition-colors hidden sm:block" 
                                    title="Reset Agent & Re-launch"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                     </div>
                 ) : (
                     <h2 className="text-lg lg:text-2xl font-bold text-white tracking-tight truncate">
                         {activeView === 'overview' && t.overview}
                         {activeView === 'analytics' && t.deep_analytics}
                         {activeView === 'subscriptions' && t.subscriptions}
                         {activeView === 'billing' && t.billing}
                         {activeView === 'compliance' && t.compliance}
                         {activeView === 'settings' && "Global Settings"}
                         {activeView === 'update_planning' && "Visual Plan Editing"}
                         {activeView === 'ask_consulting' && "Live MBA Consulting"}
                         {activeView === 'instant_generator' && "Instant Generator Workflow"}
                         {activeView === 'workflow_detail' && (
                             <span className="flex items-center gap-2 cursor-pointer hover:text-vibrant-orange" onClick={() => setActiveView('overview')}>
                                <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5"/> <span className="hidden sm:inline">Workflow Performance</span>
                             </span>
                         )}
                     </h2>
                 )}
             </div>

             <div className="flex items-center gap-4">
                 {/* Navigation Links */}
                 <div className="hidden md:flex items-center gap-6 mr-4">
                    <button onClick={() => onViewLanding?.('workflows')} className="text-sm font-bold text-vibrant-orange hover:text-orange-600 transition-colors uppercase tracking-widest">Smart Agent</button>
                    <button onClick={() => setActiveView('overview')} className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest">My Dashboard</button>
                    <button onClick={() => setActiveView('settings')} className="text-sm font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase tracking-widest">User Profile Dashboard</button>
                 </div>

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
                            messages.map((msg, idx) => {
                                const isWorkflow = msg.role === 'model' && msg.text.includes('Trigger:') && msg.text.includes('Apps Detected:');
                                
                                if (isWorkflow) {
                                    const parseWorkflow = (text: string): WorkflowData | null => {
                                        try {
                                            const trigger = text.match(/Trigger:\s*(.*)/)?.[1] || '';
                                            const apps = text.match(/Apps Detected:\s*(.*)/)?.[1]?.split(',').map(s => s.trim()) || [];
                                            const inputs = text.match(/Input Sources:\s*(.*)/)?.[1] || '';
                                            const steps = text.match(/AI Processing Steps:\s*(.*)/)?.[1]?.split('.').map(s => s.trim()).filter(s => s) || [];
                                            const logic = text.match(/Business Logic:\s*(.*)/)?.[1] || '';
                                            const actions = text.match(/Output Actions:\s*(.*)/)?.[1] || '';
                                            const notifications = text.match(/Notifications:\s*(.*)/)?.[1] || '';
                                            const schedule = text.match(/Schedule or Frequency:\s*(.*)/)?.[1] || '';
                                            const result = text.match(/Result for user:\s*(.*)/)?.[1] || '';
                                            
                                            return { trigger, apps, inputs, steps, logic, actions, notifications, schedule, result };
                                        } catch (e) {
                                            return null;
                                        }
                                    };
                                    
                                    const workflowData = parseWorkflow(msg.text);
                                    if (workflowData) {
                                        return (
                                            <div key={idx} className="flex justify-start w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                                                <div className="w-full max-w-3xl">
                                                    <WorkflowVisualizer data={workflowData} />
                                                </div>
                                            </div>
                                        );
                                    }
                                }

                                const isQuotaError = msg.role === 'model' && msg.text.startsWith('QUOTA_EXHAUSTED_ERROR_FLAG:');
                                if (isQuotaError) {
                                    const displayMsg = msg.text.replace('QUOTA_EXHAUSTED_ERROR_FLAG: ', '');
                                    return (
                                        <div key={idx} className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                                            <div className="max-w-[80%] md:max-w-[60%] rounded-2xl p-5 shadow-lg bg-red-900/20 border border-red-500/30 text-red-200">
                                                <div className="whitespace-pre-wrap text-sm leading-relaxed mb-4">{displayMsg}</div>
                                                <button 
                                                    onClick={async () => {
                                                        const anyWindow = window as any;
                                                        if (anyWindow.aistudio?.openSelectKey) {
                                                            await anyWindow.aistudio.openSelectKey();
                                                        } else {
                                                            alert("API Key selection is not available in this environment.");
                                                        }
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-vibrant-orange hover:bg-orange-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg"
                                                >
                                                    <Key className="w-4 h-4" />
                                                    Select API Key
                                                </button>
                                                <p className="mt-2 text-[10px] opacity-60 italic">
                                                    Note: You must select a paid Google Cloud project key. See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing docs</a>.
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                        <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl p-5 shadow-lg ${
                                            msg.role === 'user' 
                                            ? 'bg-vibrant-green text-navy-900 font-medium' 
                                            : 'bg-[#1e293b] border border-slate-700 text-slate-300'
                                        }`}>
                                            <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
                                        </div>
                                    </div>
                                );
                            })
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

            {activeView === 'analytics' && (
                <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Deep Business Analytics</h2>
                            <p className="text-slate-400 text-sm">Real-time performance insights and ROI metrics for your AI agents.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:bg-slate-800 transition-all">
                                <Calendar className="w-4 h-4 text-vibrant-orange" /> Last 30 Days
                            </button>
                            <button className="px-4 py-2 bg-vibrant-green text-navy-900 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 transition-all">
                                <Download className="w-4 h-4" /> Export Report
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Avg. ROI" value="4.2x" sub="Return on Investment" icon={TrendingUp} color="text-vibrant-green" bg="bg-[#1e293b]" />
                        <StatCard title="Task Accuracy" value="98.2%" sub="Across all agents" icon={CheckCircle} color="text-blue-400" bg="bg-[#1e293b]" />
                        <StatCard title="Response Time" value="1.2s" sub="Average latency" icon={Zap} color="text-yellow-400" bg="bg-[#1e293b]" />
                        <StatCard title="Active Agents" value="14" sub="Running 24/7" icon={Bot} color="text-purple-400" bg="bg-[#1e293b]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* ROI Matrix Chart */}
                        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold flex items-center gap-2"><DollarSign className="w-4 h-4 text-vibrant-orange" /> ROI Matrix (Savings vs Cost)</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                        <div className="w-2 h-2 rounded-full bg-vibrant-green"></div> Savings
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div> Cost
                                    </div>
                                </div>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_ROI_DATA}>
                                        <defs>
                                            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                                        <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                                        <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} fill="transparent" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Workflow Efficiency Bar Chart */}
                        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-vibrant-orange" /> Workflow Efficiency (%)</h3>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={MOCK_WORKFLOW_STATS}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} cursor={{fill: '#1e293b'}} />
                                        <Bar dataKey="efficiency" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* SWOT Analysis Report */}
                        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Shield className="w-4 h-4 text-vibrant-orange" /> AI Business SWOT Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3" /> Strengths
                                    </div>
                                    <ul className="space-y-2">
                                        {SWOT_DATA.strengths.map((s, i) => (
                                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-green-400 mt-1.5 shrink-0"></span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                                    <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-3 h-3" /> Weaknesses
                                    </div>
                                    <ul className="space-y-2">
                                        {SWOT_DATA.weaknesses.map((w, i) => (
                                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0"></span> {w}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                                    <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3" /> Opportunities
                                    </div>
                                    <ul className="space-y-2">
                                        {SWOT_DATA.opportunities.map((o, i) => (
                                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0"></span> {o}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                                    <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <AlertOctagon className="w-3 h-3" /> Threats
                                    </div>
                                    <ul className="space-y-2">
                                        {SWOT_DATA.threats.map((t, i) => (
                                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-yellow-400 mt-1.5 shrink-0"></span> {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Performance Distribution */}
                        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-vibrant-orange" /> Task Distribution</h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Sales', value: 400 },
                                                { name: 'Support', value: 300 },
                                                { name: 'Tax', value: 300 },
                                                { name: 'Ops', value: 200 },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#8b5cf6" />
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="flex items-center gap-2 text-[10px] text-slate-400"><div className="w-2 h-2 rounded-full bg-vibrant-green"></div> Sales (33%)</div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Support (25%)</div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Tax (25%)</div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Ops (17%)</div>
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
                <div className="p-8 h-full overflow-y-auto pb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Subscriptions & Usage</h2>
                            <p className="text-slate-400 text-sm">Manage your plan and monitor your coin usage.</p>
                        </div>
                        <div className="px-4 py-2 bg-vibrant-orange/10 border border-vibrant-orange/20 rounded-xl">
                            <span className="text-xs font-bold text-vibrant-orange">Next Renewal: March 24, 2026</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Current Plan Status */}
                        <div className="lg:col-span-2 bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5"><Zap className="w-32 h-32 text-vibrant-orange"/></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-vibrant-orange/10 rounded-2xl flex items-center justify-center border border-vibrant-orange/20">
                                        <Zap className="w-8 h-8 text-vibrant-orange" />
                                    </div>
                                    <div>
                                        <div className="inline-block px-2 py-0.5 bg-vibrant-orange/20 text-vibrant-orange rounded text-[10px] font-bold uppercase tracking-wider mb-1">Active Plan</div>
                                        <h3 className="text-3xl font-black text-white">PRO SARATHI</h3>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold mb-2">
                                            <span className="text-slate-400 uppercase tracking-widest">Coin Usage</span>
                                            <span className="text-white">3,420 / 5,000</span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                            <div className="h-full bg-vibrant-orange rounded-full shadow-[0_0_10px_rgba(242,125,38,0.4)]" style={{ width: '68.4%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-2 italic">You have used 68% of your monthly credits.</p>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Cost</div>
                                        <div className="text-2xl font-black text-white">₹1,999<span className="text-sm font-normal text-slate-500">/mo</span></div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20">Upgrade Plan</button>
                                    <button className="flex-1 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition-all">Cancel Subscription</button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4">
                            <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Plan Benefits</div>
                                <ul className="space-y-3">
                                    {["Unlimited Agents", "Priority Processing", "Advanced Analytics", "Custom Webhooks"].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-vibrant-green" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-vibrant-green/5 p-6 rounded-2xl border border-vibrant-green/20">
                                <div className="flex items-center gap-2 text-vibrant-green font-bold text-sm mb-2">
                                    <Sparkles className="w-4 h-4" /> Referral Bonus
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Refer a business and get <span className="text-white font-bold">500 bonus coins</span> for both!</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-6">Available Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SUBSCRIPTION_PLANS.map((plan, i) => (
                            <div key={i} className={`bg-[#1e293b] p-6 rounded-2xl border ${plan.name === 'Pro' ? 'border-vibrant-orange ring-1 ring-vibrant-orange/50' : 'border-slate-700'} relative`}>
                                {plan.name === 'Pro' && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-vibrant-orange text-white text-[10px] font-black rounded-full uppercase">Current</div>
                                )}
                                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.color}`}>{plan.name}</div>
                                <div className="text-2xl font-black text-white mb-4">{plan.price}<span className="text-xs font-normal text-slate-500">/mo</span></div>
                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((f, idx) => (
                                        <li key={idx} className="text-[10px] text-slate-400 flex items-center gap-1.5">
                                            <div className="w-1 h-1 rounded-full bg-slate-600"></div> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button disabled={plan.name === 'Pro'} className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${plan.name === 'Pro' ? 'bg-slate-800 text-slate-500 cursor-default' : 'bg-white text-navy-900 hover:bg-slate-200'}`}>
                                    {plan.name === 'Pro' ? 'Selected' : 'Select Plan'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeView === 'billing' && (
                <div className="p-8 h-full overflow-y-auto pb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Billing & Invoices</h2>
                            <p className="text-slate-400 text-sm">Update your billing information and download past invoices.</p>
                        </div>
                        <button className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:bg-slate-800 transition-all">
                            <Download className="w-4 h-4 text-vibrant-orange" /> Download All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Billing Details Input Area */}
                        <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2"><FileText className="w-4 h-4 text-vibrant-orange" /> Real User Billing Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Business Name</label>
                                    <input type="text" defaultValue={user.name + " Enterprises"} className="w-full bg-[#0f172a] border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-vibrant-orange" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GSTIN Number</label>
                                    <input type="text" defaultValue="19AAACR1234A1Z1" className="w-full bg-[#0f172a] border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-vibrant-orange" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Billing Address</label>
                                    <textarea rows={2} defaultValue="123, Business Park, Sector 5, Salt Lake, Kolkata - 700091" className="w-full bg-[#0f172a] border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-vibrant-orange resize-none" />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button onClick={() => showToast("Billing details saved successfully")} className="px-6 py-2 bg-vibrant-green text-navy-900 font-bold rounded-xl text-xs hover:bg-emerald-500 transition-all">Save Changes</button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2"><CreditCard className="w-4 h-4 text-vibrant-orange" /> Payment Method</h3>
                            <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold text-white border border-slate-700">VISA</div>
                                        <div className="text-sm font-bold text-white">•••• 4242</div>
                                    </div>
                                    <span className="text-[10px] text-slate-500">Exp 12/28</span>
                                </div>
                                <div className="text-[10px] text-slate-400">Primary payment method for auto-renewal.</div>
                            </div>
                            <button className="w-full py-2.5 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all">Update Card</button>
                        </div>
                    </div>

                    <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
                        <div className="p-6 border-b border-slate-700 bg-[#1e293b]">
                            <h3 className="text-white font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-vibrant-orange" /> Real Monthly Invoices</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#0f172a] text-slate-400 text-[10px] uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Invoice ID</th>
                                        <th className="px-6 py-4 font-bold">Date</th>
                                        <th className="px-6 py-4 font-bold">Plan</th>
                                        <th className="px-6 py-4 font-bold">Amount</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700 text-sm">
                                    {INVOICES.map((inv: any, i) => (
                                        <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                                            <td className="px-6 py-4 text-white font-mono text-xs">{inv.id}</td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">{inv.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${inv.plan === 'Pro' ? 'bg-vibrant-orange/10 text-vibrant-orange border-vibrant-orange/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                                    {inv.plan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-white font-black">{inv.amount}</td>
                                            <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase">Paid</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                <UserProfileDashboard 
                    user={user} 
                    onSave={(updates) => {
                        showToast("Settings updated successfully");
                    }} 
                />
            )}

            {activeView === 'update_planning' && (
                <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in duration-300">
                    <button onClick={() => setActiveView('overview')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Overview</button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-vibrant-orange/10 flex items-center justify-center text-vibrant-orange"><Settings className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-2xl font-black text-white">Visual Plan Editing</h3>
                            <p className="text-slate-400 text-sm">Drag and drop to edit your custom automation plan.</p>
                        </div>
                    </div>
                    <div className="h-80 bg-[#1e293b] rounded-2xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <Settings className="w-12 h-12 text-slate-600 mb-4 animate-spin-slow" />
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Visual Editor Canvas (Interactive)</span>
                    </div>
                </div>
            )}

            {activeView === 'ask_consulting' && (
                <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in duration-300">
                    <button onClick={() => setActiveView('overview')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Overview</button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><PhoneCall className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-2xl font-black text-white">Live MBA Great Consulting</h3>
                            <p className="text-slate-400 text-sm">Connect with our MBA experts for deep niche consulting.</p>
                        </div>
                    </div>
                    <div className="h-80 bg-[#1e293b] rounded-2xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]"></div>
                        <PhoneCall className="w-12 h-12 text-emerald-500/50 mb-4 animate-pulse" />
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Live Video/Audio Consulting Interface</span>
                    </div>
                </div>
            )}

            {activeView === 'instant_generator' && (
                <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in duration-300">
                    <button onClick={() => setActiveView('overview')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Overview</button>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Zap className="w-6 h-6" /></div>
                        <div>
                            <h3 className="text-2xl font-black text-white">Instant Generator Workflow</h3>
                            <p className="text-slate-400 text-sm">Multi-step Full Demo 'Swarm Workflow' Visual Features.</p>
                        </div>
                    </div>
                    <div className="h-80 bg-[#1e293b] rounded-2xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.05)_25%,transparent_25%,transparent_50%,rgba(59,130,246,0.05)_50%,rgba(59,130,246,0.05)_75%,transparent_75%,transparent)] bg-[size:20px_20px]"></div>
                        <Zap className="w-12 h-12 text-blue-500/50 mb-4 animate-bounce" />
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Swarm Workflow Generator Canvas</span>
                    </div>
                </div>
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

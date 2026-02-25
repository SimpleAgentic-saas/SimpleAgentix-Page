
import React from 'react';
import {
  MessageCircle,
  Mail,
  FileSpreadsheet,
  LayoutGrid,
  ShoppingBag,
  ShoppingCart,
  Calendar,
  Server,
  Database,
  Globe,
  Briefcase,
  Layers,
  BookOpen,
  Calculator,
  Receipt,
  FileText
} from 'lucide-react';

const integrations = [
  { name: 'Vyapar', icon: Receipt, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/30' },
  { name: 'Tally Prime', icon: BarChartIcon, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/30' },
  { name: 'Khatabook', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { name: 'myBillBook', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
  { name: 'Zoho Books', icon: Briefcase, color: 'text-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { name: 'Busy Accounting', icon: Calculator, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  { name: 'Marg ERP', icon: Server, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/30' },
  { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/30' },
  { name: 'Email', icon: Mail, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/30' },
  { name: 'Google Sheets', icon: FileSpreadsheet, color: 'text-green-700', bg: 'bg-green-100 dark:bg-green-900/40' },
  { name: 'Workspace', icon: LayoutGrid, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/30' },
  { name: 'Shopify', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { name: 'Amazon', icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  { name: 'Flipkart', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { name: 'Calendar', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  { name: 'Databases', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
  { name: 'Website', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/30' },
  { name: '100+ More', icon: Layers, color: 'text-navy-900 dark:text-white', bg: 'bg-slate-100 dark:bg-slate-800' },
];

function BarChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

export const IntegrationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800 border-y border-slate-100 dark:border-slate-700 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">Connect Everything You Use</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          SimpleAgentix Auto Integrates Seamlessly with your Daily Life Use-Cases Tools, including leading Indian SME software.
        </p>
      </div>

      <div className="relative w-full">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white dark:from-slate-800 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white dark:from-slate-800 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

        {/* Scrolling Container */}
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {/* Double the list to ensure smooth infinite loop */}
          {[...integrations, ...integrations].map((item, index) => (
            <div key={index} className="mx-3 md:mx-6 flex flex-col items-center justify-center gap-4 p-6 w-40 h-40 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-default">
               <div className={`p-4 rounded-xl ${item.bg} ${item.color}`}>
                 <item.icon className="w-8 h-8" />
               </div>
               <span className="font-bold text-navy-900 dark:text-white text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

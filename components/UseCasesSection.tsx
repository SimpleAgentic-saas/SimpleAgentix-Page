
import React from 'react';
import { Store, Users, Rocket, CheckCircle2, MessageSquare, Bell, Calendar, Database, TrendingUp } from 'lucide-react';

export const UseCasesSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">Built for Real-World Scenarios</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            From local business owners to fast-growing startups, SimpleAgentix adapts to your specific operational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* For Business Owners */}
          <UseCaseCard 
            icon={Store}
            title="For Business Owners"
            color="orange"
            items={[
              { text: "Daily sales reports on WhatsApp", icon: MessageSquare },
              { text: "Inventory alerts & restocking", icon: Bell },
              { text: "Auto customer follow-ups", icon: Users },
              { text: "Payment reminders", icon: CheckCircle2 },
            ]}
          />

          {/* For Teams */}
          <UseCaseCard 
            icon={Users}
            title="For Teams"
            color="teal"
            items={[
              { text: "Auto meeting scheduling", icon: Calendar },
              { text: "Smart task assignments", icon: CheckCircle2 },
              { text: "Lead qualification", icon: TrendingUp },
              { text: "Customer support replies", icon: MessageSquare },
            ]}
          />

          {/* For Startups */}
          <UseCaseCard 
            icon={Rocket}
            title="For Startups"
            color="indigo"
            items={[
              { text: "Growth & outreach automations", icon: TrendingUp },
              { text: "CRM syncing & data entry", icon: Database },
              { text: "Marketing workflows", icon: Store },
              { text: "Complex data pipelines", icon: CheckCircle2 },
            ]}
          />

        </div>
      </div>
    </section>
  );
};

const UseCaseCard = ({ icon: Icon, title, color, items }: { icon: any, title: string, color: 'orange' | 'teal' | 'indigo', items: {text: string, icon: any}[] }) => {
  const colorStyles = {
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-100 dark:border-orange-900/50',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
      hover: 'group-hover:border-orange-200 dark:group-hover:border-orange-700'
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      border: 'border-teal-100 dark:border-teal-900/50',
      iconBg: 'bg-teal-100 dark:bg-teal-900/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      hover: 'group-hover:border-teal-200 dark:group-hover:border-teal-700'
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-100 dark:border-indigo-900/50',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      hover: 'group-hover:border-indigo-200 dark:group-hover:border-indigo-700'
    }
  };

  const style = colorStyles[color];

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border ${style.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
      <div className={`w-14 h-14 ${style.iconBg} rounded-xl flex items-center justify-center mb-6`}>
        <Icon className={`w-7 h-7 ${style.iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 p-1 rounded-full ${style.bg} ${style.iconColor}`}>
              <item.icon className="w-3 h-3" />
            </div>
            <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

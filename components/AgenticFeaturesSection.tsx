import React from 'react';
import { motion } from 'motion/react';
import { 
  Crown, 
  ShoppingCart, 
  CreditCard, 
  Headphones, 
  Megaphone, 
  Truck, 
  Calculator, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Box, 
  Settings, 
  Globe,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { translations } from '../translations';

interface AgenticFeaturesSectionProps {
  language: 'English' | 'Hindi' | 'Bengali';
}

const AgenticFeaturesSection: React.FC<AgenticFeaturesSectionProps> = ({ language }) => {
  const t = translations[language].agentic_features;

  const agents = [
    { id: 'sales', icon: ShoppingCart, color: 'bg-blue-500/10 text-blue-500', ...t.agents.sales },
    { id: 'finance', icon: CreditCard, color: 'bg-emerald-500/10 text-emerald-500', ...t.agents.finance },
    { id: 'calling', icon: Headphones, color: 'bg-purple-500/10 text-purple-500', ...t.agents.calling },
    { id: 'marketing', icon: Megaphone, color: 'bg-orange-500/10 text-orange-500', ...t.agents.marketing },
    { id: 'logistics', icon: Truck, color: 'bg-cyan-500/10 text-cyan-500', ...t.agents.logistics },
    { id: 'tax', icon: Calculator, color: 'bg-rose-500/10 text-rose-500', ...t.agents.tax },
    { id: 'consulting', icon: BarChart3, color: 'bg-indigo-500/10 text-indigo-500', ...t.agents.consulting },
    { id: 'hr', icon: Users, color: 'bg-teal-500/10 text-teal-500', ...t.agents.hr },
    { id: 'vendor', icon: ShieldCheck, color: 'bg-amber-500/10 text-amber-500', ...t.agents.vendor },
    { id: 'inventory', icon: Box, color: 'bg-sky-500/10 text-sky-500', ...t.agents.inventory },
    { id: 'operations', icon: Settings, color: 'bg-slate-500/10 text-slate-500', ...t.agents.operations },
    { id: 'exim', icon: Globe, color: 'bg-violet-500/10 text-violet-500', ...t.agents.exim },
  ];

  return (
    <section id="agentic-features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-amber-600 uppercase bg-amber-50 rounded-full"
          >
            {t.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t.desc}
          </motion.p>
        </div>

        {/* AI Architecture / Diagram Section */}
        <div className="relative mb-32 flex flex-col items-center">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">{t.arch_title}</h3>
            <h4 className="text-3xl font-bold text-gray-900">{t.arch_subtitle}</h4>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.arch_desc}</p>
          </div>

          {/* Circular Diagram */}
          <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center">
            {/* Connection Lines (Static Background) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full relative">
                {agents.map((_, index) => {
                  const angle = (index * 360) / agents.length;
                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 w-[45%] h-[1px] bg-gray-100 origin-left"
                      style={{ transform: `rotate(${angle}deg)` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Pulsing Rings */}
            <div className="absolute w-64 h-64 bg-amber-500/5 rounded-full animate-ping" />
            <div className="absolute w-48 h-48 bg-amber-500/10 rounded-full animate-pulse" />

            {/* Super Manager (Center) */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-amber-500 rounded-full shadow-2xl shadow-amber-500/40 flex flex-col items-center justify-center text-white p-4 text-center"
            >
              <Crown className="w-8 h-8 md:w-10 md:h-10 mb-2" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-tighter leading-tight">
                Super Manager
              </span>
            </motion.div>

            {/* Specialist Agents (Orbiting) */}
            {agents.map((agent, index) => {
              const angle = (index * 360) / agents.length;
              const radius = 42; // percentage
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-amber-200`}>
                      <agent.icon className={`w-6 h-6 md:w-8 md:h-8 ${agent.color.split(' ')[1]}`} />
                    </div>
                    <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-900 text-white text-[10px] md:text-xs py-1 px-2 rounded whitespace-nowrap shadow-xl">
                        {agent.name}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Meet the Team Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">{t.team_title}</h3>
            <h4 className="text-3xl font-bold text-gray-900">{t.team_subtitle}</h4>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.team_desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">{agent.name}</h5>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {agent.desc}
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-amber-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  (Super Specialist)
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Automation Workflows Section */}
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2">{t.workflows_title}</h3>
            <h4 className="text-3xl font-bold text-gray-900">{t.workflows_subtitle}</h4>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.workflows_desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.workflow_items.map((workflow, wIndex) => (
              <motion.div
                key={wIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: wIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:border-amber-200 transition-all"
              >
                <div className="bg-gray-900 p-5 text-white text-center">
                  <h5 className="text-sm font-bold uppercase tracking-wide">{workflow.title}</h5>
                </div>
                
                <div className="p-5 flex-grow">
                  <ul className="space-y-3">
                    {workflow.steps.map((step, sIndex) => (
                      <li key={sIndex} className="flex items-start gap-2 text-xs text-gray-700">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-[10px]">
                          {sIndex + 1}
                        </div>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Swarm Workflow</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:bg-black transition-all"
            >
              {language === 'English' ? 'Explore Full Automation' : language === 'Hindi' ? 'पूर्ण स्वचालन का अन्वेषण करें' : 'সম্পূর্ণ অটোমেশন অন্বেষণ করুন'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticFeaturesSection;

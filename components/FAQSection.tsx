
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  language: 'English' | 'Hindi' | 'Bengali';
  faqData: {
    title: string;
    subtitle: string;
    questions: { q: string; a: string }[];
  };
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language, faqData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-vibrant-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" /> FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-navy-900 dark:text-white mb-4 tracking-tight">
            {faqData.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            {faqData.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.questions.map((item, index) => (
            <div 
              key={index}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-slate-50 dark:bg-slate-800/50 border-teal-500/30 shadow-lg' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === index ? 'text-navy-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-navy-900 dark:group-hover:text-white'
                }`}>
                  {item.q}
                </span>
                <div className={`shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-teal-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-navy-900 dark:bg-slate-900 border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-vibrant-orange/10 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-slate-400 mb-6 font-medium">We're here to help you automate your business journey.</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20">
              <MessageCircle className="w-5 h-5" /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

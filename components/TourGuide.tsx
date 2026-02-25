import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TourGuideProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const TourGuide: React.FC<TourGuideProps> = ({ steps, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Reset step when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [isOpen]);

  // Update position logic
  useEffect(() => {
    if (!isOpen || !isReady) return;

    const updatePosition = () => {
      const step = steps[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if element is visible
        if (rect.width === 0 && rect.height === 0) {
           // Skip invisible elements logic could go here, or just wait
           return;
        }

        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        
        setCoords({
          top: rect.top + scrollY,
          left: rect.left + scrollX,
          width: rect.width,
          height: rect.height,
        });
        
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    // Multiple timeouts to catch animations/layout shifts
    const t1 = setTimeout(updatePosition, 100);
    const t2 = setTimeout(updatePosition, 500);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen, isReady, currentStep, steps]);

  if (!isOpen || !coords) return null;

  const step = steps[currentStep];

  // Calculate Popover Position
  let popoverStyle: React.CSSProperties = {};
  const spacing = 16;
  const popoverWidth = 320;

  // Simple collision detection logic could be added here, simplified for now
  switch (step.position) {
    case 'top':
      popoverStyle = { 
        top: coords.top - spacing, 
        left: coords.left + coords.width / 2, 
        transform: 'translate(-50%, -100%)' 
      };
      break;
    case 'bottom':
      popoverStyle = { 
        top: coords.top + coords.height + spacing, 
        left: coords.left + coords.width / 2, 
        transform: 'translate(-50%, 0)' 
      };
      break;
    case 'left':
      popoverStyle = { 
        top: coords.top + coords.height / 2, 
        left: coords.left - spacing, 
        transform: 'translate(-100%, -50%)' 
      };
      break;
    case 'right':
      popoverStyle = { 
        top: coords.top + coords.height / 2, 
        left: coords.left + coords.width + spacing, 
        transform: 'translate(0, -50%)' 
      };
      break;
  }

  // Ensure popover stays within viewport horizontally
  // Note: This logic assumes 'transform' handles the base offset.
  // Real-world implementation would need more robust collision detection.

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none">
       {/* Spotlight Effect using massive shadow */}
       <div 
         className="absolute transition-all duration-500 ease-in-out rounded-xl shadow-[0_0_0_9999px_rgba(15,23,42,0.85)] pointer-events-none border-2 border-vibrant-orange box-content"
         style={{
           top: coords.top - 4, // padding
           left: coords.left - 4,
           width: coords.width + 8,
           height: coords.height + 8,
         }}
       >
          {/* Pulsing indicator corner */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vibrant-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-vibrant-orange"></span>
          </span>
       </div>

       {/* Popover */}
       <div 
         className="absolute bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-80 pointer-events-auto transition-all duration-500 ease-in-out flex flex-col gap-4 animate-in fade-in zoom-in-95"
         style={popoverStyle}
       >
          <div className="flex justify-between items-start">
             <div>
                <span className="text-[10px] font-bold text-vibrant-orange uppercase tracking-wider block mb-1">
                    Step {currentStep + 1} of {steps.length}
                </span>
                <h4 className="text-lg font-bold text-navy-900 dark:text-white leading-tight">
                    {step.title}
                </h4>
             </div>
             <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
               <X className="w-5 h-5" />
             </button>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {step.content}
          </p>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-1.5">
               {steps.map((_, i) => (
                 <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-vibrant-orange' : 'w-1.5 bg-slate-200 dark:bg-slate-700'}`} 
                 />
               ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev} 
                disabled={currentStep === 0}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-vibrant-orange hover:bg-orange-600 text-white font-bold text-sm transition-colors shadow-lg shadow-orange-900/20"
              >
                {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}
                {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
       </div>
    </div>,
    document.body
  );
};
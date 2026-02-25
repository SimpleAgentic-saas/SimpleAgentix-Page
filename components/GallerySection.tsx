
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronRight, ChevronLeft, Layers, Loader2, Sparkles, Tag, Zap, Grip, MousePointerClick, FileText, ArrowUpRight, Globe, CheckSquare, Square, X } from 'lucide-react';
import { analyzeSelectedAssets } from '../services/geminiService';

interface GalleryItem {
  id: string;
  url: string;
  segments: string[]; // Added segments list
  content: {
    [key: string]: {
      label: string;
      category: string;
      features: string[];
    }
  }
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    segments: [
      "Hyperlocal Kirana Stores",
      "Fashion & Apparel Online",
      "Electronics Retail",
      "Pharmacy/Healthcare retail",
      "D2C Brand",
      "Marketplace reseller",
      "Subscription-commerce"
    ],
    content: {
      English: {
        label: 'Retail & E-commerce',
        category: 'Business Owner',
        features: ['Daily Sales Reporting', 'Inventory Management', 'Customer Communication', 'Order Automation']
      },
      Hindi: {
        label: 'खुदरा और ई-कॉमर्स',
        category: 'व्यवसाय मालिक',
        features: ['दैनिक बिक्री रिपोर्टिंग', 'इन्वेंटरी प्रबंधन', 'ग्राहक संचार', 'ऑर्डर स्वचालन']
      },
      Bengali: {
        label: 'খুচরা ও ই-কমার্স',
        category: 'ব্যবসার মালিক',
        features: ['দৈনিক বিক্রয় রিপোর্টিং', 'ইনভেন্টরি ম্যানেজমেন্ট', 'গ্রাহক যোগাযোগ', 'অর্ডার অটোমেশন']
      }
    }
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    segments: [
      "SME factory units",
      "Auto parts & industrial components",
      "Heavy Machinery",
      "Chemical/Plastic/Fabrication",
      "Consumer products"
    ],
    content: {
      English: {
        label: 'Manufacturing',
        category: 'SME Operations',
        features: ['Production Tracking', 'Supplier Coordination', 'Quality Control Alerts', 'Delivery Scheduling']
      },
      Hindi: {
        label: 'विनिर्माण',
        category: 'SME संचालन',
        features: ['उत्पादन ट्रैकिंग', 'आपूर्तिकर्ता समन्वय', 'गुणवत्ता नियंत्रण अलर्ट', 'डिलीवरी शेड्यूलिंग']
      },
      Bengali: {
        label: 'উৎপাদন',
        category: 'SME অপারেশনস',
        features: ['উৎপাদন ট্র্যাকিং', 'সরবরাহকারী সমন্বয়', 'গুণমান নিয়ন্ত্রণ সতর্কতা', 'ডেলিভারি শিডিউলিং']
      }
    }
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    segments: [
      "Restaurants",
      "Cloud kitchen",
      "Food delivery",
      "Cafes & Bakery",
      "Catering",
      "Franchise chains"
    ],
    content: {
      English: {
        label: 'Food Services',
        category: 'Hospitality',
        features: ['Menu Management', 'Order Notifications', 'Ingredient Alerts', 'Customer Feedback']
      },
      Hindi: {
        label: 'खाद्य सेवाएं',
        category: 'आतिथ्य',
        features: ['मेनू प्रबंधन', 'ऑर्डर सूचनाएं', 'सामग्री अलर्ट', 'ग्राहक प्रतिक्रिया']
      },
      Bengali: {
        label: 'খাদ্য পরিষেবা',
        category: 'আতিথেয়তা',
        features: ['মেনু ম্যানেজমেন্ট', 'অর্ডার বিজ্ঞপ্তি', 'উপাদান সতর্কতা', 'গ্রাহক প্রতিক্রিয়া']
      }
    }
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    segments: [
      "CA, Lawyer, Consultancy",
      "Marketing & Digital Agency",
      "HR/Recruitment",
      "Real Estate Agents",
      "Trainers/Coaches"
    ],
    content: {
      English: {
        label: 'Professional Services',
        category: 'Business Services',
        features: ['Appointment Scheduling', 'Payment Reminders', 'Document Automation', 'Client Communication']
      },
      Hindi: {
        label: 'पेशेवर सेवाएं',
        category: 'व्यापारिक सेवाएं',
        features: ['अपॉइंटमेंट शेड्यूलिंग', 'भुगतान रिमाइंडर', 'दस्तावेज़ स्वचालन', 'क्लाइंट संचार']
      },
      Bengali: {
        label: 'পেশাদার পরিষেবা',
        category: 'ব্যবসায়িক পরিষেবা',
        features: ['অ্যাপয়েন্টমেন্ট শিডিউলিং', 'পেমেন্ট রিমাইন্ডার', 'নথি অটোমেশন', 'ক্লায়েন্ট যোগাযোগ']
      }
    }
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    segments: [
      "Local courier",
      "B2B trucking",
      "Fleet/vehicle service",
      "Warehouse/distribution",
      "Inter-city delivery",
      "Trading & packers/movers"
    ],
    content: {
      English: {
        label: 'Logistics & Transport',
        category: 'Supply Chain',
        features: ['Delivery Tracking', 'Route Optimization', 'Cash Collection', 'Vehicle Maintenance']
      },
      Hindi: {
        label: 'रसद और परिवहन',
        category: 'आपूर्ति श्रृंखला',
        features: ['डिलीवरी ट्रैकिंग', 'रूट ऑप्टिमाइज़ेशन', 'नकद संग्रह', 'वाहन रखरखाव']
      },
      Bengali: {
        label: 'লজিস্টিকস এবং পরিবহন',
        category: 'সাপ্লাই চেইন',
        features: ['ডেলিভারি ট্র্যাকিং', 'রুট অপ্টিমাইজেশন', 'নগদ সংগ্রহ', 'যানবাহন রক্ষণাবেক্ষণ']
      }
    }
  }
];

const UI_TEXTS: any = {
  English: {
    title: "Industry-Specific Solutions",
    subtitle: "Select your industry sectors below to generate a custom automation integration plan.",
    integrationTitle: "Integration Plan",
    selectPrompt: "Select sectors to analyze",
    selectedPrefix: "sectors selected",
    analyzeBtn: "Generate Plan",
    analyzingBtn: "Processing...",
    recommendation: "AI Workflow Recommendation",
    clickHint: "Select Segments",
    flag: "🇺🇸",
    langName: "English",
    segmentTitle: "Select Segments (1-3)",
    segmentLimit: "Max 3 selected"
  },
  Hindi: {
    title: "उद्योग-विशिष्ट समाधान",
    subtitle: "कस्टम ऑटोमेशन इंटीग्रेशन प्लान बनाने के लिए अपने उद्योग क्षेत्रों का चयन करें।",
    integrationTitle: "एकीकरण योजना",
    selectPrompt: "विश्लेषण के लिए क्षेत्र चुनें",
    selectedPrefix: "क्षेत्र चुने गए",
    analyzeBtn: "योजना बनाएं",
    analyzingBtn: "प्रक्रिया जारी है...",
    recommendation: "AI वर्कफ़्लो सिफारिश",
    clickHint: "सेगमेंट चुनें",
    flag: "🇮🇳",
    langName: "Hindi",
    segmentTitle: "सेगमेंट चुनें (1-3)",
    segmentLimit: "अधिकतम 3"
  },
  Bengali: {
    title: "শিল্প-নির্দিষ্ট সমাধান",
    subtitle: "একটি কাস্টম অটোমেশন ইন্টিগ্রেশন প্ল্যান তৈরি করতে নিচে আপনার শিল্প খাত নির্বাচন করুন।",
    integrationTitle: "ইন্টিগ্রেশন প্ল্যান",
    selectPrompt: "বিশ্লেষণের জন্য খাত নির্বাচন করুন",
    selectedPrefix: "খাত নির্বাচিত",
    analyzeBtn: "প্ল্যান তৈরি করুন",
    analyzingBtn: "প্রসেসিং হচ্ছে...",
    recommendation: "AI ওয়ার্কফ্লো সুপারিশ",
    clickHint: "সেগমেন্ট নির্বাচন",
    flag: "🇧🇩",
    langName: "Bengali",
    segmentTitle: "সেগমেন্ট নির্বাচন (১-৩)",
    segmentLimit: "সর্বোচ্চ ৩টি"
  }
};

interface GallerySectionProps {
  language: string;
  onGeneratePlan?: (industry: string, segments: string[]) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ language = 'English', onGeneratePlan }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // Store selected segments per industry ID
  const [selectedSegments, setSelectedSegments] = useState<Record<string, string[]>>({});
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clear analysis when language changes to force re-generation in new language
  useEffect(() => {
    setAnalysisResult(null);
  }, [language]);

  // Ensure robust fallback logic for language keys
  const currentLangKey = (UI_TEXTS[language] && language) || 'English';
  const texts = UI_TEXTS[currentLangKey];

  const toggleIndustrySelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
      // Clean up segments if industry is deselected
      const newSegments = { ...selectedSegments };
      delete newSegments[id];
      setSelectedSegments(newSegments);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
    setAnalysisResult(null); 
  };

  const toggleSegment = (industryId: string, segment: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the card itself
    
    setSelectedSegments(prev => {
        const current = prev[industryId] || [];
        // If unselecting
        if (current.includes(segment)) {
            return { ...prev, [industryId]: current.filter(s => s !== segment) };
        }
        // If selecting (Check Max 3)
        if (current.length < 3) {
            return { ...prev, [industryId]: [...current, segment] };
        }
        return prev;
    });
    setAnalysisResult(null);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAnalyze = async () => {
    if (selectedIds.size === 0) return;
    setIsAnalyzing(true);
    
    // Construct Combined Niche Selection
    const selectedItems = galleryItems.filter(item => selectedIds.has(item.id));
    
    // Map data for handoff
    const primaryIndustry = selectedItems[0]?.content['English'].label || 'MSME';
    const allSelectedSegments: string[] = [];
    selectedItems.forEach(item => {
        const itemSegs = selectedSegments[item.id] || [];
        allSelectedSegments.push(...itemSegs);
    });

    // Notify App for handoff
    if (onGeneratePlan) {
        setTimeout(() => {
            onGeneratePlan(primaryIndustry, allSelectedSegments);
            setIsAnalyzing(false);
        }, 800); 
        return;
    }

    try {
      const result = await analyzeSelectedAssets([primaryIndustry, ...allSelectedSegments], currentLangKey);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full relative py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-vibrant-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wide">
                <Grip className="w-3 h-3" /> Industry Modules
             </div>
             {/* Active Language Badge */}
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold animate-in fade-in">
                <span>{texts.flag}</span>
                <span>{texts.langName} Mode</span>
             </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 dark:text-white leading-tight mb-4">
            {texts.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            {texts.subtitle}
          </p>
        </div>
        <div className="hidden md:flex gap-3">
           <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all shadow-sm hover:shadow-md bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-all shadow-sm hover:shadow-md bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Scrolling Area */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-16 pt-4 px-4 sm:px-6 lg:px-8 gap-6 scrollbar-hide snap-x mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {galleryItems.map((item) => {
          const isSelected = selectedIds.has(item.id);
          // Dynamically switch card content language immediately
          const itemContent = item.content[currentLangKey] || item.content['English'];
          const activeSegments = selectedSegments[item.id] || [];
          
          return (
            <div 
              key={item.id}
              onClick={() => toggleIndustrySelection(item.id)}
              className={`
                relative flex-none w-80 md:w-96 h-[460px] rounded-3xl cursor-pointer transition-all duration-300 snap-center group select-none overflow-hidden
                ${isSelected 
                    ? 'ring-4 ring-vibrant-orange shadow-2xl scale-[1.02] -translate-y-2 z-10' 
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-xl hover:-translate-y-2'
                }
              `}
            >
              {/* Image Container */}
              <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${isSelected ? 'h-1/3' : 'h-3/5'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  <img 
                    src={item.url} 
                    alt={itemContent.label}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isSelected ? 'scale-110' : ''}`}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      <Tag className="w-3 h-3" /> {itemContent.category}
                    </span>
                  </div>

                  {/* Selection Checkbox */}
                  <div className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md ${isSelected ? 'bg-vibrant-orange text-white scale-110' : 'bg-black/30 text-transparent border border-white/50 group-hover:bg-white/20'}`}>
                    <Check className={`w-4 h-4 ${isSelected ? 'block' : 'hidden'}`} />
                  </div>
              </div>

              {/* Content Card / Segment Selector */}
              <div className={`absolute bottom-0 left-0 w-full transition-all duration-500 ease-in-out p-6 bg-white dark:bg-slate-900 flex flex-col ${isSelected ? 'h-2/3 bg-slate-50 dark:bg-slate-950' : 'h-2/5'}`}>
                 
                 {/* Header in Content */}
                 <div className="mb-2 shrink-0">
                    <h3 className={`text-xl font-bold leading-tight ${isSelected ? 'text-vibrant-orange mb-1' : 'text-navy-900 dark:text-white mb-3'}`}>
                        {itemContent.label}
                    </h3>
                    
                    {!isSelected && (
                        <div className="space-y-1.5">
                        {itemContent.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                            <span className="truncate">{feature}</span>
                            </div>
                        ))}
                        </div>
                    )}
                 </div>

                 {/* Segment Selection Area - Visible only when Selected */}
                 {isSelected ? (
                    <div className="flex-1 overflow-y-auto pr-1 mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-3">
                             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{texts.segmentTitle}</span>
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeSegments.length === 3 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                {activeSegments.length}/3
                             </span>
                        </div>
                        <div className="space-y-2">
                             {item.segments.map((segment, idx) => {
                                 const isSegSelected = activeSegments.includes(segment);
                                 return (
                                     <button
                                        key={idx}
                                        onClick={(e) => toggleSegment(item.id, segment, e)}
                                        disabled={!isSegSelected && activeSegments.length >= 3}
                                        className="relative w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                     >
                                         <span className={`text-xs font-bold ${isSegSelected ? 'text-navy-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {segment}
                                         </span>
                                         {isSegSelected ? <CheckSquare className="w-4 h-4 text-vibrant-orange" /> : <Square className="w-4 h-4 text-slate-300 dark:text-slate-600" />}
                                     </button>
                                 )
                             })}
                        </div>
                    </div>
                 ) : (
                    <div className="mt-auto pt-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <MousePointerClick className="w-3 h-3" /> {texts.clickHint}
                    </div>
                 )}
              </div>
            </div>
          );
        })}
        {/* Spacer for end of scroll */}
        <div className="w-8 flex-none"></div>
      </div>

      {/* Floating Action Bar / Results Modal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-500 ring-1 ring-black/5 dark:ring-white/5">
           
           {/* Left: Summary */}
           <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="p-3 bg-navy-900 dark:bg-white rounded-xl text-white dark:text-navy-900 shadow-lg shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 dark:text-white leading-tight">{texts.integrationTitle}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 font-medium flex items-center gap-2">
                  {selectedIds.size === 0 ? (
                    <span>{texts.selectPrompt}</span>
                  ) : (
                    <div className="flex flex-col">
                        <span className="text-vibrant-orange font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> {selectedIds.size} {texts.selectedPrefix}
                        </span>
                        {/* Show count of sub-segments */}
                        <span className="text-[10px] text-slate-400">
                             {Object.values(selectedSegments).flat().length} segments defined
                        </span>
                    </div>
                  )}
                </p>
              </div>
           </div>

           {/* Middle: AI Output Display */}
           <div className="flex-1 w-full md:w-auto bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 min-h-[4rem] p-3 flex items-center">
              {analysisResult ? (
                 <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 mb-1.5 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                        <FileText className="w-3 h-3 text-vibrant-green" />
                        <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">{texts.recommendation}</span>
                        <div className="ml-auto flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-medium">
                        {analysisResult}
                    </p>
                 </div>
              ) : (
                 <div className="w-full text-center text-slate-400 text-xs italic flex flex-col items-center justify-center gap-1 opacity-60">
                    <Sparkles className="w-4 h-4" /> 
                    <span>{selectedIds.size > 0 ? (isAnalyzing ? texts.analyzingBtn : "Ready to generate custom plan...") : "Select modules & segments"}</span>
                 </div>
              )}
           </div>

           {/* Right: Button */}
           <button
             onClick={handleAnalyze}
             disabled={selectedIds.size === 0 || isAnalyzing}
             className={`
               px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center text-xs shadow-lg uppercase tracking-wider
               ${selectedIds.size > 0 
                 ? 'bg-vibrant-orange text-white hover:bg-orange-600 transform hover:-translate-y-0.5' 
                 : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}
             `}
           >
             {isAnalyzing ? (
               <>
                 <Loader2 className="w-4 h-4 animate-spin" /> {texts.analyzingBtn}
               </>
             ) : (
               <>
                 <Zap className="w-4 h-4 fill-white" /> {texts.analyzeBtn}
               </>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

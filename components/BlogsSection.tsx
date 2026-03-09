
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Linkedin, 
  Facebook, 
  MessageCircle, 
  Calendar, 
  Clock, 
  Sparkles, 
  Tag, 
  ArrowRight,
  Plus,
  X,
  Maximize2,
  Share2,
  Filter,
  ArrowLeft,
  Zap,
  CheckCircle,
  BrainCircuit,
  Layout,
  Twitter,
  Copy,
  Check,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';

interface BlogPost {
  id: string;
  industry: string;
  title: { English: string; Hindi: string; Bengali: string };
  excerpt: { English: string; Hindi: string; Bengali: string };
  fullContent: { English: string; Hindi: string; Bengali: string };
  image: string;
  author: string;
  authorImage: string; // New field for author profile image
  authorLink?: string;
  date: string;
  readTime: string;
  tags: string[];
  segments: string[];
  featured?: boolean; // Optional featured flag
}

const INDUSTRY_SEGMENTS: Record<string, string[]> = {
  'Retail & E-commerce': [
    "Hyperlocal Kirana Stores", "Fashion & Apparel Online", "Electronics Retail",
    "Pharmacy/Healthcare retail", "D2C Brand", "Marketplace reseller", "Subscription-commerce"
  ],
  'Manufacturing': [
    "SME factory units", "Auto parts & industrial components", "Heavy Machinery",
    "Chemical/Plastic/Fabrication", "Consumer products"
  ],
  'Food Services': [
    "Restaurants", "Cloud kitchen", "Food delivery", "Cafes & Bakery", "Catering", "Franchise chains"
  ],
  'Professional Services': [
    "CA, Lawyer, Consultancy", "Marketing & Digital Agency", "HR/Recruitment",
    "Real Estate Agents", "Trainers/Coaches"
  ],
  'Logistics & Transport': [
    "Local courier", "B2B trucking", "Fleet/vehicle service", "Warehouse/distribution",
    "Inter-city delivery", "Trading & packers/movers"
  ]
};

// Constant for the writer image - Using the Genie character for a thematic agent feel
const GENIE_WRITER_IMG = "https://i.ibb.co/k60hZRq6/image.png";

const blogPosts: BlogPost[] = [
  {
    id: 'blog_1',
    industry: 'Retail & E-commerce',
    featured: true,
    title: {
      English: 'How Kirana Stores are Beating Big Tech with AI-Agentic Payment Tracking',
      Hindi: 'AI-एजेंटिक पेमेंट ट्रैकिंग के साथ किराना स्टोर कैसे बिग टेक को मात दे रहे हैं',
      Bengali: 'কিভাবে কিরানা স্টোরগুলি AI-এজেন্টিক পেমেন্ট ট্র্যাকিংয়ের মাধ্যমে বিগ টেককে পরাজিত করছে'
    },
    excerpt: {
      English: 'Discover how hyperlocal retail stores in India are recovering dues 4x faster using automated WhatsApp voice nudges.',
      Hindi: 'जानें कि कैसे भारत में हाइपरलोकल रिटेल स्टोर स्वचालित व्हाट्सएप वॉयस नडज का उपयोग करके 4 गुना तेजी से बकाया वसूल कर रहे हैं।',
      Bengali: 'দেখুন কিভাবে ভারতের হাইপারলোকাল খুচরা দোকানগুলি স্বয়ংক্রিয় হোয়াটসঅ্যাপ ভয়েস নাজের মাধ্যমে ৪ গুণ দ্রুত বকেয়া আদায় করছে।'
    },
    fullContent: {
      English: 'Hyperlocal retail in India is undergoing a massive transformation. For decades, Kirana stores struggled with credit recovery and manual ledger keeping. SimpleAgentix introduces an Agentic solution that connects directly with Tally or Vyapar. The agent identifies overdue invoices and initiates a multi-stage recovery process. \n\n1. It sends a polite WhatsApp reminder with a UPI payment link.\n2. If unpaid, it schedules an automated AI-voice call in the local language (Hindi/Bengali/English).\n3. Finally, it updates the ledger automatically once the payment is confirmed via bank sync.\n\nThis system ensures that small business owners spend 80% less time on accounting and see 4x faster cash flow.',
      Hindi: 'भारत में हाइपरलोकल रिटेल एक बड़े बदलाव से गुजर रहा है। दशकों से, किराना स्टोर क्रेडिट रिकवरी और मैनुअल लेजर कीपिंग के साथ संघर्ष करते रहे। SimpleAgentix एक ऐसा एजेंटिक समाधान पेश करता है जो सीधे टैली या व्यापार से जुड़ता है। एजेंट बकाया चालानों की पहचान करता है और बहु-चरणीय वसूली प्रक्रिया शुरू करता है। \n\nयह प्रणाली सुनिश्चित करती है कि छोटे व्यवसाय मालिक लेखांकन पर 80% कम समय व्यतीत करें और 4 गुना तेजी से नकदी प्रवाह देखें।',
      Bengali: 'ভারতে হাইপারলোকাল রিটেইল একটি বিশাল পরিবর্তনের মধ্য দিয়ে যাচ্ছে। কয়েক দশক ধরে, কিরানা স্টোরগুলি ক্রেডিট রিকভারি এবং মানচিত্রহীন লেজার রাখার জন্য লড়াই করেছে। SimpleAgentix একটি এজেন্টিক সমাধান প্রবর্তন করে যা সরাসরি ট্যালি বা ব্যাপারের সাথে সংযোগ করে। এজেন্ট বকেয়া ইনভয়েস শনাক্ত করে এবং বহু-পর্যায়ের পুনরুদ্ধার প্রক্রিয়া শুরু করে।'
    },
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    author: 'Somnath Saha',
    authorImage: GENIE_WRITER_IMG,
    authorLink: 'https://www.linkedin.com/in/somnath-saha-028538236',
    date: 'Oct 28, 2024',
    readTime: '5 min read',
    tags: ['Retail', 'Payments', 'MSME'],
    segments: ["Hyperlocal Kirana Stores", "D2C Brand", "Subscription-commerce"]
  },
  {
    id: 'blog_4',
    industry: 'Food Services',
    title: {
      English: 'Zero-Waste Cloud Kitchens: Using AI to Predict Order Spikes',
      Hindi: 'ज़ीरो-वेस्ट क्लाउड किचन: ऑर्डर स्पाइक्स का पूर्वानुमान लगाने के लिए एआई का उपयोग',
      Bengali: 'জিরো-ওয়েস্ট ক্লাউড কিচেন: অর্ডারের আধিক্য পূর্বাভাস দিতে এআই ব্যবহার'
    },
    excerpt: {
      English: 'How food tech startups in Mumbai are reducing food waste by 30% using real-time predictive analytics.',
      Hindi: 'मुंबई में फूड टेक स्टार्टअप रियल-टाइम प्रेडिक्टिव एनालिटिक्स का उपयोग करके भोजन की बर्बादी को 30% तक कैसे कम कर रहे हैं।',
      Bengali: 'মুম্বাইয়ের ফুড টেক স্টার্টআপগুলি রিয়েল-টাইম প্রেডিক্টিভ অ্যানালিটিক্স ব্যবহার করে খাবারের অপচয় ৩০% কমাচ্ছে।'
    },
    fullContent: {
      English: 'Cloud kitchens operate on razor-thin margins. The biggest drain? Inventory wastage from over-preparing. SimpleAgentix analyzes historical order patterns from Swiggy and Zomato APIs to predict specific item demand for the next 24 hours. \n\nBy automating the prep-sheet generation, kitchen managers know exactly how much onion, poultry, or dairy to prep. This AI-first approach has saved early adopters in Mumbai over ₹15,000 per month in raw material costs alone.',
      Hindi: 'क्लाउड किचन बहुत कम मार्जिन पर काम करते हैं। सबसे बड़ी बर्बादी? अधिक तैयारी से इन्वेंट्री की बर्बादी।',
      Bengali: 'ক্লাউড কিচেনগুলি খুব কম মার্জিনে চলে। সবচেয়ে বড় ক্ষতি? অতিরিক্ত প্রস্তুতির কারণে ইনভেন্টরি অপচয়।'
    },
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    author: 'Somnath Saha',
    authorImage: GENIE_WRITER_IMG,
    authorLink: 'https://www.linkedin.com/in/somnath-saha-028538236',
    date: 'Nov 02, 2024',
    readTime: '6 min read',
    tags: ['Cloud Kitchen', 'Analytics', 'F&B'],
    segments: ['Cloud kitchen', 'Quick Service Restaurants (QSR)']
  },
  {
    id: 'blog_5',
    industry: 'Logistics & Transport',
    title: {
      English: 'Last-Mile Efficiency: Automating Fleet Coordination for Tier-2 Cities',
      Hindi: 'लास्ट-माइल दक्षता: टियर-2 शहरों के लिए बेड़े समन्वय को स्वचालित करना',
      Bengali: 'লাস্ট-মাইল দক্ষতা: টিয়ার-২ শহরের জন্য ফ্লিট সমন্বয় স্বয়ংক্রিয় করা'
    },
    excerpt: {
      English: 'Route optimization agents are helping inter-city traders reduce fuel costs by 18% across West Bengal.',
      Hindi: 'रूट ऑप्टिमाइज़ेशन एजेंट पश्चिम बंगाल में अंतर-शहर व्यापारियों को ईंधन लागत 18% कम करने में मदद कर रहे हैं।',
      Bengali: 'রুট অপ্টিমাইজেশন এজেন্টগুলি পশ্চিমবঙ্গ জুড়ে আন্তঃশহর ব্যবসায়ীদের জ্বালানি খরচ ১৮% কমাতে সাহায্য করছে।'
    },
    fullContent: {
      English: 'Tier-2 and Tier-3 cities in India present unique logistical challenges like unmapped routes and sudden closures. SimpleAgentix Logistics Agent syncs with driver GPS and traffic data to provide dynamic rerouting instructions via voice-first WhatsApp updates. \n\nInstead of manual calling to check vehicle status, the agent auto-alerts the trader when the truck enters the destination geofence. This eliminates "where is my truck" anxiety and boosts delivery speed by 25%.',
      Hindi: 'भारत में टियर-2 और टियर-3 शहर अनोखी लॉजिस्टिक चुनौतियां पेश करते हैं।',
      Bengali: 'ভারতের টিয়ার-২ এবং টিয়ার-৩ শহরগুলি মানচিত্রহীন রুট এবং আকস্মিক বন্ধের মতো অনন্য লজিস্টিক্যাল চ্যালেঞ্জ তৈরি করে।'
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    author: 'Prateek Chaturvedi',
    authorImage: GENIE_WRITER_IMG,
    authorLink: '#',
    date: 'Oct 30, 2024',
    readTime: '8 min read',
    tags: ['Logistics', 'GPS', 'SME'],
    segments: ['Inter-city delivery', 'B2B trucking']
  },
  {
    id: 'blog_2',
    industry: 'Manufacturing',
    title: {
      English: 'Stopping the Leak: Preventing Stockouts in SME Factories with Predictive AI',
      Hindi: 'लीक रोकना: प्रेडिक्टिव एआई के साथ एसएमई कारखानों में स्टॉकआउट को रोकना',
      Bengali: 'ক্ষতি রোধ: প্রেডিক্টিভ এআই-এর মাধ্যমে SME কারখানায় স্টকআউট প্রতিরোধ করা'
    },
    excerpt: {
      English: 'Industrial units in Pune and Bengaluru are now predicting raw material shortages before they happen.',
      Hindi: 'पुणे और बेंगलुरु में औद्योगिक इकाइयां अब कच्चे माल की कमी होने से पहले ही उसकी भविष्यवाणी कर रही हैं।',
      Bengali: 'পুনে এবং বেঙ্গালুরুর শিল্প ইউনিটগুলি এখন কাঁচামালের ঘাটতি হওয়ার আগেই তা পূর্বাভাস দিচ্ছে।'
    },
    fullContent: {
      English: 'Stockouts are the silent killers of productivity in SME manufacturing. Traditional inventory systems are reactive. SimpleAgentix uses Predictive AI to scan production logs and sales trends simultaneously. \n\nThe agent calculates "Burn Rates" for raw materials and automatically scouts for vendors on IndiaMART when stock hits a critical threshold. It doesn\'t just alert; it drafts a Purchase Order for your approval. Factories in Pune have reported a 22% increase in output efficiency by simply never running out of essential components.',
      Hindi: 'एसएमई विनिर्माण में स्टॉकआउट उत्पादकता के मूक हत्यारे हैं।',
      Bengali: 'SME ম্যানুফ্যাকচারিংয়ে স্টকআউট হল প্রোডাক্টিভিটির নীরব ঘাতক। ঐতিহ্যগত ইনভেন্টরি সিস্টেম প্রতিক্রিয়াশীল।'
    },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    author: 'Prateek Chaturvedi',
    authorImage: GENIE_WRITER_IMG,
    authorLink: '#',
    date: 'Oct 25, 2024',
    readTime: '7 min read',
    tags: ['Industry 4.0', 'Inventory', 'SME'],
    segments: ['SME factory units', 'Auto parts & industrial components']
  },
  {
    id: 'blog_3',
    industry: 'Professional Services',
    title: {
      English: 'CAs and Lawyers: Automating GST Filing with Zero Manual Data Entry',
      Hindi: 'सीए और वकील: शून्य मैनुअल डेटा एंट्री के साथ जीएसटी फाइलिंग को स्वचालित करना',
      Bengali: 'CA এবং আইনজীবী: জিরো ম্যানুয়াল ডেটা এন্ট্রির মাধ্যমে জিএসটি ফাইলিং অটোমেট করা'
    },
    excerpt: {
      English: 'How professional consultancy firms are saving 40+ hours a month by using AI to sync Tally directly with compliance agents.',
      Hindi: 'कैसे पेशेवर परामर्श फर्में टैली को सीधे अनुपालन एजेंटों के साथ सिंक करने के लिए एआई का उपयोग करके महीने में 40+ घंटे बचा रही हैं।',
      Bengali: 'পেশাদার কনসালটেন্সি ফার্মগুলি এআই ব্যবহার করে ট্যালিকে সরাসরি কমপ্লায়েন্স এজেন্টদের সাথে সিঙ্ক করে মাসে ৪০+ ঘণ্টা সময় বাঁচাচ্ছে।'
    },
    fullContent: {
      English: 'For Professional Services, data entry is a non-billable nightmare. SimpleAgentix allows CA firms and Legal consultancies to automate the "Compliance Loop." By utilizing our agent, firms can auto-extract invoice data from email attachments, categorize them based on HSN codes, and sync them with Vyapar or Tally in real-time. \n\nThis effectively creates a "Self-Filing" ecosystem where the human expert only steps in for the final verification. This shift allows firms to take on 3x more clients without increasing headcount.',
      Hindi: 'पेशावर सेवाओं के लिए, डेटा एंट्री एक नॉन-बीलेबल दुःखद सपना है।',
      Bengali: 'পেশাদার পরিষেবার জন্য, ডেটা এন্ট্রি একটি নন-বিলেবল দুঃস্বপ্ন। SimpleAgentix CA ফার্ম এবং আইনি পরামর্শদাতাদের "কমপ্লায়েন্স লুপ" অটোমেট করার অনুমতি দেয়।'
    },
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    author: 'Somnath Saha',
    authorImage: GENIE_WRITER_IMG,
    authorLink: 'https://www.linkedin.com/in/somnath-saha-028538236',
    date: 'Oct 20, 2024',
    readTime: '6 min read',
    tags: ['GST', 'Compliance', 'Automation'],
    segments: ['CA, Lawyer, Consultancy', 'HR/Recruitment']
  }
];

// Refined Dynamic Read Time Stats
const getReadTimeStats = (readTimeStr: string) => {
    const mins = parseInt(readTimeStr.split(' ')[0]) || 5;
    let colorClass = 'text-emerald-500';
    let bgClass = 'bg-emerald-500/10';
    let ringClass = 'ring-emerald-500/20';
    let pulseClass = '';
    let intensity = (mins / 10) * 100;

    if (mins < 5) {
        colorClass = 'text-emerald-500';
        bgClass = 'bg-emerald-500/10';
        ringClass = 'ring-emerald-500/20';
    } else if (mins < 8) {
        colorClass = 'text-vibrant-orange';
        bgClass = 'bg-vibrant-orange/10';
        ringClass = 'ring-vibrant-orange/20';
        pulseClass = 'animate-pulse';
    } else {
        colorClass = 'text-rose-500';
        bgClass = 'bg-rose-500/10';
        ringClass = 'ring-rose-500/20';
        pulseClass = 'animate-[pulse_1.5s_infinite]';
    }

    return { mins, colorClass, bgClass, ringClass, pulseClass, intensity: Math.min(intensity, 100) };
};

const ReadTimeBadge: React.FC<{ readTime: string; className?: string }> = ({ readTime, className = "" }) => {
    const { colorClass, bgClass, ringClass, pulseClass, intensity } = getReadTimeStats(readTime);
    
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${bgClass} ring-1 ${ringClass} transition-all duration-500 group-hover:scale-105`}>
                <Clock className={`w-3.5 h-3.5 ${colorClass} ${pulseClass}`} />
                <span className={`text-[10px] font-black uppercase tracking-tight ${colorClass}`}>
                    {readTime}
                </span>
            </div>
            {/* Visual Intensity Bar with Shimmer */}
            <div className="h-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden relative">
                <div 
                    className={`h-full transition-all duration-1000 ease-out relative ${colorClass.replace('text', 'bg')}`} 
                    style={{ width: `${intensity}%` }}
                >
                   {/* Shimmer overlay for longer reads */}
                   {intensity > 60 && (
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite] -skew-x-12"></div>
                   )}
                </div>
            </div>
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%); }
                    100% { transform: translateX(150%); }
                }
            `}</style>
        </div>
    );
};

export const BlogsSection: React.FC<{ language: 'English' | 'Hindi' | 'Bengali' }> = ({ language }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [sharingPost, setSharingPost] = useState<BlogPost | null>(null);
  const [copying, setCopying] = useState(false);

  const industries = [...new Set(blogPosts.map(post => post.industry))];
  
  const currentSegments = selectedIndustry 
    ? INDUSTRY_SEGMENTS[selectedIndustry] || []
    : [];

  const filteredPosts = blogPosts.filter(post => {
    const industryMatch = !selectedIndustry || post.industry === selectedIndustry;
    const segmentMatch = !selectedSegment || post.segments.includes(selectedSegment);
    return industryMatch && segmentMatch;
  });

  const handleIndustryChange = (industry: string | null) => {
    setSelectedIndustry(industry);
    setSelectedSegment(null);
  };

  const handleSegmentToggle = (segment: string) => {
    setSelectedSegment(prev => prev === segment ? null : segment);
  };

  const getTranslation = (post: BlogPost, field: 'title' | 'excerpt' | 'fullContent') => {
    return post[field][language] || post[field]['English'];
  };

  const handleShare = (platform: string, post: BlogPost) => {
    const title = getTranslation(post, 'title');
    const excerpt = getTranslation(post, 'excerpt');
    const url = window.location.href;
    
    // Construct pre-filled message with excerpt
    const shareMessage = `${title}\n\n"${excerpt}"`;
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = '';

    switch(platform) {
      case 'linkedin': 
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`; 
        break;
      case 'twitter': 
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`; 
        break;
      case 'whatsapp': 
        shareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`; 
        break;
      case 'facebook': 
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`; 
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const handleNicheClick = (niche: string, industry: string) => {
      const virtualPost: BlogPost = {
          id: `virtual_${niche.replace(/\s+/g, '_')}`,
          industry: industry,
          title: {
              English: `Specialized AI Automation Strategy for ${niche}`,
              Hindi: `${niche} के लिए विशेष एआई ऑटोमेशन रणनीति`,
              Bengali: `${niche} এর জন্য বিশেষ এআই অটোমেশন কৌশল`
          },
          excerpt: {
              English: `Deep dive into how Agentic workflows specifically optimize ${niche} operations in the modern Indian market.`,
              Hindi: `आधुनिक भारतीय बाजार में एजेंटिक कार्यप्रवाह विशेष रूप से ${niche} संचालन को कैसे अनुकूलित करते हैं, इसके बारे में गहराई से जानें।`,
              Bengali: `আধুনিক ভারতীয় বাজারে এজেন্টিক ওয়ার্কফ্লোগুলি কীভাবে বিশেষভাবে ${niche} ক্রিয়াকলাপগুলিকে অপ্টিমাইজ করে তা গভীরভাবে দেখুন।`
          },
          fullContent: {
              English: `Operating in the ${niche} sector requires a unique set of tools and business logic. SimpleAgentix addresses the core bottlenecks of ${niche} by deploying specialized agents that understand your domain. \n\nKey Automation Pillars for ${niche}: \n1. Vernacular Voice Controls for manual data entry reduction. \n2. Cross-platform sync between existing ERPs and WhatsApp. \n3. Autonomous decision making for recurring inventory or payment tasks. \n\nBy adopting a niche-first automation strategy, ${niche} businesses can achieve up to 300% growth in efficiency while maintaining low overhead costs.`,
              Hindi: `${niche} क्षेत्र में संचालन के लिए उपकरणों और व्यावसायिक तर्क के एक अनूठे सेट की आवश्यकता होती है।`,
              Bengali: `${niche} সেক্টরে কাজ করার জন্য সরঞ্জাম এবং ব্যবসায়িক যুক্তির একটি অনন্য সেট প্রয়োজন।`
          },
          image: blogPosts.find(p => p.industry === industry)?.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          author: 'SimpleAgentix Strategy Team',
          authorImage: GENIE_WRITER_IMG,
          date: 'Updated Today',
          readTime: '4 min read',
          tags: [niche, 'Strategy', 'Automation'],
          segments: INDUSTRY_SEGMENTS[industry] || []
      };
      setSelectedPost(virtualPost);
  };

  const sectionHeaders = {
    English: { title: "SimpleAgentix Blogs", subtitle: "Expert insights for Indian MSMEs", follow: "Follow", readMore: "Read Full Article", segments: "Industry Segments", allPosts: "All Posts", filterBy: "Filter by Segment", nicheWorkflows: "Associated Niche Workflows", sharePost: "Share this Post", featured: "Featured Article", readMoreBtn: "Read More" },
    Hindi: { title: "SimpleAgentix ब्लॉग", subtitle: "भारतीय MSMEs के लिए विशेषज्ञ जानकारी", follow: "फॉलो", readMore: "पूरा लेख पढ़ें", segments: "उद्योग सेगमेंट", allPosts: "सभी पोस्ट", filterBy: "सेगमेंट द्वारा फिल्टर", nicheWorkflows: "संबद्ध आला कार्यप्रवाह", sharePost: "इस पोस्ट को साझा करें", featured: "विशेष लेख", readMoreBtn: "और पढ़ें" },
    Bengali: { title: "SimpleAgentix ব্লগ", subtitle: "ভারতীয় MSMEs-এর জন্য বিশেষজ্ঞ অন্তর্দৃষ্টি", follow: "অনুসরণ", readMore: "সম্পূর্ণ নিবন্ধটি পড়ুন", segments: "শিল্প সেগমেন্ট", allPosts: "সমস্ত পোস্ট", filterBy: "সেগমেন্ট দ্বারা ফিল্টার", nicheWorkflows: "সংশ্লিষ্ট কুল ওয়ার্কফ্লো", sharePost: "এই পোস্টটি শেয়ার করুন", featured: "বিশেষ নিবন্ধ", readMoreBtn: "আরো পড়ুন" }
  };

  const headers = sectionHeaders[language] || sectionHeaders['English'];

  return (
    <section id="blogs" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden transition-colors duration-300 border-t border-slate-100 dark:border-slate-800">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Industry Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4 tracking-tight leading-tight">
              {headers.title}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {headers.subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end">
            <button 
              onClick={() => handleIndustryChange(null)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${!selectedIndustry ? 'bg-vibrant-orange border-vibrant-orange text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200'}`}
            >
              {headers.allPosts}
            </button>
            {industries.map(industry => (
              <button 
                key={industry}
                onClick={() => handleIndustryChange(industry)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedIndustry === industry ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {selectedIndustry && (
            <div className="flex flex-col gap-4 mb-10 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all duration-500">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mr-2">
                        <Filter className="w-4 h-4 text-emerald-500" /> {headers.filterBy}:
                    </span>
                    {selectedSegment && (
                        <button onClick={() => setSelectedSegment(null)} className="text-[10px] font-bold text-vibrant-orange hover:underline uppercase tracking-widest">Clear Segment Filter</button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {currentSegments.map((seg, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleSegmentToggle(seg)}
                            className={`px-4 py-2 text-[10px] font-bold rounded-xl border transition-all duration-300 shadow-sm ${
                                selectedSegment === seg 
                                ? 'bg-vibrant-orange border-vibrant-orange text-white shadow-lg' 
                                : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                        >
                            {seg}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className={`group bg-white dark:bg-[#1e293b] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer ${post.featured ? 'ring-2 ring-emerald-500/20' : ''}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={getTranslation(post, 'title')} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Industry & Featured Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {post.industry}
                  </span>
                  {post.featured && (
                     <span className="px-3 py-1 bg-emerald-500 text-navy-900 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-2.5 h-2.5" /> {headers.featured}
                     </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.segments.map((s, i) => (
                            <span key={i} className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight ${selectedSegment === s ? 'bg-white text-navy-900' : 'bg-emerald-500 text-navy-900'}`}>{s}</span>
                        ))}
                    </div>
                    <div className="flex items-center justify-center bg-white/20 backdrop-blur-lg p-2.5 rounded-full border border-white/30 text-white w-12 h-12 self-center">
                        <Maximize2 className="w-6 h-6" />
                    </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  </div>
                  <ReadTimeBadge readTime={post.readTime} className="w-28" />
                </div>

                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-emerald-500 transition-colors">
                  {getTranslation(post, 'title')}
                </h3>
                
                <div className="mb-8">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed inline">
                    {getTranslation(post, 'excerpt')}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                    className="ml-2 text-xs font-bold text-vibrant-orange hover:text-orange-600 hover:underline transition-all"
                  >
                    {headers.readMoreBtn}...
                  </button>
                </div>

                {/* Bottom Profile & Action Section */}
                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-6">
                  <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 group/author cursor-pointer" title="View Author Profile">
                      <div className="relative">
                          <img 
                            src={post.authorImage} 
                            alt={post.author} 
                            className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-md group-hover/author:scale-105 transition-transform bg-white"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" strokeWidth={4} />
                          </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-navy-900 dark:text-slate-300 group-hover/author:text-emerald-500 transition-colors">{post.author}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Verified Strategist</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSharingPost(post);
                        }} 
                        className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 border border-slate-100 dark:border-slate-700 transition-all shadow-sm"
                        title="Share this Post"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Explicit Read More Button at Bottom */}
                  <div className="w-full flex items-center justify-center py-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl group-hover:bg-vibrant-orange transition-all duration-300 border border-slate-100 dark:border-slate-700 group-hover:border-vibrant-orange">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 group-hover:text-white flex items-center gap-2">
                        {headers.readMore} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* SHARE MODAL */}
      {sharingPost && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black text-navy-900 dark:text-white uppercase tracking-tight">{headers.sharePost}</h3>
                   <button onClick={() => setSharingPost(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                     <X className="w-5 h-5 text-slate-400" />
                   </button>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => handleShare('whatsapp', sharingPost)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 hover:border-green-500 transition-all group"
                  >
                    <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                       <div className="text-sm font-bold text-navy-900 dark:text-white">WhatsApp</div>
                       <div className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Share with your network</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button 
                    onClick={() => handleShare('linkedin', sharingPost)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 hover:border-blue-500 transition-all group"
                  >
                    <div className="p-3 bg-[#0077b5] text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                       <div className="text-sm font-bold text-navy-900 dark:text-white">LinkedIn</div>
                       <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Post to professional feed</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button 
                    onClick={() => handleShare('twitter', sharingPost)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-navy-900 transition-all group"
                  >
                    <div className="p-3 bg-black text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <Twitter className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                       <div className="text-sm font-bold text-navy-900 dark:text-white">Twitter / X</div>
                       <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tweet to your followers</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl">
                      <div className="flex-1 px-3 py-2 text-xs font-mono text-slate-400 truncate select-all">{window.location.href}</div>
                      <button 
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${copying ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-navy-900 dark:text-white hover:bg-slate-100 border border-slate-200 dark:border-slate-700'}`}
                      >
                        {copying ? <><Check className="w-3.5 h-3.5"/> Copied</> : <><Copy className="w-3.5 h-3.5"/> Copy Link</>}
                      </button>
                   </div>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* FULL POST MODAL */}
      {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/95 backdrop-blur-md transition-all duration-500">
              <div className="relative w-full max-w-5xl bg-white dark:bg-[#1e293b] rounded-[3.5rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-700 transition-all duration-500 transform scale-100">
                  
                  <div className="absolute top-8 right-8 z-[110] flex gap-3">
                      <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSharingPost(selectedPost);
                          }}
                          className="p-3 bg-white/10 hover:bg-emerald-500 text-white rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg"
                          title="Share Post"
                      >
                          <Share2 className="w-6 h-6" />
                      </button>
                      <button 
                          onClick={() => setSelectedPost(null)}
                          className="p-3 bg-navy-900/40 hover:bg-navy-900/60 text-white rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>

                  <div className="overflow-y-auto flex-1 scrollbar-hide">
                      <div className="relative h-80 md:h-[450px] w-full">
                          <img src={selectedPost.image} alt={getTranslation(selectedPost, 'title')} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/20 to-transparent"></div>
                          <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16">
                              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                                  <div className="flex flex-col gap-4">
                                      <div className="flex items-center gap-3">
                                          <span className="px-4 py-1.5 bg-emerald-500 text-navy-900 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                                              {selectedPost.industry}
                                          </span>
                                      </div>
                                      <h2 className="text-3xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl">
                                          {getTranslation(selectedPost, 'title')}
                                      </h2>
                                  </div>
                                  <div className="flex items-center gap-4 bg-white/10 p-5 rounded-[2rem] backdrop-blur-xl border border-white/10 shadow-2xl">
                                      <ReadTimeBadge readTime={selectedPost.readTime} className="w-40" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="p-8 md:p-16 lg:px-24">
                          <div className="flex flex-wrap items-center gap-10 mb-12 pb-10 border-b border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-full border-2 border-emerald-500 overflow-hidden shadow-xl shadow-orange-500/20 bg-white">
                                      <img src={selectedPost.authorImage} alt={selectedPost.author} className="w-full h-full object-contain" />
                                  </div>
                                  <div>
                                      <div className="text-base font-bold text-navy-900 dark:text-white">{selectedPost.author}</div>
                                      <div className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">SimpleAgentix Strategy Lead</div>
                                  </div>
                              </div>
                          </div>

                          <div className="prose prose-lg dark:prose-invert max-w-none">
                              <div className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-wrap">
                                  {getTranslation(selectedPost, 'fullContent')}
                              </div>
                          </div>

                          {/* DYNAMIC ASSOCIATED NICHE WORKFLOWS SECTION */}
                          <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-3 mb-8">
                                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                                      <Sparkles className="w-6 h-6" />
                                  </div>
                                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">{headers.nicheWorkflows}</h4>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {(INDUSTRY_SEGMENTS[selectedPost.industry] || []).map((seg, i) => (
                                      <button 
                                          key={i} 
                                          onClick={() => handleNicheClick(seg, selectedPost.industry)}
                                          className={`group px-6 py-5 rounded-[2rem] border transition-all duration-500 text-left flex flex-col gap-2 relative overflow-hidden ${
                                              selectedPost.id.includes(seg.replace(/\s+/g, '_')) 
                                              ? 'bg-emerald-500 border-emerald-400 text-navy-950 shadow-xl shadow-emerald-500/20 scale-[1.02]' 
                                              : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                                          }`}
                                      >
                                          <div className="flex items-center justify-between">
                                              <div className={`w-2 h-2 rounded-full transition-colors ${selectedPost.id.includes(seg.replace(/\s+/g, '_')) ? 'bg-navy-950' : 'bg-emerald-500'}`}></div>
                                              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedPost.id.includes(seg.replace(/\s+/g, '_')) ? 'text-navy-950' : 'text-slate-400'}`} />
                                          </div>
                                          <span className={`text-xs font-bold leading-tight ${selectedPost.id.includes(seg.replace(/\s+/g, '_')) ? 'text-navy-950' : 'text-navy-900 dark:text-white'}`}>
                                              {seg}
                                          </span>
                                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                              <Zap className="w-12 h-12" />
                                          </div>
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="mt-20 p-10 bg-navy-900 rounded-[2.5rem] text-center relative overflow-hidden">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Want a custom solution for your {selectedPost.industry} business?</h3>
                              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                                  <button onClick={() => setSelectedPost(null)} className="px-8 py-4 bg-white text-navy-900 font-bold rounded-2xl text-sm transition-all hover:scale-105 active:scale-95">Return to Blogs</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};

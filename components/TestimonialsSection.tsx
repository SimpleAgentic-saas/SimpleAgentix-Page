import React, { useState } from 'react';
import { Star, User, Send, MessageSquare, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  source: 'Google' | 'Website';
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Retail Chain Owner",
    rating: 5,
    comment: "SimpleAgentix automated my entire inventory tracking. I used to spend 2 hours daily on Excel, now I just get a WhatsApp summary. Incredible!",
    date: "2 days ago",
    source: "Google"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Marketing Lead",
    rating: 5,
    comment: "The multi-language support is a game changer for our regional teams. The AI understands Hindi voice notes perfectly.",
    date: "1 week ago",
    source: "Google"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Startup Founder",
    rating: 4,
    comment: "Setup was surprisingly easy. The integration with our existing CRM took less than 10 minutes. Highly recommended for small teams.",
    date: "2 weeks ago",
    source: "Website"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(),
        name: name || "Anonymous User",
        role: "Verified Customer",
        rating: newRating,
        comment: comment,
        date: "Just now",
        source: "Website"
      };

      setReviews([newReview, ...reviews]);
      setName('');
      setComment('');
      setNewRating(0);
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
      />
    ));
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Google Rating Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-6 py-2 shadow-sm mb-6 hover:shadow-md transition-all cursor-default">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
            </div>
            <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Google Rating</span>
                <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-navy-900 dark:text-white">4.9</span>
                    <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400"/>)}
                    </div>
                </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">Loved by Businesses</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            See what our customers are saying about their automation journey with SimpleAgentix.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Reviews List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-vibrant-orange" />
                        Recent Feedback
                     </h3>
                     <span className="text-sm text-slate-400">{reviews.length} reviews</span>
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-navy-900 dark:text-white">{review.name}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">{review.role}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                    {review.source === 'Google' && <span className="text-[10px] font-bold text-slate-400 mr-1">G</span>}
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-bold text-navy-900 dark:text-white">{review.rating}.0</span>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">"{review.comment}"</p>
                            <div className="text-xs text-slate-400 flex items-center gap-2">
                                <span>{review.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified User</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Review Form */}
            <div className="bg-navy-900 dark:bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
                    <p className="text-slate-300 text-sm mb-6">Your feedback helps us improve our agents.</p>

                    {showSuccess ? (
                        <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center animate-in fade-in zoom-in">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ThumbsUp className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                            <p className="text-green-100">Your review has been submitted successfully.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star 
                                                className={`w-8 h-8 transition-colors ${
                                                    star <= (hoverRating || newRating) 
                                                        ? 'fill-yellow-400 text-yellow-400' 
                                                        : 'text-slate-600 hover:text-yellow-400'
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="h-4 mt-1">
                                    {newRating > 0 && <span className="text-xs text-yellow-400 font-medium">
                                        {newRating === 5 ? "Excellent!" : newRating >= 4 ? "Great!" : "Thanks for feedback"}
                                    </span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                    <input 
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Comment</label>
                                <textarea 
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us what you liked..."
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-none"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting || newRating === 0}
                                className="w-full bg-vibrant-green hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
                            >
                                {isSubmitting ? 'Submitting...' : (
                                    <>
                                        Submit Feedback <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

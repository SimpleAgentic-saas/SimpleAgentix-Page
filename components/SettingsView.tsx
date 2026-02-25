
import React, { useState } from 'react';
/* Added AlertTriangle to the lucide-react imports */
import { User, Bell, LayoutGrid, Save, CheckCircle2, Search, Plus, Trash2, Smartphone, Mail, Globe, MapPin, Shield, MessageCircle, FileText, Activity, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

const INDIAN_APPS = [
  { id: 'tally', name: 'Tally Prime', category: 'Accounting', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Tally_Prime_Logo.png' },
  { id: 'vyapar', name: 'Vyapar', category: 'Accounting', icon: 'https://vyapar-website-images.s3.ap-south-1.amazonaws.com/logo.png' },
  { id: 'zoho', name: 'Zoho Books', category: 'Accounting', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Zoho_Books_logo.png' },
  { id: 'whatsapp', name: 'WhatsApp Business', category: 'Communication', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
  { id: 'gmail', name: 'Gmail', category: 'Communication', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg' },
  { id: 'shopify', name: 'Shopify', category: 'E-Commerce', icon: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/shopify_logo_icon_169822.png' },
  { id: 'amazon', name: 'Amazon Seller', category: 'Marketplace', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png' },
  { id: 'flipkart', name: 'Flipkart Seller', category: 'Marketplace', icon: 'https://pbs.twimg.com/profile_images/1267367332213735424/k_1oKzwP_400x400.jpg' },
  { id: 'indiamart', name: 'IndiaMART', category: 'B2B', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Indiamart-Logo.png' },
  { id: 'razorpay', name: 'Razorpay', category: 'Payments', icon: 'https://avatars.githubusercontent.com/u/7713209?s=280&v=4' },
];

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onSave }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'apps'>('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Local State for Forms
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email || '',
    phone: '+91 98765 43210',
    company: 'TechFlow Solutions',
    gstin: '29ABCDE1234F1Z5',
    location: user.location || { state: 'Karnataka', city: 'Bengaluru', zipCode: '560001', country: 'India' }
  });

  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    whatsappAlerts: true,
    weeklyReport: true,
    securityAlerts: true,
    marketing: false
  });

  const [connectedApps, setConnectedApps] = useState<string[]>(user.connectedApps || ['whatsapp', 'gmail']);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSave({
          name: profileData.name,
          location: profileData.location,
          connectedApps
      });
    }, 1500);
  };

  const toggleApp = (id: string) => {
    setConnectedApps(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in zoom-in duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Global Settings</h2>
            <p className="text-slate-400">Manage your profile, preferences, and integrations.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-vibrant-green hover:bg-emerald-500 text-navy-900 font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></div> : <Save className="w-5 h-5" />}
            {success ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-700 mb-8">
          {[
            { id: 'profile', label: 'Profile & Business', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'apps', label: 'Apps & Integrations', icon: LayoutGrid },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors font-bold text-sm ${
                activeTab === tab.id 
                ? 'border-vibrant-orange text-vibrant-orange' 
                : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-8 shadow-xl">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex items-center gap-6 pb-8 border-b border-slate-700">
                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white border-4 border-[#0f172a] shadow-lg">
                  {profileData.name.charAt(0)}
                </div>
                <div>
                  <button className="text-sm font-bold text-vibrant-orange hover:underline mb-2">Change Avatar</button>
                  <p className="text-xs text-slate-500">Allowed formats: JPG, PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-vibrant-orange"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="email" 
                      value={profileData.email}
                      disabled
                      className="w-full bg-[#0f172a]/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-vibrant-orange"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Name</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={profileData.company}
                      onChange={e => setProfileData({...profileData, company: e.target.value})}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-vibrant-orange"
                    />
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">GSTIN (Optional)</label>
                  <input 
                    type="text" 
                    value={profileData.gstin}
                    onChange={e => setProfileData({...profileData, gstin: e.target.value})}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-vibrant-orange font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-vibrant-orange" /> Location Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    placeholder="City" 
                    value={profileData.location.city}
                    onChange={e => setProfileData({...profileData, location: {...profileData.location, city: e.target.value}})}
                    className="bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-vibrant-orange"
                  />
                  <input 
                    placeholder="State" 
                    value={profileData.location.state}
                    onChange={e => setProfileData({...profileData, location: {...profileData.location, state: e.target.value}})}
                    className="bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-vibrant-orange"
                  />
                  <input 
                    placeholder="Zip Code" 
                    value={profileData.location.zipCode}
                    onChange={e => setProfileData({...profileData, location: {...profileData.location, zipCode: e.target.value}})}
                    className="bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-vibrant-orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="pb-4 border-b border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Notification Preferences</h3>
                <p className="text-sm text-slate-400">Control how and when you receive updates from SimpleAgentix.</p>
              </div>

              <div className="space-y-6 max-w-3xl">
                {/* Email Alerts Toggle */}
                <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 mt-1">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Email Alerts</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive critical workflow statuses, invoice summaries, and task completions directly to your inbox.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifSettings({...notifSettings, emailAlerts: !notifSettings.emailAlerts})}
                    className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${notifSettings.emailAlerts ? 'bg-vibrant-green shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${notifSettings.emailAlerts ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* WhatsApp Notifications Toggle */}
                <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 mt-1">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">WhatsApp Notifications</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Get instant real-time alerts for high-priority events like payment delays or stock shortages on your registered number.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifSettings({...notifSettings, whatsappAlerts: !notifSettings.whatsappAlerts})}
                    className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${notifSettings.whatsappAlerts ? 'bg-vibrant-green shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${notifSettings.whatsappAlerts ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* Weekly Business Digest Toggle */}
                <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 mt-1">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Weekly Business Digest</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Every Monday, receive a consolidated report of your operational ROI, coins consumed, and time saved by SimpleAgentix.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifSettings({...notifSettings, weeklyReport: !notifSettings.weeklyReport})}
                    className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${notifSettings.weeklyReport ? 'bg-vibrant-green shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${notifSettings.weeklyReport ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* Security Alerts Toggle */}
                <div className="flex items-center justify-between p-5 rounded-[1.5rem] bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500 mt-1">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Security Alerts</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Immediate notification for new logins, unusual IP access, and integration credential failures.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifSettings({...notifSettings, securityAlerts: !notifSettings.securityAlerts})}
                    className={`w-14 h-7 rounded-full transition-all relative shrink-0 ${notifSettings.securityAlerts ? 'bg-vibrant-green shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${notifSettings.securityAlerts ? 'left-8' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center gap-4">
                  <AlertTriangle className="w-10 h-10 text-vibrant-orange opacity-40 shrink-0" />
                  <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
                      *Disabling high-priority WhatsApp notifications may lead to delays in identifying critical operational stockouts or payment recovery issues. We recommend keeping them enabled for the best agentic experience.
                  </p>
              </div>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'apps' && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center mb-8">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    placeholder="Search apps..." 
                    className="bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-vibrant-orange w-full md:w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-bold text-slate-500 bg-[#0f172a] px-3 py-1.5 rounded-lg border border-slate-800">{connectedApps.length} Connected</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INDIAN_APPS.map(app => {
                  const isConnected = connectedApps.includes(app.id);
                  return (
                    <div key={app.id} className={`p-5 rounded-2xl border transition-all ${isConnected ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-[#0f172a] border-slate-800 hover:border-slate-600'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl p-2 flex items-center justify-center">
                          <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                          {isConnected ? 'Active' : 'Not Linked'}
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-white mb-1">{app.name}</h4>
                      <p className="text-xs text-slate-500 mb-6">{app.category}</p>
                      
                      <button 
                        onClick={() => toggleApp(app.id)}
                        className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          isConnected 
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
                          : 'bg-white text-navy-900 hover:bg-slate-200'
                        }`}
                      >
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { User, Bell, LayoutGrid, Save, CheckCircle2, Search, Plus, Trash2, Smartphone, Mail, Globe, MapPin, Shield, MessageCircle, FileText, Activity, AlertTriangle, Folder, File as FileIcon, CreditCard, Users, Briefcase, Edit2, UploadCloud, X, Loader2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { auth, db, storage } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

interface FolderType { id: string; name: string; createdAt: any; }
interface FileType { id: string; name: string; folderId?: string; size: number; fileUrl: string; createdAt: any; }
interface NoteType { id: string; title: string; content: string; createdAt: any; }
interface TeamMemberType { id: string; name: string; role: string; createdAt: any; }
interface BankAccountType { id: string; bankName: string; accountNumber: string; ifscCode: string; customerId: string; cardLast4: string; upiId: string; createdAt: any; }
interface BusinessInfoType { businessType: string; businessName: string; jobTitle: string; businessAge: string; teamSize: string; }

const BUSINESS_TYPES = ['Retail', 'Ecommerce', 'Food', 'Beverage', 'Transportation', 'Logistics', 'Beauty', 'Professional_Services', 'Healthcare', 'Automotive'];

export const UserProfileDashboard: React.FC<{ user: UserProfile; onSave: (data: any) => void }> = ({ user, onSave }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'personal' | 'files' | 'notes' | 'team' | 'business' | 'banking'>('overview');
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [personalInfo, setPersonalInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    mobileNumber: user.mobileNumber || '',
    address: user.address || '',
    city: user.location?.city || '',
    state: user.location?.state || '',
    zipCode: user.location?.zipCode || '',
    profilePic: user.profilePic || ''
  });

  const [folders, setFolders] = useState<FolderType[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccountType[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoType | null>(null);
  const [plan, setPlan] = useState('Free');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Modal States
  const [modalState, setModalState] = useState<{
    type: 'folder' | 'file' | 'note' | 'team' | 'business' | 'bank' | null;
    data?: any;
  }>({ type: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const uid = currentUser.uid;
    setLoading(true);
    try {
      // Ensure user document exists
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: currentUser.displayName || user.name,
          email: currentUser.email,
          createdAt: serverTimestamp(),
          plan: 'Free'
        }, { merge: true });
      } else {
        const data = userDoc.data();
        setPersonalInfo({
          name: data.name || user.name || '',
          email: data.email || currentUser.email || '',
          mobileNumber: data.mobileNumber || '',
          address: data.address || '',
          city: data.location?.city || '',
          state: data.location?.state || '',
          zipCode: data.location?.zipCode || '',
          profilePic: data.profilePic || ''
        });
        setBusinessInfo({
          businessType: data.businessType || '',
          businessName: data.businessName || '',
          jobTitle: data.jobTitle || '',
          businessAge: data.businessAge || '',
          teamSize: data.teamSize || ''
        });
        setPlan(data.plan || 'Free');
      }

      // Fetch subcollections with individual try-catch to prevent total failure
      const fetchCollection = async (name: string) => {
        try {
          const snap = await getDocs(collection(db, `users/${uid}/${name}`));
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch (err) {
          console.error(`Error fetching ${name}:`, err);
          return [];
        }
      };

      const [foldersData, filesData, notesData, teamData, banksData] = await Promise.all([
        fetchCollection('folders'),
        fetchCollection('files'),
        fetchCollection('notes'),
        fetchCollection('teamMembers'),
        fetchCollection('bankAccounts')
      ]);

      setFolders(foldersData as FolderType[]);
      setFiles(filesData as FileType[]);
      setNotes(notesData as NoteType[]);
      setTeamMembers(teamData as TeamMemberType[]);
      setBankAccounts(banksData as BankAccountType[]);

    } catch (e) {
      console.error("General fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const maskString = (str: string, visibleCount: number = 4) => {
    if (!str) return '';
    if (str.length <= visibleCount) return str;
    return '*'.repeat(str.length - visibleCount) + str.slice(-visibleCount);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleDelete = async (collectionName: string, id: string, fileUrl?: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/${collectionName}`, id));
      if (fileUrl) {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef).catch(console.error);
      }
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  // Modals
  const renderUpgradeModal = () => {
    if (!isUpgradeModalOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 p-8 text-center">
          <div className="w-20 h-20 bg-vibrant-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-vibrant-orange" />
          </div>
          <h3 className="text-2xl font-black text-white mb-4">Add Coin</h3>
          <p className="text-slate-400 mb-8">
            Upgrade your account to unlock unlimited file uploads and premium features. 
            Get more coins to continue your journey with SimpleAgentix.
          </p>
          <button 
            onClick={() => setIsUpgradeModalOpen(false)}
            className="w-full py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!modalState.type) return null;

    const closeModal = () => {
        setModalState({ type: null });
        setIsSubmitting(false);
        setUploadProgress(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!auth.currentUser) return;
      setIsSubmitting(true);
      const uid = auth.currentUser.uid;
      const formData = new FormData(e.target as HTMLFormElement);

      try {
        if (modalState.type === 'folder') {
          await addDoc(collection(db, `users/${uid}/folders`), {
            name: formData.get('name'),
            createdAt: serverTimestamp()
          });
        } else if (modalState.type === 'file') {
          if (files.length >= 5) {
            throw new Error("You’ve reached the free plan limit.");
          }
          const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement;
          const file = fileInput.files?.[0];
          if (!file) throw new Error("No file selected");

          const storageRef = ref(storage, `users/${uid}/files/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
              }, 
              (error) => reject(error), 
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, `users/${uid}/files`), {
                  name: formData.get('name') || file.name,
                  folderId: formData.get('folderId') || null,
                  size: file.size,
                  fileUrl: downloadURL,
                  createdAt: serverTimestamp()
                });
                resolve(null);
              }
            );
          });
        } else if (modalState.type === 'note') {
          await addDoc(collection(db, `users/${uid}/notes`), {
            title: formData.get('title'),
            content: formData.get('content'),
            createdAt: serverTimestamp()
          });
        } else if (modalState.type === 'team') {
          await addDoc(collection(db, `users/${uid}/teamMembers`), {
            name: formData.get('name'),
            role: formData.get('role'),
            createdAt: serverTimestamp()
          });
        } else if (modalState.type === 'business') {
          const data = {
            businessType: formData.get('businessType'),
            businessName: formData.get('businessName'),
            jobTitle: formData.get('jobTitle'),
            businessAge: formData.get('businessAge'),
            teamSize: formData.get('teamSize')
          };
          await setDoc(doc(db, 'users', uid), data, { merge: true });
        } else if (modalState.type === 'bank') {
          await addDoc(collection(db, `users/${uid}/bankAccounts`), {
            bankName: formData.get('bankName'),
            accountNumber: formData.get('accountNumber'),
            ifscCode: formData.get('ifscCode'),
            customerId: formData.get('customerId'),
            cardLast4: formData.get('cardLast4'),
            upiId: formData.get('upiId'),
            createdAt: serverTimestamp()
          });
        }
        fetchData();
        closeModal();
      } catch (e) {
        console.error(e);
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white capitalize">
              {modalState.type === 'business' ? 'Edit Business Info' : `Add ${modalState.type}`}
            </h3>
            <button onClick={closeModal} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {modalState.type === 'folder' && (
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Folder Name</label>
                <input name="name" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
              </div>
            )}
            {modalState.type === 'file' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">File Name (Optional)</label>
                  <input name="name" className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Folder</label>
                  <select name="folderId" className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none">
                    <option value="">No Folder</option>
                    {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Select File</label>
                  <input type="file" required className="w-full mt-1 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-vibrant-orange file:text-white hover:file:bg-orange-600" />
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-vibrant-orange h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
              </>
            )}
            {modalState.type === 'note' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
                  <input name="title" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Content</label>
                  <textarea name="content" required rows={4} className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none resize-none" />
                </div>
              </>
            )}
            {modalState.type === 'team' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Name</label>
                  <input name="name" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Role</label>
                  <input name="role" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
              </>
            )}
            {modalState.type === 'business' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Business Type</label>
                  <select name="businessType" defaultValue={businessInfo?.businessType} required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none">
                    <option value="">Select Type</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Business Name</label>
                  <input name="businessName" defaultValue={businessInfo?.businessName} required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Job Title</label>
                  <input name="jobTitle" defaultValue={businessInfo?.jobTitle} required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Business Age</label>
                    <input name="businessAge" defaultValue={businessInfo?.businessAge} placeholder="e.g. 2 years" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Team Size</label>
                    <input name="teamSize" defaultValue={businessInfo?.teamSize} placeholder="e.g. 10-50" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                </div>
              </>
            )}
            {modalState.type === 'bank' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Bank Name</label>
                  <input name="bankName" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Account Number</label>
                  <input name="accountNumber" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">IFSC Code</label>
                    <input name="ifscCode" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Customer ID</label>
                    <input name="customerId" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Card Last 4</label>
                    <input name="cardLast4" maxLength={4} required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">UPI ID</label>
                    <input name="upiId" required className="w-full mt-1 bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none" />
                  </div>
                </div>
              </>
            )}
            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-300 hover:text-white font-bold transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-vibrant-green hover:bg-emerald-500 text-navy-900 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handlePersonalUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setIsSubmitting(true);
    const uid = auth.currentUser.uid;
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput.files?.[0];
      let profilePicUrl = personalInfo.profilePic;

      if (file) {
        const storageRef = ref(storage, `users/${uid}/profile/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        profilePicUrl = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            }, 
            (error) => reject(error), 
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      }

      const updates = {
        name: formData.get('name'),
        mobileNumber: formData.get('mobileNumber'),
        address: formData.get('address'),
        profilePic: profilePicUrl,
        location: {
          city: formData.get('city'),
          state: formData.get('state'),
          zipCode: formData.get('zipCode'),
          country: 'India'
        }
      };

      await updateDoc(doc(db, 'users', uid), updates);
      onSave(updates);
      fetchData();
      setModalState({ type: null });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-vibrant-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-y-auto pb-20 animate-in fade-in zoom-in duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-vibrant-orange overflow-hidden bg-slate-800 flex items-center justify-center">
              {personalInfo.profilePic ? (
                <img src={personalInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-slate-500" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{personalInfo.name || 'User Profile'}</h2>
              <p className="text-slate-400 text-sm">Manage your personal details and workspace.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-4 border-b border-slate-700 mb-8 scrollbar-hide">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutGrid },
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'files', label: 'My Files', icon: Folder },
            { id: 'notes', label: 'My Notes', icon: FileText },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'business', label: 'Business Info', icon: Briefcase },
            { id: 'banking', label: 'Banking Info', icon: CreditCard },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors font-bold text-sm whitespace-nowrap ${
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
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-8 shadow-xl min-h-[500px]">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Workspace Overview</h3>
                <button 
                  onClick={() => setActiveTab('personal')}
                  className="text-sm font-bold text-vibrant-orange hover:text-orange-400 flex items-center gap-1"
                >
                  Edit Profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center gap-4">
                  <div className="p-4 bg-blue-500/10 text-blue-400 rounded-lg"><Folder className="w-8 h-8" /></div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold">Total Files</p>
                    <p className="text-2xl font-black text-white">{files.length}</p>
                  </div>
                </div>
                <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center gap-4">
                  <div className="p-4 bg-yellow-500/10 text-yellow-400 rounded-lg"><FileText className="w-8 h-8" /></div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold">Total Notes</p>
                    <p className="text-2xl font-black text-white">{notes.length}</p>
                  </div>
                </div>
                <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center gap-4">
                  <div className="p-4 bg-purple-500/10 text-purple-400 rounded-lg"><Users className="w-8 h-8" /></div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold">Team Members</p>
                    <p className="text-2xl font-black text-white">{teamMembers.length}</p>
                  </div>
                </div>
                <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center gap-4">
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-lg"><Briefcase className="w-8 h-8" /></div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold">Business Type</p>
                    <p className="text-xl font-black text-white truncate">{businessInfo?.businessType?.replace('_', ' ') || 'Not Set'}</p>
                  </div>
                </div>
                <div className="p-6 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center gap-4">
                  <div className="p-4 bg-orange-500/10 text-orange-400 rounded-lg"><Activity className="w-8 h-8" /></div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold">Current Plan</p>
                    <p className="text-2xl font-black text-white">{plan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PERSONAL INFO TAB */}
          {activeTab === 'personal' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Personal Information</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-vibrant-green/10 border border-vibrant-green/20 rounded-full">
                  <Shield className="w-3 h-3 text-vibrant-green" />
                  <span className="text-[10px] font-bold text-vibrant-green uppercase tracking-wider">Secure Data</span>
                </div>
              </div>

              <form onSubmit={handlePersonalUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        name="name"
                        defaultValue={personalInfo.name}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-vibrant-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Email Address (Read-only)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        readOnly
                        value={personalInfo.email}
                        className="w-full bg-[#0f172a]/50 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-slate-500 outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Mobile Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        name="mobileNumber"
                        defaultValue={personalInfo.mobileNumber}
                        placeholder="+91 00000 00000"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-vibrant-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-slate-700 overflow-hidden bg-slate-900 flex items-center justify-center shrink-0">
                        {personalInfo.profilePic ? (
                          <img src={personalInfo.profilePic} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-slate-600" />
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        name="address"
                        defaultValue={personalInfo.address}
                        placeholder="123, Street Name"
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-vibrant-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">City</label>
                      <input 
                        name="city"
                        defaultValue={personalInfo.city}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">State</label>
                      <input 
                        name="state"
                        defaultValue={personalInfo.state}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Zip Code</label>
                    <input 
                      name="zipCode"
                      defaultValue={personalInfo.zipCode}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:border-vibrant-orange outline-none transition-all"
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-vibrant-green hover:bg-emerald-500 text-navy-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {isSubmitting ? 'Updating Profile...' : 'Save Personal Details'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* FILES TAB */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">My Files</h3>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-3">
                    <button onClick={() => setModalState({ type: 'folder' })} className="px-4 py-2 bg-[#0f172a] border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                      <Folder className="w-4 h-4" /> New Folder
                    </button>
                    <button 
                      onClick={() => setModalState({ type: 'file' })} 
                      disabled={files.length >= 5}
                      className={`px-4 py-2 font-bold rounded-xl text-sm flex items-center gap-2 transition-all ${
                        files.length >= 5 
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                        : 'bg-vibrant-orange hover:bg-orange-600 text-white'
                      }`}
                    >
                      <UploadCloud className="w-4 h-4" /> Add File
                    </button>
                  </div>
                  {files.length >= 5 && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-red-400">You’ve reached the free plan limit.</span>
                      <button 
                        onClick={() => setIsUpgradeModalOpen(true)}
                        className="text-xs font-black text-vibrant-orange hover:text-orange-400 uppercase tracking-widest underline underline-offset-4"
                      >
                        Upgrade
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {folders.length === 0 && files.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                  <Folder className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">No files uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {folders.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Folders</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {folders.map(folder => (
                          <div key={folder.id} className="p-4 bg-[#0f172a] border border-slate-700 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <Folder className="w-5 h-5 text-blue-400" />
                              <span className="text-sm font-bold text-white truncate">{folder.name}</span>
                            </div>
                            <button onClick={() => handleDelete('folders', folder.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {files.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Files</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {files.map(file => (
                          <div key={file.id} className="p-4 bg-[#0f172a] border border-slate-700 rounded-xl flex items-start justify-between group">
                            <div className="flex items-start gap-3 overflow-hidden">
                              <FileIcon className="w-8 h-8 text-vibrant-green shrink-0" />
                              <div className="overflow-hidden">
                                <a href={file.fileUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-white truncate hover:underline block">{file.name}</a>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-slate-500">{formatSize(file.size)}</span>
                                  <span className="text-[10px] text-slate-600">•</span>
                                  <span className="text-xs text-slate-500">{formatDate(file.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                            <button onClick={() => handleDelete('files', file.id, file.fileUrl)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">My Notes</h3>
                <button onClick={() => setModalState({ type: 'note' })} className="px-4 py-2 bg-vibrant-green hover:bg-emerald-500 text-navy-900 font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  <Plus className="w-4 h-4" /> New Note
                </button>
              </div>

              {notes.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                  <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">No notes yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map(note => (
                    <div key={note.id} className="p-6 bg-[#0f172a] border border-slate-700 rounded-2xl flex flex-col h-48 group relative">
                      <button onClick={() => handleDelete('notes', note.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                      <h4 className="text-lg font-bold text-white mb-1 truncate pr-6">{note.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{formatDate(note.createdAt)}</p>
                      <p className="text-sm text-slate-400 line-clamp-4 flex-1">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Team Members</h3>
                <button onClick={() => setModalState({ type: 'team' })} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                  <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">No team members added</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map(member => (
                    <div key={member.id} className="p-4 bg-[#0f172a] border border-slate-700 rounded-xl flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-xs text-slate-400">{member.role}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDelete('teamMembers', member.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BUSINESS INFO TAB */}
          {activeTab === 'business' && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Business Information</h3>
                <button onClick={() => setModalState({ type: 'business' })} className="px-4 py-2 bg-[#0f172a] border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  <Edit2 className="w-4 h-4" /> Edit Info
                </button>
              </div>

              {!businessInfo?.businessName ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                  <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">Add your business information</p>
                </div>
              ) : (
                <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Business Name</p>
                      <p className="text-lg font-bold text-white">{businessInfo.businessName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Business Type</p>
                      <p className="text-lg font-bold text-white">{businessInfo.businessType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Job Title</p>
                      <p className="text-lg font-bold text-white">{businessInfo.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Business Age</p>
                      <p className="text-lg font-bold text-white">{businessInfo.businessAge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Team Size</p>
                      <p className="text-lg font-bold text-white">{businessInfo.teamSize}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BANKING INFO TAB */}
          {activeTab === 'banking' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Banking Information</h3>
                <button onClick={() => setModalState({ type: 'bank' })} className="px-4 py-2 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all">
                  <Plus className="w-4 h-4" /> Add Bank
                </button>
              </div>

              {bankAccounts.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-2xl">
                  <CreditCard className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold">No banking information added</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bankAccounts.map(bank => (
                    <div key={bank.id} className="p-6 bg-gradient-to-br from-slate-800 to-[#0f172a] border border-slate-700 rounded-2xl relative overflow-hidden group">
                      <button onClick={() => handleDelete('bankAccounts', bank.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 className="w-4 h-4" /></button>
                      
                      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                      
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white/10 rounded-lg"><CreditCard className="w-5 h-5 text-white" /></div>
                        <h4 className="text-lg font-bold text-white">{bank.bankName}</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Account Number</p>
                          <p className="text-sm font-mono text-white tracking-widest">{maskString(bank.accountNumber, 4)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">IFSC Code</p>
                            <p className="text-sm font-mono text-white">{maskString(bank.ifscCode, 4)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Card Last 4</p>
                            <p className="text-sm font-mono text-white">**** {bank.cardLast4}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">UPI ID</p>
                          <p className="text-sm font-mono text-white">{maskString(bank.upiId, 4)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      {renderModal()}
      {renderUpgradeModal()}
    </div>
  );
};

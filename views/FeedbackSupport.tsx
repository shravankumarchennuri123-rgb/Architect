import React, { useState } from 'react';
import { HelpCircle, MessageSquare, AlertCircle, UserCheck, ChevronDown, ChevronUp, Upload, ThumbsUp, ThumbsDown, Send, CheckCircle, Loader2 } from 'lucide-react';
import { MOCK_FAQS, submitFeedback } from '../services/mockData';

type Tab = 'FAQ' | 'FEEDBACK' | 'BUG' | 'EXPERT';

export const FeedbackSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('FAQ');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Feedback State
  const [feedbackType, setFeedbackType] = useState<'HELPFUL' | 'MISLEADING' | null>(null);
  const [feedbackFeature, setFeedbackFeature] = useState('Lakshmi Tracker');
  const [feedbackText, setFeedbackText] = useState('');

  // Bug Report State
  const [bugDesc, setBugDesc] = useState('');
  const [bugFile, setBugFile] = useState<File | null>(null);

  // Expert Request State
  const [expertIssue, setExpertIssue] = useState('');
  const [contactPref, setContactPref] = useState('Phone');

  const handleSubmit = async (type: string, data: any) => {
    setIsSubmitting(true);
    await submitFeedback(type, data);
    setIsSubmitting(false);
    setSubmitSuccess(type);
    
    // Reset after delay
    setTimeout(() => {
        setSubmitSuccess(null);
        if (type === 'BUG') { setBugDesc(''); setBugFile(null); }
        if (type === 'FEEDBACK') { setFeedbackText(''); setFeedbackType(null); }
        if (type === 'EXPERT') { setExpertIssue(''); }
    }, 3000);
  };

  const tabs = [
    { id: 'FAQ', label: 'Help Center', icon: HelpCircle },
    { id: 'FEEDBACK', label: 'Rate AI', icon: MessageSquare },
    { id: 'BUG', label: 'Report Bug', icon: AlertCircle },
    { id: 'EXPERT', label: 'Expert Help', icon: UserCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Feedback & Support</h2>
        <p className="text-slate-500">How can we help you today?</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id as Tab); setSubmitSuccess(null); }}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all
              ${activeTab === tab.id 
                ? 'bg-ashoka-500 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}
            `}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
        {/* TAB 1: FAQ Section */}
        {activeTab === 'FAQ' && (
          <div className="p-6 md:p-8 animate-in fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {MOCK_FAQS.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <span className="font-medium text-slate-800">{faq.question}</span>
                    {expandedFaq === idx ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                  {expandedFaq === idx && (
                    <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-ashoka-50 rounded-xl border border-ashoka-100 text-center">
              <p className="text-sm text-ashoka-800 font-medium">Still have questions?</p>
              <button onClick={() => setActiveTab('EXPERT')} className="text-ashoka-600 text-sm hover:underline mt-1">Chat with our Support Team</button>
            </div>
          </div>
        )}

        {/* TAB 2: AI Feedback */}
        {activeTab === 'FEEDBACK' && (
          <div className="p-6 md:p-8 animate-in fade-in max-w-2xl mx-auto">
             {submitSuccess === 'FEEDBACK' ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"><CheckCircle size={32} /></div>
                   <h3 className="text-xl font-bold text-slate-900">Thank You!</h3>
                   <p className="text-slate-500">Your feedback helps train Sarathi to be smarter.</p>
                </div>
             ) : (
               <>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Rate AI Response Accuracy</h3>
                <p className="text-slate-500 text-sm mb-8">Did Sarathi give you helpful or misleading advice recently? Your input refines our models.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Which feature did you use?</label>
                    <select 
                      value={feedbackFeature}
                      onChange={(e) => setFeedbackFeature(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-ashoka-500 bg-slate-50"
                    >
                      <option>Lakshmi Tracker (Hidden Assets)</option>
                      <option>Jeevan Scanner (Documents)</option>
                      <option>Raksha Shield (Scam Check)</option>
                      <option>General Chat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Was the response accurate?</label>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setFeedbackType('HELPFUL')}
                        className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                          ${feedbackType === 'HELPFUL' ? 'border-growth-500 bg-green-50 text-growth-500' : 'border-slate-200 text-slate-400 hover:border-growth-500 hover:text-growth-500'}
                        `}
                      >
                        <ThumbsUp size={24} />
                        <span className="font-bold text-sm">Helpful</span>
                      </button>
                      <button 
                         onClick={() => setFeedbackType('MISLEADING')}
                         className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                          ${feedbackType === 'MISLEADING' ? 'border-red-500 bg-red-50 text-red-500' : 'border-slate-200 text-slate-400 hover:border-red-500 hover:text-red-500'}
                        `}
                      >
                        <ThumbsDown size={24} />
                        <span className="font-bold text-sm">Misleading</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Details (Optional)</label>
                    <textarea 
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us what went wrong or right..."
                      className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-ashoka-500 h-24 resize-none"
                    />
                  </div>

                  <button 
                    onClick={() => handleSubmit('FEEDBACK', { feature: feedbackFeature, type: feedbackType, text: feedbackText })}
                    disabled={!feedbackType || isSubmitting}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                      ${!feedbackType ? 'bg-slate-300 cursor-not-allowed' : 'bg-ashoka-500 hover:bg-ashoka-600'}
                    `}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    Submit Feedback
                  </button>
                </div>
               </>
             )}
          </div>
        )}

        {/* TAB 3: Report Bug */}
        {activeTab === 'BUG' && (
           <div className="p-6 md:p-8 animate-in fade-in max-w-2xl mx-auto">
             {submitSuccess === 'BUG' ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-ashoka-100 rounded-full flex items-center justify-center mx-auto mb-4 text-ashoka-600"><CheckCircle size={32} /></div>
                   <h3 className="text-xl font-bold text-slate-900">Report Sent</h3>
                   <p className="text-slate-500">Our engineering team will look into this immediately.</p>
                </div>
             ) : (
               <>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Report a Technical Issue</h3>
                <p className="text-slate-500 text-sm mb-8">Found a glitch? Upload a screenshot to help us fix it faster.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Issue Description</label>
                    <textarea 
                      value={bugDesc}
                      onChange={(e) => setBugDesc(e.target.value)}
                      placeholder="Describe what happened..."
                      className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-ashoka-500 h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Screenshot (Optional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                      <input 
                        type="file" 
                        onChange={(e) => setBugFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <div className="flex flex-col items-center gap-2 text-slate-500">
                        {bugFile ? (
                          <div className="flex items-center gap-2 text-ashoka-600 font-medium">
                            <CheckCircle size={20} />
                            {bugFile.name}
                          </div>
                        ) : (
                          <>
                            <Upload size={24} />
                            <span>Click to upload image</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleSubmit('BUG', { description: bugDesc, file: bugFile?.name })}
                    disabled={!bugDesc || isSubmitting}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                      ${!bugDesc ? 'bg-slate-300 cursor-not-allowed' : 'bg-viksit-500 hover:bg-viksit-600'}
                    `}
                  >
                     {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Bug Report'}
                  </button>
               </div>
               </>
             )}
           </div>
        )}

        {/* TAB 4: Expert Help */}
        {activeTab === 'EXPERT' && (
           <div className="p-6 md:p-8 animate-in fade-in max-w-2xl mx-auto">
             {submitSuccess === 'EXPERT' ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-viksit-100 rounded-full flex items-center justify-center mx-auto mb-4 text-viksit-600"><UserCheck size={32} /></div>
                   <h3 className="text-xl font-bold text-slate-900">Request Received</h3>
                   <p className="text-slate-500">A certified Sarathi Agent will contact you within 24 hours.</p>
                </div>
             ) : (
               <>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Request Human Assistance</h3>
                <p className="text-slate-500 text-sm mb-8">Some issues require a human touch. Connect with verified CAs or Legal experts.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">What do you need help with?</label>
                    <textarea 
                      value={expertIssue}
                      onChange={(e) => setExpertIssue(e.target.value)}
                      placeholder="e.g., I need help filing Form IEPF-5 for my grandfather's shares..."
                      className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-ashoka-500 h-32 resize-none"
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-3">Preferred Contact Method</label>
                     <div className="grid grid-cols-2 gap-4">
                        {['Phone Call', 'WhatsApp'].map((method) => (
                           <button
                             key={method}
                             onClick={() => setContactPref(method)}
                             className={`py-3 px-4 rounded-xl border font-medium text-sm transition-all
                               ${contactPref === method 
                                 ? 'border-ashoka-500 bg-ashoka-50 text-ashoka-600' 
                                 : 'border-slate-200 text-slate-600 hover:border-ashoka-300'}
                             `}
                           >
                             {method}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-sm text-orange-800 flex items-start gap-3">
                     <AlertCircle size={18} className="shrink-0 mt-0.5" />
                     <p>Note: Human consultation starts at ₹499 per session. You will be asked to confirm payment before the call.</p>
                  </div>

                  <button 
                    onClick={() => handleSubmit('EXPERT', { issue: expertIssue, contact: contactPref })}
                    disabled={!expertIssue || isSubmitting}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                      ${!expertIssue ? 'bg-slate-300 cursor-not-allowed' : 'bg-ashoka-500 hover:bg-ashoka-600'}
                    `}
                  >
                     {isSubmitting ? <Loader2 className="animate-spin" /> : 'Request Expert Call'}
                  </button>
               </div>
               </>
             )}
           </div>
        )}
      </div>
    </div>
  );
};
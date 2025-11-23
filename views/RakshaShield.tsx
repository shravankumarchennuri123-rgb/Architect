import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search, MessageSquare } from 'lucide-react';
import { mockAnalyzeText } from '../services/mockData';
import { ScamRisk } from '../types';

export const RakshaShield: React.FC = () => {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ScamRisk | null>(null);

  const handleCheck = async () => {
    if (!text) return;
    setIsChecking(true);
    setResult(null);
    try {
      const analysis = await mockAnalyzeText(text);
      setResult(analysis);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <Shield className="text-ashoka-500" size={32} />
          Raksha Shield
        </h2>
        <p className="text-slate-500 mt-2">
          Paste any suspicious SMS, WhatsApp message, or Email below. <br/>
          Sarathi's AI will check it against known fraud patterns.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="relative">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here... e.g., 'Dear customer, your KYC is expired. Click here to update immediately.'"
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ashoka-500 outline-none resize-none transition-all"
          />
          <MessageSquare className="absolute right-4 bottom-4 text-slate-300" size={20} />
        </div>

        <button 
          onClick={handleCheck}
          disabled={!text || isChecking}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
            ${!text ? 'bg-slate-300 cursor-not-allowed' : 'bg-ashoka-500 hover:bg-ashoka-600'}
          `}
        >
          {isChecking ? 'Analyzing Patterns...' : 'Verify Message Safety'}
        </button>
      </div>

      {result && (
        <div className={`mt-6 rounded-2xl border p-6 animate-in slide-in-from-bottom-4 fade-in
          ${result.riskLevel === 'DANGER' ? 'bg-red-50 border-red-100' : 
            result.riskLevel === 'CAUTION' ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100'}
        `}>
          <div className="flex items-center gap-4 mb-4">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center
               ${result.riskLevel === 'DANGER' ? 'bg-red-100 text-red-600' : 
                 result.riskLevel === 'CAUTION' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}
             `}>
               {result.riskLevel === 'DANGER' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
             </div>
             <div>
               <h3 className={`text-lg font-bold
                 ${result.riskLevel === 'DANGER' ? 'text-red-700' : 
                   result.riskLevel === 'CAUTION' ? 'text-orange-700' : 'text-green-700'}
               `}>
                 Risk Level: {result.riskLevel}
               </h3>
               <p className="text-sm opacity-80 text-slate-700">Safety Score: {result.score}/100</p>
             </div>
          </div>

          <p className="text-slate-800 mb-4">{result.analysis}</p>

          {result.redFlags.length > 0 && (
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detected Red Flags</h4>
              <ul className="space-y-1">
                {result.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-sm text-red-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
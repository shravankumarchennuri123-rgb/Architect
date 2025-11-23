import React, { useState } from 'react';
import { Search, Loader2, Lock, Info, ArrowRight, IndianRupee, ChevronDown } from 'lucide-react';
import { MOCK_ASSETS } from '../services/mockData';
import { HiddenAsset } from '../types';

export const LakshmiTracker: React.FC = () => {
  const [step, setStep] = useState<'INPUT' | 'SCANNING' | 'RESULTS'>('INPUT');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [results, setResults] = useState<HiddenAsset[]>([]);

  const handleSearch = () => {
    if (!lastName) return;
    setStep('SCANNING');
    
    // Simulate scan
    setTimeout(() => {
      setResults(MOCK_ASSETS);
      setStep('RESULTS');
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-ashoka-900 mb-3">Lakshmi Tracker</h1>
        <p className="text-slate-600">
          Scan RBI (UDGAM) & IEPF registries to find your family's forgotten wealth.
        </p>
      </div>

      {step === 'INPUT' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ashoka-500 via-viksit-500 to-growth-500"></div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Family Name / Surname</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g., Sharma, Gupta, Reddy"
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ashoka-500 focus:border-ashoka-500 outline-none text-lg transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
              <div className="relative">
                <select 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-ashoka-500 outline-none appearance-none bg-white text-lg"
                >
                  <option>Uttar Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Delhi</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <button 
              onClick={handleSearch}
              disabled={!lastName}
              className={`
                w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform
                ${lastName ? 'bg-viksit-500 hover:bg-viksit-600 hover:scale-[1.02]' : 'bg-slate-300 cursor-not-allowed'}
              `}
            >
              Search Hidden Assets
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
              <Lock size={12} />
              <span>Secure Search • Official Registry Data • Privacy Protected</span>
            </div>
          </div>
        </div>
      )}

      {step === 'SCANNING' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-ashoka-500 rounded-full border-t-transparent animate-spin"></div>
            <Search className="absolute inset-0 m-auto text-ashoka-500 animate-pulse" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Scanning Registries...</h3>
          <div className="space-y-2 text-sm text-slate-500">
            <p className="animate-pulse">Checking IEPF Database...</p>
            <p className="animate-pulse delay-75">Querying UDGAM Portal...</p>
            <p className="animate-pulse delay-150">Fuzzy Matching "{lastName}" in {state}...</p>
          </div>
        </div>
      )}

      {step === 'RESULTS' && (
        <div className="space-y-6">
           <div className="bg-growth-500 text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
             <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <IndianRupee size={24} />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Potential Match Found!</h2>
                  <p className="text-growth-100 text-sm">We found {results.length} records matching your family name.</p>
                </div>
             </div>
             <button onClick={() => setStep('INPUT')} className="text-white underline text-sm">Search Again</button>
           </div>

           <div className="grid gap-4">
              {results.map((asset) => (
                <div key={asset.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                   <div className="absolute top-0 right-0 bg-ashoka-50 text-ashoka-700 text-xs font-bold px-3 py-1 rounded-bl-xl">
                     {asset.confidence}% Match Confidence
                   </div>
                   
                   <div className="flex justify-between items-start">
                     <div>
                       <h3 className="font-bold text-lg text-slate-800">{asset.name}</h3>
                       <p className="text-sm text-slate-500 mb-4">Father: {asset.fatherName}</p>
                       <div className="flex flex-wrap gap-2">
                         <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{asset.source}</span>
                         <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{asset.type}</span>
                       </div>
                     </div>
                     <div className="text-right mt-8 sm:mt-0">
                        <p className="text-xs text-slate-500 mb-1">Est. Value</p>
                        <div className="text-2xl font-bold text-slate-900 blur-[4px] group-hover:blur-0 transition-all cursor-pointer select-none">
                          ₹{asset.amount.toLocaleString()}
                        </div>
                        <p className="text-[10px] text-ashoka-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to Reveal</p>
                     </div>
                   </div>

                   <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                      <button className="flex-1 bg-ashoka-500 hover:bg-ashoka-600 text-white py-2.5 rounded-lg font-medium text-sm transition-colors">
                        Claim Now (Form IEPF-5)
                      </button>
                      <button className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                         Hire Sarathi Agent
                         <span className="bg-viksit-100 text-viksit-700 text-[10px] px-1.5 py-0.5 rounded">₹499</span>
                      </button>
                   </div>
                </div>
              ))}
           </div>
           
           <p className="text-center text-xs text-slate-400 mt-8">
             Disclaimer: Sarathi.ai facilitates the search of public records. We are not a bank. Claims are subject to verification.
           </p>
        </div>
      )}
    </div>
  );
};
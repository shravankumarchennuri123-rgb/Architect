import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Loader2, BookOpen, ArrowRight, Camera } from 'lucide-react';
import { mockAnalyzeDocument } from '../services/mockData';
import { DocumentAnalysis } from '../types';

export const JeevanScanner: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await mockAnalyzeDocument(file.name);
      setAnalysis(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 fade-in h-full">
      {/* Left: Upload Section */}
      <div className="space-y-6">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Jeevan Scanner</h2>
           <p className="text-slate-500 mt-2">Upload any government notice, court document, or utility bill. Sarathi will explain it in simple language.</p>
        </div>

        <div 
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative
            ${dragActive ? 'border-ashoka-500 bg-ashoka-50' : 'border-slate-300 hover:border-ashoka-400 bg-white'}
          `}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/*,.pdf"
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-ashoka-100 text-ashoka-600 rounded-full flex items-center justify-center">
              {isAnalyzing ? <Loader2 className="animate-spin" size={32} /> : <Camera size={32} />}
            </div>
            <div>
               <p className="font-medium text-slate-900 text-lg">Tap to Scan or Upload</p>
               <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG, PDF (Max 5MB)</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
           <BookOpen className="text-blue-600 shrink-0" size={20} />
           <div className="text-sm text-blue-800">
             <p className="font-semibold mb-1">Did you know?</p>
             You can ask Sarathi to draft a reply letter for you automatically after scanning.
           </div>
        </div>
      </div>

      {/* Right: Analysis Result */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-full min-h-[500px] flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <FileText size={18} /> Analysis Result
          </h3>
        </div>
        
        <div className="flex-1 p-6">
           {!isAnalyzing && !analysis && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full mb-4"></div>
                <p>No document scanned yet.</p>
             </div>
           )}

           {isAnalyzing && (
             <div className="space-y-4 animate-pulse">
               <div className="h-6 bg-slate-200 rounded w-3/4"></div>
               <div className="h-4 bg-slate-200 rounded w-full"></div>
               <div className="h-4 bg-slate-200 rounded w-5/6"></div>
               <div className="h-24 bg-slate-200 rounded w-full mt-8"></div>
             </div>
           )}

           {analysis && (
             <div className="space-y-6 fade-in">
                <div>
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-slate-900">{analysis.title}</h4>
                      {analysis.urgency === 'HIGH' && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase">Urgent</span>
                      )}
                   </div>
                   <p className="text-slate-600 leading-relaxed">{analysis.summary}</p>
                </div>

                <div className="bg-ashoka-50 p-4 rounded-lg border border-ashoka-100">
                   <h5 className="text-xs font-bold text-ashoka-600 uppercase tracking-wider mb-2">Official Citation</h5>
                   <p className="text-sm text-slate-800 font-serif italic">"{analysis.citation}"</p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900 mb-3">Recommended Actions</h5>
                  <ul className="space-y-3">
                    {analysis.actionItems.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                         <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                         <span className="text-slate-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                   <button className="w-full bg-ashoka-500 hover:bg-ashoka-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                     Auto-Draft Response
                     <ArrowRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
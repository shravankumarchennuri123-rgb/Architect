import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Search, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  setView: (view: ViewState) => void;
}

const data = [
  { name: 'Tax', value: 4000 },
  { name: 'Utility', value: 3000 },
  { name: 'Subsidies', value: 2000 },
  { name: 'Claims', value: 2780 },
];

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-ashoka-500 to-ashoka-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Namaste, Jai Ji 🙏</h1>
          <p className="text-ashoka-100 max-w-xl mb-6">
            Sarathi has analyzed your profile. You have 2 pending government notifications and a potential unclaimed asset match.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setView(ViewState.LAKSHMI_TRACKER)}
              className="bg-viksit-500 hover:bg-viksit-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Search size={16} />
              Find Hidden Money
            </button>
            <button 
              onClick={() => setView(ViewState.JEEVAN_SCANNER)}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all backdrop-blur-sm flex items-center gap-2"
            >
              <FileText size={16} />
              Scan Documents
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <svg width="300" height="300" viewBox="0 0 200 200">
             <circle cx="150" cy="150" r="100" fill="white" />
          </svg>
        </div>
      </div>

      {/* Stats & Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Savings</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">₹24,500</p>
          <p className="text-xs text-slate-400 mt-2">Via subsidy claims & tax advice</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <AlertTriangle size={24} />
            </div>
            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Action</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Pending Tasks</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">3 Urgent</p>
          <p className="text-xs text-slate-400 mt-2">ITR Filing due in 5 days</p>
        </div>

         {/* Stat Card 3 - Mini Chart */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <h3 className="text-slate-500 text-sm font-medium mb-2">Financial Health</h3>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000080' : '#FF9933'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 text-center">Monthly Optimization</p>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
          <button className="text-ashoka-500 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { title: 'Applied for PM-Surya Ghar', date: 'Today, 10:30 AM', status: 'Processing', color: 'text-orange-600 bg-orange-50' },
            { title: 'Verified Bank Statement', date: 'Yesterday, 4:15 PM', status: 'Secure', color: 'text-green-600 bg-green-50' },
            { title: 'Detected Phishing SMS', date: '2 days ago', status: 'Blocked', color: 'text-red-600 bg-red-50' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.color.replace('text-', 'bg-').replace('bg-', 'bg-opacity-10 ')}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
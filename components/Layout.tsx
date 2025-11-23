import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, Home, Search, FileText, ShieldCheck, Bell, Settings, LogOut, HelpCircle } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: Home },
    { id: ViewState.LAKSHMI_TRACKER, label: 'Lakshmi Tracker', icon: Search },
    { id: ViewState.JEEVAN_SCANNER, label: 'Jeevan Scanner', icon: FileText },
    { id: ViewState.RAKSHA_SHIELD, label: 'Raksha Shield', icon: ShieldCheck },
    { id: ViewState.FEEDBACK_SUPPORT, label: 'Feedback & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed w-full z-50 bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-600">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-xl text-ashoka-500 tracking-tight">Sarathi.ai</span>
        </div>
        <div className="w-8 h-8 bg-ashoka-100 rounded-full flex items-center justify-center text-ashoka-600 font-semibold">
          JS
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-ashoka-500 text-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-ashoka-600 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-lg">
             <img src="https://picsum.photos/32/32?grayscale" alt="Logo" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">Sarathi.ai</h1>
            <p className="text-xs text-ashoka-100">Govt. of India Partner</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${currentView === item.id 
                  ? 'bg-viksit-500 text-white shadow-md' 
                  : 'text-ashoka-100 hover:bg-ashoka-600 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-ashoka-600">
          <div className="bg-ashoka-600 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-sm mb-1">Viksit Bharat</h3>
            <p className="text-xs text-ashoka-200 mb-3">Your data is secure and stays on your device. DPDP Compliant.</p>
            <div className="flex items-center gap-2 text-xs text-growth-500 bg-white/10 p-1 rounded w-fit px-2">
              <ShieldCheck size={12} className="text-green-400" />
              <span className="text-white">100% Secure</span>
            </div>
          </div>
          <button className="flex items-center gap-3 text-ashoka-200 hover:text-white px-4 py-2 w-full transition-colors text-sm">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 h-screen overflow-y-auto scroll-smooth">
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 px-8 items-center justify-between sticky top-0 z-30">
          <h2 className="font-semibold text-slate-800">
            {navItems.find(n => n.id === currentView)?.label}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
              <span className="text-lg">🇮🇳</span>
              <select className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
            <button className="relative text-slate-500 hover:text-ashoka-500 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-viksit-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
               <div className="text-right">
                 <p className="text-sm font-medium text-slate-900">Jai Sharma</p>
                 <p className="text-xs text-slate-500">Citizen ID: •••• 9921</p>
               </div>
               <div className="w-10 h-10 bg-ashoka-100 rounded-full flex items-center justify-center text-ashoka-600 font-bold">
                 JS
               </div>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { LakshmiTracker } from './views/LakshmiTracker';
import { JeevanScanner } from './views/JeevanScanner';
import { RakshaShield } from './views/RakshaShield';
import { FeedbackSupport } from './views/FeedbackSupport';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard setView={setView} />;
      case ViewState.LAKSHMI_TRACKER:
        return <LakshmiTracker />;
      case ViewState.JEEVAN_SCANNER:
        return <JeevanScanner />;
      case ViewState.RAKSHA_SHIELD:
        return <RakshaShield />;
      case ViewState.FEEDBACK_SUPPORT:
        return <FeedbackSupport />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
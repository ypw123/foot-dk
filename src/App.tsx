import React, { useState } from 'react';
import Navigation from './components/Navigation';
import RecognitionPage from './components/RecognitionPage';
import FoodPage from './components/FoodPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [activeTab, setActiveTab] = useState<'recognition' | 'food' | 'profile'>('recognition');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'recognition':
        return <RecognitionPage />;
      case 'food':
        return <FoodPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <RecognitionPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">
        {renderActivePage()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
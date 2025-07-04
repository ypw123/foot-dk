import React from 'react';
import { Camera, Database, User } from 'lucide-react';

interface NavigationProps {
  activeTab: 'recognition' | 'food' | 'profile';
  onTabChange: (tab: 'recognition' | 'food' | 'profile') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'recognition', label: '识别', icon: Camera },
    { id: 'food', label: '食物', icon: Database },
    { id: 'profile', label: '我的', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as typeof activeTab)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === id
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
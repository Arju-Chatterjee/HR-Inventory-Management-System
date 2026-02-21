import { useState } from 'react';
import AllItems from './AllItems';
import Categories from './Categories';
import Suppliers from './Suppliers';
import LowStockAlerts from './LowStockAlerts';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState<'items' | 'categories' | 'suppliers' | 'alerts'>('items');

  const tabs = [
    { id: 'items', label: 'All Items', icon: '📦' },
    { id: 'categories', label: 'Categories', icon: '📂' },
    { id: 'suppliers', label: 'Suppliers', icon: '🏢' },
    { id: 'alerts', label: 'Low Stock Alerts', icon: '⚠️', badge: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Solar Inventory Management</h1>
        <p className="text-gray-600 text-sm mt-1">Manage solar panels, inverters, batteries, pumps, and accessories</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'items' && <AllItems />}
          {activeTab === 'categories' && <Categories />}
          {activeTab === 'suppliers' && <Suppliers />}
          {activeTab === 'alerts' && <LowStockAlerts />}
        </div>
      </div>
    </div>
  );
};

export default Inventory;

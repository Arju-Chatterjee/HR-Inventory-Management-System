import { useState } from 'react';
import { customerOrders } from '../../../data/stockTrackingData';
import AllOrders from './AllOrders';
import PendingOrders from './PendingOrders';
import DeliveredOrders from './DeliveredOrders';
import Customers from './Customers';
import Payments from './Payments';

const StockTracking = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'delivered' | 'customers' | 'payments'>('all');

    // Calculate stats
    const totalOrders = customerOrders.length;
    const pendingDeliveries = customerOrders.filter(o =>
        o.orderStatus === 'Order Placed' || o.orderStatus === 'Processing' || o.orderStatus === 'Dispatched'
    ).length;

    const deliveredToday = customerOrders.filter(o =>
        o.orderStatus === 'Delivered' && o.delivery.actualDate === new Date().toISOString().split('T')[0]
    ).length;

    const totalRevenue = customerOrders
        .filter(o => o.payment.paymentStatus === 'Paid')
        .reduce((sum, o) => sum + o.payment.paidAmount, 0);

    const pendingPayments = customerOrders
        .reduce((sum, o) => sum + o.payment.dueAmount, 0);

    const inTransit = customerOrders.filter(o => o.orderStatus === 'Dispatched').length;

    const tabs = [
        { id: 'all', label: 'All Orders', icon: '📦', count: totalOrders },
        { id: 'pending', label: 'Pending Orders', icon: '⏳', count: pendingDeliveries },
        { id: 'delivered', label: 'Delivered Orders', icon: '✅' },
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'payments', label: 'Payments', icon: '💰' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Stock Tracking</h1>
                <p className="text-gray-600 text-sm mt-1">Track customer orders from warehouse to delivery</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                    <p className="text-3xl font-bold mt-1">{totalOrders}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-yellow-100 text-sm font-medium">Pending Deliveries</p>
                    <p className="text-3xl font-bold mt-1">{pendingDeliveries}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-green-100 text-sm font-medium">Delivered Today</p>
                    <p className="text-3xl font-bold mt-1">{deliveredToday}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold mt-1">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-red-100 text-sm font-medium">Pending Payments</p>
                    <p className="text-2xl font-bold mt-1">₹{(pendingPayments / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg">
                    <p className="text-indigo-100 text-sm font-medium">In Transit</p>
                    <p className="text-3xl font-bold mt-1">{inTransit}</p>
                </div>
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
                            {tab.count !== undefined && (
                                <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'all' && <AllOrders />}
                    {activeTab === 'pending' && <PendingOrders />}
                    {activeTab === 'delivered' && <DeliveredOrders />}
                    {activeTab === 'customers' && <Customers />}
                    {activeTab === 'payments' && <Payments />}
                </div>
            </div>
        </div>
    );
};

export default StockTracking;

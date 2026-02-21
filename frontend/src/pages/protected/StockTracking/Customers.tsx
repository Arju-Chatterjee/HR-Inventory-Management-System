import { useState } from 'react';
import { customerOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';

interface CustomerSummary {
    name: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    orders: CustomerOrder[];
}

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    // Group orders by customer
    const customerMap = new Map<string, CustomerSummary>();

    customerOrders.forEach(order => {
        const key = order.customer.phone;
        if (!customerMap.has(key)) {
            customerMap.set(key, {
                name: order.customer.name,
                phone: order.customer.phone,
                email: order.customer.email,
                city: order.customer.deliveryAddress.city,
                state: order.customer.deliveryAddress.state,
                totalOrders: 0,
                totalSpent: 0,
                lastOrderDate: order.orderDate,
                orders: []
            });
        }

        const customer = customerMap.get(key)!;
        customer.totalOrders++;
        customer.totalSpent += order.grandTotal;
        customer.orders.push(order);

        if (new Date(order.orderDate) > new Date(customer.lastOrderDate)) {
            customer.lastOrderDate = order.orderDate;
        }
    });

    const customers = Array.from(customerMap.values());

    // Filter customers
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600 font-medium">Total Customers</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{customers.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 font-medium">Total Business</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        ₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 100000).toFixed(1)}L
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm text-gray-600 font-medium">Avg Order Value</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                        ₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customerOrders.length / 1000).toFixed(0)}K
                    </p>
                </div>
            </div>

            {/* Search */}
            <div>
                <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCustomers.map((customer, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedCustomer(customer)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-bold">
                                {customer.totalOrders} Orders
                            </span>
                        </div>

                        <h3 className="font-semibold text-gray-800 mb-1">{customer.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{customer.city}, {customer.state}</p>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{customer.email}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-500">Total Spent</p>
                                <p className="font-bold text-indigo-600">₹{customer.totalSpent.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Last Order</p>
                                <p className="text-sm font-medium text-gray-800">{customer.lastOrderDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCustomers.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No customers found</h3>
                    <p className="text-gray-600">Try adjusting your search</p>
                </div>
            )}

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{selectedCustomer.name}</h2>
                                <p className="text-sm text-gray-500">{selectedCustomer.phone}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="font-medium text-gray-800">{selectedCustomer.city}, {selectedCustomer.state}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Total Orders</p>
                                        <p className="font-bold text-indigo-600">{selectedCustomer.totalOrders}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Total Spent</p>
                                        <p className="font-bold text-green-600">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order History */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Order History</h3>
                                <div className="space-y-3">
                                    {selectedCustomer.orders.map(order => (
                                        <div
                                            key={order.orderId}
                                            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setSelectedCustomer(null);
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-800">{order.orderNumber}</p>
                                                    <p className="text-sm text-gray-600">{order.orderDate}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-800">₹{order.grandTotal.toLocaleString()}</p>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.orderStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default Customers;

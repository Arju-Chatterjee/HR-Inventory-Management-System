import { useState } from 'react';
import { customerOrders as initialOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';

const AllOrders = () => {
    const [orders, setOrders] = useState<CustomerOrder[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    // Filter orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.phone.includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || order.orderStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        const styles = {
            'Order Placed': 'bg-blue-100 text-blue-700',
            'Processing': 'bg-yellow-100 text-yellow-700',
            'Dispatched': 'bg-purple-100 text-purple-700',
            'Delivered': 'bg-green-100 text-green-700',
            'Cancelled': 'bg-red-100 text-red-700',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
    };

    const getPaymentStatusStyle = (status: string) => {
        const styles = {
            'Paid': 'bg-green-100 text-green-700',
            'Pending': 'bg-red-100 text-red-700',
            'Partial': 'bg-yellow-100 text-yellow-700',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
    };

    const handleUpdateOrder = (updatedOrder: CustomerOrder) => {
        setOrders(orders.map(o => o.orderId === updatedOrder.orderId ? updatedOrder : o));
        setSelectedOrder(null);
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search by order number, customer name, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="All">All Status</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Products</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivery Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">{order.orderNumber}</p>
                                        <p className="text-xs text-gray-500">{order.orderDate}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">{order.customer.name}</p>
                                        <p className="text-xs text-gray-500">{order.customer.phone}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-gray-800">{order.products.length} item(s)</p>
                                        <p className="text-xs text-gray-500">{order.products[0].itemName}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-bold text-gray-800">₹{order.grandTotal.toLocaleString()}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(order.orderStatus)}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(order.payment.paymentStatus)}`}>
                                            {order.payment.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-gray-800">{order.delivery.expectedDate}</p>
                                        {order.delivery.actualDate && (
                                            <p className="text-xs text-green-600">Delivered: {order.delivery.actualDate}</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={handleUpdateOrder}
                />
            )}
        </div>
    );
};

export default AllOrders;

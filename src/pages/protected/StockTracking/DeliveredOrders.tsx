import { useState } from 'react';
import { customerOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';

const DeliveredOrders = () => {
    const [orders] = useState<CustomerOrder[]>(
        customerOrders.filter(o => o.orderStatus === 'Delivered')
    );
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
    const totalOrders = orders.length;

    return (
        <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 font-medium">Total Delivered</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">{totalOrders}</p>
                    <p className="text-xs text-gray-500 mt-1">Successfully completed</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500 mt-1">From delivered orders</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm text-gray-600 font-medium">Avg Order Value</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                        ₹{totalOrders > 0 ? (totalRevenue / totalOrders / 1000).toFixed(0) + 'K' : '0'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Per order</p>
                </div>
            </div>

            {/* Delivered Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Products</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivery Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivered By</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">{order.orderNumber}</p>
                                        <p className="text-xs text-gray-500">{order.invoiceNumber}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-800">{order.customer.name}</p>
                                        <p className="text-xs text-gray-500">City Name</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{order.products.length} item(s)</td>
                                    <td className="px-4 py-3">
                                        <p className="font-bold text-green-600">₹{order.grandTotal.toLocaleString()}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-medium text-gray-800">{order.delivery.actualDate}</p>
                                        <p className="text-xs text-gray-500">Expected: {order.delivery.expectedDate}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm text-gray-800">{order.delivery.deliveryPersonName}</p>
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
            {orders.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No delivered orders yet</h3>
                    <p className="text-gray-600">Completed deliveries will appear here</p>
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

export default DeliveredOrders;

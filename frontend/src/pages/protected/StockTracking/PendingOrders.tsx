import { useState } from 'react';
import { customerOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';

const PendingOrders = () => {
    const [orders] = useState<CustomerOrder[]>(
        customerOrders.filter(o =>
            o.orderStatus === 'Order Placed' ||
            o.orderStatus === 'Processing' ||
            o.orderStatus === 'Dispatched'
        )
    );
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    const getStatusStyle = (status: string) => {
        const styles = {
            'Order Placed': 'bg-blue-100 text-blue-700',
            'Processing': 'bg-yellow-100 text-yellow-700',
            'Dispatched': 'bg-purple-100 text-purple-700',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
    };

    // Check if order is overdue
    const isOverdue = (expectedDate: string) => {
        const today = new Date();
        const expected = new Date(expectedDate);
        return expected < today;
    };

    return (
        <div className="space-y-4">
            {/* Pending Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600 font-medium">Order Placed</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                        {orders.filter(o => o.orderStatus === 'Order Placed').length}
                    </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 font-medium">Processing</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {orders.filter(o => o.orderStatus === 'Processing').length}
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm text-gray-600 font-medium">Dispatched</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                        {orders.filter(o => o.orderStatus === 'Dispatched').length}
                    </p>
                </div>
            </div>

            {/* Pending Orders List */}
            <div className="space-y-3">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${isOverdue(order.delivery.expectedDate) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-gray-800">{order.orderNumber}</h3>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                    {isOverdue(order.delivery.expectedDate) && (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                            ⚠️ Overdue
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                                    <div>
                                        <p className="text-gray-500 text-xs">Customer</p>
                                        <p className="font-medium text-gray-800">{order.customer.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Products</p>
                                        <p className="font-medium text-gray-800">{order.products.length} items</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Amount</p>
                                        <p className="font-bold text-indigo-600">₹{order.grandTotal.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Expected Delivery</p>
                                        <p className={`font-medium ${isOverdue(order.delivery.expectedDate) ? 'text-red-600' : 'text-gray-800'}`}>
                                            {order.delivery.expectedDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm whitespace-nowrap"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending orders at the moment</p>
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

export default PendingOrders;

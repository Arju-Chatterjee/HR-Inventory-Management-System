import { useState } from 'react';
import UpdateStatusModal from './UpdateStatusModal';
import type { CustomerOrder } from '../../../../data/stockTrackingData';
import CommonMatModel from '../../../../components/dynamicComponents/CommonMatModel';

interface OrderDetailsModalProps {
    order: CustomerOrder;
    onClose: () => void;
    onUpdate: (order: CustomerOrder) => void;
}

const OrderDetailsModal = ({ order, onClose, onUpdate }: OrderDetailsModalProps) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const getStatusStyle = (status: string) => {
        const styles = {
            'Order Placed': 'bg-blue-100 text-blue-700 border-blue-300',
            'Processing': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'Dispatched': 'bg-purple-100 text-purple-700 border-purple-300',
            'Delivered': 'bg-green-100 text-green-700 border-green-300',
            'Cancelled': 'bg-red-100 text-red-700 border-red-300',
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

    const handlePrintInvoice = () => {
        window.print();
    };

    return (
        <>
            <CommonMatModel
                open={true}
                onClose={onClose}
                title="Order Details"
                subtitle={order.orderNumber}
                maxWidth="lg"
            >
                <div className="space-y-6">
                    {/* Status and Date */}
                    <div className="flex items-center justify-between">
                        <span className={`px-4 py-2 text-sm font-semibold rounded-lg border ${getStatusStyle(order.orderStatus)}`}>
                            {order.orderStatus}
                        </span>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Order Date</p>
                            <p className="font-medium text-gray-800">{order.orderDate}</p>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Customer Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Name</p>
                                <p className="font-medium text-gray-800">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="font-medium text-gray-800">{order.customer.phone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{order.customer.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Delivery Address</p>
                                <p className="font-medium text-gray-800 text-sm">
                                    {order.customer.deliveryAddress.street}, {order.customer.deliveryAddress.city}, {order.customer.deliveryAddress.state} - {order.customer.deliveryAddress.pincode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Products Ordered */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Products Ordered
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">SKU</th>
                                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Product Name</th>
                                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Warehouse</th>
                                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Qty</th>
                                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Price/Unit</th>
                                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-600">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {order.products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-3 py-2 text-sm text-gray-600">{product.itemSku}</td>
                                            <td className="px-3 py-2 text-sm font-medium text-gray-800">{product.itemName}</td>
                                            <td className="px-3 py-2 text-sm text-gray-600">{product.warehouse}</td>
                                            <td className="px-3 py-2 text-sm text-right text-gray-800">{product.quantity}</td>
                                            <td className="px-3 py-2 text-sm text-right text-gray-800">₹{product.pricePerUnit.toLocaleString()}</td>
                                            <td className="px-3 py-2 text-sm text-right font-medium text-gray-800">₹{product.totalPrice.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-end">
                                <div className="w-64 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium text-gray-800">₹{order.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax (5%):</span>
                                        <span className="font-medium text-gray-800">₹{order.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery Charges:</span>
                                        <span className="font-medium text-gray-800">₹{order.deliveryCharges.toLocaleString()}</span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Discount:</span>
                                            <span className="font-medium text-green-600">-₹{order.discount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-base font-bold border-t border-gray-300 pt-2">
                                        <span className="text-gray-800">Grand Total:</span>
                                        <span className="text-indigo-600">₹{order.grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Payment Information
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-800">{order.payment.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Payment Status</p>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(order.payment.paymentStatus)}`}>
                                    {order.payment.paymentStatus}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Amount Paid</p>
                                <p className="font-bold text-green-600">₹{order.payment.paidAmount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Due Amount</p>
                                <p className="font-bold text-red-600">₹{order.payment.dueAmount.toLocaleString()}</p>
                            </div>
                            {order.payment.transactionId && (
                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500">Transaction ID</p>
                                    <p className="font-medium text-gray-800 text-sm">{order.payment.transactionId}</p>
                                </div>
                            )}
                            {order.payment.paymentDate && (
                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500">Payment Date</p>
                                    <p className="font-medium text-gray-800">{order.payment.paymentDate}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="bg-purple-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            Delivery Information
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Delivery Person</p>
                                <p className="font-medium text-gray-800">{order.delivery.deliveryPersonName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Contact Number</p>
                                <p className="font-medium text-gray-800">{order.delivery.deliveryPersonPhone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Expected Date</p>
                                <p className="font-medium text-gray-800">{order.delivery.expectedDate}</p>
                            </div>
                            {order.delivery.actualDate && (
                                <div>
                                    <p className="text-xs text-gray-500">Actual Delivery</p>
                                    <p className="font-bold text-green-600">{order.delivery.actualDate}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
                            <p className="text-sm text-gray-700">{order.notes}</p>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-3">
                        <button
                            onClick={() => setShowUpdateModal(true)}
                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Update Status
                        </button>
                        <button
                            onClick={handlePrintInvoice}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Print Invoice
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CommonMatModel>

            {/* Update Status Modal */}
            {showUpdateModal && (
                <UpdateStatusModal
                    order={order}
                    onClose={() => setShowUpdateModal(false)}
                    onUpdate={(updatedOrder) => {
                        onUpdate(updatedOrder);
                        setShowUpdateModal(false);
                    }}
                />
            )}
        </>
    );
};

export default OrderDetailsModal;

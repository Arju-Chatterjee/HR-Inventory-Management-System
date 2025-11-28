import { useState } from 'react';
import type { CustomerOrder } from '../../../../data/stockTrackingData';
import CommonMatModel from '../../../../components/dynamicComponents/CommonMatModel';

interface UpdateStatusModalProps {
    order: CustomerOrder;
    onClose: () => void;
    onUpdate: (order: CustomerOrder) => void;
}

const UpdateStatusModal = ({ order, onClose, onUpdate }: UpdateStatusModalProps) => {
    const [newStatus, setNewStatus] = useState(order.orderStatus);
    const [actualDeliveryDate, setActualDeliveryDate] = useState(
        order.delivery.actualDate || new Date().toISOString().split('T')[0]
    );

    const statuses: CustomerOrder['orderStatus'][] = [
        'Order Placed',
        'Processing',
        'Dispatched',
        'Delivered',
        'Cancelled'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedOrder: CustomerOrder = {
            ...order,
            orderStatus: newStatus,
            delivery: {
                ...order.delivery,
                actualDate: newStatus === 'Delivered' ? actualDeliveryDate : order.delivery.actualDate
            }
        };

        onUpdate(updatedOrder);
    };

    return (
        <CommonMatModel
            open={true}
            onClose={onClose}
            title="Update Order Status"
            subtitle={order.orderNumber}
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Status: <span className="font-bold text-indigo-600">{order.orderStatus}</span>
                    </label>
                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as any)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {newStatus === 'Delivered' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Actual Delivery Date *
                        </label>
                        <input
                            type="date"
                            value={actualDeliveryDate}
                            onChange={(e) => setActualDeliveryDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                        <strong>Note:</strong> Updating the status will notify the customer via SMS/Email.
                    </p>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Update Status
                    </button>
                </div>
            </form>
        </CommonMatModel>
    );
};

export default UpdateStatusModal;

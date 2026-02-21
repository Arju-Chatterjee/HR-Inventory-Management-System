import { useState } from 'react';
import { customerOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';
import type { CardConfig, TableColumn } from '../../../components/dynamicComponents/CommonTable';
import CommonTable from '../../../components/dynamicComponents/CommonTable';

const Payments = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    // Calculate payment stats
    const totalPaid = customerOrders
        .filter(o => o.payment.paymentStatus === 'Paid')
        .reduce((sum, o) => sum + o.payment.paidAmount, 0);

    const totalPending = customerOrders
        .filter(o => o.payment.paymentStatus === 'Pending')
        .reduce((sum, o) => sum + o.payment.totalAmount, 0);

    const totalPartial = customerOrders
        .filter(o => o.payment.paymentStatus === 'Partial')
        .reduce((sum, o) => sum + o.payment.dueAmount, 0);

    const totalDue = totalPending + totalPartial;

    // Filter orders
    const filteredOrders = filterStatus === 'All'
        ? customerOrders
        : customerOrders.filter(o => o.payment.paymentStatus === filterStatus);

    const getPaymentStatusStyle = (status: string) => {
        const styles = {
            'Paid': 'bg-green-100 text-green-700',
            'Pending': 'bg-red-100 text-red-700',
            'Partial': 'bg-yellow-100 text-yellow-700',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'Cash on Delivery':
                return '💵';
            case 'Online Payment':
                return '💳';
            case 'Bank Transfer':
                return '🏦';
            case 'UPI':
                return '📱';
            default:
                return '💰';
        }
    };

    // Table columns configuration
    const columns: TableColumn<CustomerOrder>[] = [
        {
            header: 'Order #',
            accessor: 'orderNumber',
            cell: (value, row) => (
                <div>
                    <p className="font-medium text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500">{row.orderDate}</p>
                </div>
            ),
        },
        {
            header: 'Customer',
            accessor: 'customer',
            cell: (value) => (
                <div>
                    <p className="font-medium text-gray-800">{value.name}</p>
                    <p className="text-xs text-gray-500">{value.phone}</p>
                </div>
            ),
        },
        {
            header: 'Payment Method',
            accessor: 'payment',
            cell: (value) => (
                <div className="flex items-center gap-2">
                    <span className="text-xl">{getPaymentMethodIcon(value.paymentMethod)}</span>
                    <span className="text-sm text-gray-800">{value.paymentMethod}</span>
                </div>
            ),
        },
        {
            header: 'Total Amount',
            accessor: 'payment',
            align: 'right',
            cell: (value) => (
                <span className="font-medium text-gray-800">₹{value.totalAmount.toLocaleString()}</span>
            ),
        },
        {
            header: 'Paid Amount',
            accessor: 'payment',
            align: 'right',
            cell: (value) => (
                <span className="font-bold text-green-600">₹{value.paidAmount.toLocaleString()}</span>
            ),
        },
        {
            header: 'Due Amount',
            accessor: 'payment',
            align: 'right',
            cell: (value) => (
                <span className="font-bold text-red-600">₹{value.dueAmount.toLocaleString()}</span>
            ),
        },
        {
            header: 'Status',
            accessor: 'payment',
            cell: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(value.paymentStatus)}`}>
                    {value.paymentStatus}
                </span>
            ),
        },
        {
            header: 'Transaction ID',
            accessor: 'payment',
            cell: (value) => (
                <span className="text-sm text-gray-600">{value.transactionId || 'N/A'}</span>
            ),
        },
        {
            header: 'Actions',
            accessor: 'orderId' as keyof CustomerOrder,
            cell: (_, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(row);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                    View Order
                </button>
            ),
        },
    ];

    // Card configuration for grid view
    const cardConfig: CardConfig<CustomerOrder> = {
        title: (row) => row.orderNumber,
        subtitle: (row) => row.customer.name,
        content: (row) => (
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-xl">{getPaymentMethodIcon(row.payment.paymentMethod)}</span>
                    <span className="text-gray-800">{row.payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-gray-800">₹{row.payment.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid Amount:</span>
                    <span className="font-bold text-green-600">₹{row.payment.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Amount:</span>
                    <span className="font-bold text-red-600">₹{row.payment.dueAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm items-center pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(row.payment.paymentStatus)}`}>
                        {row.payment.paymentStatus}
                    </span>
                </div>
                {row.payment.transactionId && (
                    <div className="text-xs text-gray-500 pt-2">
                        Transaction ID: {row.payment.transactionId}
                    </div>
                )}
            </div>
        ),
        actions: (row) => (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(row);
                }}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
                View Order Details
            </button>
        ),
    };

    return (
        <div className="space-y-4">
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 font-medium">Total Paid</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">₹{(totalPaid / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500 mt-1">Received payments</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-600 font-medium">Total Pending</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">₹{(totalPending / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 font-medium">Partial Payments</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">₹{(totalPartial / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500 mt-1">Remaining amount</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <p className="text-sm text-gray-600 font-medium">Total Due</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">₹{(totalDue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500 mt-1">To be collected</p>
                </div>
            </div>

            {/* Payment Method Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Payment Methods Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Cash on Delivery', 'Online Payment', 'Bank Transfer', 'UPI'].map(method => {
                        const count = customerOrders.filter(o => o.payment.paymentMethod === method).length;
                        const total = customerOrders
                            .filter(o => o.payment.paymentMethod === method)
                            .reduce((sum, o) => sum + o.payment.paidAmount, 0);

                        return (
                            <div key={method} className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-2xl mb-1">{getPaymentMethodIcon(method)}</p>
                                <p className="text-xs text-gray-600">{method}</p>
                                <p className="text-lg font-bold text-gray-800 mt-1">{count}</p>
                                <p className="text-xs text-gray-500">₹{(total / 1000).toFixed(0)}K</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Filter */}
            <div className="flex justify-end">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="All">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                </select>
            </div>

            {/* CommonTable with List/Grid View */}
            <CommonTable
                columns={columns}
                data={filteredOrders}
                cardConfig={cardConfig}
                onRowClick={(order) => setSelectedOrder(order)}
                showViewToggle={true}
                defaultView="table"
                showPagination={true}
                defaultRowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                striped
                hoverable
                emptyMessage="No payment records found"
            />

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    {customerOrders
                        .filter(o => o.payment.paymentDate)
                        .sort((a, b) => new Date(b.payment.paymentDate!).getTime() - new Date(a.payment.paymentDate!).getTime())
                        .slice(0, 5)
                        .map(order => (
                            <div key={order.orderId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() => setSelectedOrder(order)}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{order.orderNumber}</p>
                                        <p className="text-xs text-gray-500">{order.customer.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">₹{order.payment.paidAmount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{order.payment.paymentDate}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

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

export default Payments;

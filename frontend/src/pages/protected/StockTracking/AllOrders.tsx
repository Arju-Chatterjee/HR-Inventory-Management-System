import { useState } from 'react';
import { customerOrders as initialOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';
import type { CardConfig, TableColumn } from '../../../components/dynamicComponents/CommonTable';
import CommonTable from '../../../components/dynamicComponents/CommonTable';

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
            header: 'Products',
            accessor: 'products',
            cell: (value) => (
                <div>
                    <p className="text-sm text-gray-800">{value.length} item(s)</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{value[0]?.itemName}</p>
                </div>
            ),
        },
        {
            header: 'Amount',
            accessor: 'grandTotal',
            align: 'right',
            cell: (value) => <p className="font-bold text-gray-800">₹{value.toLocaleString()}</p>,
        },
        {
            header: 'Status',
            accessor: 'orderStatus',
            cell: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(value)}`}>
                    {value}
                </span>
            ),
        },
        {
            header: 'Payment',
            accessor: 'payment',
            cell: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(value.paymentStatus)}`}>
                    {value.paymentStatus}
                </span>
            ),
        },
        {
            header: 'Delivery Date',
            accessor: 'delivery',
            cell: (value) => (
                <div>
                    <p className="text-sm text-gray-800">{value.expectedDate}</p>
                    {value.actualDate && (
                        <p className="text-xs text-green-600">Delivered: {value.actualDate}</p>
                    )}
                </div>
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
                    View Details
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
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800">{row.orderDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-medium text-gray-800">{row.products.length} items</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-indigo-600">₹{row.grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span className="font-medium text-gray-800">{row.delivery.expectedDate}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(row.orderStatus)}`}>
                        {row.orderStatus}
                    </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Payment:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusStyle(row.payment.paymentStatus)}`}>
                        {row.payment.paymentStatus}
                    </span>
                </div>
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
                View Details
            </button>
        ),
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

            {/* CommonTable with List/Grid View */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No orders found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            ) : (
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
                    emptyMessage="No orders found"
                />
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

import { useState } from 'react';
import { customerOrders, type CustomerOrder } from '../../../data/stockTrackingData';
import OrderDetailsModal from './components/OrderDetailsModal';
import type { CardConfig, TableColumn } from '../../../components/dynamicComponents/CommonTable';
import CommonTable from '../../../components/dynamicComponents/CommonTable';

const DeliveredOrders = () => {
    const [orders] = useState<CustomerOrder[]>(
        customerOrders.filter(o => o.orderStatus === 'Delivered')
    );
    const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

    const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
    const totalOrders = orders.length;

    // Table columns configuration
    const columns: TableColumn<CustomerOrder>[] = [
        {
            header: 'Order #',
            accessor: 'orderNumber',
            cell: (value, row) => (
                <div>
                    <p className="font-medium text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500">{row.invoiceNumber}</p>
                </div>
            ),
        },
        {
            header: 'Customer',
            accessor: 'customer',
            cell: (value) => (
                <div>
                    <p className="font-medium text-gray-800">{value.name}</p>
                    <p className="text-xs text-gray-500">{value.deliveryAddress.city}</p>
                </div>
            ),
        },
        {
            header: 'Products',
            accessor: 'products',
            cell: (value) => <span className="text-sm text-gray-800">{value.length} item(s)</span>,
        },
        {
            header: 'Amount',
            accessor: 'grandTotal',
            align: 'right',
            cell: (value) => <p className="font-bold text-green-600">₹{value.toLocaleString()}</p>,
        },
        {
            header: 'Delivery Date',
            accessor: 'delivery',
            cell: (value) => (
                <div>
                    <p className="text-sm font-medium text-gray-800">{value.actualDate}</p>
                    <p className="text-xs text-gray-500">Expected: {value.expectedDate}</p>
                </div>
            ),
        },
        {
            header: 'Delivered By',
            accessor: 'delivery',
            cell: (value) => (
                <div>
                    <p className="text-sm text-gray-800">{value.deliveryPersonName}</p>
                    <p className="text-xs text-gray-500">{value.deliveryPersonPhone}</p>
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
        subtitle: (row) => `${row.customer.name} - ${row.customer.deliveryAddress.city}`,
        content: (row) => (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-green-600 font-medium">Delivered Successfully</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-medium text-gray-800">{row.products.length} items</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-green-600">₹{row.grandTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivered On:</span>
                    <span className="font-medium text-gray-800">{row.delivery.actualDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected:</span>
                    <span className="text-gray-600">{row.delivery.expectedDate}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                            <p className="text-gray-800 font-medium">{row.delivery.deliveryPersonName}</p>
                            <p className="text-xs text-gray-500">{row.delivery.deliveryPersonPhone}</p>
                        </div>
                    </div>
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

            {/* CommonTable with List/Grid View */}
            {orders.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No delivered orders yet</h3>
                    <p className="text-gray-600">Completed deliveries will appear here</p>
                </div>
            ) : (
                <CommonTable
                    columns={columns}
                    data={orders}
                    cardConfig={cardConfig}
                    onRowClick={(order) => setSelectedOrder(order)}
                    showViewToggle={true}
                    defaultView="table"
                    showPagination={true}
                    defaultRowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    striped
                    hoverable
                    emptyMessage="No delivered orders yet"
                />
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

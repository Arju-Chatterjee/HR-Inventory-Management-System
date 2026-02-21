import { inventoryItems } from '../../../data/inventoryData';

const LowStockAlerts = () => {
    const lowStockItems = inventoryItems.filter(item =>
        item.status === 'Low Stock' || item.status === 'Out of Stock'
    );

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h2>
                <p className="text-sm text-gray-600 mt-1">Items that need immediate attention</p>
            </div>

            {/* Alert Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Low Stock Items</p>
                            <p className="text-2xl font-bold text-yellow-700">
                                {lowStockItems.filter(i => i.status === 'Low Stock').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Out of Stock</p>
                            <p className="text-2xl font-bold text-red-700">
                                {lowStockItems.filter(i => i.status === 'Out of Stock').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-3">
                {lowStockItems.map((item) => (
                    <div
                        key={item.id}
                        className={`bg-white rounded-lg border-l-4 p-4 shadow-sm ${item.status === 'Out of Stock' ? 'border-red-500' : 'border-yellow-500'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'Out of Stock'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">{item.sku}</span>
                                </div>

                                <h3 className="text-base font-semibold text-gray-800 mb-1">{item.name}</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-600">Current Stock</p>
                                        <p className="font-semibold text-gray-800">{item.quantity} units</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Min Required</p>
                                        <p className="font-semibold text-gray-800">{item.minStock} units</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Category</p>
                                        <p className="font-semibold text-gray-800">{item.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Location</p>
                                        <p className="font-semibold text-gray-800">{item.location}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm whitespace-nowrap">
                                Reorder Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {lowStockItems.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">All Good!</h3>
                    <p className="text-gray-600">No low stock alerts at the moment</p>
                </div>
            )}
        </div>
    );
};

export default LowStockAlerts;

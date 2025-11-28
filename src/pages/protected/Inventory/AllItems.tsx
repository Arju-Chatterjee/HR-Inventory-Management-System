import { useState } from 'react';
import { inventoryItems as initialItems, type InventoryItem } from '../../../data/inventoryData';
import AddItemModal from './AddItemModal';
import EditItemModal from './components/EditItemModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import type { CardConfig, TableColumn } from '../../../components/dynamicComponents/CommonTable';
import CommonTable from '../../../components/dynamicComponents/CommonTable';

const AllItems = () => {
    const [items, setItems] = useState<InventoryItem[]>(initialItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    // Filter logic
    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    // CRUD Operations
    const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
        const item: InventoryItem = {
            ...newItem,
            id: Math.max(...items.map(i => i.id)) + 1,
        };
        setItems([...items, item]);
        setShowAddModal(false);
    };

    const handleEditItem = (updatedItem: InventoryItem) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setShowEditModal(false);
        setSelectedItem(null);
    };

    const handleDeleteItem = () => {
        if (selectedItem) {
            setItems(items.filter(item => item.id !== selectedItem.id));
            setShowDeleteModal(false);
            setSelectedItem(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            'In Stock': 'bg-green-100 text-green-700',
            'Low Stock': 'bg-yellow-100 text-yellow-700',
            'Out of Stock': 'bg-red-100 text-red-700',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
    };

    // Table columns configuration
    const columns: TableColumn<InventoryItem>[] = [
        {
            header: 'SKU',
            accessor: 'sku',
            width: '120px',
        },
        {
            header: 'Product Name',
            accessor: 'name',
        },
        {
            header: 'Category',
            accessor: 'category',
        },
        {
            header: 'Quantity',
            accessor: 'quantity',
            align: 'center',
            cell: (value) => <span className="font-medium">{value}</span>,
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(value)}`}>
                    {value}
                </span>
            ),
        },
        {
            header: 'Price',
            accessor: 'price',
            align: 'right',
            cell: (value) => <span className="font-medium">₹{value.toLocaleString()}</span>,
        },
        {
            header: 'Location',
            accessor: 'location',
        },
        {
            header: 'Actions',
            accessor: 'id' as keyof InventoryItem,
            cell: (_, row) => (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(row);
                            setShowEditModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-700"
                        title="Edit"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(row);
                            setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            ),
        },
    ];

    // Card configuration for grid view
    const cardConfig: CardConfig<InventoryItem> = {
        title: (row) => row.name,
        subtitle: (row) => `SKU: ${row.sku}`,
        content: (row) => (
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-800">{row.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium text-gray-800">{row.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-800">₹{row.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-800">{row.location}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(row.status)}`}>
                        {row.status}
                    </span>
                </div>
            </div>
        ),
        actions: (row) => (
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(row);
                        setShowEditModal(true);
                    }}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(row);
                        setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                >
                    Delete
                </button>
            </div>
        ),
    };

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600 font-medium">Total Items</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{items.length}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 font-medium">In Stock</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {items.filter(i => i.status === 'In Stock').length}
                    </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 font-medium">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                        {items.filter(i => i.status === 'Low Stock').length}
                    </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-sm text-gray-600 font-medium">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                        {items.filter(i => i.status === 'Out of Stock').length}
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or SKU..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-wrap gap-2">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food Items">Food Items</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Item
                    </button>
                </div>
            </div>

            {/* CommonTable with List/Grid View */}
            {filteredItems.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No items found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilterCategory('All');
                            setFilterStatus('All');
                        }}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <CommonTable
                    columns={columns}
                    data={filteredItems}
                    cardConfig={cardConfig}
                    showViewToggle={true}
                    defaultView="table"
                    showPagination={true}
                    defaultRowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    striped
                    hoverable
                    emptyMessage="No items found"
                />
            )}

            {/* Modals */}
            {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} onAdd={handleAddItem} />}
            {showEditModal && selectedItem && (
                <EditItemModal item={selectedItem} onClose={() => { setShowEditModal(false); setSelectedItem(null); }} onEdit={handleEditItem} />
            )}
            {showDeleteModal && selectedItem && (
                <DeleteConfirmModal
                    itemName={selectedItem.name}
                    onClose={() => { setShowDeleteModal(false); setSelectedItem(null); }}
                    onConfirm={handleDeleteItem}
                />
            )}
        </div>
    );
};

export default AllItems;

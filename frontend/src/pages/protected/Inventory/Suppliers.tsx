import { useState } from 'react';
import { suppliers as initialSuppliers, type Supplier } from '../../../data/inventoryData';
import AddSupplierModal from './components/AddSupplierModal';
import type { CardConfig, TableColumn } from '../../../components/dynamicComponents/CommonTable';
import CommonTable from '../../../components/dynamicComponents/CommonTable';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

    const handleAddSupplier = (newSupplier: Omit<Supplier, 'id'>) => {
        const supplier: Supplier = {
            ...newSupplier,
            id: Math.max(...suppliers.map(s => s.id)) + 1,
        };
        setSuppliers([...suppliers, supplier]);
        setShowAddModal(false);
    };

    const handleEditSupplier = (updatedSupplier: Supplier) => {
        setSuppliers(suppliers.map(sup => sup.id === updatedSupplier.id ? updatedSupplier : sup));
        setEditingSupplier(null);
    };

    const handleSupplierSubmit = (supplier: Supplier | Omit<Supplier, 'id'>) => {
        if ('id' in supplier) {
            handleEditSupplier(supplier);
        } else {
            handleAddSupplier(supplier);
        }
    };

    const handleDeleteSupplier = (id: number) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            setSuppliers(suppliers.filter(sup => sup.id !== id));
        }
    };

    // Table columns configuration
    const columns: TableColumn<Supplier>[] = [
        {
            header: 'Supplier Name',
            accessor: 'name',
            cell: (value) => (
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                        {value.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{value}</span>
                </div>
            ),
        },
        {
            header: 'Contact Person',
            accessor: 'contact',
        },
        {
            header: 'Email',
            accessor: 'email',
            cell: (value) => (
                <a href={`mailto:${value}`} className="text-indigo-600 hover:text-indigo-700">
                    {value}
                </a>
            ),
        },
        {
            header: 'Phone',
            accessor: 'phone',
            cell: (value) => (
                <a href={`tel:${value}`} className="text-gray-800 hover:text-indigo-600">
                    {value}
                </a>
            ),
        },
        {
            header: 'Location',
            accessor: 'address',
        },
        {
            header: 'Items Supplied',
            accessor: 'itemsSupplied',
            align: 'center',
            cell: (value) => (
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {value}
                </span>
            ),
        },
        {
            header: 'Actions',
            accessor: 'id' as keyof Supplier,
            cell: (_, row) => (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditingSupplier(row);
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
                            handleDeleteSupplier(row.id);
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
    const cardConfig: CardConfig<Supplier> = {
        title: (row) => row.name,
        subtitle: (row) => row.contact,
        content: (row) => (
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{row.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{row.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">{row.address}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Items Supplied:</span>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {row.itemsSupplied}
                    </span>
                </div>
            </div>
        ),
        actions: (row) => (
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingSupplier(row);
                    }}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSupplier(row.id);
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Suppliers</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your supplier information</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Supplier
                </button>
            </div>

            {/* CommonTable with List/Grid View */}
            <CommonTable
                columns={columns}
                data={suppliers}
                cardConfig={cardConfig}
                showViewToggle={true}
                defaultView="table"
                showPagination={true}
                defaultRowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                striped
                hoverable
                emptyMessage="No suppliers found"
            />

            {/* Modals */}
            {showAddModal && (
                <AddSupplierModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleSupplierSubmit}
                />
            )}

            {editingSupplier && (
                <AddSupplierModal
                    supplier={editingSupplier}
                    onClose={() => setEditingSupplier(null)}
                    onAdd={handleSupplierSubmit}
                />
            )}
        </div>
    );
};

export default Suppliers;

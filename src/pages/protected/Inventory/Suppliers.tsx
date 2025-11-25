import { useState } from 'react';
import { suppliers as initialSuppliers, type Supplier } from '../../../data/inventoryData';
import AddSupplierModal from './components/AddSupplierModal';

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

    // FIX: Create a wrapper function that handles both types
    const handleSupplierSubmit = (supplier: Supplier | Omit<Supplier, 'id'>) => {
        if ('id' in supplier) {
            // It's an edit (has id)
            handleEditSupplier(supplier);
        } else {
            // It's a new supplier (no id)
            handleAddSupplier(supplier);
        }
    };

    const handleDeleteSupplier = (id: number) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            setSuppliers(suppliers.filter(sup => sup.id !== id));
        }
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

            {/* Suppliers Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Supplier Name</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact Person</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items Supplied</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {suppliers.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                                                {supplier.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-800">{supplier.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800">{supplier.contact}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.phone}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.address}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {supplier.itemsSupplied}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingSupplier(supplier)}
                                                className="text-indigo-600 hover:text-indigo-700"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSupplier(supplier.id)}
                                                className="text-red-600 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals - FIX: Use the wrapper function */}
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

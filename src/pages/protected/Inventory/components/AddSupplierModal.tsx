import { useState } from 'react';
import type { Supplier } from '../../../../data/inventoryData';
import CommonMatModel from '../../../../components/dynamicComponents/CommonMatModel';

interface AddSupplierModalProps {
    supplier?: Supplier;
    onClose: () => void;
    onAdd: (supplier: Omit<Supplier, 'id'> | Supplier) => void;
}

const AddSupplierModal = ({ supplier, onClose, onAdd }: AddSupplierModalProps) => {
    const [formData, setFormData] = useState({
        name: supplier?.name || '',
        contact: supplier?.contact || '',
        email: supplier?.email || '',
        phone: supplier?.phone || '',
        address: supplier?.address || '',
        itemsSupplied: supplier?.itemsSupplied || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (supplier) {
            onAdd({ ...supplier, ...formData });
        } else {
            onAdd(formData);
        }
    };

    return (
        <CommonMatModel
            open={true}
            onClose={onClose}
            title={supplier ? 'Edit Supplier' : 'Add New Supplier'}
            maxWidth="md"
        >

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g., Tech Suppliers Ltd"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                    <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g., Rajesh Kumar"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="contact@supplier.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="+91 98765 43210"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="City, State"
                    />
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
                        {supplier ? 'Update' : 'Add'} Supplier
                    </button>
                </div>
            </form>
        </CommonMatModel>
    );
};

export default AddSupplierModal;

import { useState } from 'react';
import type { InventoryItem } from '../../../data/inventoryData';
import CommonMatModel from '../../../components/dynamicComponents/CommonMatModel';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
}

const AddItemModal = ({ onClose, onAdd }: AddItemModalProps) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Electronics',
    quantity: 0,
    minStock: 0,
    price: 0,
    cost: 0,
    supplier: 'Tech Suppliers Ltd',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const status: InventoryItem['status'] =
      formData.quantity === 0 ? 'Out of Stock' :
        formData.quantity <= formData.minStock ? 'Low Stock' : 'In Stock';

    onAdd({
      ...formData,
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <CommonMatModel
      open={true}
      onClose={onClose}
      title="Add New Item"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., ELEC-005"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Food Items">Food Items</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
            <select
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Tech Suppliers Ltd">Tech Suppliers Ltd</option>
              <option value="Furniture Pro">Furniture Pro</option>
              <option value="Textile Hub">Textile Hub</option>
              <option value="Food Distributors">Food Distributors</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Stock *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g., Warehouse A - A5"
            />
          </div>
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
            Add Item
          </button>
        </div>
      </form>
    </CommonMatModel>
  );
};

export default AddItemModal;

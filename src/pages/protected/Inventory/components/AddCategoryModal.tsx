import { useState } from 'react';
import type { Category } from '../../../../data/inventoryData';
import CommonMatModel from '../../../../components/dynamicComponents/CommonMatModel';

interface AddCategoryModalProps {
    category?: Category;
    onClose: () => void;
    onAdd: (category: Omit<Category, 'id'> | Category) => void;
}

const AddCategoryModal = ({ category, onClose, onAdd }: AddCategoryModalProps) => {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        itemCount: category?.itemCount || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            onAdd({ ...category, ...formData });
        } else {
            onAdd(formData);
        }
    };

    return (
        <CommonMatModel
            open={true}
            onClose={onClose}
            title={category ? 'Edit Category' : 'Add New Category'}
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g., Electronics"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Brief description of the category"
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
                        {category ? 'Update' : 'Add'} Category
                    </button>
                </div>
            </form>
        </CommonMatModel>
    );
};

export default AddCategoryModal;

import { useState } from 'react';
import { categories as initialCategories, type Category } from '../../../data/inventoryData';
import AddCategoryModal from './components/AddCategoryModal';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
        const category: Category = {
            ...newCategory,
            id: Math.max(...categories.map(c => c.id)) + 1,
        };
        setCategories([...categories, category]);
        setShowAddModal(false);
    };

    const handleEditCategory = (updatedCategory: Category) => {
        setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
        setEditingCategory(null);
    };

    // FIX: Create a wrapper function
    const handleCategorySubmit = (category: Category | Omit<Category, 'id'>) => {
        if ('id' in category) {
            // It's an edit (has id)
            handleEditCategory(category);
        } else {
            // It's a new category (no id)
            handleAddCategory(category);
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Product Categories</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your inventory categories</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold">
                                {category.name.charAt(0)}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingCategory(category)}
                                    className="text-indigo-600 hover:text-indigo-700"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="text-red-600 hover:text-red-700"
                                    title="Delete"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <span className="text-sm text-gray-600">Total Items</span>
                            <span className="text-lg font-bold text-indigo-600">{category.itemCount}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals - FIX: Use the wrapper function */}
            {showAddModal && (
                <AddCategoryModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleCategorySubmit}
                />
            )}

            {editingCategory && (
                <AddCategoryModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onAdd={handleCategorySubmit}
                />
            )}
        </div>
    );
};

export default Categories;

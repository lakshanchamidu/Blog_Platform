import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Tag,
  X,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";

export default function Categories({
  user,
  categories,
  message,
  error,
  navigateTo,
  onCreateCategory,
  onDeleteCategory,
  onCloseMessage,
  onCloseError,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!newCategory.trim()) {
      return;
    }

    if (newCategory.length < 2) {
      return;
    }

    if (categories.includes(newCategory.trim())) {
      return;
    }

    setLoading(true);
    onCreateCategory({ name: newCategory.trim() });
    setNewCategory("");
    setLoading(false);
  };

  const handleDelete = (categoryName) => {
    if (
      window.confirm(
        `Are you sure you want to delete the "${categoryName}" category? This action cannot be undone.`
      )
    ) {
      onDeleteCategory(categoryName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateTo("dashboard")}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-400" />
              <h1 className="text-xl font-bold text-white">
                Manage Categories
              </h1>
            </div>

            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Messages */}
      {message && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div className="p-4 text-sm text-green-300 bg-green-900/30 rounded-lg border border-green-800/50 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {message}
            </div>
            <button
              onClick={onCloseMessage}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div className="p-4 text-sm text-red-300 bg-red-900/30 rounded-lg border border-red-800/50 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </div>
            <button
              onClick={onCloseError}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Category Management
          </h2>
          <p className="text-gray-400">
            Create and manage blog post categories
          </p>
        </div>

        {/* Add New Category */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Category
          </h3>

          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all text-white placeholder-gray-400"
                placeholder="Enter category name..."
                maxLength={30}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  {newCategory.length < 2 && newCategory.length > 0
                    ? "At least 2 characters required"
                    : categories.includes(newCategory.trim())
                    ? "Category already exists"
                    : "Choose a unique and descriptive name"}
                </p>
                <p className="text-xs text-gray-500">{newCategory.length}/30</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !newCategory.trim() ||
                newCategory.length < 2 ||
                categories.includes(newCategory.trim())
              }
              className="px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Existing Categories ({categories.length})
            </h3>
          </div>

          {categories.length === 0 ? (
            <div className="p-8 text-center">
              <Tag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-400 mb-2">
                No categories yet
              </h4>
              <p className="text-gray-500">
                Create your first category to organize your blog posts
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-6 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {category}
                      </h4>
                      <p className="text-sm text-gray-400">Blog category</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                      Active
                    </span>
                    <button
                      onClick={() => handleDelete(category)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-900/20"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">
            Category Guidelines
          </h4>
          <ul className="text-blue-200 text-sm space-y-2">
            <li>• Category names should be descriptive and unique</li>
            <li>• Use title case for consistency (e.g., "Web Development")</li>
            <li>• Keep names concise but meaningful</li>
            <li>• Categories help readers find relevant content</li>
            <li>• Deleting a category won't affect existing posts</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // New category form states
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => alert("Error loading categories"));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter category name");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDescription,
        }),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create category");
      }
      setNewCategoryName("");
      setNewCategoryDescription("");
      setShowNewCategoryForm(false);
      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !categoryId) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, categoryId }),
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to create blog");
        }
        return res.json();
      })
      .then(() => {
        alert("Blog created!");
        navigate("/blogs");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={() => navigate("/blogs")}
              className="flex items-center text-gray-300 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/10 group"
            >
              <svg
                className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Back to Blogs</span>
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Create Blog</h1>
                <p className="text-gray-300 text-sm">
                  Share your story with the world
                </p>
              </div>

              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form - Takes 2 columns */}
          <div className="xl:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl animate-pulse"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                {/* Title Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-white">Blog Title</h2>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Give your blog a compelling title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an engaging title that captures your story..."
                        className="w-full p-6 text-xl bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Section */}
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-white">Category</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Select Category
                      </label>
                      <div className="relative">
                        <select
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/10 appearance-none cursor-pointer"
                        >
                          <option
                            value=""
                            className="bg-slate-800 text-gray-300"
                          >
                            Choose a category...
                          </option>
                          {categories.map((c) => (
                            <option
                              key={c._id}
                              value={c._id}
                              className="bg-slate-800 text-white"
                            >
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          setShowNewCategoryForm(!showNewCategoryForm)
                        }
                        className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        {showNewCategoryForm
                          ? "Cancel New Category"
                          : "Create New Category"}
                      </button>
                    </div>
                  </div>

                  {/* New Category Form */}
                  {showNewCategoryForm && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 animate-fade-in">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Create New Category
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">
                            Category Name
                          </label>
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="e.g. Technology, Travel..."
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">
                            Description (Optional)
                          </label>
                          <input
                            type="text"
                            value={newCategoryDescription}
                            onChange={(e) =>
                              setNewCategoryDescription(e.target.value)
                            }
                            className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Brief description..."
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCreateCategory}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Create Category
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-xl font-bold text-white">Content</h2>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Write your blog content
                    </label>
                    <div className="relative">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        placeholder="Start writing your story here... Share your thoughts, experiences, and insights with your readers."
                        className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/10 resize-none"
                      />
                      <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                        {content.length} characters
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                  <button
                    type="submit"
                    className="flex-1 py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-lg"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Publish Blog
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/blogs")}
                    className="sm:w-auto py-4 px-8 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-lg"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Tips and Preview */}
          <div className="xl:col-span-1 space-y-6">
            {/* Writing Tips */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Writing Tips
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start p-3 bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Use a compelling title that grabs attention and clearly
                    conveys your main message
                  </span>
                </div>
                <div className="flex items-start p-3 bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Choose the most relevant category to help readers find your
                    content
                  </span>
                </div>
                <div className="flex items-start p-3 bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Write in a clear, engaging style with personal insights and
                    examples
                  </span>
                </div>
                <div className="flex items-start p-3 bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    Break up long paragraphs and use subheadings for better
                    readability
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Title</span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      title ? "bg-green-400" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Category</span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      categoryId ? "bg-green-400" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Content</span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      content.length > 50 ? "bg-green-400" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Ready to publish</span>
                    <span
                      className={`font-medium ${
                        title && categoryId && content.length > 50
                          ? "text-green-400"
                          : "text-gray-400"
                      }`}
                    >
                      {title && categoryId && content.length > 50
                        ? "✓ Ready"
                        : "Incomplete"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

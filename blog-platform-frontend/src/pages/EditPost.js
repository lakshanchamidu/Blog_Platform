import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BookOpen,
  Save,
  X,
  PenTool,
  Tag,
  FileText,
  Eye,
  Calendar,
} from "lucide-react";

export default function EditPost({
  user,
  editingPost,
  error,
  setError,
  navigateTo,
  onUpdatePost,
}) {
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    category: "Technology",
  });
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const categories = [
    "Technology",
    "Programming",
    "Design",
    "Backend",
    "Best Practices",
    "Tutorial",
    "Web Development",
    "Mobile Development",
    "DevOps",
    "AI/ML",
  ];

  useEffect(() => {
    if (editingPost) {
      setPostForm({
        title: editingPost.title,
        content: editingPost.content,
        category: editingPost.category,
      });
    }
  }, [editingPost]);

  if (!editingPost) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Post not found</h2>
          <button
            onClick={() => navigateTo("dashboard")}
            className="text-blue-400 hover:text-blue-300"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const onChange = (e) => {
    setPostForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError(null);
    setHasChanges(true);
  };

  const handleSubmit = () => {
    if (!postForm.title.trim()) {
      return setError("Please enter a post title");
    }
    if (!postForm.content.trim()) {
      return setError("Please enter post content");
    }
    if (postForm.title.length < 5) {
      return setError("Title must be at least 5 characters long");
    }
    if (postForm.content.length < 50) {
      return setError("Content must be at least 50 characters long");
    }

    const updatedPost = {
      ...editingPost,
      title: postForm.title.trim(),
      content: postForm.content.trim(),
      category: postForm.category,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    onUpdatePost(updatedPost);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
        navigateTo("view", editingPost);
      }
    } else {
      navigateTo("view", editingPost);
    }
  };

  const wordCount = postForm.content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = postForm.content.length;

  // Check if owner
  if (editingPost.author !== user.name) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">You can only edit your own posts</p>
          <button
            onClick={() => navigateTo("view", editingPost)}
            className="text-blue-400 hover:text-blue-300"
          >
            View this post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Post</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <h1 className="text-xl font-bold text-white">Edit Post</h1>
              {hasChanges && (
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full">
                  Unsaved
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!hasChanges}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                <Save className="w-4 h-4" />
                <span>Update Post</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div className="p-4 text-sm text-red-300 bg-red-900/30 rounded-lg border border-red-800/50 flex items-center">
            <X className="w-4 h-4 mr-2 flex-shrink-0" />
            {error}
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!isPreview ? (
          // Edit Mode
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Post Info Header */}
            <div className="px-8 py-4 bg-gray-900/50 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {editingPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {editingPost.author}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created: {editingPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{editingPost.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                  Editing Mode
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <PenTool className="w-4 h-4 mr-2" />
                    Post Title
                  </label>
                  <input
                    name="title"
                    value={postForm.title}
                    onChange={onChange}
                    className="w-full px-4 py-4 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all text-white placeholder-gray-400 text-xl font-semibold"
                    placeholder="Enter an engaging title for your post..."
                    maxLength={100}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      Make it catchy and descriptive
                    </p>
                    <p className="text-xs text-gray-500">
                      {postForm.title.length}/100
                    </p>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <Tag className="w-4 h-4 mr-2" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={postForm.category}
                    onChange={onChange}
                    className="w-full px-4 py-4 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose the most relevant category
                  </p>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={postForm.content}
                    onChange={onChange}
                    rows={16}
                    className="w-full px-4 py-4 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all text-white placeholder-gray-400 resize-none leading-relaxed"
                    placeholder="Share your thoughts, ideas, and insights here..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {wordCount} words, {charCount} characters
                    </p>
                    <p className="text-xs text-gray-500">
                      Minimum 50 characters required
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel Changes</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsPreview(true)}
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Preview Changes
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={
                        !postForm.title.trim() ||
                        !postForm.content.trim() ||
                        !hasChanges
                      }
                      className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Preview Mode
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Preview Header */}
            <div className="px-8 py-4 bg-blue-600/10 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 text-sm font-medium">
                  Preview Mode
                </span>
                <button
                  onClick={() => setIsPreview(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Continue Editing
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-semibold rounded-full">
                  {postForm.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-6">
                {postForm.title || "Untitled Post"}
              </h1>

              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <div className="flex items-center text-sm text-gray-400 space-x-2">
                      <span>Originally: {editingPost.date}</span>
                      {hasChanges && (
                        <span className="text-orange-400">
                          • Modified: {new Date().toISOString().split("T")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Eye className="w-5 h-5" />
                    <span>{editingPost.views}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <PenTool className="w-5 h-5" />
                    <span>{wordCount} words</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {postForm.content ||
                    "No content yet. Start writing your post!"}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsPreview(false)}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Continue Editing
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!hasChanges}
                    className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-colors font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import React, { useState } from "react";
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  User,
  LogOut,
  Calendar,
  Eye,
  BookOpen,
  Home,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Dashboard({
  user,
  posts,
  message,
  error,
  onLogout,
  navigateTo,
  onDeletePost,
  onLikePost,
  onCloseMessage,
  onCloseError,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userPosts = posts.filter((post) => post.author === user.name);
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce(
    (sum, post) => sum + post.comments.length,
    0
  );

  const handleDeletePost = (postId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDeletePost(postId);
    }
  };

  const handleLikePost = (postId, e) => {
    e.stopPropagation();
    onLikePost(postId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-6 h-6" />
                <span>BlogSpace</span>
              </h1>
              <div className="hidden md:flex space-x-6">
                <button className="font-medium text-white flex items-center space-x-1">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Messages */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
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
        <div className="max-w-7xl mx-auto px-4 pt-4">
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-400">
            Manage your blog posts and explore content from the community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-300 font-medium mb-2">My Posts</h3>
            <p className="text-3xl font-bold text-blue-400">
              {userPosts.length}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-300 font-medium mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-green-400">{totalViews}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-300 font-medium mb-2">Total Likes</h3>
            <p className="text-3xl font-bold text-red-400">{totalLikes}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-300 font-medium mb-2">Comments</h3>
            <p className="text-3xl font-bold text-purple-400">
              {totalComments}
            </p>
          </div>
        </div>

        {/* Search and Create Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">All Posts</h3>
            <p className="text-gray-400">Browse and manage blog posts</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => navigateTo("add")}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
              onClick={() => navigateTo("view", post)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-gray-100">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {post.author}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleLikePost(post.id, e)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes}</span>
                    </button>

                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{post.comments.length}</span>
                    </div>

                    {post.author === user.name && (
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo("edit", post);
                          }}
                          className="p-1 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeletePost(post.id, e)}
                          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first post to get started"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

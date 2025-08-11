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
  Tag,
  TrendingUp,
  Activity,
  Star,
  BarChart3,
  Zap,
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

  // User-specific stats
  const userViews = userPosts.reduce((sum, post) => sum + post.views, 0);
  const userLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const userComments = userPosts.reduce(
    (sum, post) => sum + post.comments.length,
    0
  );
  const avgViewsPerPost =
    userPosts.length > 0 ? Math.round(userViews / userPosts.length) : 0;
  const avgLikesPerPost =
    userPosts.length > 0 ? Math.round(userLikes / userPosts.length) : 0;

  // Most popular user post
  const mostPopularPost =
    userPosts.length > 0
      ? userPosts.reduce((prev, current) =>
          prev.views > current.views ? prev : current
        )
      : null;

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

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    bgColor,
    onClick,
    clickable = false,
  }) => (
    <div
      className={`relative bg-gradient-to-br ${bgColor} p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        clickable ? "cursor-pointer" : ""
      } group overflow-hidden`}
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8">
        <div className={`w-full h-full rounded-full ${color} opacity-10`}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
          </div>
          {clickable && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-gray-300 font-medium text-sm mb-1">{title}</h3>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span>BlogSpace</span>
              </h1>
              <div className="hidden md:flex space-x-6">
                <button className="font-medium text-white flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-lg">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => navigateTo("categories")}
                  className="font-medium text-gray-400 hover:text-white flex items-center space-x-1 px-3 py-1 hover:bg-white/5 rounded-lg transition-all"
                >
                  <Tag className="w-4 h-4" />
                  <span>Categories</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300 bg-gray-700/50 px-3 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 px-3 py-2 hover:bg-red-900/20 rounded-lg transition-all"
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
          <div className="p-4 text-sm text-green-300 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl border border-green-700/50 backdrop-blur-sm flex items-center justify-between">
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
          <div className="p-4 text-sm text-red-300 bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-xl border border-red-700/50 backdrop-blur-sm flex items-center justify-between">
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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-400 text-lg">
            Your content is making an impact. Here's your latest stats and
            community activity.
          </p>
        </div>

        {/* Personal Stats Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
            Your Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={BookOpen}
              title="My Posts"
              value={userPosts.length}
              subtitle={
                userPosts.length > 0
                  ? `${userPosts.length} published`
                  : "Create your first post"
              }
              color="bg-blue-500"
              bgColor="from-gray-800 to-blue-900/20"
              onClick={() => navigateTo("add")}
              clickable={true}
            />
            <StatCard
              icon={Eye}
              title="My Total Views"
              value={userViews.toLocaleString()}
              subtitle={`Avg ${avgViewsPerPost} per post`}
              color="bg-green-500"
              bgColor="from-gray-800 to-green-900/20"
            />
            <StatCard
              icon={Heart}
              title="My Total Likes"
              value={userLikes.toLocaleString()}
              subtitle={`Avg ${avgLikesPerPost} per post`}
              color="bg-red-500"
              bgColor="from-gray-800 to-red-900/20"
            />
            <StatCard
              icon={MessageCircle}
              title="My Comments"
              value={userComments.toLocaleString()}
              subtitle={
                userComments > 0
                  ? `${userComments} total discussions`
                  : "No comments yet"
              }
              color="bg-purple-500"
              bgColor="from-gray-800 to-purple-900/20"
            />
          </div>
        </div>

        {/* Popular Post & Community Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Most Popular Post */}
          {mostPopularPost && (
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Your Top Performing Post
              </h3>
              <div
                className="cursor-pointer group"
                onClick={() => navigateTo("view", mostPopularPost)}
              >
                <h4 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mb-2">
                  {mostPopularPost.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {mostPopularPost.content}
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center text-green-400">
                    <Eye className="w-4 h-4 mr-1" />
                    {mostPopularPost.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center text-red-400">
                    <Heart className="w-4 h-4 mr-1" />
                    {mostPopularPost.likes} likes
                  </div>
                  <div className="flex items-center text-purple-400">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {mostPopularPost.comments.length} comments
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Stats */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-400" />
              Community
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-white">{posts.length}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Community Views</p>
                <p className="text-2xl font-bold text-green-400">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-purple-400">
                  {posts.length > 0
                    ? new Set(posts.map((p) => p.category)).size
                    : 6}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Create Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              All Posts
            </h3>
            <p className="text-gray-400">
              Discover and manage community content
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, categories, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400 w-64 backdrop-blur-sm transition-all"
              />
            </div>
            <button
              onClick={() => navigateTo("add")}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => navigateTo("view", post)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 text-xs font-semibold rounded-full border border-gray-600">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-400 space-x-2 bg-gray-700/30 px-2 py-1 rounded-lg">
                    <Eye className="w-3 h-3" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => handleLikePost(post.id, e)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-400 transition-colors bg-gray-700/30 px-2 py-1 rounded-lg hover:bg-red-900/20"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes}</span>
                    </button>

                    <div className="flex items-center space-x-1 text-gray-500 bg-gray-700/30 px-2 py-1 rounded-lg">
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
                          className="p-2 text-gray-500 hover:text-blue-400 transition-colors bg-gray-700/30 rounded-lg hover:bg-blue-900/20"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeletePost(post.id, e)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors bg-gray-700/30 rounded-lg hover:bg-red-900/20"
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
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700/50 backdrop-blur-sm max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms or explore different categories"
                  : "Create your first post and start sharing your ideas with the community"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => navigateTo("add")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Create Your First Post
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

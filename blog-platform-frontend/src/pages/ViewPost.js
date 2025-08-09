import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  Edit,
  Trash2,
  Send,
  User,
} from "lucide-react";

export default function ViewPost({
  user,
  selectedPost,
  error,
  setError,
  navigateTo,
  onDeletePost,
  onLikePost,
  onAddComment,
}) {
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  if (!selectedPost) {
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

  const handleAddComment = () => {
    if (!commentText.trim()) {
      return setError("Please enter a comment");
    }
    if (commentText.length < 3) {
      return setError("Comment must be at least 3 characters long");
    }

    onAddComment(selectedPost.id, { content: commentText.trim() });
    setCommentText("");
    setError(null);
  };

  const handleLike = () => {
    onLikePost(selectedPost.id);
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      onDeletePost(selectedPost.id);
    }
  };

  const isOwner = selectedPost.author === user.name;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigateTo("dashboard")}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            <h1 className="text-xl font-bold text-white">Reading Post</h1>

            {isOwner && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateTo("edit", selectedPost)}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}

            {!isOwner && <div className="w-32"></div>}
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div className="p-4 text-sm text-red-300 bg-red-900/30 rounded-lg border border-red-800/50">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Post Content */}
        <article className="bg-gray-800 rounded-xl border border-gray-700 mb-8">
          <div className="p-8">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-4 py-2 bg-gray-700 text-gray-300 text-sm font-semibold rounded-full">
                {selectedPost.category}
              </span>
            </div>

            {/* Post Title */}
            <h1 className="text-4xl font-bold text-white mb-8 leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author Info and Stats */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">
                    {selectedPost.author}
                  </p>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedPost.views} views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Heart className="w-5 h-5" />
                  <span className="text-lg">{selectedPost.likes}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-lg">
                    {selectedPost.comments.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                {selectedPost.content}
              </div>
            </div>

            {/* Like and Comment Buttons */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-700">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-red-600 text-white"
                    : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>Like ({selectedPost.likes})</span>
              </button>
              <button
                onClick={() => document.getElementById("comment-input").focus()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comment ({selectedPost.comments.length})</span>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Comments ({selectedPost.comments.length})
            </h3>

            {/* Add Comment Form */}
            <div className="mb-8 p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <textarea
                    id="comment-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts on this post..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-all text-white placeholder-gray-400 resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-500">
                      {commentText.length}/500 characters
                    </p>
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {selectedPost.comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-400 mb-2">
                    No comments yet
                  </h4>
                  <p className="text-gray-500">
                    Be the first to share your thoughts on this post!
                  </p>
                </div>
              ) : (
                selectedPost.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30"
                  >
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-white">
                          {comment.author}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {comment.date}
                        </span>
                        {comment.author === user.name && (
                          <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  User,
  LogOut,
  Calendar,
  Eye,
  Shield,
  Lock,
  Mail,
  EyeOff,
  PenTool,
  BookOpen,
} from "lucide-react";

export default function BlogPlatform() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [mode, setMode] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    category: "Technology",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mockPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      content:
        "Web development is evolving rapidly with new frameworks and technologies emerging every day. React, Vue, and Svelte are leading the way in frontend development, while backend technologies like Node.js, Python, and Go continue to dominate server-side development.",
      category: "Technology",
      author: "Sarah Chen",
      date: "2025-01-15",
      likes: 42,
      comments: 8,
      views: 156,
    },
    {
      id: 2,
      title: "Mastering React Hooks",
      content:
        "React Hooks have revolutionized how we write components in React. useState and useEffect are just the beginning - custom hooks allow us to create reusable stateful logic that can be shared across components.",
      category: "Programming",
      author: "Alex Rodriguez",
      date: "2025-01-12",
      likes: 38,
      comments: 12,
      views: 203,
    },
    {
      id: 3,
      title: "Design Systems That Scale",
      content:
        "Creating a design system is more than just building a component library. It requires careful consideration of color palettes, typography scales, spacing systems, and interaction patterns.",
      category: "Design",
      author: "Emma Thompson",
      date: "2025-01-10",
      likes: 29,
      comments: 6,
      views: 98,
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "Demo User", email: "demo@example.com" });
    }
    setPosts(mockPosts);
  }, []);

  const onChange = (e, formType = "auth") => {
    if (formType === "post") {
      setPostForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    } else {
      setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }
  };

  const switchAuthMode = (m) => {
    setAuthMode(m);
    setForm({ name: "", email: "", password: "", confirm: "" });
    setMessage(null);
    setError(null);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuth = () => {
    setError(null);

    if (authMode === "register") {
      if (!form.name || !form.email || !form.password) {
        return setError("Please fill all fields");
      }
      if (form.password !== form.confirm) {
        return setError("Passwords do not match");
      }
      if (form.password.length < 6) {
        return setError("Password must be at least 6 characters");
      }
    } else {
      if (!form.email || !form.password) {
        return setError("Please enter email and password");
      }
    }

    if (!isValidEmail(form.email)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "demo-token");
      setUser({ name: form.name || "Demo User", email: form.email });
      setMessage(
        `${authMode === "login" ? "Login" : "Registration"} successful!`
      );
      setForm({ name: "", email: "", password: "", confirm: "" });
      setLoading(false);
    }, 1500);
  };

  const handleCreatePost = () => {
    if (!postForm.title || !postForm.content) {
      return setError("Please fill all fields");
    }

    const newPost = {
      id: Date.now(),
      title: postForm.title,
      content: postForm.content,
      category: postForm.category,
      author: user.name,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
      views: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostForm({ title: "", content: "", category: "Technology" });
    setMessage("Post created successfully!");
    setMode("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMessage("Logged out successfully");
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    "Technology",
    "Programming",
    "Design",
    "Backend",
    "Best Practices",
    "Tutorial",
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex">
        <div className="flex-1 bg-gray-800 p-8 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-300" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">BlogSpace</h1>
              <p className="text-gray-400 text-lg">
                Share your thoughts with the world
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30">
                <h3 className="text-white font-semibold mb-2">
                  🚀 Create & Share
                </h3>
                <p className="text-gray-400 text-sm">
                  Write and publish your thoughts, ideas, and stories
                </p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30">
                <h3 className="text-white font-semibold mb-2">💬 Engage</h3>
                <p className="text-gray-400 text-sm">
                  Connect with readers through likes and comments
                </p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600/30">
                <h3 className="text-white font-semibold mb-2">📈 Grow</h3>
                <p className="text-gray-400 text-sm">
                  Build your audience and track your impact
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="bg-gray-800/90 rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gray-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {authMode === "login" ? "Welcome Back" : "Join Us"}
                  </h2>
                  <p className="text-gray-400">
                    {authMode === "login"
                      ? "Sign in to your account"
                      : "Create your account"}
                  </p>
                </div>

                <div className="flex bg-gray-900/60 rounded-2xl p-1 mb-8">
                  <button
                    onClick={() => switchAuthMode("login")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      authMode === "login"
                        ? "bg-white text-gray-900"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => switchAuthMode("register")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      authMode === "register"
                        ? "bg-white text-gray-900"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Register
                  </button>
                </div>

                {error && (
                  <div className="p-4 mb-6 text-sm text-red-300 bg-red-900/30 rounded-2xl border border-red-800/50">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="p-4 mb-6 text-sm text-green-300 bg-green-900/30 rounded-2xl border border-green-800/50">
                    {message}
                  </div>
                )}

                <div className="space-y-5">
                  {authMode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          name="name"
                          value={form.name}
                          onChange={onChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/60 border border-gray-700/50 focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-gray-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        type="email"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/60 border border-gray-700/50 focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/60 border border-gray-700/50 focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {authMode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          name="confirm"
                          value={form.confirm}
                          onChange={onChange}
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/60 border border-gray-700/50 focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-gray-500"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAuth}
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-gray-900 bg-white hover:bg-gray-100 disabled:opacity-50 font-semibold transition-all"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : authMode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1
                className="text-2xl font-bold text-white cursor-pointer flex items-center space-x-2"
                onClick={() => setMode("home")}
              >
                <BookOpen className="w-6 h-6" />
                <span>BlogSpace</span>
              </h1>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => setMode("home")}
                  className={`font-medium transition-colors flex items-center space-x-1 ${
                    mode === "home"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => setMode("create")}
                  className={`font-medium transition-colors flex items-center space-x-1 ${
                    mode === "create"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span>Write</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {message && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-3 text-sm text-green-300 bg-green-900/30 rounded-lg border border-green-800/50">
            {message}
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-3 text-sm text-red-300 bg-red-900/30 rounded-lg border border-red-800/50">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {mode === "home" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Latest Articles
                </h2>
                <p className="text-gray-400 mt-2">
                  Discover insights from our community
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={() => setMode("create")}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedPost(post);
                    setMode("view");
                  }}
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
                    <h3 className="text-lg font-semibold text-white mb-3">
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
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {mode === "create" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Create New Post
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  name="title"
                  value={postForm.title}
                  onChange={(e) => onChange(e, "post")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400"
                  placeholder="Enter your post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={postForm.category}
                  onChange={(e) => onChange(e, "post")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-white/20 text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={postForm.content}
                  onChange={(e) => onChange(e, "post")}
                  rows={12}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400 resize-none"
                  placeholder="Write your post content here..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                >
                  Publish Post
                </button>
                <button
                  onClick={() => setMode("home")}
                  className="px-6 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === "view" && selectedPost && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setMode("home")}
              className="mb-6 text-gray-400 hover:text-white font-medium"
            >
              ← Back to articles
            </button>

            <article className="bg-gray-800 rounded-xl border border-gray-700 p-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-semibold rounded-full">
                  {selectedPost.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-6">
                {selectedPost.title}
              </h1>

              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {selectedPost.author}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPost.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Eye className="w-5 h-5" />
                    <span>{selectedPost.views}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Heart className="w-5 h-5" />
                    <span>{selectedPost.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedPost.comments}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {selectedPost.content}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Like ({selectedPost.likes})</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comment ({selectedPost.comments})</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </main>
    </div>
  );
}

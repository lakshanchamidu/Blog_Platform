import React, { useState, useEffect } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import AddPost from "./pages/AddPost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";

export default function App() {
  const [currentPage, setCurrentPage] = useState("auth");
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Utility: update URL hash
  const updateURL = (page, id = null) => {
    window.location.hash = page + (id ? `/${id}` : "");
  };

  // Get page and id from URL hash
  const getPageFromURL = () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const [page, id] = hash.split("/");
      return { page: page || "auth", id: id ? parseInt(id) : null };
    }
    return { page: "auth" };
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      // Auto close error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle login and register both here:
  const handleLogin = async (formData) => {
    setError(null);
    setMessage(null);
    try {
      const url = formData.name
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      if (url === "http://localhost:5000/api/auth/login") {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setMessage("Login successful");
        setCurrentPage("dashboard");
        updateURL("dashboard");
        await fetchPosts();

        // Auto close message after 2 seconds
        setTimeout(() => setMessage(null), 2000);
      } else {
        setMessage("Registration successful. Please login.");
        setCurrentPage("auth");
        updateURL("auth");

        // Auto close message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPosts([]);
    setSelectedPost(null);
    setEditingPost(null);
    setMessage("Logged out successfully");
    setCurrentPage("auth");
    updateURL("auth");

    // Auto close message after 2 seconds
    setTimeout(() => setMessage(null), 2000);
  };

  // Create post
  const handleCreatePost = async (postData) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");

      setPosts((prev) => [data, ...prev]);
      setMessage("Post created successfully!");
      setCurrentPage("dashboard");
      updateURL("dashboard");

      // Auto close message after 2 seconds
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Update post
  const handleUpdatePost = async (updatedPost) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/blogs/${updatedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update post");

      setPosts((prev) =>
        prev.map((post) => (post.id === data.id ? data : post))
      );
      setMessage("Post updated successfully!");
      setSelectedPost(data);
      setCurrentPage("view");
      updateURL("view", data.id);
      setEditingPost(null);

      // Auto close message after 2 seconds
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/blogs/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete post");

      setPosts((prev) => prev.filter((post) => post.id !== postId));
      setMessage("Post deleted successfully!");
      setCurrentPage("dashboard");
      updateURL("dashboard");
      setSelectedPost(null);

      // Auto close message after 2 seconds
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Add comment
  const handleAddComment = async (postId, commentData) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/blogs/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });
      const newComment = await res.json();
      if (!res.ok)
        throw new Error(newComment.message || "Failed to add comment");

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setSelectedPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setMessage("Comment added successfully!");

      // Auto close message after 2 seconds
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Like post
  const handleLikePost = async (postId) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/blogs/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to like post");

      // Increment locally
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );

      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likes: prev.likes + 1,
        }));
      }
    } catch (err) {
      setError(err.message);
      // Auto close error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  // Navigate and update URL and state accordingly
  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    updateURL(page, data ? data.id : null);

    if (data) {
      if (page === "view") setSelectedPost(data);
      if (page === "edit") setEditingPost(data);
    }

    // Clear messages when navigating
    setError(null);
    setMessage(null);
  };

  // Close message manually
  const closeMessage = () => {
    setMessage(null);
  };

  // Close error manually
  const closeError = () => {
    setError(null);
  };

  // Load user and posts on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ideally validate token via backend or decode here for user info
      setUser({ name: "Demo User", email: "demo@example.com" }); // Replace with real user data after API call

      fetchPosts();

      const { page, id } = getPageFromURL();
      setCurrentPage(page);

      if (id) {
        // If we already have posts, set selected or editing post
        const post = posts.find((p) => p.id === id);
        if (post) {
          if (page === "view") setSelectedPost(post);
          if (page === "edit") setEditingPost(post);
        }
      }
    } else {
      setCurrentPage("auth");
      updateURL("auth");
    }
  }, []);

  // Handle browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const { page, id } = getPageFromURL();
      setCurrentPage(page);

      if (id) {
        const post = posts.find((p) => p.id === id);
        if (post) {
          if (page === "view") setSelectedPost(post);
          if (page === "edit") setEditingPost(post);
        }
      }

      // Clear messages when using browser navigation
      setMessage(null);
      setError(null);
    };

    window.addEventListener("hashchange", handlePopState);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("hashchange", handlePopState);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [posts]);

  const pageProps = {
    user,
    posts,
    selectedPost,
    editingPost,
    message,
    error,
    setMessage,
    setError,
    navigateTo,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onCreatePost: handleCreatePost,
    onUpdatePost: handleUpdatePost,
    onDeletePost: handleDeletePost,
    onAddComment: handleAddComment,
    onLikePost: handleLikePost,
    onCloseMessage: closeMessage,
    onCloseError: closeError,
  };

  // Show loading while checking auth
  if (user === null && localStorage.getItem("token")) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  switch (currentPage) {
    case "auth":
      return <AuthPage {...pageProps} />;
    case "dashboard":
      return <Dashboard {...pageProps} />;
    case "add":
      return <AddPost {...pageProps} />;
    case "view":
      return <ViewPost {...pageProps} />;
    case "edit":
      return <EditPost {...pageProps} />;
    default:
      return <Dashboard {...pageProps} />;
  }
}

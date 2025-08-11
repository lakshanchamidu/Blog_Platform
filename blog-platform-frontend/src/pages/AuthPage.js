import React, { useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "/api/auth";

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left column */}
        <div className="hidden md:flex flex-col items-start justify-center gap-4 p-8 bg-gradient-to-b from-blue-600 to-indigo-600 text-white">
          <h2 className="text-3xl font-bold">Blog Platform</h2>
          <p className="text-sm opacity-90">
            Create posts, follow writers, and share thoughts. Fast and simple.
          </p>
          <ul className="mt-4 text-sm space-y-2">
            <li>• Lightweight React + Tailwind UI</li>
            <li>• JWT authentication</li>
            <li>• Easy to connect to your Express backend</li>
          </ul>
          <div className="mt-6 text-xs opacity-90">
            Use any account to login — or sign up to create one.
          </div>
        </div>

        {/* Right column */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {mode === "login" ? "Login" : "Create account"}
            </h3>
            <div className="text-sm text-gray-500">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign up" : "Login"}
              </button>
            </div>
          </div>

          {mode === "login" ? (
            <LoginForm onLogin={onLogin} />
          ) : (
            <SignupForm onSignedUp={() => setMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <a href="#" className="text-sm text-gray-500 hover:underline">
          Forgot password?
        </a>
      </div>
    </form>
  );
}

function SignupForm({ onSignedUp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      setSuccess(data.message || "Signed up successfully");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        onSignedUp();
      }, 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
          {success}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </div>
    </form>
  );
}

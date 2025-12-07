"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    // Strong password: min 8 chars, upper, lower, number, symbol
    const strongPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!form.password || !strongPw.test(form.password)) {
      setError("Password must be at least 8 characters and include upper, lower, number, and symbol.");
      setStatus("idle");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      setStatus("idle");
      return;
    }
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Reset failed");
        return;
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Reset Password</h1>
        {status === "success" ? (
          <>
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-green-700">Password Reset!</h2>
            <p className="text-gray-700 mb-4">You can now log in with your new password.</p>
            <Link href="/login" className="text-primary font-semibold hover:text-blue-600">Go to Login</Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="token" value={token} />
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {status === "loading" ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-600 font-semibold mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}

export default function ResetPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <p className="text-gray-700">Loading reset form...</p>
      </div>
    }>
      <ResetContent />
    </Suspense>
  );
}

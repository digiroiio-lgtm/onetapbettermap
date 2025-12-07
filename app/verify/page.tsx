"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Verification failed");
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
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Email Verification</h1>
        {status === "idle" && (
          <>
            <p className="mb-6 text-gray-700">Click the button below to verify your email address.</p>
            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Verify Email
            </button>
          </>
        )}
        {status === "loading" && (
          <p className="text-blue-600 font-semibold">Verifying...</p>
        )}
        {status === "success" && (
          <>
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" />
            </svg>
            <h2 className="text-xl font-bold mb-2 text-green-700">Email Verified!</h2>
            <p className="text-gray-700 mb-4">Your account is now active. You can log in.</p>
            <Link href="/login" className="text-primary font-semibold hover:text-blue-600">Go to Login</Link>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <p className="text-gray-700">Loading verification...</p>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

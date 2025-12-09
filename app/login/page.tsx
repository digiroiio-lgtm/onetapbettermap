'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthProvider, setOauthProvider] = useState<string | null>(null);
  const appleEnabled = process.env.NEXT_PUBLIC_ENABLE_APPLE_LOGIN === 'true';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo account shortcut
    if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
      const user = {
        id: 'USR001',
        name: 'Demo User',
        email: 'demo@example.com',
        businessName: 'Demo Business',
        city: 'London',
        country: 'UK',
        plan: 'Growth',
        joinDate: '2024-11-15',
        scansUsed: 12,
        scansLimit: 500
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('premiumUser', 'true');
      router.push('/dashboard');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }
      // Store session token (for demo, just localStorage)
      localStorage.setItem('sessionToken', data.sessionToken);
      localStorage.setItem('isLoggedIn', 'true');
      // Optionally fetch user profile here
      router.push('/dashboard');
    } catch (err) {
      setError('Network error');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-3 mb-6">
            <button
              onClick={() => {
                setOauthProvider('google');
                signIn('google', { callbackUrl: '/dashboard' });
              }}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-gray-800 font-semibold hover:bg-gray-50 transition"
            >
              {oauthProvider === 'google' ? (
                <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.43-5.43C33.64 3.05 29.18 1 24 1 14.64 1 6.68 6.66 3.15 14.74l6.32 4.91C10.85 13.52 16.94 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.64-.15-3.22-.43-4.74H24v9.09h12.71c-.55 2.98-2.23 5.49-4.72 7.19l7.57 5.9C43.83 37.16 46.5 31.32 46.5 24.5z"/>
                  <path fill="#4A90E2" d="M10.93 28.36c-.52-1.56-.82-3.22-.82-4.86s.3-3.3.82-4.86L4.61 13.73C3.57 16.24 3 19.05 3 21.99c0 2.94.57 5.75 1.61 8.26l6.32-4.91z"/>
                  <path fill="#FBBC05" d="M24 46c5.18 0 9.64-1.7 12.86-4.61l-7.57-5.9C27.37 36.97 25.79 37.5 24 37.5c-7.06 0-13.15-4.02-16.53-9.65l-6.32 4.91C6.68 41.34 14.64 46 24 46z"/>
                </svg>
              )}
              Continue with Google
            </button>
            <button
              type="button"
              disabled={!appleEnabled}
              onClick={() => {
                if (!appleEnabled) return;
                setOauthProvider('apple');
                signIn('apple', { callbackUrl: '/dashboard' });
              }}
              className={`w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 font-semibold transition ${
                appleEnabled
                  ? 'text-gray-800 hover:bg-gray-50'
                  : 'text-gray-400 cursor-not-allowed bg-gray-50'
              }`}
            >
              {oauthProvider === 'apple' ? (
                <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.45 2.193-1.194 2.952-.88.882-1.953 1.4-3.122 1.318-.04-1.113.483-2.24 1.286-3.026.903-.868 2.173-1.458 3.03-1.522v.278zM21.5 18.135c-.447 1.014-.656 1.463-1.23 2.36-.8 1.247-1.927 2.803-3.33 2.82-1.245.013-1.64-.818-3.41-.81-1.77.01-2.2.825-3.447.812-1.402-.014-2.48-1.417-3.282-2.665-2.244-3.465-2.482-7.533-1.101-9.676.985-1.507 2.538-2.393 4.011-2.393 1.5 0 2.44.82 3.673.82 1.195 0 1.917-.82 3.672-.82 1.31 0 2.7.715 3.684 1.944-3.234 1.775-2.707 6.414.78 7.59z"/>
                </svg>
              )}
              Continue with Apple
            </button>
            {!appleEnabled && (
              <p className="text-center text-xs text-gray-500">
                Apple login coming soon.
              </p>
            )}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-400 mt-2">
              <span className="flex-1 border-t border-gray-200"></span>
              or
              <span className="flex-1 border-t border-gray-200"></span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Demo Account Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-900 mb-2">Demo Account:</p>
              <p className="text-xs text-amber-800 font-mono">
                demo@example.com / demo123
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:text-blue-600">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

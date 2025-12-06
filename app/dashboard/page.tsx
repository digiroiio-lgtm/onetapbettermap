'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  city: string;
  country: string;
  plan: string;
  joinDate: string;
  scansUsed: number;
  scansLimit: number;
}

interface ScanHistory {
  id: string;
  businessName: string;
  city: string;
  keyword: string;
  score: number;
  date: string;
}

type TabType = 'overview' | 'scans' | 'billing' | 'settings';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  // Mock scan history
  const [scanHistory] = useState<ScanHistory[]>([
    {
      id: 'SCN001',
      businessName: 'Antalya Dental Clinic',
      city: 'Antalya',
      keyword: 'dental clinic',
      score: 92,
      date: '2024-12-05 10:15'
    },
    {
      id: 'SCN002',
      businessName: "Sarah's Pizza Restaurant",
      city: 'London',
      keyword: 'pizza restaurant',
      score: 87,
      date: '2024-12-06 14:23'
    },
    {
      id: 'SCN003',
      businessName: 'Demo Business',
      city: 'London',
      keyword: 'dentist near me',
      score: 57,
      date: '2024-12-03 09:45'
    }
  ]);

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Get user data
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check premium status
    const premiumStatus = localStorage.getItem('premiumUser') === 'true';
    setIsPremium(premiumStatus);

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const scansRemaining = user.scansLimit - user.scansUsed;
  const scansPercentage = (user.scansUsed / user.scansLimit) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
                <p className="text-xs text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Status Banner */}
        <div className={`rounded-2xl p-6 mb-8 ${isPremium ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{user.plan} Plan</h2>
                {isPremium && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">Active</span>
                )}
              </div>
              <p className="text-white/90">
                {isPremium ? 'Unlimited scans & premium features' : `${scansRemaining} scans remaining this month`}
              </p>
            </div>
            {!isPremium && (
              <Link
                href="/upgrade"
                className="bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Scans</h3>
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{user.scansUsed}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avg Score</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">79</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% this month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Plan Status</h3>
              <span className="text-2xl">💳</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{user.plan}</p>
            <p className="text-sm text-gray-500 mt-1">Since {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Scans Left</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {isPremium ? '∞' : scansRemaining}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isPremium ? 'Unlimited' : 'This month'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'scans', label: 'Scan History', icon: '🔍' },
              { id: 'billing', label: 'Billing', icon: '💳' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/"
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">New Scan</h4>
                        <p className="text-sm text-gray-600">Check your visibility</p>
                      </div>
                    </div>
                  </Link>

                  {!isPremium && (
                    <Link
                      href="/upgrade"
                      className="border-2 border-primary rounded-xl p-6 bg-blue-50 hover:bg-blue-100 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Upgrade to Pro</h4>
                          <p className="text-sm text-gray-600">Unlock all features</p>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {!isPremium && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Usage This Month</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Scans Used</span>
                      <span className="font-semibold text-gray-900">{user.scansUsed} / {user.scansLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-indigo-600 h-3 rounded-full transition-all"
                        style={{ width: `${scansPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {scansRemaining} scans remaining • Resets monthly
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Scans</h3>
                <div className="space-y-3">
                  {scanHistory.slice(0, 3).map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{scan.businessName}</p>
                        <p className="text-sm text-gray-500">{scan.city} • {scan.keyword}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{scan.score}%</p>
                        <p className="text-xs text-gray-500">{scan.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scans Tab */}
          {activeTab === 'scans' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Scan History</h3>
              <div className="space-y-4">
                {scanHistory.map((scan) => (
                  <div key={scan.id} className="border border-gray-200 rounded-xl p-4 hover:border-primary transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{scan.businessName}</h4>
                        <p className="text-sm text-gray-600">{scan.city} • {scan.keyword}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{scan.score}%</div>
                        <p className="text-xs text-gray-500">{scan.date}</p>
                      </div>
                    </div>
                    <Link
                      href={`/results?businessName=${scan.businessName}&city=${scan.city}&keyword=${scan.keyword}`}
                      className="text-sm text-primary font-medium hover:text-blue-600"
                    >
                      View Full Report →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Current Plan</h3>
                <div className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{user.plan} Plan</h4>
                      <p className="text-gray-600">
                        {isPremium ? '$9/month • Unlimited scans' : 'Free • 3 scans per month'}
                      </p>
                    </div>
                    {isPremium ? (
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    ) : (
                      <Link
                        href="/upgrade"
                        className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600"
                      >
                        Upgrade
                      </Link>
                    )}
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {isPremium ? (
                      <>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          Unlimited scans per month
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          All premium features unlocked
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          Priority support
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          3 scans per month
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                          Basic features only
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {isPremium && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">Pro Plan - December</p>
                        <p className="text-sm text-gray-500">Dec 1, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$9.00</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Paid</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">Pro Plan - November</p>
                        <p className="text-sm text-gray-500">Nov 1, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">$9.00</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={user.businessName}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={user.city}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

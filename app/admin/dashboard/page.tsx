'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  mockUsers,
  mockPayments,
  mockScans,
  mockDashboardStats,
  mockRevenueData,
  mockUserGrowthData,
  type User,
  type Payment,
  type Scan
} from '@/lib/adminData';

type TabType = 'overview' | 'users' | 'payments' | 'scans';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Filter functions
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = mockPayments.filter(payment =>
    payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScans = mockScans.filter(scan =>
    scan.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scan.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">One Tap, Better Map</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                View Site
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'users', label: 'Users', icon: '👥' },
              { id: 'payments', label: 'Payments', icon: '💳' },
              { id: 'scans', label: 'Scans', icon: '🔍' }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.totalUsers}</p>
                <p className="text-sm text-green-600 mt-2">↑ 14% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Active Subscriptions</h3>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.activeSubscriptions}</p>
                <p className="text-sm text-green-600 mt-2">↑ 20% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">${mockDashboardStats.totalRevenue}</p>
                <p className="text-sm text-gray-500 mt-2">Lifetime</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">${mockDashboardStats.monthlyRevenue}</p>
                <p className="text-sm text-green-600 mt-2">↑ 5% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Total Scans</h3>
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.totalScans}</p>
                <p className="text-sm text-green-600 mt-2">↑ 32% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Avg Visibility Score</h3>
                  <span className="text-2xl">⭐</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.avgVisibilityScore}%</p>
                <p className="text-sm text-green-600 mt-2">↑ 3% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.conversionRate}%</p>
                <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Churn Rate</h3>
                  <span className="text-2xl">📉</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.churnRate}%</p>
                <p className="text-sm text-red-600 mt-2">↑ 2% from last month</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="space-y-3">
                  {mockRevenueData.map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(item.revenue / 72) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white">${item.revenue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                <div className="space-y-3">
                  {mockUserGrowthData.map((item) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-12">{item.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(item.users / 8) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white">{item.users}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {mockScans.slice(0, 5).map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🔍</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{scan.userName}</p>
                        <p className="text-sm text-gray-500">{scan.businessName} - {scan.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{scan.visibilityScore}%</p>
                      <p className="text-xs text-gray-500">{scan.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <input
                type="text"
                placeholder="Search users by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scans</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">{user.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{user.businessName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{user.city}</p>
                          <p className="text-xs text-gray-500">{user.country}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                            user.subscriptionStatus === 'cancelled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.subscriptionStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{user.subscriptionPlan}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{user.scansUsed}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">${user.totalPaid}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <input
                type="text"
                placeholder="Search payments by user or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-900">{payment.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{payment.userName}</p>
                          <p className="text-xs text-gray-500">{payment.userId}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            {payment.amount} {payment.currency}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{payment.paymentMethod}</p>
                            <p className="text-xs text-gray-500">•••• {payment.cardLast4}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'success' ? 'bg-green-100 text-green-800' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{payment.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Scans Tab */}
        {activeTab === 'scans' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <input
                type="text"
                placeholder="Search scans by user or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Scans Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scan ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredScans.map((scan) => (
                      <tr key={scan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-900">{scan.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{scan.userName}</p>
                          <p className="text-xs text-gray-500">{scan.userId}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{scan.businessName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{scan.city}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 italic">{scan.keyword}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                              <div
                                className={`h-full rounded-full ${
                                  scan.visibilityScore >= 80 ? 'bg-green-500' :
                                  scan.visibilityScore >= 60 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${scan.visibilityScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{scan.visibilityScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{scan.duration}s</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{scan.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

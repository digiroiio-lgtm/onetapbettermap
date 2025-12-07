'use client';

import { PLAN_CREDIT_LIMITS, PlanType } from '@/lib/creditSystem';
import { getUserPlan, changeUserPlan, spendCredits } from '@/lib/planApi';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { locales, type LocaleCode, setLocale } from '@/lib/i18n';
import OnboardingPanel from '@/components/OnboardingPanel';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  teamName?: string;
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
  // Kredi ve plan: backend senkronize
  const [userPlan, setUserPlan] = useState<{
    userId: string;
    plan: PlanType;
    credits: number;
    lastReset: string;
  } | null>(null);
  const [planLoading, setPlanLoading] = useState(true);
  const planLabel: Record<PlanType, string> = {
    starter: 'Starter',
    scale: 'Scale',
    dominance: 'Dominance',
  };
  useEffect(() => {
    setPlanLoading(true);
    getUserPlan().then((data) => {
      setUserPlan(data);
      setPlanLoading(false);
    });
  }, []);
  const handlePlanChange = async (newPlan: PlanType) => {
    setPlanLoading(true);
    const data = await changeUserPlan(newPlan);
    setUserPlan(data);
    setPlanLoading(false);
  };
  const handleSpendCredit = async (amount: number) => {
    setPlanLoading(true);
    const data = await spendCredits(amount);
    setUserPlan(data);
    setPlanLoading(false);
  };
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [currentLocale, setCurrentLocale] = useState<LocaleCode>('en');
  const [trendTab, setTrendTab] = useState(0); // 0: 3 ay, 1: 6 ay, 2: 12 ay
  const trendData: number[][] = [
    // 3 ay (12 hafta)
    [65, 68, 57, 72, 78, 87, 92, 88, 90, 91, 93, 95],
    // 6 ay (24 hafta)
    [60, 62, 65, 68, 57, 72, 78, 87, 92, 88, 90, 91, 93, 95, 94, 96, 97, 98, 99, 100, 98, 97, 96, 95],
    // 12 ay (48 hafta)
    [55, 58, 60, 62, 65, 68, 57, 72, 78, 87, 92, 88, 90, 91, 93, 95, 94, 96, 97, 98, 99, 100, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73]
  ];

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
    },
    {
      id: 'SCN004',
      businessName: 'Tokyo Sushi Bar',
      city: 'Tokyo',
      keyword: 'sushi restaurant',
      score: 95,
      date: '2024-12-01 16:30'
    },
    {
      id: 'SCN005',
      businessName: 'Berlin Coffee Shop',
      city: 'Berlin',
      keyword: 'coffee shop',
      score: 78,
      date: '2024-11-28 11:20'
    }
  ]);

  // Filter and sort scans
  const filteredScans = scanHistory
    .filter(scan => 
      scan.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.score - a.score;
    });

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

    // Get saved locale
    const savedLocale = (localStorage.getItem('locale') as LocaleCode) || 'en';
    setCurrentLocale(savedLocale);

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleLocaleChange = (newLocale: LocaleCode) => {
    setCurrentLocale(newLocale);
    setLocale(newLocale);
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
  const onboardingSteps = [
    {
      id: 'profile',
      title: 'Complete your profile',
      description: 'Add your business and team info so reports stay personalized.',
      status: user.businessName ? 'done' : 'current',
      action: { label: 'Edit Profile', href: '/support' }
    },
    {
      id: 'scan',
      title: 'Run your first live scan',
      description: 'Launch a 49-point visibility scan for your top keyword.',
      status: user.scansUsed > 0 ? 'done' : 'todo',
      action: { label: 'Start Scan', href: '/#scan-section' }
    },
    {
      id: 'team',
      title: 'Invite your team',
      description: 'Share dashboards and export PDFs with teammates or clients.',
      status: user.teamName ? 'done' : 'todo',
      action: { label: 'Manage Access', href: '/support' }
    },
    {
      id: 'community',
      title: 'Join the community',
      description: 'Get onboarding tips and compare playbooks with other agencies.',
      status: 'todo',
      action: { label: 'Join Discord', href: 'https://discord.gg/' }
    }
  ] as const;

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

        <OnboardingPanel
          steps={onboardingSteps.map(step => ({
            ...step,
            status: step.status as 'done' | 'current' | 'todo'
          }))}
        />

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

        {/* Kullanıcı Plan & Kredi Bilgisi */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            Plan: {planLoading || !userPlan ? '...' : planLabel[userPlan.plan]}
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
            Kalan Kredi: {planLoading || !userPlan ? '...' : `${userPlan.credits} / ${PLAN_CREDIT_LIMITS[userPlan.plan]}`}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold disabled:opacity-50"
            disabled={planLoading || !userPlan}
            onClick={() => userPlan && handlePlanChange(userPlan.plan === 'starter' ? 'scale' : userPlan.plan === 'scale' ? 'dominance' : 'starter')}
          >
            Planı Değiştir
          </button>
          <button
            className="px-3 py-1 rounded bg-green-500 text-white text-xs font-semibold disabled:opacity-50"
            disabled={planLoading || !userPlan || userPlan.credits <= 0}
            onClick={() => handleSpendCredit(1)}
          >
            1 Kredi Harca
          </button>
          <span className="ml-2 text-xs text-gray-500">Son sıfırlama: {userPlan ? new Date(userPlan.lastReset).toLocaleDateString() : '-'}</span>
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* This Week Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">This Week</h3>
                    <p className="text-sm text-gray-600">Your performance summary</p>
                  </div>
                  <span className="text-3xl">📈</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-xs text-gray-600 mt-1">Scans Run</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-green-600">79</p>
                    <p className="text-xs text-gray-600 mt-1">Avg Score</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-2xl font-bold text-emerald-600">+12%</p>
                    <p className="text-xs text-gray-600 mt-1">Improvement</p>
                  </div>
                </div>
              </div>
              {/* Score Trend Chart - 3/6/12 Ay */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Score Trend</h3>
                <div className="mb-4 flex gap-2">
                  {['3 Ay', '6 Ay', '12 Ay'].map((label, idx) => (
                    <button
                      key={label}
                      className={`px-4 py-2 rounded-full font-semibold border transition-colors ${trendTab === idx ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-700 border-gray-300'}`}
                      onClick={() => setTrendTab(idx)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-end justify-between h-48 gap-2">
                    {trendData[trendTab].map((score: number, idx: number) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                          style={{ height: `${score}%` }}
                        />
                        <p className="text-xs text-gray-600 mt-2">{score}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-gray-500">
                    <span>{trendTab === 0 ? '3 ay önce' : trendTab === 1 ? '6 ay önce' : '12 ay önce'}</span>
                    <span>Bugün</span>
                  </div>
                </div>
              </div>

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
                  {filteredScans.slice(0, 3).map((scan) => (
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
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="search"
                    placeholder="Search scans by business, city, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="score">Sort by Score</option>
                  </select>
                  <button 
                    onClick={() => {
                      const csv = [
                        ['Business Name', 'City', 'Keyword', 'Score', 'Date'],
                        ...scanHistory.map(s => [s.businessName, s.city, s.keyword, s.score.toString(), s.date])
                      ].map(row => row.join(',')).join('\n');
                      const blob = new Blob([csv], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'scan-history.csv';
                      a.click();
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors whitespace-nowrap"
                  >
                    📥 Export CSV
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-600 mb-4">
                Showing {filteredScans.length} of {scanHistory.length} scans
              </p>

              {/* Scan History */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">Scan History</h3>
              {filteredScans.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">No scans found</h4>
                  <p className="text-gray-600 mb-6">
                    {searchQuery ? 'Try adjusting your search' : 'Run your first scan to see results here'}
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Run New Scan
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredScans.map((scan) => (
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
              )}
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
              {/* Profile & Business Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">👤</span>
                  <h3 className="text-lg font-bold text-gray-900">Profile & Business</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-100"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        defaultValue={user.businessName}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Category</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Restaurant</option>
                        <option>Dental Clinic</option>
                        <option>Retail Store</option>
                        <option>Beauty Salon</option>
                        <option>Fitness Center</option>
                        <option>Hotel</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        defaultValue={user.city}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        defaultValue={user.country}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://yourbusiness.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🔐</span>
                  <h3 className="text-lg font-bold text-gray-900">Security</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                    <div className="space-y-3">
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Current password"
                      />
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="New password"
                      />
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button className="mt-3 px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                      Update Password
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-100 text-primary rounded-lg font-semibold hover:bg-blue-200 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📧</span>
                  <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900">Weekly Scan Summary</h4>
                      <p className="text-sm text-gray-600">Get a weekly email with your visibility stats</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900">Ranking Changes Alerts</h4>
                      <p className="text-sm text-gray-600">Get notified when your visibility score changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-semibold text-gray-900">Competitor Updates</h4>
                      <p className="text-sm text-gray-600">Monitor when competitors make changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Product Updates & Tips</h4>
                      <p className="text-sm text-gray-600">Learn about new features and best practices</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
                    <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Daily</option>
                      <option selected>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎨</span>
                  <h3 className="text-lg font-bold text-gray-900">Display Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select 
                        value={currentLocale}
                        onChange={(e) => handleLocaleChange(e.target.value as LocaleCode)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {locales.map((locale) => (
                          <option key={locale.code} value={locale.code}>
                            {locale.flag} {locale.name} ({locale.code.toUpperCase()})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        ✅ Active: {locales.find(l => l.code === currentLocale)?.name}
                        <br />
                        Page will reload when you change language
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>UTC</option>
                        <option selected>GMT (London)</option>
                        <option>EST (New York)</option>
                        <option>PST (Los Angeles)</option>
                        <option>CET (Berlin)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>MM/DD/YYYY</option>
                        <option selected>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option selected>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data & Privacy Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">📊</span>
                  <h3 className="text-lg font-bold text-gray-900">Data & Privacy</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Export My Data</h4>
                        <p className="text-sm text-gray-600">Download all your scan history and reports</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </button>

                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 transition-all group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Privacy Settings</h4>
                        <p className="text-sm text-gray-600">Manage how your data is used</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
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

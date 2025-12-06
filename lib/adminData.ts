export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  city: string;
  country: string;
  phone: string;
  subscriptionStatus: 'active' | 'cancelled' | 'expired';
  subscriptionPlan: 'Pro' | 'Free';
  subscriptionDate: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
  totalPaid: number;
  scansUsed: number;
  lastScanDate: string;
  ipAddress: string;
  userAgent: string;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending';
  paymentMethod: string;
  cardLast4: string;
  date: string;
  invoiceUrl: string;
}

export interface Scan {
  id: string;
  userId: string;
  userName: string;
  businessName: string;
  city: string;
  keyword: string;
  visibilityScore: number;
  date: string;
  duration: number; // in seconds
}

export interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalScans: number;
  avgVisibilityScore: number;
  conversionRate: number;
  churnRate: number;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'USR001',
    name: 'Mehmet Yılmaz',
    email: 'mehmet@example.com',
    businessName: 'Antalya Dental Clinic',
    city: 'Antalya',
    country: 'Turkey',
    phone: '+90 532 123 4567',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-11-15',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 27,
    scansUsed: 12,
    lastScanDate: '2024-12-05',
    ipAddress: '185.123.45.67',
    userAgent: 'Chrome 120.0 (macOS)'
  },
  {
    id: 'USR002',
    name: 'Sarah Johnson',
    email: 'sarah.j@pizzaplace.uk',
    businessName: "Sarah's Pizza Restaurant",
    city: 'London',
    country: 'United Kingdom',
    phone: '+44 20 1234 5678',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-10-20',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 45,
    scansUsed: 28,
    lastScanDate: '2024-12-06',
    ipAddress: '81.98.123.45',
    userAgent: 'Safari 17.1 (iOS)'
  },
  {
    id: 'USR003',
    name: 'Giovanni Rossi',
    email: 'giovanni@trattoria.it',
    businessName: 'Trattoria Bella Roma',
    city: 'Rome',
    country: 'Italy',
    phone: '+39 06 1234 5678',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-11-01',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 36,
    scansUsed: 15,
    lastScanDate: '2024-12-04',
    ipAddress: '79.45.123.89',
    userAgent: 'Firefox 121.0 (Windows)'
  },
  {
    id: 'USR004',
    name: 'Ayşe Demir',
    email: 'ayse@cafe.com',
    businessName: 'Bosphorus Cafe',
    city: 'Istanbul',
    country: 'Turkey',
    phone: '+90 212 987 6543',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-11-25',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 18,
    scansUsed: 8,
    lastScanDate: '2024-12-05',
    ipAddress: '88.234.56.78',
    userAgent: 'Chrome 120.0 (Android)'
  },
  {
    id: 'USR005',
    name: 'Michael Chen',
    email: 'michael@dragonrestaurant.com',
    businessName: 'Golden Dragon Restaurant',
    city: 'New York',
    country: 'United States',
    phone: '+1 212 555 0123',
    subscriptionStatus: 'cancelled',
    subscriptionPlan: 'Free',
    subscriptionDate: '2024-09-10',
    lastPaymentDate: '2024-11-10',
    nextPaymentDate: '-',
    totalPaid: 18,
    scansUsed: 5,
    lastScanDate: '2024-11-15',
    ipAddress: '104.28.123.45',
    userAgent: 'Chrome 119.0 (Windows)'
  },
  {
    id: 'USR006',
    name: 'Maria Garcia',
    email: 'maria@tacohouse.mx',
    businessName: 'Casa de Tacos',
    city: 'Barcelona',
    country: 'Spain',
    phone: '+34 93 123 4567',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-10-05',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 54,
    scansUsed: 34,
    lastScanDate: '2024-12-06',
    ipAddress: '85.123.45.67',
    userAgent: 'Safari 17.0 (macOS)'
  },
  {
    id: 'USR007',
    name: 'Hans Schmidt',
    email: 'hans@biergarten.de',
    businessName: 'Munich Biergarten',
    city: 'Munich',
    country: 'Germany',
    phone: '+49 89 1234 5678',
    subscriptionStatus: 'active',
    subscriptionPlan: 'Pro',
    subscriptionDate: '2024-11-10',
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    totalPaid: 27,
    scansUsed: 11,
    lastScanDate: '2024-12-03',
    ipAddress: '91.67.89.123',
    userAgent: 'Edge 120.0 (Windows)'
  },
  {
    id: 'USR008',
    name: 'Sophie Martin',
    email: 'sophie@bistroparis.fr',
    businessName: 'Bistro Parisien',
    city: 'Paris',
    country: 'France',
    phone: '+33 1 42 12 3456',
    subscriptionStatus: 'expired',
    subscriptionPlan: 'Free',
    subscriptionDate: '2024-08-15',
    lastPaymentDate: '2024-09-15',
    nextPaymentDate: '-',
    totalPaid: 9,
    scansUsed: 3,
    lastScanDate: '2024-09-20',
    ipAddress: '92.145.67.89',
    userAgent: 'Firefox 118.0 (macOS)'
  }
];

// Mock Payments Data
export const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    userId: 'USR002',
    userName: 'Sarah Johnson',
    amount: 9,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Visa',
    cardLast4: '4242',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY002',
    userId: 'USR006',
    userName: 'Maria Garcia',
    amount: 9,
    currency: 'EUR',
    status: 'success',
    paymentMethod: 'Mastercard',
    cardLast4: '5555',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY003',
    userId: 'USR001',
    userName: 'Mehmet Yılmaz',
    amount: 9,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Visa',
    cardLast4: '4111',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY004',
    userId: 'USR003',
    userName: 'Giovanni Rossi',
    amount: 9,
    currency: 'EUR',
    status: 'success',
    paymentMethod: 'Amex',
    cardLast4: '3782',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY005',
    userId: 'USR004',
    userName: 'Ayşe Demir',
    amount: 9,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Visa',
    cardLast4: '4242',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY006',
    userId: 'USR007',
    userName: 'Hans Schmidt',
    amount: 9,
    currency: 'EUR',
    status: 'success',
    paymentMethod: 'Mastercard',
    cardLast4: '5454',
    date: '2024-12-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY007',
    userId: 'USR002',
    userName: 'Sarah Johnson',
    amount: 9,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Visa',
    cardLast4: '4242',
    date: '2024-11-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY008',
    userId: 'USR001',
    userName: 'Mehmet Yılmaz',
    amount: 9,
    currency: 'USD',
    status: 'success',
    paymentMethod: 'Visa',
    cardLast4: '4111',
    date: '2024-11-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY009',
    userId: 'USR006',
    userName: 'Maria Garcia',
    amount: 9,
    currency: 'EUR',
    status: 'success',
    paymentMethod: 'Mastercard',
    cardLast4: '5555',
    date: '2024-11-01',
    invoiceUrl: '#'
  },
  {
    id: 'PAY010',
    userId: 'USR003',
    userName: 'Giovanni Rossi',
    amount: 9,
    currency: 'EUR',
    status: 'success',
    paymentMethod: 'Amex',
    cardLast4: '3782',
    date: '2024-11-01',
    invoiceUrl: '#'
  }
];

// Mock Scans Data
export const mockScans: Scan[] = [
  {
    id: 'SCN001',
    userId: 'USR002',
    userName: 'Sarah Johnson',
    businessName: "Sarah's Pizza Restaurant",
    city: 'London',
    keyword: 'pizza restaurant',
    visibilityScore: 87,
    date: '2024-12-06 14:23',
    duration: 45
  },
  {
    id: 'SCN002',
    userId: 'USR001',
    userName: 'Mehmet Yılmaz',
    businessName: 'Antalya Dental Clinic',
    city: 'Antalya',
    keyword: 'dental clinic',
    visibilityScore: 92,
    date: '2024-12-05 10:15',
    duration: 38
  },
  {
    id: 'SCN003',
    userId: 'USR006',
    userName: 'Maria Garcia',
    businessName: 'Casa de Tacos',
    city: 'Barcelona',
    keyword: 'mexican restaurant',
    visibilityScore: 78,
    date: '2024-12-06 09:45',
    duration: 42
  },
  {
    id: 'SCN004',
    userId: 'USR004',
    userName: 'Ayşe Demir',
    businessName: 'Bosphorus Cafe',
    city: 'Istanbul',
    keyword: 'coffee shop',
    visibilityScore: 85,
    date: '2024-12-05 16:30',
    duration: 40
  },
  {
    id: 'SCN005',
    userId: 'USR003',
    userName: 'Giovanni Rossi',
    businessName: 'Trattoria Bella Roma',
    city: 'Rome',
    keyword: 'italian restaurant',
    visibilityScore: 94,
    date: '2024-12-04 12:20',
    duration: 36
  }
];

// Dashboard Statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: 8,
  activeSubscriptions: 6,
  totalRevenue: 234,
  monthlyRevenue: 54,
  totalScans: 116,
  avgVisibilityScore: 86.4,
  conversionRate: 75.0,
  churnRate: 12.5
};

// Revenue data for chart
export const mockRevenueData = [
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 9 },
  { month: 'Sep', revenue: 27 },
  { month: 'Oct', revenue: 45 },
  { month: 'Nov', revenue: 72 },
  { month: 'Dec', revenue: 54 }
];

// User growth data
export const mockUserGrowthData = [
  { month: 'Jul', users: 0 },
  { month: 'Aug', users: 1 },
  { month: 'Sep', users: 2 },
  { month: 'Oct', users: 4 },
  { month: 'Nov', users: 7 },
  { month: 'Dec', users: 8 }
];

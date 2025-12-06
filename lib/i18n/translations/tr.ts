import { Translation } from './en';

export const tr: Translation = {
  // Navigation
  nav: {
    home: 'Ana Sayfa',
    scan: 'Tarama',
    results: 'Sonuçlar',
    dashboard: 'Kontrol Paneli',
    login: 'Giriş',
    signup: 'Kayıt Ol',
    logout: 'Çıkış'
  },
  
  // Hero Section
  hero: {
    title: 'Tek Tık, Daha İyi Harita.',
    subtitle: 'Google Maps görünürlüğünüzü tek tıkla artırın – SEO karmaşası yok.',
    description: 'Tek tıkla çalışan basit bir Google Maps SEO denetleyicisi olarak düşünün.',
    startFreeScan: 'Ücretsiz Tarama Başlat',
    seeDemo: 'Demo Gör'
  },
  
  // Scan Form
  scan: {
    title: 'Harita Sıralamanızı Kontrol Edin',
    description: 'Google Maps\'te nasıl sıralandığınızı görmek için işletme bilgilerinizi girin',
    businessName: 'İşletme Adı',
    businessNamePlaceholder: 'örn., "Antalya Diş Kliniği"',
    city: 'Şehir',
    cityPlaceholder: 'örn., "İstanbul"',
    keyword: 'Arama Kelimesi',
    keywordPlaceholder: 'örn., "diş hekimi"',
    analyzeMaps: 'Haritayı Analiz Et'
  },
  
  // Dashboard
  dashboard: {
    welcomeBack: 'Tekrar hoş geldin',
    proPlan: 'Pro Plan',
    freePlan: 'Ücretsiz Plan',
    active: 'Aktif',
    unlimitedScans: 'Sınırsız tarama ve premium özellikler',
    scansRemaining: 'bu ay kalan tarama',
    totalScans: 'Toplam Tarama',
    allTime: 'Tüm zamanlar',
    avgScore: 'Ort. Skor',
    thisMonth: 'bu ay',
    planStatus: 'Plan Durumu',
    since: 'Tarihinden beri',
    scansLeft: 'Kalan Tarama',
    unlimited: 'Sınırsız',
    overview: 'Genel Bakış',
    scanHistory: 'Tarama Geçmişi',
    billing: 'Faturalama',
    settings: 'Ayarlar',
    thisWeek: 'Bu Hafta',
    performanceSummary: 'Performans özetiniz',
    scansRun: 'Yapılan Tarama',
    improvement: 'İyileşme',
    scoreTrend: 'Skor Trendi (Son 30 Gün)',
    quickActions: 'Hızlı İşlemler',
    newScan: 'Yeni Tarama',
    checkVisibility: 'Görünürlüğünüzü kontrol edin',
    upgradeToPro: 'Pro\'ya Yükselt',
    unlockAllFeatures: 'Tüm özellikleri aç',
    usageThisMonth: 'Bu Ayki Kullanım',
    scansUsed: 'Kullanılan Tarama',
    resets: 'Aylık sıfırlanır',
    recentScans: 'Son Taramalar',
    searchScans: 'İşletme, şehir veya kelimeye göre ara...',
    sortByDate: 'Tarihe Göre Sırala',
    sortByScore: 'Skora Göre Sırala',
    exportCSV: 'CSV İndir',
    showing: 'Gösterilen',
    of: '/',
    scans: 'tarama',
    noScansFound: 'Tarama bulunamadı',
    tryAdjusting: 'Aramanızı düzenlemeyi deneyin',
    runFirstScan: 'Sonuçları burada görmek için ilk taramanızı yapın',
    runNewScan: 'Yeni Tarama Yap',
    viewFullReport: 'Tam Raporu Görüntüle'
  },
  
  // Settings
  settings: {
    profileBusiness: 'Profil & İşletme',
    fullName: 'Ad Soyad',
    email: 'E-posta',
    businessName: 'İşletme Adı',
    businessCategory: 'İşletme Kategorisi',
    city: 'Şehir',
    country: 'Ülke',
    websiteURL: 'Web Site',
    phoneNumber: 'Telefon',
    saveChanges: 'Değişiklikleri Kaydet',
    security: 'Güvenlik',
    changePassword: 'Şifre Değiştir',
    currentPassword: 'Mevcut şifre',
    newPassword: 'Yeni şifre',
    confirmPassword: 'Yeni şifreyi onayla',
    updatePassword: 'Şifreyi Güncelle',
    twoFactor: 'İki Faktörlü Doğrulama',
    twoFactorDesc: 'Hesabınıza ekstra güvenlik katmanı ekleyin',
    enable: 'Etkinleştir',
    notifications: 'Bildirimler',
    weeklySummary: 'Haftalık Tarama Özeti',
    weeklySummaryDesc: 'Görünürlük istatistiklerinizle haftalık e-posta alın',
    rankingAlerts: 'Sıralama Değişim Uyarıları',
    rankingAlertsDesc: 'Görünürlük skorunuz değiştiğinde bildirim alın',
    competitorUpdates: 'Rakip Güncellemeleri',
    competitorUpdatesDesc: 'Rakipler değişiklik yaptığında izleyin',
    productUpdates: 'Ürün Güncellemeleri & İpuçları',
    productUpdatesDesc: 'Yeni özellikler ve en iyi uygulamalar hakkında bilgi edinin',
    notificationFrequency: 'Bildirim Sıklığı',
    daily: 'Günlük',
    weekly: 'Haftalık',
    monthly: 'Aylık',
    displayPreferences: 'Görünüm Tercihleri',
    language: 'Dil',
    timezone: 'Saat Dilimi',
    dateFormat: 'Tarih Formatı',
    theme: 'Tema',
    light: 'Açık',
    dark: 'Koyu',
    auto: 'Otomatik',
    dataPrivacy: 'Veri & Gizlilik',
    exportMyData: 'Verilerimi İndir',
    exportDataDesc: 'Tüm tarama geçmişinizi ve raporlarınızı indirin',
    privacySettings: 'Gizlilik Ayarları',
    privacySettingsDesc: 'Verilerinizin nasıl kullanıldığını yönetin',
    dangerZone: 'Tehlikeli Bölge',
    deleteAccount: 'Hesabı Sil',
    deleteAccountDesc: 'Hesabınızı ve tüm verileri kalıcı olarak silin',
    signOut: 'Çıkış Yap'
  },
  
  // Billing
  billing: {
    currentPlan: 'Mevcut Plan',
    perMonth: '/ay',
    unlimitedScans: 'Sınırsız tarama',
    upgrade: 'Yükselt',
    allPremiumFeatures: 'Tüm premium özellikler açık',
    prioritySupport: 'Öncelikli destek',
    scansPerMonth: 'tarama/ay',
    basicFeatures: 'Sadece temel özellikler',
    paymentHistory: 'Ödeme Geçmişi',
    paid: 'Ödendi'
  },
  
  // Results Page
  results: {
    visibilityScore: 'Görünürlük Skoru',
    excellent: 'Mükemmel',
    good: 'İyi',
    needsWork: 'İyileştirme Gerek',
    yourBusiness: 'İşletmeniz',
    heatmap: 'Isı Haritası Analizi',
    competitors: 'En İyi Rakipler',
    recommendations: 'Yapılacaklar',
    premium: 'Premium',
    whatYoureMissing: 'Kaçırdıklarınız',
    upgradeToUnlock: 'Tüm premium özellikleri açmak için Pro\'ya yükseltin',
    upgradeToPro: 'Pro\'ya Yükselt - 9$/ay',
    impact: 'Etki'
  },
  
  // Common
  common: {
    loading: 'Yükleniyor...',
    backToHome: 'Ana Sayfaya Dön',
    readyToBoost: 'Görünürlüğünüzü Artırmaya Hazır mısınız?',
    trackProgress: 'İlerlemenizi Takip Etmek İster misiniz?',
    signUpFree: 'Ücretsiz Kayıt Ol',
    alreadyMember: 'Zaten üye misiniz? Giriş Yapın',
    noCard: 'Kredi kartı gerekmez',
    freeScans: 'ücretsiz tarama/ay',
    upgradeAnytime: 'İstediğiniz zaman yükseltin'
  }
};

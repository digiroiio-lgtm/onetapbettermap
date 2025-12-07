// SSS (Sıkça Sorulan Sorular) sayfası
'use client';
export default function FAQPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Sıkça Sorulan Sorular (SSS)</h1>
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-lg mb-2">Kredi sistemi nasıl çalışıyor?</h2>
          <p>Kredi sistemi ile her analiz veya rapor bir kredi harcar. Planınıza göre aylık kredi limitiniz sıfırlanır.</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Planımı nasıl yükseltebilirim?</h2>
          <p>Hesabınızdan "Planı Değiştir" veya "Yükselt" butonunu kullanarak daha yüksek bir plana geçebilirsiniz.</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">White-label portal nedir?</h2>
          <p>Ajanslar için özel müşteri yönetimi ve rapor paylaşımı sunan, markasız bir yönetim panelidir.</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Raporlarımı nasıl dışa aktarabilirim?</h2>
          <p>Raporlarınızı PDF olarak indirebilir veya müşterilerinizle paylaşabilirsiniz.</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Destek ekibine nasıl ulaşabilirim?</h2>
          <p>Destek için iletişim formunu veya canlı sohbeti kullanabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}

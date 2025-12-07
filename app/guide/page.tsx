// Rehber (Kullanıcı Kılavuzu) sayfası
'use client';
export default function GuidePage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Kullanıcı Rehberi</h1>
      <div className="space-y-8">
        <section>
          <h2 className="font-semibold text-lg mb-2">Başlarken</h2>
          <p>Hesabınızı oluşturduktan sonra işletmenizi ekleyin ve ilk analiz taramanızı başlatın.</p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2">Analiz ve Skorlar</h2>
          <p>Harita üzerindeki görünürlüğünüz, rakip analizi ve premium metrikler ile skorunuzu artırabilirsiniz.</p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2">Kredi ve Plan Yönetimi</h2>
          <p>Kredi harcama, aylık sıfırlama ve plan yükseltme işlemlerini panelden yönetebilirsiniz.</p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2">Ajanslar için White-label Portal</h2>
          <p>Müşterilerinizi ekleyin, raporlar oluşturun ve paylaşın. Ajans paneli ile tüm süreçleri yönetin.</p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2">Sıkça Sorulan Sorular</h2>
          <p>SSS sayfasından en çok merak edilen konulara ulaşabilirsiniz.</p>
        </section>
      </div>
    </div>
  );
}

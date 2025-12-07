// Bonus içerik sayfası (PDF guidebook erişimi)
'use client';
export default function BonusPage() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Bonus İçerik</h1>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <p className="mb-4">SEO ve Google Haritalar için hazırlanan rehberimizi PDF olarak indirebilirsiniz.</p>
        <a
          href="/bonus/seo-guidebook.pdf"
          target="_blank"
          rel="noopener"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          📥 SEO Guidebook PDF'ini İndir
        </a>
      </div>
    </div>
  );
}

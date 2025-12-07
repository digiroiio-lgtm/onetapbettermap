// White-label rapor indirme endpointi (mock)
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock: Rapor dosyası URL'si döner
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET /api/whitelabel/report?clientId=client-1
  if (req.method === 'GET') {
    const { clientId } = req.query;
    // Gerçek sistemde: clientId ile dosya yolu/URL bulunur
    if (clientId === 'client-1') {
      return res.status(200).json({ url: '/reports/dental-2025-12.pdf' });
    }
    if (clientId === 'client-2') {
      return res.status(200).json({ url: '/reports/pizza-2025-12.pdf' });
    }
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}

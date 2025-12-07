// White-label rapor indirme endpointi (mock)
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock: Rapor dosyası URL'si döner
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET /api/whitelabel/report?clientId=client-1
  if (req.method === 'GET') {
      const { clientId } = req.query;
      // Token auth (mock)
      const auth = req.headers.authorization;
      if (!auth || auth !== 'Bearer mock-token') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
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

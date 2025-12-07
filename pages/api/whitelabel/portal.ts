// White-label portal API endpoint (mock)
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock: Her ajansın kendi markası, müşteri listesi ve raporları
const mockPortals = [
  {
    agencyId: 'agency-123',
    agencyName: 'Acme Digital',
    logoUrl: '/agency/acme-logo.png',
    clients: [
      { id: 'client-1', name: 'Dental Clinic', city: 'Antalya', lastScan: '2025-12-01', score: 87 },
      { id: 'client-2', name: 'Pizza Place', city: 'London', lastScan: '2025-12-03', score: 92 }
    ],
    reports: [
      { clientId: 'client-1', url: '/reports/dental-2025-12.pdf' },
      { clientId: 'client-2', url: '/reports/pizza-2025-12.pdf' }
    ]
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET /api/whitelabel/portal?agencyId=agency-123
  if (req.method === 'GET') {
    const { agencyId } = req.query;
    const portal = mockPortals.find(p => p.agencyId === agencyId);
    if (!portal) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(portal);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

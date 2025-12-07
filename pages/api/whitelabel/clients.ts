// Ajans müşterileri için CRUD + rapor geçmişi (mock, memory)
import type { NextApiRequest, NextApiResponse } from 'next';

let clients: Array<{
  id: string;
  agencyId: string;
  name: string;
  city: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  reports: Array<{ id: string; name: string; url: string; createdAt: string }>;
}> = [
  {
    id: 'client1',
    agencyId: 'agency1',
    name: 'Antalya Dental Clinic',
    city: 'Antalya',
    email: 'antalya@demo.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reports: [
      { id: 'rpt1', name: 'Aralık 2025', url: '/reports/dental-2025-12.pdf', createdAt: new Date().toISOString() },
      { id: 'rpt2', name: 'Kasım 2025', url: '/reports/dental-2025-11.pdf', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 'client2',
    agencyId: 'agency1',
    name: "Sarah's Pizza",
    city: 'London',
    email: 'sarah@pizza.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reports: [
      { id: 'rpt3', name: 'Aralık 2025', url: '/reports/pizza-2025-12.pdf', createdAt: new Date().toISOString() }
    ]
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Token auth (mock)
  const auth = req.headers.authorization;
  if (!auth || auth !== 'Bearer mock-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // GET: Listele veya detay
  if (req.method === 'GET') {
    const { agencyId, clientId } = req.query;
    if (clientId) {
      const client = clients.find(c => c.id === clientId);
      if (!client) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(client);
    }
    const list = clients.filter(c => c.agencyId === agencyId);
    return res.status(200).json(list);
  }
  // POST: Ekle
  if (req.method === 'POST') {
    const { agencyId, name, city, email, phone } = req.body;
    if (!agencyId || !name || !city || !email) return res.status(400).json({ error: 'Eksik alan' });
    const id = 'client-' + Math.random().toString(36).slice(2, 8);
    const now = new Date().toISOString();
    const client = { id, agencyId, name, city, email, phone, createdAt: now, updatedAt: now, reports: [] };
    clients.push(client);
    return res.status(201).json(client);
  }
  // PATCH: Düzenle
  if (req.method === 'PATCH') {
    const { id, name, city, email, phone } = req.body;
    const client = clients.find(c => c.id === id);
    if (!client) return res.status(404).json({ error: 'Not found' });
    if (name) client.name = name;
    if (city) client.city = city;
    if (email) client.email = email;
    if (phone) client.phone = phone;
    client.updatedAt = new Date().toISOString();
    return res.status(200).json(client);
  }
  // DELETE: Sil
  if (req.method === 'DELETE') {
    const { id } = req.body;
    clients = clients.filter(c => c.id !== id);
    return res.status(200).json({ success: true });
  }
  // Rapor ekle
  if (req.method === 'PUT') {
    const { clientId, name, url } = req.body;
    const client = clients.find(c => c.id === clientId);
    if (!client) return res.status(404).json({ error: 'Not found' });
    const rptId = 'rpt-' + Math.random().toString(36).slice(2, 8);
    client.reports.push({ id: rptId, name, url, createdAt: new Date().toISOString() });
    client.updatedAt = new Date().toISOString();
    return res.status(200).json(client);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

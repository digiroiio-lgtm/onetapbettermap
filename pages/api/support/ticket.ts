// Ticket/job API endpoint (mock, memory)
import type { NextApiRequest, NextApiResponse } from 'next';

let tickets: Array<{
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'normal' | 'high';
  createdAt: string;
  updatedAt: string;
  slaDue: string;
}> = [];

function getSlaDue(priority: 'normal' | 'high') {
  // Normal: 48 saat, High: 8 saat
  const now = new Date();
  now.setHours(now.getHours() + (priority === 'high' ? 8 : 48));
  return now.toISOString();
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ticket oluştur
  if (req.method === 'POST') {
    const { userId, subject, message, priority } = req.body;
    if (!userId || !subject || !message) return res.status(400).json({ error: 'Eksik alan' });
    const id = 'TCKT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const now = new Date().toISOString();
    const slaDue = getSlaDue(priority === 'high' ? 'high' : 'normal');
    const ticket = { id, userId, subject, message, status: 'open', priority: priority === 'high' ? 'high' : 'normal', createdAt: now, updatedAt: now, slaDue };
    tickets.push(ticket);
    return res.status(201).json(ticket);
  }
  // Ticket listesi (öncelik sırası)
  if (req.method === 'GET') {
    const { userId } = req.query;
    let result = tickets;
    if (userId) result = result.filter(t => t.userId === userId);
    // Önce high, sonra normal, sonra tarih
    result = result.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority === 'high' ? -1 : 1;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return res.status(200).json(result);
  }
  // Ticket güncelle (durum değiştir)
  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket bulunamadı' });
    if (status) ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return res.status(200).json(ticket);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

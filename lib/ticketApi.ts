// Ticket/job frontend API entegrasyonu
export async function createTicket({ userId, subject, message, priority }: { userId: string; subject: string; message: string; priority: 'normal' | 'high'; }) {
  const res = await fetch('/api/support/ticket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, subject, message, priority })
  });
  if (!res.ok) throw new Error('Ticket oluşturulamadı');
  return res.json();
}

export async function getTickets(userId?: string) {
  const url = userId ? `/api/support/ticket?userId=${userId}` : '/api/support/ticket';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Ticketlar alınamadı');
  return res.json();
}

export async function updateTicketStatus(id: string, status: 'open' | 'in-progress' | 'closed') {
  const res = await fetch('/api/support/ticket', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  });
  if (!res.ok) throw new Error('Ticket güncellenemedi');
  return res.json();
}

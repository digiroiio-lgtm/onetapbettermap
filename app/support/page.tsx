// Destek talepleri (ticket/job) sayfası
'use client';
import { useEffect, useState } from 'react';
import { createTicket, getTickets, updateTicketStatus } from '@/lib/ticketApi';

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'normal' | 'high'>('normal');
  const [loading, setLoading] = useState(false);
  const [userId] = useState('demo'); // Demo kullanıcı
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets(userId);
      setTickets(data);
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await createTicket({ userId, subject, message, priority });
      setSubject('');
      setMessage('');
      setPriority('normal');
      setSuccess('Destek talebiniz oluşturuldu.');
      fetchTickets();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Destek Talepleri (Ticket Sistemi)</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 space-y-4">
        <input
          type="text"
          placeholder="Konu"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Mesajınız"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          required
        />
        <div className="flex items-center gap-4">
          <label className="font-semibold">Öncelik:</label>
          <select value={priority} onChange={e => setPriority(e.target.value as any)} className="px-3 py-2 border rounded-lg">
            <option value="normal">Normal</option>
            <option value="high">Premium (Öncelikli)</option>
          </select>
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold" disabled={loading}>
          {loading ? 'Gönderiliyor...' : 'Destek Talebi Oluştur'}
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
      <h2 className="text-xl font-bold mb-4">Talepleriniz</h2>
      <div className="space-y-4">
        {tickets.length === 0 && <div className="text-gray-500">Henüz destek talebiniz yok.</div>}
        {tickets.map(ticket => (
          <div key={ticket.id} className={`rounded-xl p-4 border shadow-sm ${ticket.priority === 'high' ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{ticket.subject}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${ticket.priority === 'high' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{ticket.priority === 'high' ? 'Premium' : 'Normal'}</span>
            </div>
            <div className="mb-2 text-gray-700">{ticket.message}</div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Durum: <b>{ticket.status}</b></span>
              <span>Oluşturma: {new Date(ticket.createdAt).toLocaleString()}</span>
              <span>SLA Bitiş: <b>{new Date(ticket.slaDue).toLocaleString()}</b></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

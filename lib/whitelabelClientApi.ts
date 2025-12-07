// Ajans müşteri ve rapor API entegrasyonu (frontend)

export async function getClients(agencyId: string, token: string) {
  const res = await fetch(`/api/whitelabel/clients?agencyId=${agencyId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Müşteri listesi alınamadı');
  return res.json();
}

export async function getClient(clientId: string, token: string) {
  const res = await fetch(`/api/whitelabel/clients?clientId=${clientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Müşteri detayı alınamadı');
  return res.json();
}

export async function addClient({ agencyId, name, city, email, phone }: { agencyId: string; name: string; city: string; email: string; phone?: string }, token: string) {
  const res = await fetch('/api/whitelabel/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ agencyId, name, city, email, phone })
  });
  if (!res.ok) throw new Error('Müşteri eklenemedi');
  return res.json();
}

export async function updateClient({ id, name, city, email, phone }: { id: string; name?: string; city?: string; email?: string; phone?: string }, token: string) {
  const res = await fetch('/api/whitelabel/clients', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id, name, city, email, phone })
  });
  if (!res.ok) throw new Error('Müşteri güncellenemedi');
  return res.json();
}

export async function deleteClient(id: string, token: string) {
  const res = await fetch('/api/whitelabel/clients', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Müşteri silinemedi');
  return res.json();
}

export async function addClientReport({ clientId, name, url }: { clientId: string; name: string; url: string }, token: string) {
  const res = await fetch('/api/whitelabel/clients', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ clientId, name, url })
  });
  if (!res.ok) throw new Error('Rapor eklenemedi');
  return res.json();
}

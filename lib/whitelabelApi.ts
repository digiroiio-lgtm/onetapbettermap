// White-label portal frontend API entegrasyonu

export async function agencyLogin(email: string, password: string) {
  const res = await fetch('/api/whitelabel/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Giriş başarısız');
  return res.json();
}

export async function getAgencyPortal(agencyId: string, token: string) {
  const res = await fetch(`/api/whitelabel/portal?agencyId=${agencyId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Ajans verisi alınamadı');
  return res.json();
}

export async function getClientReport(clientId: string, token: string) {
  const res = await fetch(`/api/whitelabel/report?clientId=${clientId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Rapor alınamadı');
  return res.json();
}

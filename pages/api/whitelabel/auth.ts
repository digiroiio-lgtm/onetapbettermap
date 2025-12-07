// White-label portal için ajans oturum açma (mock, JWT yok)
import type { NextApiRequest, NextApiResponse } from 'next';

const AGENCY_USERS = [
  { id: 'agency1', email: 'agency@example.com', password: 'test123', name: 'Demo Agency' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body;
  const user = AGENCY_USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  // Gerçek sistemde JWT döner
  res.status(200).json({ id: user.id, name: user.name, email: user.email, token: 'mock-token' });
}

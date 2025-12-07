import type { NextApiRequest, NextApiResponse } from 'next';

// Use the same in-memory users array as in signup (for demo only)
const users: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  if (!user.verified) {
    return res.status(403).json({ error: 'Email not verified' });
  }

  // Simulate session token (in production, use JWT)
  const sessionToken = Math.random().toString(36).substring(2, 15);
  user.sessionToken = sessionToken;

  return res.status(200).json({ message: 'Login successful', sessionToken });
}

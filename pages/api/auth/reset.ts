import type { NextApiRequest, NextApiResponse } from 'next';

// Use the same in-memory users array as in signup (for demo only)
const users: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: 'Missing token or password' });
  }

  const user = users.find(u => u.resetToken === token && u.resetTokenExpires > Date.now());
  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  user.password = password; // In production, hash this!
  user.resetToken = null;
  user.resetTokenExpires = null;

  return res.status(200).json({ message: 'Password reset successful.' });
}

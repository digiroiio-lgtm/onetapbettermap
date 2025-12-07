import type { NextApiRequest, NextApiResponse } from 'next';

// Use the same in-memory users array as in signup (for demo only)
const users: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    // For security, don't reveal if user exists
    return res.status(200).json({ message: 'If this email exists, a reset link was sent.' });
  }

  // Simulate reset token
  const resetToken = Math.random().toString(36).substring(2, 15);
  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + 1000 * 60 * 30; // 30 min

  // Simulate sending email (log to console)
  console.log(`Reset password for ${email}: http://localhost:3000/reset?token=${resetToken}`);

  return res.status(200).json({ message: 'If this email exists, a reset link was sent.' });
}

import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory user store for demo (replace with DB in production)
const users: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Simulate email verification token
  const verificationToken = Math.random().toString(36).substring(2, 15);

  // Store user (unverified)
  users.push({
    id: 'USR' + Date.now(),
    name,
    email,
    password, // In production, hash this!
    verified: false,
    verificationToken,
    createdAt: new Date().toISOString(),
  });

  // Simulate sending email (log to console)
  console.log(`Verify email for ${email}: http://localhost:3000/verify?token=${verificationToken}`);

  return res.status(201).json({ message: 'Signup successful, please verify your email.' });
}

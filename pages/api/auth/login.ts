import type { NextApiRequest, NextApiResponse } from 'next'
import {
  findUserByEmail,
  generateToken,
  getPublicProfile,
  updateUser,
} from '@/lib/userStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' })
  }

  const user = findUserByEmail(email)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  if (!user.verified) {
    return res.status(403).json({ error: 'Email not verified' })
  }

  const sessionToken = generateToken(16)
  updateUser(user, { sessionToken, lastLoginAt: new Date().toISOString() })

  return res.status(200).json({
    message: 'Login successful',
    sessionToken,
    user: getPublicProfile(user),
  })
}

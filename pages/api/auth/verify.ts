import type { NextApiRequest, NextApiResponse } from 'next'
import { findUserByVerificationToken, updateUser } from '@/lib/userStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body
  if (!token) {
    return res.status(400).json({ error: 'Missing token' })
  }

  const user = findUserByVerificationToken(token)
  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' })
  }

  updateUser(user, {
    verified: true,
    verificationToken: null,
    verifiedAt: new Date().toISOString(),
  })

  return res.status(200).json({ message: 'Email verified successfully.' })
}

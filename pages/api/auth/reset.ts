import type { NextApiRequest, NextApiResponse } from 'next'
import { findUserByResetToken, updateUser } from '@/lib/userStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, password } = req.body
  if (!token || !password) {
    return res.status(400).json({ error: 'Missing token or password' })
  }

  const user = findUserByResetToken(token)
  if (!user || !user.resetTokenExpires || user.resetTokenExpires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired token' })
  }

  updateUser(user, {
    password,
    resetToken: null,
    resetTokenExpires: null,
  })

  return res.status(200).json({ message: 'Password reset successful.' })
}

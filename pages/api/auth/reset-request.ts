import type { NextApiRequest, NextApiResponse } from 'next'
import {
  findUserByEmail,
  generateToken,
  normalizeEmail,
  updateUser,
} from '@/lib/userStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Missing email' })
  }

  const user = findUserByEmail(normalizeEmail(email))
  if (user) {
    const resetToken = generateToken()
    const expiresIn = Date.now() + 1000 * 60 * 30
    updateUser(user, { resetToken, resetTokenExpires: expiresIn })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    console.log(`Reset password for ${email}: ${baseUrl}/reset?token=${resetToken}`)
  }

  return res.status(200).json({
    message: 'If this email exists, a reset link was sent.',
    ...(process.env.NODE_ENV !== 'production' && user?.resetToken
      ? { resetToken: user.resetToken }
      : {}),
  })
}

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createDemoUser,
  findUserByEmail,
  generateToken,
  normalizeEmail,
  updateUser,
} from '@/lib/userStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const normalizedEmail = normalizeEmail(email)
  if (findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ error: 'User already exists' })
  }

  const user = createDemoUser({ name, email: normalizedEmail, password })
  const verificationToken = generateToken()
  updateUser(user, { verificationToken, verified: false })

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  console.log(`Verify email for ${email}: ${baseUrl}/verify?token=${verificationToken}`)

  return res.status(201).json({
    message: 'Signup successful, please verify your email.',
    ...(process.env.NODE_ENV !== 'production' ? { verificationToken } : {}),
  })
}

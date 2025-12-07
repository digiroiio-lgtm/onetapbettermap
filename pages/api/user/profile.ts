import type { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteUser,
  findUserBySessionToken,
  getPublicProfile,
  updateUser,
} from '@/lib/userStore'

function authenticate(req: NextApiRequest) {
  const authHeader = req.headers.authorization
  if (!authHeader) return null
  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return findUserBySessionToken(token)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req)
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    return res.status(200).json(getPublicProfile(user))
  }

  if (req.method === 'PUT') {
    const { name, businessName, teamName } = req.body as {
      name?: string
      businessName?: string
      teamName?: string
    }

    updateUser(user, {
      name: typeof name === 'string' ? name : user.name,
      businessName: typeof businessName === 'string' ? businessName : user.businessName,
      teamName: typeof teamName === 'string' ? teamName : user.teamName,
    })

    return res.status(200).json(getPublicProfile(user))
  }

  if (req.method === 'DELETE') {
    deleteUser(user.id)
    return res.status(200).json({ message: 'Account deleted and personal data removed.' })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

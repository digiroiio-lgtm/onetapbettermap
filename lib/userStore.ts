import { randomBytes } from 'crypto'

export interface DemoUser {
  id: string
  name: string
  email: string
  password: string
  verified: boolean
  verificationToken: string | null
  verifiedAt: string | null
  resetToken: string | null
  resetTokenExpires: number | null
  sessionToken: string | null
  businessName: string | null
  teamName: string | null
  role: 'owner' | 'member'
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  lastLoginAt: string | null
}

interface GlobalUserStore {
  __ONE_TAP_USERS__?: DemoUser[]
}

const globalStore = globalThis as typeof globalThis & GlobalUserStore
const users: DemoUser[] = globalStore.__ONE_TAP_USERS__ ?? []

if (!globalStore.__ONE_TAP_USERS__) {
  globalStore.__ONE_TAP_USERS__ = users
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function generateToken(length = 24): string {
  try {
    return randomBytes(length).toString('hex')
  } catch {
    return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('')
  }
}

export function createDemoUser(params: { name: string; email: string; password: string }): DemoUser {
  const now = new Date().toISOString()
  const user: DemoUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: params.name,
    email: normalizeEmail(params.email),
    password: params.password,
    verified: false,
    verificationToken: null,
    verifiedAt: null,
    resetToken: null,
    resetTokenExpires: null,
    sessionToken: null,
     businessName: null,
     teamName: null,
     role: 'owner',
     deletedAt: null,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  }

  users.push(user)
  return user
}

export function findUserByEmail(email: string): DemoUser | undefined {
  return users.find(user => user.email === normalizeEmail(email))
}

export function findUserByVerificationToken(token: string): DemoUser | undefined {
  return users.find(user => user.verificationToken === token)
}

export function findUserByResetToken(token: string): DemoUser | undefined {
  return users.find(user => user.resetToken === token)
}

export function findUserBySessionToken(token: string): DemoUser | undefined {
  return users.find(user => user.sessionToken === token)
}

export function updateUser(user: DemoUser, updates: Partial<DemoUser>): DemoUser {
  Object.assign(user, updates, { updatedAt: new Date().toISOString() })
  return user
}

export function getAllUsers(): DemoUser[] {
  return users
}

export function deleteUser(userId: string): boolean {
  const index = users.findIndex(user => user.id === userId)
  if (index === -1) return false
  users.splice(index, 1)
  return true
}

export function getPublicProfile(user: DemoUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    businessName: user.businessName,
    teamName: user.teamName,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
  }
}

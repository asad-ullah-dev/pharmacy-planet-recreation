import { User } from '@/lib/types'

// Simple JWT decode function (for client-side use)
export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    return null
  }
}

// Check if user has admin role
export const isAdmin = (user: User | null): boolean => {
  return user?.role?.name === 'admin'
}

// Check if user has user role
export const isUser = (user: User | null): boolean => {
  return user?.role?.name === 'user'
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem('token')
  if (!token) return false
  
  const decoded = decodeJWT(token)
  if (!decoded) return false
  
  // Check if token is expired
  const currentTime = Date.now() / 1000
  if (decoded.exp && decoded.exp < currentTime) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return false
  }
  
  return true
}

// Get current user from localStorage
export const getCurrentUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch (error) {
    return null
  }
}

// Check if user can access admin routes
export const canAccessAdmin = (): boolean => {
  const user = getCurrentUserFromStorage()
  return isAuthenticated() && isAdmin(user)
}

// Check if user can access user routes
export const canAccessUser = (): boolean => {
  const user = getCurrentUserFromStorage()
  return isAuthenticated() && (isAdmin(user) || isUser(user))
}

// Get user role from cookie (client-side)
export const getUserRoleFromCookie = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const roleCookie = cookies.find(cookie => cookie.trim().startsWith('user-role='))
  
  if (roleCookie) {
    return roleCookie.split('=')[1]
  }
  
  return null
}

// Get user ID from cookie (client-side)
export const getUserIdFromCookie = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const idCookie = cookies.find(cookie => cookie.trim().startsWith('user-id='))
  
  if (idCookie) {
    return idCookie.split('=')[1]
  }
  
  return null
} 
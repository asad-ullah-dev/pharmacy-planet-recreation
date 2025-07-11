'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'
import { isAuthenticated, getCurrentUserFromStorage, isAdmin, isUser } from '@/lib/utils/auth'

interface WithAuthProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'user' | 'any'
  redirectTo?: string
  fallback?: React.ReactNode
}

export default function WithAuth({ 
  children, 
  requiredRole = 'any', 
  redirectTo = '/auth/login',
  fallback = <div>Loading...</div>
}: WithAuthProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        router.push(redirectTo)
        return
      }

      // Get user from localStorage
      const currentUser = getCurrentUserFromStorage()
      if (!currentUser) {
        router.push(redirectTo)
        return
      }

      setUser(currentUser)

      // Check role-based access
      let access = false
      switch (requiredRole) {
        case 'admin':
          access = isAdmin(currentUser)
          break
        case 'user':
          access = isUser(currentUser) || isAdmin(currentUser) // Admin can access user routes
          break
        case 'any':
          access = true
          break
        default:
          access = false
      }

      if (!access) {
        // Redirect based on user role
        if (isAdmin(currentUser)) {
          router.push('/admin/dashboard')
        } else {
          router.push('/dashboard')
        }
        return
      }

      setHasAccess(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router, requiredRole, redirectTo])

  if (isLoading) {
    return <>{fallback}</>
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}

// Higher-order component for admin-only routes
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AdminProtectedComponent(props: P) {
    return (
      <WithAuth requiredRole="admin" redirectTo="/auth/login">
        <Component {...props} />
      </WithAuth>
    )
  }
}

// Higher-order component for user-only routes
export function withUserAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function UserProtectedComponent(props: P) {
    return (
      <WithAuth requiredRole="user" redirectTo="/auth/login">
        <Component {...props} />
      </WithAuth>
    )
  }
}

// Higher-order component for any authenticated user
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    return (
      <WithAuth requiredRole="any" redirectTo="/auth/login">
        <Component {...props} />
      </WithAuth>
    )
  }
} 
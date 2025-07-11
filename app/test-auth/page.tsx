"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUserFromStorage, isAuthenticated, isAdmin, isUser, getUserRoleFromCookie, getUserIdFromCookie } from "@/lib/utils/auth"
import { User } from "@/lib/types"
import WithAuth from "@/components/auth/WithAuth"

export default function TestAuthPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cookieRole, setCookieRole] = useState<string | null>(null)
  const [cookieUserId, setCookieUserId] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUserFromStorage()
    const roleFromCookie = getUserRoleFromCookie()
    const userIdFromCookie = getUserIdFromCookie()
    
    setUser(currentUser)
    setCookieRole(roleFromCookie)
    setCookieUserId(userIdFromCookie)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <WithAuth requiredRole="any" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
          
          <div className="grid gap-6">
            {/* Authentication Status */}
            <Card>
              <CardHeader>
                <CardTitle>Authentication Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>Is Authenticated:</span>
                    <Badge variant={isAuthenticated() ? "default" : "destructive"}>
                      {isAuthenticated() ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Is Admin:</span>
                    <Badge variant={isAdmin(user) ? "default" : "secondary"}>
                      {isAdmin(user) ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Is User:</span>
                    <Badge variant={isUser(user) ? "default" : "secondary"}>
                      {isUser(user) ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Information */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <strong>Name:</strong> {user.first_name} {user.last_name}
                    </div>
                    <div>
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                      <strong>Role:</strong> {user.role?.name}
                    </div>
                    <div>
                      <strong>Status:</strong> {user.status}
                    </div>
                    <div>
                      <strong>User ID:</strong> {user.id}
                    </div>
                    <div>
                      <strong>Role ID:</strong> {user.role_id}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cookie Information */}
            <Card>
              <CardHeader>
                <CardTitle>Cookie Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <strong>Role from Cookie:</strong> {cookieRole || 'Not found'}
                  </div>
                  <div>
                    <strong>User ID from Cookie:</strong> {cookieUserId || 'Not found'}
                  </div>
                  <div>
                    <strong>All Cookies:</strong>
                    <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {document.cookie}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Test */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild>
                    <a href="/dashboard">Go to User Dashboard</a>
                  </Button>
                  <br />
                  <Button asChild variant="outline">
                    <a href="/admin/dashboard">Go to Admin Dashboard</a>
                  </Button>
                  <br />
                  <Button asChild variant="outline">
                    <a href="/checkout">Go to Checkout</a>
                  </Button>
                  <br />
                  <Button asChild variant="outline">
                    <a href="/consultation">Go to Consultation</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WithAuth>
  )
} 
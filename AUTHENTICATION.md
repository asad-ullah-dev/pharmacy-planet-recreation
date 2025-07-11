# Authentication & Authorization System

This document explains how to use the authentication and authorization system in the Pharmacy Planet application.

## Overview

The application uses a JWT-based authentication system with role-based access control (RBAC). There are two main roles:
- **Admin**: Can access admin panel and all user features
- **User**: Can access user dashboard and features

## Components

### 1. Middleware (`middleware.ts`)

The middleware handles server-side authentication and route protection:

- **Protected Routes**: `/admin/*`, `/dashboard/*`, `/checkout/*`, `/consultation/*`, `/onboarding/*`
- **Auth Routes**: `/auth/*`
- **Role-based Access**: Only admin users can access `/admin/*` routes

### 2. WithAuth Component (`components/auth/WithAuth.tsx`)

Client-side authentication wrapper component with the following features:

- **Role-based protection**: `requiredRole` prop accepts `'admin'`, `'user'`, or `'any'`
- **Automatic redirects**: Redirects to login if not authenticated
- **Loading states**: Shows fallback while checking authentication
- **Higher-order components**: `withAdminAuth`, `withUserAuth`, `withAuth`

### 3. Auth Utilities (`lib/utils/auth.ts`)

Utility functions for authentication:

- `isAuthenticated()`: Check if user is logged in
- `isAdmin(user)`: Check if user has admin role
- `isUser(user)`: Check if user has user role
- `getCurrentUserFromStorage()`: Get user from localStorage
- `canAccessAdmin()`: Check if user can access admin routes
- `canAccessUser()`: Check if user can access user routes

## Usage Examples

### 1. Protecting Admin Pages

```tsx
import WithAuth from "@/components/auth/WithAuth"

export default function AdminDashboard() {
  return (
    <WithAuth requiredRole="admin" redirectTo="/auth/login">
      <div>
        {/* Admin dashboard content */}
      </div>
    </WithAuth>
  )
}
```

### 2. Protecting User Pages

```tsx
import WithAuth from "@/components/auth/WithAuth"

export default function UserDashboard() {
  return (
    <WithAuth requiredRole="user" redirectTo="/auth/login">
      <div>
        {/* User dashboard content */}
      </div>
    </WithAuth>
  )
}
```

### 3. Using Higher-Order Components

```tsx
import { withAdminAuth } from "@/components/auth/WithAuth"

function AdminPage() {
  return <div>Admin only content</div>
}

export default withAdminAuth(AdminPage)
```

### 4. Checking Authentication in Components

```tsx
import { isAuthenticated, getCurrentUserFromStorage, isAdmin } from "@/lib/utils/auth"

function MyComponent() {
  const user = getCurrentUserFromStorage()
  
  if (!isAuthenticated()) {
    return <div>Please log in</div>
  }
  
  if (isAdmin(user)) {
    return <div>Admin content</div>
  }
  
  return <div>User content</div>
}
```

## API Response Structure

The login API returns the following structure:

```json
{
  "user": {
    "id": 2,
    "first_name": "Admin",
    "last_name": "User",
    "email": "admin@medicalstore.com",
    "role_id": 1,
    "status": "inactive",
    "role": {
      "id": 1,
      "name": "admin"
    }
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

## Security Features

1. **JWT Token Validation**: Tokens are validated for expiration
2. **Role-based Access**: Different routes require different roles
3. **Automatic Redirects**: Unauthorized users are redirected to login
4. **Secure Cookies**: Server-side authentication uses secure cookies
5. **LocalStorage**: Client-side authentication uses localStorage for user data

## Route Protection

### Server-side (Middleware)
- `/admin/*` - Admin only
- `/dashboard/*` - Authenticated users only
- `/auth/*` - Redirects to dashboard if already authenticated

### Client-side (WithAuth)
- Use `requiredRole="admin"` for admin-only pages
- Use `requiredRole="user"` for user pages (admin can also access)
- Use `requiredRole="any"` for any authenticated user

## Error Handling

- **Invalid Token**: Redirects to login
- **Expired Token**: Automatically clears storage and redirects to login
- **Insufficient Permissions**: Redirects to appropriate dashboard based on role
- **Network Errors**: Shows toast notifications

## Best Practices

1. Always wrap protected pages with `WithAuth`
2. Use appropriate `requiredRole` for each page
3. Handle loading states gracefully
4. Provide clear error messages
5. Test both authenticated and unauthenticated states 
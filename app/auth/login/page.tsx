"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/lib/validation/auth"
import { login } from "@/lib/api/authService"
import { pharmacyToasts, showLoadingToast, dismissToast } from "@/lib/toast-config"
import { LoginCredentials } from "@/lib/types"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true)
    const loadingToast = showLoadingToast('Signing you in...')

    try {
      const response = await login(data)
      console.log(response,'response')
      
      dismissToast(loadingToast)
      pharmacyToasts.loginSuccess()
      console.log(response.user.role.name,'role name')
      
      // Redirect based on user role
      if (response.user.role.name === 'admin') {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      dismissToast(loadingToast)
      pharmacyToasts.loginError()
      console.error("Login Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md sm:px-0 px-4">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/ozempo-logo.png"
                alt="Ozempo"
                width={200}
                height={60}
                className="h-12 w-auto cursor-pointer"
              />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:px-0 px-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password")}
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Enter your password"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-blue-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full text-white"
                    disabled={isLoading}
                    style={{ backgroundColor: "#14b8a6" }}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar with slogan */}
          <div className="mt-8 text-center">
            <Image
              src="/images/weight-loss-slogan.png"
              alt="Weight Loss Made Simple"
              width={300}
              height={100}
              className="mx-auto h-16 w-auto"
            />
          </div>
        </div>
      </div>
    </>
  )
}

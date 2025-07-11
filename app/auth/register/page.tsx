"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "@/lib/validation/auth"
import { register } from "@/lib/api/authService"
import { pharmacyToasts, showLoadingToast, dismissToast } from "@/lib/toast-config"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
  })

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const ethnicGroups = [
    "Please Select", "White British", "White Irish", "White Other",
    "Mixed White and Black Caribbean", "Mixed White and Black African", "Mixed White and Asian", "Mixed Other",
    "Asian or Asian British Indian", "Asian or Asian British Pakistani", "Asian or Asian British Bangladeshi",
    "Asian or Asian British Other", "Black or Black British Caribbean", "Black or Black British African",
    "Black or Black British Other", "Chinese", "Other Ethnic Group", "Prefer not to say"
  ]

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const loadingToast = showLoadingToast('Creating your account...')

    const formattedPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: `${data.dobYear}-${data.dobMonth.padStart(2, "0")}-${data.dobDay.padStart(2, "0")}`,
      phone_number: data.phoneNumber,
      gender: data.gender,
      street_address: data.streetAddress,
      county: data.county,
      city: data.city,
      country: data.country,
      zip_postal_code: data.zipCode,
      ethnicity: data.ethnicGroup,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    }

    try {
      await register(formattedPayload)
      dismissToast(loadingToast)
      pharmacyToasts.registerSuccess()
      router.push("/auth/login")
    } catch (error) {
      dismissToast(loadingToast)
      pharmacyToasts.registerError()
      console.error("Registration error:", error)
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl sm:px-0 px-4">
          <Card>
            <CardHeader>
              <CardTitle>Join Ozempo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dobDay">Day *</Label>
                    <Input
                      id="dobDay"
                      {...register("dobDay")}
                      placeholder="DD"
                      className={errors.dobDay ? 'border-red-500' : ''}
                    />
                    {errors.dobDay && (
                      <p className="text-red-500 text-sm mt-1">{errors.dobDay.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dobMonth">Month *</Label>
                    <select
                      {...register("dobMonth")}
                      className={`w-full px-3 py-2 border rounded-md ${errors.dobMonth ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, index) => (
                        <option key={month} value={String(index + 1).padStart(2, '0')}>
                          {month}
                        </option>
                      ))}
                    </select>
                    {errors.dobMonth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dobMonth.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dobYear">Year *</Label>
                    <Input
                      id="dobYear"
                      {...register("dobYear")}
                      placeholder="YYYY"
                      className={errors.dobYear ? 'border-red-500' : ''}
                    />
                    {errors.dobYear && (
                      <p className="text-red-500 text-sm mt-1">{errors.dobYear.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      className={errors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      {...register("gender")}
                      className={`w-full px-3 py-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    {...register("streetAddress")}
                    className={errors.streetAddress ? 'border-red-500' : ''}
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.streetAddress.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="county">County *</Label>
                    <Input
                      id="county"
                      {...register("county")}
                      className={errors.county ? 'border-red-500' : ''}
                    />
                    {errors.county && (
                      <p className="text-red-500 text-sm mt-1">{errors.county.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register("city")}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      {...register("zipCode")}
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="ethnicGroup">Ethnic Group *</Label>
                  <select
                    {...register("ethnicGroup")}
                    className={`w-full px-3 py-2 border rounded-md ${errors.ethnicGroup ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    {ethnicGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  {errors.ethnicGroup && (
                    <p className="text-red-500 text-sm mt-1">{errors.ethnicGroup.message}</p>
                  )}
                </div>

                {/* Account Information */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
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

                {/* Terms and Newsletter */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      {...register("agreeTerms")}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms-conditions" className="text-primary hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      {...register("subscribeNewsletter")}
                    />
                    <Label htmlFor="subscribeNewsletter" className="text-sm">
                      Subscribe to our newsletter for health tips and updates
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={isLoading}
                  style={{ backgroundColor: "#14b8a6" }}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
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

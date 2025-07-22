"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, MapPin, MessageCircle, ShoppingCart, Mail, X, Star, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import Logout from "@/components/logout/Logout"
import { getUserProfile, updateUserProfile, ProfileUpdateData } from "@/lib/api/profileService"
import { toast } from "sonner"

export default function AccountDetailsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "male",
    changeEmail: false,
    changePassword: false,
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phoneNumber: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Load existing profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile()
        
        // Parse date of birth if it exists
        let dobDay = "01"
        let dobMonth = "01"
        let dobYear = "1990"
        
        if (profile.date_of_birth) {
          const dob = new Date(profile.date_of_birth)
          dobDay = String(dob.getDate()).padStart(2, "0")
          dobMonth = String(dob.getMonth() + 1).padStart(2, "0")
          dobYear = String(dob.getFullYear())
        }

        setFormData({
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          dobDay,
          dobMonth,
          dobYear,
          gender: profile.gender || "male",
          changeEmail: false,
          changePassword: false,
          email: profile.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          phoneNumber: profile.phone_number || "",
        })
      } catch (error) {
        console.error('Error loading profile:', error)
        // If no profile exists, keep the default form data
      } finally {
        setIsLoadingData(false)
      }
    }

    loadProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prepare the data for API
      const profileData: ProfileUpdateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phoneNumber,
        gender: formData.gender,
      }

      // Add date of birth if all fields are filled
      if (formData.dobDay && formData.dobMonth && formData.dobYear) {
        const dateOfBirth = `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`
        profileData.date_of_birth = dateOfBirth
      }

      // Add password fields if password change is requested
      if (formData.changePassword && formData.newPassword && formData.confirmPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("New passwords don't match!")
          setIsLoading(false)
          return
        }
        if (formData.newPassword.length < 8) {
          toast.error("Password must be at least 8 characters long!")
          setIsLoading(false)
          return
        }
        profileData.password = formData.newPassword
        profileData.password_confirmation = formData.confirmPassword
      }

      const response = await updateUserProfile(profileData)
      toast.success(response.message || 'Profile updated successfully!')
      
      // Reset password fields after successful update
      if (formData.changePassword) {
        setFormData(prev => ({
          ...prev,
          changePassword: false,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }))
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      // Error handling is done by the API client interceptor
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:space-x-8 space-x-4">
              <Link href="/" className="flex items-center">
                <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
                </Link>
                  <div className="hidden md:block">
                   <span className="lg:text-sm text-xs font-medium text-gray-600">WEIGHT LOSS CLINIC</span>
                  </div>
              </div>
            

            <div className="flex items-center sm:space-x-6 space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  2,354 reviews on Trustpilot
                </Badge>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    1
                  </Badge>
                </Button>
              </div>

              <Link href="/">
                <Button className="bg-primary hover:bg-blue-600 text-white">HOME</Button>
              </Link>
               <div>
                   <Logout />
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Account</h2>
                <nav className="space-y-2">
                  <Link
                    href="/dashboard/account"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary"
                  >
                    <User className="w-5 h-5" />
                    <span>Manage Account Details</span>
                  </Link>
                  <Link
                    href="/dashboard/address"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Manage Address Details</span>
                  </Link>
                  <Link
                    href="/dashboard/health"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>General Health Questions</span>
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    href="/dashboard/newsletter"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Newsletter Subscriptions</span>
                  </Link>
                  {/* <Link
                    href="/dashboard/delete-account"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <X className="w-5 h-5" />
                    <span>Delete Account</span>
                  </Link> */}
                  <Link
                    href="/dashboard/support"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order Query</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card>
              <CardContent className="p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Edit Account Information</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label>Date of Birth *</Label>
                    <div className="flex sm:gap-4 gap-2 mt-2">
                      <select
                        className="sm:px-3 px-1.5 py-2 border border-gray-300 rounded-md flex-1"
                        value={formData.dobDay}
                        onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })}
                        required
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        className="sm:px-3 px-1.5 py-2 border border-gray-300 rounded-md flex-1"
                        value={formData.dobMonth}
                        onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })}
                        required
                      >
                        {months.map((month, index) => (
                          <option key={index + 1} value={String(index + 1).padStart(2, "0")}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        className="sm:px-3 px-1.5 py-2 border border-gray-300 rounded-md flex-1"
                        value={formData.dobYear}
                        onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })}
                        required
                      >
                        {Array.from({ length: 100 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <Label>Gender *</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.gender === "male"
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          Male
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.gender === "female"
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          Female
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Change Options */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="changePassword">Change Password</Label>
                      <Switch
                        id="changePassword"
                        checked={formData.changePassword}
                        onCheckedChange={(checked) => setFormData({ ...formData, changePassword: checked as boolean })}
                      />
                    </div>
                  </div>

                  {/* Password Section */}
                  {formData.changePassword && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="mt-1"
                            placeholder="Enter your new password"
                            minLength={8}
                          />
                          <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters long</p>
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="mt-1"
                            placeholder="Confirm your new password"
                            minLength={8}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#14b8a6" }}
                      onMouseEnter={(e) => {
                        if (!isLoading) {
                          (e.target as HTMLElement).style.backgroundColor = "#0f766e"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading) {
                          (e.target as HTMLElement).style.backgroundColor = "#14b8a6"
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        'Save'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

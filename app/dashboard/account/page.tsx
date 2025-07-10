"use client"

import type React from "react"

import { useState } from "react"
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

export default function AccountDetailsPage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    dobDay: "23",
    dobMonth: "09",
    dobYear: "1978",
    gender: "male",
    changeEmail: false,
    changePassword: false,
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Account details updated:", formData)
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
                  <Link
                    href="/dashboard/delete-account"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <X className="w-5 h-5" />
                    <span>Delete Account</span>
                  </Link>
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label>Date of Birth *</Label>
                    <div className="flex sm:gap-4 gap-2 mt-2">
                      <select
                        className="sm:px-3 px-1.5 py-2 border border-gray-300 rounded-md flex-1"
                        value={formData.dobDay}
                        onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })}
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
                      <Label htmlFor="changeEmail">Change Email</Label>
                      <Switch
                        id="changeEmail"
                        checked={formData.changeEmail}
                        onCheckedChange={(checked) => setFormData({ ...formData, changeEmail: checked as boolean })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="changePassword">Change Password</Label>
                      <Switch
                        id="changePassword"
                        checked={formData.changePassword}
                        onCheckedChange={(checked) => setFormData({ ...formData, changePassword: checked as boolean })}
                      />
                    </div>
                  </div>

                  {/* Email Section */}
                  {formData.changeEmail && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Email</h3>
                      <div className="max-w-md">
                        <Label htmlFor="email">New Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                          placeholder="Enter your new email address"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password Section */}
                  {formData.changePassword && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="mt-1"
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="mt-1"
                            placeholder="Enter your new password"
                          />
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
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="text-white px-8"
                      style={{ backgroundColor: "#14b8a6" }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f766e")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#14b8a6")}
                    >
                      Save
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

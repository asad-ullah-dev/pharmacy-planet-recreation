"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, MessageCircle, ShoppingCart, Mail, X, Star, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function AddressDetailsPage() {
  const defaultAddress = {
    name: "John Doe",
    line1: "#13 Manuel Junction",
    line2: "Tabaquite",
    city: "Port of Spain, Trinidad",
    postcode: "00000",
    country: "Trinidad & Tobago",
    phone: "T: 18683087654",
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
                    <Link href="/auth/login">
                      <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                        LOGOUT
                      </Button>
                    </Link>
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
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span>Manage Account Details</span>
                  </Link>
                  <Link
                    href="/dashboard/address"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary"
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Address Book</h1>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Address</h2>

                  <form className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            defaultValue="John"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue="Doe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          defaultValue="18683087654"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">Address</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              id="streetAddress"
                              name="streetAddress"
                              defaultValue="#13 Manuel Junction"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              defaultValue="Port of Spain"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            name="addressLine2"
                            defaultValue="Tabaquite"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-1">
                              County
                            </label>
                            <input
                              type="text"
                              id="county"
                              name="county"
                              defaultValue="Trinidad"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                              Zip/Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              defaultValue="00000"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            defaultValue="Trinidad & Tobago"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Warning Messages */}
                    <div className="space-y-2">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center">
                        <div className="w-4 h-4 text-yellow-600 mr-2">⚠️</div>
                        <span className="text-sm text-yellow-800">It's a default billing address.</span>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-center">
                        <div className="w-4 h-4 text-yellow-600 mr-2">⚠️</div>
                        <span className="text-sm text-yellow-800">It's a default shipping address.</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                      <Button
                        className="text-white px-8 py-2"
                        style={{ backgroundColor: "#14b8a6" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f766e")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#14b8a6")}
                      >
                        Save Address
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

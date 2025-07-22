"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, MessageCircle, ShoppingCart, Mail, X, Star, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import Logout from "@/components/logout/Logout"
import { useState, useEffect } from "react"
import { createOrUpdateAddress, getUserAddress } from "@/lib/api/addressService"
import { Address } from "@/lib/types"
import { toast } from "sonner"

export default function AddressDetailsPage() {
  const [formData, setFormData] = useState<Address>({
    first_name: "",
    last_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    county: "",
    country: "",
    zip_postal_code: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Load existing address data on component mount
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const address = await getUserAddress()
        setFormData(address)
      } catch (error) {
        console.error('Error loading address:', error)
        // If no address exists, keep the default form data
      } finally {
        setIsLoadingData(false)
      }
    }

    loadAddress()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await createOrUpdateAddress(formData)
      toast.success(response.message || 'Address saved successfully!')
    } catch (error) {
      console.error('Error saving address:', error)
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
          <p className="mt-4 text-gray-600">Loading address details...</p>
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Address Book</h1>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Address</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData?.first_name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData?.last_name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone_number"
                          name="phone_number"
                          value={formData?.phone_number}
                          onChange={handleInputChange}
                          required
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
                            <label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              id="street_address"
                              name="street_address"
                              value={formData?.street_address}
                              onChange={handleInputChange}
                              required
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
                              value={formData?.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
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
                              value={formData?.county}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="zip_postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                              Zip/Postal Code
                            </label>
                            <input
                              type="text"
                              id="zip_postal_code"
                              name="zip_postal_code"
                              value={formData?.zip_postal_code}
                              onChange={handleInputChange}
                              required
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
                            value={formData?.country}
                            onChange={handleInputChange}
                            required
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
                        type="submit"
                        disabled={isLoading}
                        className="text-white px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          'Save Address'
                        )}
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

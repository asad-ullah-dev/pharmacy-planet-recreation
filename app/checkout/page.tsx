"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Lock, Star, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",

    // Billing Address (initialized from customer profile)
    billingFirstName: "John",
    billingLastName: "Doe",
    billingAddress: "123 Main Street",
    billingCity: "New York",
    billingState: "NY",
    billingZip: "10001",
    billingCountry: "United States",

    // Shipping Address (initialized from customer profile)
    shippingFirstName: "John",
    shippingLastName: "Doe",
    shippingAddress: "123 Main Street",
    shippingCity: "New York",
    shippingState: "NY",
    shippingZip: "10001",
    shippingCountry: "United States",

    // Use billing as shipping
    useBillingAsShipping: true,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Order submitted:", formData)
    // Handle order submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:space-x-8 md:space-x-4">
              <Link href="/" className="flex items-center">
                <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
              </Link>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-600">WEIGHT LOSS CLINIC</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-600">Complete your order for Ozempic® treatment</p>
            </div>
            <Link href="/products/ozempic">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Product
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name</Label>
                        <Input
                          id="billingFirstName"
                          value={formData.billingFirstName}
                          onChange={(e) => handleInputChange("billingFirstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name</Label>
                        <Input
                          id="billingLastName"
                          value={formData.billingLastName}
                          onChange={(e) => handleInputChange("billingLastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange("billingCity", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Input
                          id="billingState"
                          value={formData.billingState}
                          onChange={(e) => handleInputChange("billingState", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input
                          id="billingZip"
                          value={formData.billingZip}
                          onChange={(e) => handleInputChange("billingZip", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input
                          id="billingCountry"
                          value={formData.billingCountry}
                          onChange={(e) => handleInputChange("billingCountry", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="useBillingAsShipping"
                        checked={formData.useBillingAsShipping}
                        onCheckedChange={(checked) => handleInputChange("useBillingAsShipping", checked)}
                      />
                      <Label htmlFor="useBillingAsShipping">Use billing address as shipping address</Label>
                    </div>
                  </CardHeader>
                  {!formData.useBillingAsShipping && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingFirstName">First Name</Label>
                          <Input
                            id="shippingFirstName"
                            value={formData.shippingFirstName}
                            onChange={(e) => handleInputChange("shippingFirstName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingLastName">Last Name</Label>
                          <Input
                            id="shippingLastName"
                            value={formData.shippingLastName}
                            onChange={(e) => handleInputChange("shippingLastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shippingAddress">Address</Label>
                        <Input
                          id="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingCity">City</Label>
                          <Input
                            id="shippingCity"
                            value={formData.shippingCity}
                            onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingState">State</Label>
                          <Input
                            id="shippingState"
                            value={formData.shippingState}
                            onChange={(e) => handleInputChange("shippingState", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shippingZip">ZIP Code</Label>
                          <Input
                            id="shippingZip"
                            value={formData.shippingZip}
                            onChange={(e) => handleInputChange("shippingZip", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shippingCountry">Country</Label>
                          <Input
                            id="shippingCountry"
                            value={formData.shippingCountry}
                            onChange={(e) => handleInputChange("shippingCountry", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product */}
                  <div className="flex items-center space-x-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Ozempic"
                        width={64}
                        height={64}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Ozempic® (Semaglutide)</h3>
                      <p className="text-sm text-gray-600">Monthly supply</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">$299.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">$23.92</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">$322.92</span>
                      </div>
                    </div>
                  </div>

                  {/* Complete Order Button */}
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-blue-600 text-white py-3 text-lg font-semibold"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Order
                  </Button>

                  {/* Security Notice */}
                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Lock className="w-4 h-4" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <p>Your payment information is safe and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

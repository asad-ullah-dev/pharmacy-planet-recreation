"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Shield, Truck, Clock, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OzempicDetailPage() {
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
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">Ozempic® (Semaglutide)</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Ozempic Injection Pen"
                  width={400}
                  height={400}
                  className="w-80 h-80 object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <Image
                      src={`/placeholder.svg?height=100&width=100`}
                      alt={`Ozempic view ${i}`}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ozempic® (Semaglutide)</h1>
                <p className="text-gray-600">Once-weekly injectable medication for type 2 diabetes</p>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className="bg-green-100 text-green-800">FDA Approved</Badge>
                  <Badge variant="outline">Weekly Injection</Badge>
                  <Badge variant="outline">Prescription Required</Badge>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">4.8/5 (1,247 reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">$299</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Price includes medical consultation, prescription, and monthly supply
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Helps lower blood sugar levels in adults with type 2 diabetes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      May help with weight management when combined with diet and exercise
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Once-weekly injection for convenient dosing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Proven to reduce risk of major cardiovascular events</span>
                  </li>
                </ul>
              </div>

              {/* Buy Now Button */}
              <div className="space-y-4">
                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-blue-600 text-white py-4 text-lg font-semibold">
                    Buy Now - $299/month
                  </Button>
                </Link>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>2-3 Day Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* How It Works */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How Ozempic Works</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Ozempic contains semaglutide, which belongs to a class of medications called GLP-1 receptor
                    agonists. It works by:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Stimulating insulin release when blood sugar levels are high</li>
                    <li>• Slowing gastric emptying to help you feel full longer</li>
                    <li>• Reducing glucagon production by the liver</li>
                    <li>• Supporting weight management through appetite regulation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Important Safety Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Safety Information</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Warning:</strong> Ozempic may cause thyroid tumors, including cancer. Tell your healthcare
                    provider if you have a lump or swelling in your neck, hoarseness, trouble swallowing, or shortness
                    of breath.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Common side effects include nausea, vomiting, diarrhea, stomach pain, and constipation. Most people
                    experience fewer side effects over time.
                  </p>
                  <p className="text-gray-700 text-sm">
                    This medication is not recommended for people with type 1 diabetes or diabetic ketoacidosis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/products">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

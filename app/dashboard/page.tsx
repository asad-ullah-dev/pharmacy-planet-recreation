"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, X, ShoppingCart, Mail, MessageCircle, Star, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const dashboardItems = [
    {
      title: "Manage Account Details",
      icon: User,
      href: "/dashboard/account",
      description: "Update your personal information",
    },
    {
      title: "Manage Address Details",
      icon: MapPin,
      href: "/dashboard/address",
      description: "Update your delivery address",
    },
    {
      title: "Delete Account",
      icon: X,
      href: "/dashboard/delete-account",
      description: "Permanently delete your account",
      variant: "destructive" as const,
    },
    {
      title: "My Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      description: "View your order history",
    },
    {
      title: "Newsletter Subscriptions",
      icon: Mail,
      href: "/dashboard/newsletter",
      description: "Manage email preferences",
    },
    {
      title: "Order Query",
      icon: MessageCircle,
      href: "/dashboard/support",
      description: "Get help with your orders",
    },
  ]

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
              {/* Trustpilot Reviews */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  2,354 reviews on Trustpilot
                </Badge>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-teal-500 text-white text-xs">
                    1
                  </Badge>
                </Button>
              </div>

              {/* My Account Button */}
              <Link href="/">
                <Button className="bg-primary hover:bg-blue-600 text-white">HOME</Button>
              </Link>

              {/* Logout */}
              <Link href="/auth/login">
                <Button variant="outline" className="text-teal-600 border-teal-500 hover:bg-teal-50">
                  LOGOUT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* User Welcome Section */}
        <div className="flex items-center justify-between mb-8 gap-2">
          <div className="flex items-center sm:space-x-4 space-x-2">
            <div>
              <div className="sm:w-16 w-12 sm:h-16 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="sm:w-8 w-7 sm:h-8 h-7 text-gray-600" />
            </div>
            </div>
            <div>
              <h1 className="sm:text-2xl text-xl font-bold text-gray-900">Welcome, John Doe</h1>
              <Link href="/auth/login" className="text-sm text-teal-600 hover:underline">
                Log out
              </Link>
            </div>
          </div>

          {/* Mascot Character */}
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="text-4xl">🩺</div>
            </div>
          </div>

          {/* Start Consultation Button */}
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white sm:text-lg text-sm sm:px-8 px-2 sm:py-3 py-2 font-semibold"
            style={{ backgroundColor: "#14b8a6" }}
          >
            START MY CONSULTATION
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.variant === "destructive" ? "bg-red-100 text-red-600" : "bg-teal-100 text-teal-600"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${
                          item.variant === "destructive" ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order #12345 delivered</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Consultation completed</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
              <Badge className="bg-teal-100 text-teal-800">Reviewed</Badge>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

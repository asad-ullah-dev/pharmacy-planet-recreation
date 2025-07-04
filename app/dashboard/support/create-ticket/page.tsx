"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, MapPin, MessageCircle, ShoppingCart, Mail, X, Star, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function CreateTicketPage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    attachment: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Ticket submitted:", formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, attachment: file })
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
        <div className="grid lg:grid-cols-12 gap-8">
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
                    className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary"
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
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create Ticket</h1>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Create New Ticket</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 min-h-[200px]"
                      required
                    />
                  </div>

                  {/* Attachments */}
                  <div>
                    <Label htmlFor="attachment">Attachments</Label>
                    <input
                      id="attachment"
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="text-white px-8"
                      style={{ backgroundColor: "#14b8a6" }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#0f766e")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#14b8a6")}
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="mt-8 bg-gray-800 text-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Have a question?</h3>
              <p className="text-gray-300 mb-6">Get in touch</p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">CALL US</Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">EMAIL US</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

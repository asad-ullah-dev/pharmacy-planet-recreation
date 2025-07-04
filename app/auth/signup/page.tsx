"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Star, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    phoneNumber: "",
    gender: "",
    streetAddress: "",
    county: "",
    city: "",
    country: "United Kingdom",
    zipCode: "",
    ethnicGroup: "",
    email: "",
    password: "",
    agreeTerms: false,
    subscribeNewsletter: false,
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

  const ethnicGroups = [
    "Please Select",
    "White British",
    "White Irish",
    "White Other",
    "Mixed White and Black Caribbean",
    "Mixed White and Black African",
    "Mixed White and Asian",
    "Mixed Other",
    "Asian or Asian British Indian",
    "Asian or Asian British Pakistani",
    "Asian or Asian British Bangladeshi",
    "Asian or Asian British Other",
    "Black or Black British Caribbean",
    "Black or Black British African",
    "Black or Black British Other",
    "Chinese",
    "Other Ethnic Group",
    "Prefer not to say",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-sm">
        New Patients - Get 10% Off Your First Consultation with Code: NEW10 at Checkout
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex sm:flex-row flex-col items-center justify-between">
            <Link href="/" className="flex items-center sm:mr-8">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <div className="sm:flex grid grid-cols-2 items-center md:space-x-4 space-x-2 space-y-2">
              <div className="flex items-center space-x-2 max-sm:w-full">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <span className="text-sm text-gray-600">2,303 reviews on Trustpilot</span>
              </div>
              <div>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1 max-sm:w-full">View all Treatments</Button>
              </div>
              <div>
                <Button className="bg-primary hover:bg-blue-600 text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1 max-sm:w-full">Medical Center</Button>
              </div>
             <div>
               <Button variant="outline" className="bg-white text-primary border-primary md:text-sm text-xs md:px-4 px-2 md:py-2 py-1 max-sm:w-full">
                Login/Sign Up
              </Button>
             </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src="/images/ozempo-logo.png"
                  alt="Ozempo"
                  width={200}
                  height={53}
                  className="h-14 w-auto mx-auto cursor-pointer"
                />
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
            <p className="text-gray-600">
              Already registered?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Login Here
              </Link>
            </p>
            <p className="text-sm text-gray-500 mt-2">Create an account and make your checkout fast and easy</p>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8 space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
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

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Date of Birth</Label>
                        <div className="flex sm:gap-2 gap-1 mt-1">
                          <select
                            className="sm:px-3 px-1.5 py-2 border border-gray-300 rounded-md flex-1"
                            value={formData.dobDay}
                            onChange={(e) => setFormData({ ...formData, dobDay: e.target.value })}
                          >
                            <option value="">DD</option>
                            {Array.from({ length: 31 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {String(i + 1).padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <select
                            className="sm:px-3 px-1.5 border border-gray-300 rounded-md flex-1"
                            value={formData.dobMonth}
                            onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })}
                          >
                            <option value="">MM</option>
                            {months.map((month, index) => (
                              <option key={index + 1} value={index + 1}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            className="sm:px-3 px-1.5 border border-gray-300 rounded-md flex-1"
                            value={formData.dobYear}
                            onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })}
                          >
                            <option value="">YYYY</option>
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
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Gender</Label>
                      <div className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-primary"
                          />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-primary"
                          />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                    <div className="mb-4">
                      <Label htmlFor="streetAddress">Street Address</Label>
                      <Textarea
                        id="streetAddress"
                        value={formData.streetAddress}
                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="county">County</Label>
                        <select
                          id="county"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                          value={formData.county}
                          onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                        >
                          <option value="">Please select a region, state or province...</option>
                          <option value="london">London</option>
                          <option value="manchester">Manchester</option>
                          <option value="birmingham">Birmingham</option>
                          <option value="liverpool">Liverpool</option>
                          <option value="leeds">Leeds</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Ireland">Ireland</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ethnicity Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ethnicity Information</h3>
                    <div>
                      <Label htmlFor="ethnicGroup">What is your ethnic group?</Label>
                      <select
                        id="ethnicGroup"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                        value={formData.ethnicGroup}
                        onChange={(e) => setFormData({ ...formData, ethnicGroup: e.target.value })}
                      >
                        {ethnicGroups.map((group, index) => (
                          <option key={index} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sign-in Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign-in Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        By ticking this box you confirm you have read, understood and accept our{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, subscribeNewsletter: checked as boolean })
                        }
                      />
                      <Label htmlFor="subscribeNewsletter" className="text-sm">
                        Keep me informed of new products and promotions.
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg">
                    Create an Account
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Prescription medicines delivered to your door.</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm">Online assessment</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm">No hidden fees</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-100 p-3 rounded text-center">
                      <div className="text-xs font-medium">NHS approved</div>
                      <div className="text-xs text-gray-600">medicines</div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded text-center">
                      <div className="text-xs font-medium">Registered</div>
                      <div className="text-xs text-gray-600">Pharmacy</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">Trustpilot</span>
                  </div>
                  <div className="text-xs text-gray-600">4.4 of 5 | 2,303 reviews</div>
                </CardContent>
              </Card>

              {/* Weight Loss Focus */}
              <div className="text-center">
                <Image
                  src="/images/weight-loss-slogan.png"
                  alt="Weight Loss Made Simple - Ozempo"
                  width={250}
                  height={83}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/images/ozempo-logo.png"
                  alt="Ozempo"
                  width={120}
                  height={32}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for online medical consultations and healthcare solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/treatments" className="text-gray-400 hover:text-white">
                    Treatments
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+44 20 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@ozempo.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>London, UK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Logos Section */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
              <div className="bg-white p-3 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Novo Nordisk"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=80"
                  alt="Lilly"
                  width={80}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=100"
                  alt="Verified Website"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Registered Pharmacy"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>&copy; 2024 Ozempo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

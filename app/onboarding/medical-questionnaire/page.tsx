"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import WithAuth from "@/components/auth/WithAuth"
import Footer from "@/components/footer/Footer"

export default function MedicalQuestionnairePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    clinicalChanges: "",
    sideEffects: "",
    additionalInfo: "",
    acknowledgment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <WithAuth requiredRole="user" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <Link href="/dashboard">
              <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white border-red-500">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">A new way of losing weight</h1>
          </div>

          {/* Form Card */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Height Field */}
                <div>
                  <Label htmlFor="height" className="text-sm font-medium text-gray-700 mb-2 block">
                    Please enter your Height *
                  </Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="e.g., 5'8&quot; or 173cm"
                    className="w-full"
                    required
                  />
                </div>

                {/* Weight Field */}
                <div>
                  <Label htmlFor="weight" className="text-sm font-medium text-gray-700 mb-2 block">
                    Please enter your weight *
                  </Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 150 lbs or 68 kg"
                    className="w-full"
                    required
                  />
                </div>

                {/* Clinical Changes Question */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Has there been any significant changes in your clinical circumstances since you have commenced
                    treatment? *
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="clinicalChanges"
                        value="yes"
                        checked={formData.clinicalChanges === "yes"}
                        onChange={(e) => setFormData({ ...formData, clinicalChanges: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.clinicalChanges === "yes"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Yes
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="clinicalChanges"
                        value="no"
                        checked={formData.clinicalChanges === "no"}
                        onChange={(e) => setFormData({ ...formData, clinicalChanges: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.clinicalChanges === "no"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        No
                      </div>
                    </label>
                  </div>
                </div>

                {/* Side Effects Question */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Are you suffering any side effects from your medicine that are affecting your treatment? *
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="sideEffects"
                        value="yes"
                        checked={formData.sideEffects === "yes"}
                        onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.sideEffects === "yes"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Yes
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="sideEffects"
                        value="no"
                        checked={formData.sideEffects === "no"}
                        onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.sideEffects === "no"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        No
                      </div>
                    </label>
                  </div>
                </div>

                {/* Additional Information Question */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Is there anything else you would like us to know? *
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="additionalInfo"
                        value="yes"
                        checked={formData.additionalInfo === "yes"}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.additionalInfo === "yes"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Yes
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="additionalInfo"
                        value="no"
                        checked={formData.additionalInfo === "no"}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <div
                        className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                          formData.additionalInfo === "no"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        No
                      </div>
                    </label>
                  </div>
                </div>

                {/* Declarations */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="space-y-3 text-sm text-gray-700 mb-6">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You are ordering the medication for yourself.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You have answered the questions truthfully.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Before taking the medicine, you will read the enclosed patient information leaflet and follow
                        the guidance issued by the manufacturer.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        You will contact your GP/Doctor if you suffer from any unwanted side effects or if your
                        condition is deteriorating.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        You give permission for Ozempo to access your summary care records, if clinically necessary for
                        patient safety.
                      </span>
                    </li>
                  </ul>

                  {/* Acknowledgment */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      I acknowledge and agree to all the above statements *
                    </Label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="acknowledgment"
                          value="yes"
                          checked={formData.acknowledgment === "yes"}
                          onChange={(e) => setFormData({ ...formData, acknowledgment: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.acknowledgment === "yes"
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          I Agree
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="acknowledgment"
                          value="no"
                          checked={formData.acknowledgment === "no"}
                          onChange={(e) => setFormData({ ...formData, acknowledgment: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`w-full text-center py-3 px-4 rounded-lg border-2 transition-all ${
                            formData.acknowledgment === "no"
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          I Disagree
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white py-3 text-lg">
                    Continue to Dashboard
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
    </WithAuth>
  )
}

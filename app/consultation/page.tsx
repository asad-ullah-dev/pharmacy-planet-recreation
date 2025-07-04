"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ConsultationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hasType2Diabetes: "",
    a1cLevel: "",
    currentDiabetesMeds: "",
    diabetesMedsList: "",
    previousGLP1: "",
    thyroidHistory: "",
    pancreatitisHistory: "",
    kidneyLiverDisease: "",
    giConditions: "",
    pregnancyStatus: "",
    allergies: "",
    allergiesList: "",
    height: "",
    weight: "",
    alcoholConsumption: "",
    alcoholDetails: "",
    currentMedications: "",
    comfortableWithInjection: "",
    understandsRisks: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Navigate to products page
    router.push("/products")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center mr-8">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Consultation Questionnaire</h1>
            <p className="text-gray-600">
              Please answer all questions accurately to help our medical team provide the best care for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Question 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you have type 2 diabetes?</CardTitle>
                <p className="text-sm text-gray-600">(Ozempic is only approved for type 2 diabetes, not type 1.)</p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.hasType2Diabetes}
                  onValueChange={(value) => handleInputChange("hasType2Diabetes", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="diabetes-yes" />
                    <Label htmlFor="diabetes-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="diabetes-no" />
                    <Label htmlFor="diabetes-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is your most recent A1C (if known)?</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter your A1C level (e.g., 7.2%)"
                  value={formData.a1cLevel}
                  onChange={(e) => handleInputChange("a1cLevel", e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Question 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are you currently taking any diabetes medications?</CardTitle>
                <p className="text-sm text-gray-600">Please list all diabetes-related medications.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.currentDiabetesMeds}
                  onValueChange={(value) => handleInputChange("currentDiabetesMeds", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="meds-yes" />
                    <Label htmlFor="meds-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="meds-no" />
                    <Label htmlFor="meds-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.currentDiabetesMeds === "yes" && (
                  <Textarea
                    placeholder="Please list all diabetes medications you are currently taking"
                    value={formData.diabetesMedsList}
                    onChange={(e) => handleInputChange("diabetesMedsList", e.target.value)}
                  />
                )}
              </CardContent>
            </Card>

            {/* Question 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Have you ever taken Ozempic or another GLP-1 medication?</CardTitle>
                <p className="text-sm text-gray-600">(e.g., Wegovy, Mounjaro, Trulicity)</p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.previousGLP1}
                  onValueChange={(value) => handleInputChange("previousGLP1", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="glp1-yes" />
                    <Label htmlFor="glp1-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="glp1-no" />
                    <Label htmlFor="glp1-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you have a personal or family history of medullary thyroid carcinoma (MTC) or multiple endocrine
                  neoplasia syndrome type 2 (MEN 2)?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.thyroidHistory}
                  onValueChange={(value) => handleInputChange("thyroidHistory", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="thyroid-yes" />
                    <Label htmlFor="thyroid-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="thyroid-no" />
                    <Label htmlFor="thyroid-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you have a history of pancreatitis?</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.pancreatitisHistory}
                  onValueChange={(value) => handleInputChange("pancreatitisHistory", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pancreatitis-yes" />
                    <Label htmlFor="pancreatitis-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pancreatitis-no" />
                    <Label htmlFor="pancreatitis-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 7 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you currently have any kidney or liver disease?</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.kidneyLiverDisease}
                  onValueChange={(value) => handleInputChange("kidneyLiverDisease", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="kidney-liver-yes" />
                    <Label htmlFor="kidney-liver-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="kidney-liver-no" />
                    <Label htmlFor="kidney-liver-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 8 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you have any gastrointestinal conditions?</CardTitle>
                <p className="text-sm text-gray-600">Such as gastroparesis (slow stomach emptying)</p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.giConditions}
                  onValueChange={(value) => handleInputChange("giConditions", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="gi-yes" />
                    <Label htmlFor="gi-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="gi-no" />
                    <Label htmlFor="gi-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Are you pregnant, trying to become pregnant, or breastfeeding?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.pregnancyStatus}
                  onValueChange={(value) => handleInputChange("pregnancyStatus", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pregnancy-yes" />
                    <Label htmlFor="pregnancy-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pregnancy-no" />
                    <Label htmlFor="pregnancy-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="na" id="pregnancy-na" />
                    <Label htmlFor="pregnancy-na">Not applicable</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 10 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you have any allergies to medications?</CardTitle>
                <p className="text-sm text-gray-600">If yes, please specify.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={formData.allergies} onValueChange={(value) => handleInputChange("allergies", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="allergies-yes" />
                    <Label htmlFor="allergies-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="allergies-no" />
                    <Label htmlFor="allergies-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.allergies === "yes" && (
                  <Textarea
                    placeholder="Please specify your medication allergies"
                    value={formData.allergiesList}
                    onChange={(e) => handleInputChange("allergiesList", e.target.value)}
                  />
                )}
              </CardContent>
            </Card>

            {/* Question 11 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is your height and current weight?</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    placeholder="e.g., 5'8&quot; or 173 cm"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    placeholder="e.g., 180 lbs or 82 kg"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Question 12 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you consume alcohol?</CardTitle>
                <p className="text-sm text-gray-600">If yes, how frequently and how much?</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.alcoholConsumption}
                  onValueChange={(value) => handleInputChange("alcoholConsumption", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcohol-yes" />
                    <Label htmlFor="alcohol-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcohol-no" />
                    <Label htmlFor="alcohol-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.alcoholConsumption === "yes" && (
                  <Textarea
                    placeholder="Please describe your alcohol consumption (frequency and amount)"
                    value={formData.alcoholDetails}
                    onChange={(e) => handleInputChange("alcoholDetails", e.target.value)}
                  />
                )}
              </CardContent>
            </Card>

            {/* Question 13 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  List all prescription medications, over-the-counter drugs, and supplements you are currently taking.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Please list all medications and supplements, including dosages if known"
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Question 14 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Are you comfortable using a once-weekly injectable medication?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.comfortableWithInjection}
                  onValueChange={(value) => handleInputChange("comfortableWithInjection", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="injection-yes" />
                    <Label htmlFor="injection-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="injection-no" />
                    <Label htmlFor="injection-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Question 15 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you understand the risks and side effects associated with Ozempic?
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Including gastrointestinal symptoms and potential thyroid tumors
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.understandsRisks}
                  onValueChange={(value) => handleInputChange("understandsRisks", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="risks-yes" />
                    <Label htmlFor="risks-yes">Yes, I understand the risks and side effects</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="risks-no" />
                    <Label htmlFor="risks-no">No, I need more information</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button type="submit" className="bg-primary hover:bg-blue-600 text-white px-12 py-3 text-lg">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

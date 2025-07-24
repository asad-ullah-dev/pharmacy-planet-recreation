"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  pharmacyToasts,
  showLoadingToast,
  dismissToast,
} from "@/lib/toast-config";
import { ConsultationFormData } from "@/lib/types";
import {
  submitMedicalConsultation,
  MedicalConsultation,
} from "@/lib/api/consultationService";
import { toast } from "sonner";
import WithAuth from "@/components/auth/WithAuth";

export default function ConsultationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ConsultationFormData>({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof ConsultationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Transform form data to API format
  const transformFormDataToAPI = (): MedicalConsultation => {
    return {
      has_type2_diabetes: formData.hasType2Diabetes === "yes",
      recent_a1c:
        formData.a1cLevel === "dont-know" ? undefined : formData.a1cLevel,
      taking_diabetes_medication: formData.currentDiabetesMeds === "yes",
      diabetes_medication_details:
        formData.currentDiabetesMeds === "yes"
          ? formData.diabetesMedsList
          : undefined,
      taken_ozempic_or_glp1: formData.previousGLP1 === "yes",
      has_family_history_mtc_men2: formData.thyroidHistory === "yes", // Mapping thyroid history to MTC/MEN2
      has_pancreatitis: formData.pancreatitisHistory === "yes",
      has_kidney_or_liver_disease: formData.kidneyLiverDisease === "yes",
      has_gastrointestinal_conditions: formData.giConditions === "yes",
      is_pregnant_or_breastfeeding: formData.pregnancyStatus === "yes",
      has_medication_allergies: formData.allergies === "yes",
      medication_allergies_details:
        formData.allergies === "yes" ? formData.allergiesList : undefined,
      height: formData.height || undefined,
      weight: formData.weight || undefined,
      consumes_alcohol: formData.alcoholConsumption === "yes",
      alcohol_consumption_details:
        formData.alcoholConsumption === "yes"
          ? formData.alcoholDetails
          : undefined,
      current_medications: formData.currentMedications || undefined,
      comfortable_with_injectable: formData.comfortableWithInjection === "yes",
      understands_ozempic_risks: formData.understandsRisks === "yes",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.hasType2Diabetes || !formData.understandsRisks) {
      toast.error("Please answer all required questions");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = showLoadingToast("Submitting your consultation...");

    try {
      const consultationData = transformFormDataToAPI();
      const response = await submitMedicalConsultation(consultationData);

      dismissToast(loadingToast);
      toast.success(response.message || "Consultation submitted successfully!");

      router.push("/products");
    } catch (error: any) {
      dismissToast(loadingToast);

      if (error?.response?.status === 403) {
        const errorMessage = error?.response?.data?.message || "Access denied";
        toast.error(errorMessage);
      } else if (error?.response?.status !== 422) {
        toast.error("Failed to submit consultation. Please try again.");
      }
      console.error("Consultation submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WithAuth requiredRole="user" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center lg:space-x-8 space-x-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/ozempo-logo.png"
                    alt="Ozempo"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <div className="hidden md:block">
                  <span className="lg:text-sm text-xs font-medium text-gray-600">
                    WEIGHT LOSS CLINIC
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Medical Consultation Questionnaire
              </h1>
              <p className="text-gray-600">
                Please answer all questions accurately to help our medical team
                provide the best care for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Do you have type 2 diabetes?
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    (Ozempic is only approved for type 2 diabetes, not type 1.)
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.hasType2Diabetes}
                    onValueChange={(value) =>
                      handleInputChange("hasType2Diabetes", value)
                    }
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
                  <CardTitle className="text-lg">
                    What is your current A1C level?
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    (If you don't know, please select "Don't know")
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.a1cLevel}
                    onValueChange={(value) =>
                      handleInputChange("a1cLevel", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="below-6.5" id="a1c-below" />
                      <Label htmlFor="a1c-below">Below 6.5%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6.5-7.5" id="a1c-6.5-7.5" />
                      <Label htmlFor="a1c-6.5-7.5">6.5% - 7.5%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="above-7.5" id="a1c-above" />
                      <Label htmlFor="a1c-above">Above 7.5%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dont-know" id="a1c-dont-know" />
                      <Label htmlFor="a1c-dont-know">Don't know</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Question 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Are you currently taking diabetes medications?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.currentDiabetesMeds}
                    onValueChange={(value) =>
                      handleInputChange("currentDiabetesMeds", value)
                    }
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
                    <div className="mt-4">
                      <Label htmlFor="diabetesMedsList">
                        Please list your current diabetes medications:
                      </Label>
                      <Textarea
                        id="diabetesMedsList"
                        value={formData.diabetesMedsList}
                        onChange={(e) =>
                          handleInputChange("diabetesMedsList", e.target.value)
                        }
                        placeholder="e.g., Metformin, Glipizide, etc."
                        className="mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Question 4 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Have you previously taken GLP-1 medications?
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    (Such as Ozempic, Wegovy, Saxenda, etc.)
                  </p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.previousGLP1}
                    onValueChange={(value) =>
                      handleInputChange("previousGLP1", value)
                    }
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

              {/* Medical History Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical History</CardTitle>
                  <p className="text-sm text-gray-600">
                    Please answer the following questions about your medical
                    history:
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      Do you have a history of thyroid problems?
                    </Label>
                    <RadioGroup
                      value={formData.thyroidHistory}
                      onValueChange={(value) =>
                        handleInputChange("thyroidHistory", value)
                      }
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
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Do you have a history of pancreatitis?
                    </Label>
                    <RadioGroup
                      value={formData.pancreatitisHistory}
                      onValueChange={(value) =>
                        handleInputChange("pancreatitisHistory", value)
                      }
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
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Do you have kidney or liver disease?
                    </Label>
                    <RadioGroup
                      value={formData.kidneyLiverDisease}
                      onValueChange={(value) =>
                        handleInputChange("kidneyLiverDisease", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="kidney-yes" />
                        <Label htmlFor="kidney-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="kidney-no" />
                        <Label htmlFor="kidney-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Do you have any gastrointestinal conditions?
                    </Label>
                    <RadioGroup
                      value={formData.giConditions}
                      onValueChange={(value) =>
                        handleInputChange("giConditions", value)
                      }
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
                  </div>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      Are you currently pregnant or planning to become pregnant?
                    </Label>
                    <RadioGroup
                      value={formData.pregnancyStatus}
                      onValueChange={(value) =>
                        handleInputChange("pregnancyStatus", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="pregnancy-yes" />
                        <Label htmlFor="pregnancy-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="pregnancy-no" />
                        <Label htmlFor="pregnancy-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Do you have any allergies to medications?
                    </Label>
                    <RadioGroup
                      value={formData.allergies}
                      onValueChange={(value) =>
                        handleInputChange("allergies", value)
                      }
                    >
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
                      <div className="mt-4">
                        <Label htmlFor="allergiesList">
                          Please list your medication allergies:
                        </Label>
                        <Textarea
                          id="allergiesList"
                          value={formData.allergiesList}
                          onChange={(e) =>
                            handleInputChange("allergiesList", e.target.value)
                          }
                          placeholder="e.g., Penicillin, Sulfa drugs, etc."
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Measurements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Current Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={formData.height}
                        onChange={(e) =>
                          handleInputChange("height", e.target.value)
                        }
                        placeholder="e.g., 5'8&quot; or 173cm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) =>
                          handleInputChange("weight", e.target.value)
                        }
                        placeholder="e.g., 150 lbs or 68 kg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lifestyle Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Lifestyle Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      Do you consume alcohol?
                    </Label>
                    <RadioGroup
                      value={formData.alcoholConsumption}
                      onValueChange={(value) =>
                        handleInputChange("alcoholConsumption", value)
                      }
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
                      <div className="mt-4">
                        <Label htmlFor="alcoholDetails">
                          Please describe your alcohol consumption:
                        </Label>
                        <Textarea
                          id="alcoholDetails"
                          value={formData.alcoholDetails}
                          onChange={(e) =>
                            handleInputChange("alcoholDetails", e.target.value)
                          }
                          placeholder="e.g., 2-3 drinks per week"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="currentMedications">
                      List any other current medications (including
                      supplements):
                    </Label>
                    <Textarea
                      id="currentMedications"
                      value={formData.currentMedications}
                      onChange={(e) =>
                        handleInputChange("currentMedications", e.target.value)
                      }
                      placeholder="e.g., Blood pressure medication, vitamins, etc."
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Comfort and Understanding */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Comfort and Understanding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      Are you comfortable with self-injection?
                    </Label>
                    <RadioGroup
                      value={formData.comfortableWithInjection}
                      onValueChange={(value) =>
                        handleInputChange("comfortableWithInjection", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="injection-yes" />
                        <Label htmlFor="injection-yes">
                          Yes, I am comfortable with self-injection
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="injection-no" />
                        <Label htmlFor="injection-no">
                          No, I would need training or assistance
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      Do you understand the risks and side effects associated
                      with Ozempic?
                    </Label>
                    <p className="text-sm text-gray-600 mb-4">
                      Including gastrointestinal symptoms and potential thyroid
                      tumors
                    </p>
                    <RadioGroup
                      value={formData.understandsRisks}
                      onValueChange={(value) =>
                        handleInputChange("understandsRisks", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="risks-yes" />
                        <Label htmlFor="risks-yes">
                          Yes, I understand the risks and side effects
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="risks-no" />
                        <Label htmlFor="risks-no">
                          No, I need more information
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-600 text-white px-12 py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </WithAuth>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/lib/validation/auth";
import { register as registerUser } from "@/lib/api/authService";
import {
  pharmacyToasts,
  showLoadingToast,
  dismissToast,
} from "@/lib/toast-config";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

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
  ];

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
  ];

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    console.log("Form errors:", errors);

    setIsLoading(true);
    const loadingToast = showLoadingToast("Creating your account...");

    const formattedPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: `${data.dobYear}-${data.dobMonth.padStart(
        2,
        "0"
      )}-${data.dobDay.padStart(2, "0")}`,
      phone_number: data.phoneNumber,
      gender: data.gender,
      street_address: data.streetAddress,
      county: data.county,
      city: data.city,
      country: data.country,
      zip_postal_code: data.zipCode,
      ethnicity: data.ethnicGroup,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    };

    console.log("Formatted payload:", formattedPayload);

    try {
      const response = await registerUser(formattedPayload);
      dismissToast(loadingToast);
      pharmacyToasts.registerSuccess();
      router.push("/auth/login");
    } catch (error: any) {
      dismissToast(loadingToast);
      if (error?.response?.status !== 422) {
        pharmacyToasts.registerError();
      }

      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="container mx-auto px-4 py-8">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create an Account
              </h1>
              <p className="text-gray-600">
                Already registered?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login Here
                </Link>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Create an account and make your checkout fast and easy
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6 mt-4"
                    >
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            {...register("firstName")}
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            {...register("lastName")}
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div className="grid md:grid-cols-12 gap-4 mb-4">
                        <div className="md:col-span-7">
                          <Label htmlFor="dobDay">Date of Birth</Label>
                          <div className="flex sm:gap-2 gap-1 mt-1">
                            <Input
                              id="dobDay"
                              {...register("dobDay")}
                              placeholder="DD"
                              className={
                                errors.dobDay
                                  ? "border-red-500"
                                  : "placeholder:text-black"
                              }
                            />
                            {errors.dobDay && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.dobDay.message}
                              </p>
                            )}
                            <select
                              {...register("dobMonth")}
                              className={`w-full px-3 py-2 border rounded-md ${
                                errors.dobMonth
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option value="">MM</option>
                              {months.map((month, index) => (
                                <option
                                  key={month}
                                  value={String(index + 1).padStart(2, "0")}
                                >
                                  {month}
                                </option>
                              ))}
                            </select>
                            {errors.dobMonth && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.dobMonth.message}
                              </p>
                            )}
                            <Input
                              id="dobYear"
                              {...register("dobYear")}
                              placeholder="YYYY"
                              className={
                                errors.dobYear
                                  ? "border-red-500"
                                  : "placeholder:text-black"
                              }
                            />
                            {errors.dobYear && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.dobYear.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-5">
                          <Label htmlFor="phoneNumber">Phone Number *</Label>
                          <Input
                            id="phoneNumber"
                            {...register("phoneNumber")}
                            className={
                              errors.phoneNumber ? "border-red-500" : "mt-1"
                            }
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <select
                          {...register("gender")}
                          className={`w-full px-3 py-2 mt-1 border rounded-md ${
                            errors.gender ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <Label htmlFor="streetAddress">Street Address *</Label>
                        <Textarea
                          id="streetAddress"
                          {...register("streetAddress")}
                          className={
                            errors.streetAddress ? "border-red-500" : "mt-1"
                          }
                          rows={3}
                        />
                        {errors.streetAddress && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.streetAddress.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="county">Country *</Label>
                          <Input
                            id="county"
                            {...register("county")}
                            className={
                              errors.county ? "border-red-500" : "mt-1"
                            }
                          />
                          {errors.county && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.county.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            {...register("city")}
                            className={errors.city ? "border-red-500" : "mt-1"}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                          <Input
                            id="zipCode"
                            {...register("zipCode")}
                            className={
                              errors.zipCode ? "border-red-500" : "mt-1"
                            }
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zipCode.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="ethnicGroup">Ethnic Group *</Label>
                          <select
                            {...register("ethnicGroup")}
                            className={`w-full px-3 py-2 border rounded-md mt-1 ${
                              errors.ethnicGroup
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {ethnicGroups.map((group) => (
                              <option key={group} value={group}>
                                {group}
                              </option>
                            ))}
                          </select>
                          {errors.ethnicGroup && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.ethnicGroup.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Ethnicity Information
                        </h3>
                        <div>
                          <Label htmlFor="ethnicGroup">
                            What is your ethnic group?
                          </Label>
                          <select
                            id="ethnicGroup"
                            {...register("ethnicGroup")}
                            className={`w-full px-3 py-2 border rounded-md mt-1 ${
                              errors.ethnicGroup
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select your ethnic group</option>
                            {ethnicGroups.map((group) => (
                              <option key={group} value={group}>
                                {group}
                              </option>
                            ))}
                          </select>
                          {errors.ethnicGroup && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.ethnicGroup.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Sign-in Information
                      </h3>
                      {/* Account Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className={errors.email ? "border-red-500" : "mt-1"}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              {...register("password")}
                              className={`pr-10 ${
                                errors.password ? "border-red-500" : "mt-1"
                              }`}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Terms and Newsletter */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            {...register("agreeTerms", {
                              setValueAs: (value) =>
                                value === "on" || value === true,
                            })}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm">
                            By ticking this box you confirm you have read,
                            understood and accept our{" "}
                            <Link
                              href="/terms-conditions"
                              className="text-primary hover:underline"
                            >
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        {errors.agreeTerms && (
                          <p className="text-red-500 text-sm">
                            {errors.agreeTerms.message}
                          </p>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="subscribeNewsletter"
                            {...register("subscribeNewsletter")}
                          />
                          <Label
                            htmlFor="subscribeNewsletter"
                            className="text-sm"
                          >
                            Keep me informed of new products and promotions.
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg"
                        disabled={isLoading}
                        style={{ backgroundColor: "#14b8a6" }}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Sidebar with slogan */}
                <div className="mt-8 text-center">
                  <Image
                    src="/images/weight-loss-slogan.png"
                    alt="Weight Loss Made Simple"
                    width={300}
                    height={100}
                    className="mx-auto h-16 w-auto"
                  />
                </div>
              </div>
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trust Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      Prescription medicines delivered to your door.
                    </CardTitle>
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
                    <div className="text-xs text-gray-600">
                      4.4 of 5 | 2,303 reviews
                    </div>
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
        </div>
      </div>
    </>
  );
}

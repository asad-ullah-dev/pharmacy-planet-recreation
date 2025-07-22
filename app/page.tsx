"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  UserCheck,
  Building2,
  Package,
  Lock,
  EyeOff,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/utils/auth";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-sm">
        New Patients - Get 10% Off Your First Consultation with Code: NEW10 at
        Checkout
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex sm:flex-row flex-col items-center justify-between sm:gap-0 gap-3">
            <Link href="/" className="flex items-center sm:mr-8">
              <Image
                src="/images/ozempo-logo.png"
                alt="Ozempo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center xl:space-x-8 space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/treatments"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Treatments
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="grid sm:grid-cols-4 grid-cols-2 items-center md:space-x-4 space-x-2 space-y-2">
              <div className="flex items-center md:space-x-2 space-x-1 w-full">
                <div className="flex items-center">
                  <Star className="md:w-4 w-3 md:h-4 h-3 text-yellow-400 fill-current" />
                  <span className="md:text-sm trext-xs font-medium ml-1">
                    Excellent
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 md:px-2.5 px-1.5"
                >
                  2,303 reviews
                </Badge>
              </div>
              <div>
                <Link href="/treatments">
                  <Button className="bg-teal-500 w-full hover:bg-teal-600 text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1">
                    View all Treatments
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/consultation">
                  <Button
                    variant="outline"
                    className="bg-primary w-full text-white border-primary hover:bg-blue-600 hover:text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                  >
                    Start Consultation
                  </Button>
                </Link>
              </div>
              <div>
                {!isLoading &&
                  (isLoggedIn ? (
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="bg-white text-primary w-full border-primary hover:bg-primary hover:text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                      >
                        My Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        className="bg-white text-primary w-full border-primary hover:bg-primary hover:text-white md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                      >
                        Login
                      </Button>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Online Medical Consultations Made Simple
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get expert medical advice from qualified doctors. Fast, secure, and
            convenient healthcare from the comfort of your home.
          </p>
        </section>

        {/* How Our Service Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              How Our Service Works
            </h2>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="h-0.5 bg-teal-400"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white border-4 border-teal-400 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <FileText className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-teal-400"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Fill simple medical questionnaire
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white border-4 border-teal-400 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <UserCheck className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-teal-400"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Prescriber reviews and issues prescription
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white border-4 border-teal-400 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <Building2 className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-teal-400"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Pharmacy reviews the order
                </h3>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white border-4 border-teal-400 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <Package className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-teal-400"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-500 mb-2">
                  Medication sent in discreet packaging
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-20 bg-gray-50 rounded-lg p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-16 h-16 text-blue-500" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                Our Team
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                Ozempo only works with UK-based Pharmacists, independent
                prescribers and UK-based customer support staff. All staff work
                as part of a team and undertake bespoke training to deliver care
                online.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-16 h-16 text-blue-500" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-500 mb-6">
                  Our Prescribers
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our{" "}
                  <span className="text-blue-500 font-medium">
                    clinical team
                  </span>{" "}
                  have many years of experience as independent prescribers
                  working for the NHS and private sector. An ambitious and
                  extremely motivated clinical team in the digital sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="mb-20 bg-gray-50 rounded-lg p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">
              Your safety is important to us
            </h2>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              We are a completely secure site. We put in place measures and
              safeguards to ensure all information is safe and secure and only
              seen and used by healthcare professionals involved in providing
              healthcare service to you. All prescriptions are provided by a
              Registered Prescriber. All medication is dispensed by a Registered
              Pharmacy.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-blue-500">
                Registered prescriber
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-blue-500">
                Registered pharmacy
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-blue-500">
                Checkout secure
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <EyeOff className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="text-lg font-semibold text-blue-500">
                Discreet packaging
              </h3>
            </div>
          </div>

          {/* Exclusive Benefits */}
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-500 mb-8 text-center">
              Our exclusive benefits
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="relative">
                    <FileText className="w-16 h-16 text-gray-400" />
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  You can trust medical and pharmacy healthcare professionals to
                  provide you with a confidential service that will ensure your
                  privacy from start to finish.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      We have a commitment to delivering a discreet service
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Understand your need for trust and compliance.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      All orders shipped via a trackable courier
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Shipped only in discreet, plain packaging
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h3>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.4</div>
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">TrustScore</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2,303</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50k+</div>
                <div className="text-sm text-gray-600">Patients Treated</div>
              </div>
            </div>
          </div>
        </section>
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
                Your trusted partner for online medical consultations and
                healthcare solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/treatments"
                    className="text-gray-400 hover:text-white"
                  >
                    Treatments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-gray-400 hover:text-white"
                  >
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
  );
}

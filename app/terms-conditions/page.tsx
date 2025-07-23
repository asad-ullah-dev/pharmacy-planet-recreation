import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center sm:mr-8 mr-1">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/treatments" className="text-gray-700 hover:text-primary transition-colors">
                Treatments
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/auth/register" className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded">
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Ozempo Limited ("we", "us", "our", "Ozempo"). These Terms and Conditions ("Terms") govern
                your use of our website and services. By accessing or using our services, you agree to be bound by these
                Terms.
              </p>
              <p className="text-gray-700 mb-4">
                Ozempo Limited is a company registered in England and Wales with company number [Company Number]. Our
                registered office is at [Address]. We are regulated by the Care Quality Commission (CQC) and work with
                GMC-registered doctors and MHRA-approved pharmacies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Our Services</h2>
              <p className="text-gray-700 mb-4">Ozempo provides:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Online medical consultations with qualified healthcare professionals</li>
                <li>Prescription services through licensed pharmacies</li>
                <li>Medication delivery services</li>
                <li>Health information and support</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Our services are intended for patients aged 18 and over residing in the United Kingdom.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Medical Consultations</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Consultation Process</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You must provide accurate and complete medical information</li>
                <li>Consultations are conducted by GMC-registered healthcare professionals</li>
                <li>We may request additional information or decline treatment if necessary</li>
                <li>Consultation outcomes are not guaranteed</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Limitations</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Our services do not replace emergency medical care</li>
                <li>We cannot treat all medical conditions online</li>
                <li>You remain responsible for your ongoing healthcare</li>
                <li>You should inform your GP about treatments received through Ozempo</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prescriptions and Medications</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Prescription Services</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Prescriptions are issued by qualified prescribers</li>
                <li>All medications are dispensed by MHRA-approved pharmacies</li>
                <li>We reserve the right to refuse prescription requests</li>
                <li>Controlled drugs may require additional verification</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Medication Safety</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You must read all medication information and warnings</li>
                <li>Report any adverse reactions immediately</li>
                <li>Store medications safely and securely</li>
                <li>Do not share medications with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Pricing</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Prices are displayed in GBP and include VAT where applicable</li>
                <li>Payment is required before treatment or prescription issuance</li>
                <li>We accept major credit cards, debit cards, and other specified payment methods</li>
                <li>Prices may change without notice, but you'll pay the price displayed at checkout</li>
                <li>Additional charges may apply for expedited delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Delivery and Returns</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Delivery</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>We deliver to UK addresses only</li>
                <li>Delivery times are estimates and not guaranteed</li>
                <li>You must be available to receive deliveries</li>
                <li>We use discreet packaging for all medications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Returns and Refunds</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Medications cannot be returned once delivered for safety reasons</li>
                <li>Consultation fees are non-refundable once the consultation is complete</li>
                <li>Refunds may be available in exceptional circumstances</li>
                <li>Damaged or incorrect items will be replaced free of charge</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate and truthful information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Keep your account credentials secure</li>
                <li>Not share your account with others</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You must not:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use our services for illegal activities</li>
                <li>Attempt to obtain medications without a valid prescription</li>
                <li>Provide false or misleading medical information</li>
                <li>Interfere with the security or functionality of our website</li>
                <li>Use automated systems to access our services</li>
                <li>Resell or distribute medications obtained through our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                , which forms part of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on our website, including text, graphics, logos, and software, is owned by Ozempo or our
                licensors and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Ozempo's liability is limited as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>We exclude liability for indirect, consequential, or punitive damages</li>
                <li>Our total liability is limited to the amount you paid for the relevant service</li>
                <li>Nothing in these Terms excludes liability for death, personal injury, or fraud</li>
                <li>We do not guarantee that our services will be uninterrupted or error-free</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Ozempo, its officers, directors, employees, and agents from any
                claims, damages, or expenses arising from your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our services at any time, with or without notice, for any
                reason, including violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by English law, and any disputes will be subject to the exclusive jurisdiction
                of the English courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these Terms from time to time. We will notify you of material changes by posting the
                updated Terms on our website and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">If you have any questions about these Terms, please contact us:</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> legal@ozempo.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +44 20 1234 5678
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> Ozempo Limited, 123 Medical Street, London, SW1A 1AA
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
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
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
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

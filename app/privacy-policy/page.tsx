import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer/Footer"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Ozempo Limited ("we", "us", "our") is committed to protecting and respecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                or use our services.
              </p>
              <p className="text-gray-700 mb-4">
                We are registered as a data controller with the Information Commissioner's Office (ICO) under
                registration number [Registration Number]. Our registered office is at [Address].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name, email address, phone number, and postal address</li>
                <li>Date of birth and gender</li>
                <li>Medical information and health records</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Website usage data and cookies</li>
                <li>Location data (if permitted)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>To provide medical consultations and healthcare services</li>
                <li>To process prescriptions and deliver medications</li>
                <li>To communicate with you about your treatment</li>
                <li>To process payments and manage your account</li>
                <li>To improve our services and website functionality</li>
                <li>To comply with legal and regulatory requirements</li>
                <li>To send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">We process your personal data under the following legal bases:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Consent:</strong> For marketing communications and non-essential cookies
                </li>
                <li>
                  <strong>Contract:</strong> To provide our healthcare services and fulfill our obligations
                </li>
                <li>
                  <strong>Legal Obligation:</strong> To comply with healthcare regulations and legal requirements
                </li>
                <li>
                  <strong>Vital Interests:</strong> To protect your health and safety
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> To improve our services and prevent fraud
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Sharing Your Information</h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Healthcare Professionals:</strong> Licensed doctors and pharmacists providing your care
                </li>
                <li>
                  <strong>Pharmacy Partners:</strong> To fulfill prescription orders
                </li>
                <li>
                  <strong>Payment Processors:</strong> To process transactions securely
                </li>
                <li>
                  <strong>Delivery Services:</strong> To deliver medications to you
                </li>
                <li>
                  <strong>Regulatory Bodies:</strong> When required by law (e.g., MHRA, GMC)
                </li>
                <li>
                  <strong>Service Providers:</strong> Third parties who help us operate our business
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure servers and firewalls</li>
                <li>Regular security audits and updates</li>
                <li>Staff training on data protection</li>
                <li>Access controls and authentication measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with
                legal obligations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Medical Records:</strong> 8 years after your last consultation (or longer if required by law)
                </li>
                <li>
                  <strong>Account Information:</strong> Until you request deletion or close your account
                </li>
                <li>
                  <strong>Marketing Data:</strong> Until you withdraw consent
                </li>
                <li>
                  <strong>Financial Records:</strong> 6 years for tax and accounting purposes
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
              <p className="text-gray-700 mb-4">Under UK GDPR, you have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Right of Access:</strong> Request copies of your personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your data (subject to legal requirements)
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Limit how we use your data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Receive your data in a portable format
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to processing based on legitimate interests
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing or cookies
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at privacy@ozempo.com or use our online form.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to improve your experience on our website. For detailed
                information about our use of cookies, please see our{" "}
                <Link href="/cookie-policy" className="text-primary hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your personal data is primarily processed within the UK. If we need to transfer data outside the UK, we
                ensure appropriate safeguards are in place, including adequacy decisions or standard contractual
                clauses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 18. We do not knowingly collect personal information
                from children under 18 without parental consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@ozempo.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +44 20 1234 5678
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> Ozempo Limited, 123 Medical Street, London, SW1A 1AA
                </p>
                <p className="text-gray-700 mt-4">
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at{" "}
                  <a href="https://ico.org.uk" className="text-primary hover:underline">
                    ico.org.uk
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  )
}

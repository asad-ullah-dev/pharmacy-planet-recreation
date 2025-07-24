import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer/Footer"

export default function CookiePolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                They are widely used to make websites work more efficiently and to provide information to website
                owners.
              </p>
              <p className="text-gray-700 mb-4">
                Cookies allow us to recognize your device and store some information about your preferences or past
                actions on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">Ozempo uses cookies to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Ensure our website functions properly</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our website to improve our services</li>
                <li>Provide personalized content and advertisements</li>
                <li>Maintain security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are necessary for our website to function properly. They enable basic functions like page
                navigation, access to secure areas, and form submissions. Our website cannot function properly without
                these cookies.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Examples:</strong> Session management, security tokens, load balancing
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> Session or up to 1 year
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Legal Basis:</strong> Legitimate interest (essential for service provision)
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Performance Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies collect information about how visitors use our website, such as which pages are visited
                most often and if users get error messages. This helps us improve our website's performance.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Examples:</strong> Google Analytics, page load times, error tracking
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Legal Basis:</strong> Consent
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Functional Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies allow our website to remember choices you make and provide enhanced, more personal
                features. They may be set by us or by third-party providers whose services we use.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Examples:</strong> Language preferences, region settings, accessibility options
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> Up to 1 year
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Legal Basis:</strong> Consent
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Marketing Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are used to deliver advertisements that are relevant to you and your interests. They may
                also be used to limit the number of times you see an advertisement and measure the effectiveness of
                advertising campaigns.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Examples:</strong> Facebook Pixel, Google Ads, retargeting pixels
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Legal Basis:</strong> Consent
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We work with third-party service providers who may place cookies on your device. These include:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Analytics Services</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Google Analytics:</strong> Helps us understand how visitors interact with our website
                </li>
                <li>
                  <strong>Hotjar:</strong> Provides heatmaps and user session recordings to improve user experience
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Payment Processors</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Stripe:</strong> Processes payments securely
                </li>
                <li>
                  <strong>PayPal:</strong> Alternative payment processing
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Customer Support</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <strong>Intercom:</strong> Provides live chat functionality
                </li>
                <li>
                  <strong>Zendesk:</strong> Manages customer support tickets
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Cookie Consent</h3>
              <p className="text-gray-700 mb-4">
                When you first visit our website, you'll see a cookie banner asking for your consent to use
                non-essential cookies. You can choose to accept all cookies, reject non-essential cookies, or customize
                your preferences.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies</li>
                <li>Get notified when a cookie is set</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Browser-Specific Instructions</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 mb-4">
                If you choose to disable cookies, some features of our website may not function properly:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You may need to re-enter information more frequently</li>
                <li>Some pages may not display correctly</li>
                <li>Personalized features may not work</li>
                <li>We may not be able to remember your preferences</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Essential cookies cannot be disabled as they are necessary for our website to function.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                updated policy on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies, please contact us:
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
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Useful Links</h2>
              <p className="text-gray-700 mb-4">For more information about cookies and online privacy:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>
                  <a href="https://ico.org.uk/for-the-public/online/cookies/" className="text-primary hover:underline">
                    Information Commissioner's Office (ICO) - Cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.allaboutcookies.org/" className="text-primary hover:underline">
                    All About Cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/" className="text-primary hover:underline">
                    Your Online Choices
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  )
}

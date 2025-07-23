import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Shield, Users, Clock, Heart, CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "50,000+", label: "Patients Treated" },
    { number: "98%", label: "Patient Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "5 Years", label: "Trusted Service" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your medical information is completely confidential and secure with end-to-end encryption.",
    },
    {
      icon: Users,
      title: "Expert Medical Team",
      description: "All our doctors are GMC registered and have extensive experience in online consultations.",
    },
    {
      icon: Clock,
      title: "Fast & Convenient",
      description: "Get medical advice within 24 hours without leaving your home.",
    },
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "We put your health and wellbeing at the center of everything we do.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center sm:mr-8 mr-2">
              <Image src="/images/ozempo-logo.png" alt="Ozempo" width={150} height={40} className="h-10 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/treatments" className="text-gray-700 hover:text-primary transition-colors">
                Treatments
              </Link>
              <Link href="/about" className="text-primary font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center sm:space-x-4 space-x-2">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1">Start Consultation</Button>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="bg-white text-primary border-primary hover:bg-primary hover:text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                >
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Ozempo</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're revolutionizing healthcare by making quality medical consultations accessible, convenient, and
              affordable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Ozempo, we believe that everyone deserves access to quality healthcare. Our mission is to break down
                barriers to medical care by providing convenient, affordable, and professional online consultations.
              </p>
              <p className="text-gray-600 mb-6">
                We combine cutting-edge technology with the expertise of qualified medical professionals to deliver
                personalized healthcare solutions that fit into your life.
              </p>

              {/* Add weight loss focus */}
              <div className="mb-6">
                <Image
                  src="/images/weight-loss-slogan.png"
                  alt="Weight Loss Made Simple - Ozempo"
                  width={300}
                  height={100}
                  className="mb-4"
                />
                <p className="text-gray-600 mb-4">
                  We specialize in making weight loss accessible and achievable through evidence-based treatments and
                  ongoing medical support.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">GMC Registered Doctors</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">MHRA Approved Pharmacy</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">CQC Regulated Service</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Medical team"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and ensure we provide the best possible healthcare experience for
              our patients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Medical Team</h2>
            <p className="text-xl text-gray-600">
              Our qualified doctors are here to provide you with expert medical care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Johnson", specialty: "General Practice", experience: "15+ years" },
              { name: "Dr. Michael Chen", specialty: "Mental Health", experience: "12+ years" },
              { name: "Dr. Emma Williams", specialty: "Sexual Health", experience: "10+ years" },
            ].map((doctor, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-primary font-medium mb-1">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust Ozempo for their healthcare needs
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">Start Your Consultation</Button>
        </div>
      </section>

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

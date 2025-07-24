"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createContact, ContactFormData } from "@/lib/api/contactService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer/Footer";

const contactSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak to our team directly",
      contact: "+44 20 1234 5678",
      hours: "Mon-Fri: 9AM-6PM",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions",
      contact: "support@pharmacyplanet.com",
      hours: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      hours: "Mon-Fri: 9AM-6PM",
    },
  ];

  const faqs = [
    {
      question: "How long does a consultation take?",
      answer: "Most consultations are completed within 24 hours of submission.",
    },
    {
      question: "Are your doctors qualified?",
      answer:
        "Yes, all our doctors are GMC registered and fully qualified medical professionals.",
    },
    {
      question: "Is my information secure?",
      answer:
        "Absolutely. We use end-to-end encryption and follow strict data protection protocols.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and PayPal.",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createContact(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center sm:mr-8 mr-2">
              <Image
                src="/images/ozempo-logo.png"
                alt="Ozempo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
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
              <Link href="/contact" className="text-primary font-medium">
                Contact
              </Link>
            </nav>

            <div className="flex items-center sm:space-x-4 space-x-2">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1">
                Start Consultation
              </Button>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="bg-white text-primary border-primary hover:bg-primary hover:text-white max-sm:w-full md:text-sm text-xs md:px-4 px-2 md:py-2 py-1"
                >
                  Login / Sign Up
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're here to help with any questions about our services or your
              healthcare needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {method.description}
                  </p>
                  <p className="font-medium text-primary mb-1">
                    {method.contact}
                  </p>
                  <p className="text-xs text-gray-500">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        First Name
                      </label>
                      <Input
                        placeholder="Your first name"
                        {...register("first_name")}
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Last Name
                      </label>
                      <Input
                        placeholder="Your last name"
                        {...register("last_name")}
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+44 20 1234 5678"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subject
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      {...register("subject")}
                    >
                      <option value="">Select subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Medical Question">Medical Question</option>
                      <option value="Partnership Inquiry">
                        Partnership Inquiry
                      </option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Please describe your question or concern..."
                      rows={5}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-blue-600"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    123 Medical Street
                    <br />
                    London, SW1A 1AA
                    <br />
                    United Kingdom
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">
                      Emergency consultations available 24/7 through our online
                      platform
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Immediate Medical Advice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your online consultation now and get expert medical advice
            within 24 hours
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg">
            Start Consultation Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}

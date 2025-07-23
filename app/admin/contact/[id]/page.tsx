"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, Calendar, User } from "lucide-react";
import Link from "next/link";
import Logout from "@/components/logout/Logout";
import { getContactById, Contact } from "@/lib/api/contactService";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ContactDetailPage() {
  const params = useParams();
  const contactId = Number(params.id);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const data = await getContactById(contactId);
        setContact(data);
      } catch (error) {
        console.error("Error fetching contact:", error);
        toast.error("Failed to fetch contact details");
      } finally {
        setLoading(false);
      }
    };

    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Contact not found
          </h3>
          <p className="text-gray-600 mb-4">
            The contact you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/admin/contact">
            <Button variant="outline">Back to Contacts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center sm:space-x-4 space-x-2">
              <Link href="/admin/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1"
                >
                  <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                  Back to Contacts
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 sm:block hidden" />
              <Image
                src="/images/ozempo-logo.png"
                alt="Ozempo Admin"
                width={120}
                height={40}
                className="h-8 sm:w-40 w-20"
              />
              <Badge
                className="text-white text-xs sm:px-2 px-1 py-1"
                style={{ backgroundColor: "#14b8a6" }}
              >
                ADMIN PANEL
              </Badge>
            </div>
            <div>
              <Logout />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Mail className="h-8 w-8 text-teal-600" />
            Contact Details
          </h1>
          <p className="text-gray-600 mt-2">
            Detailed information for {contact.first_name} {contact.last_name}
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-teal-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Full Name
                  </Label>
                  <p className="text-lg font-semibold text-gray-900">
                    {contact.first_name} {contact.last_name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Contact ID
                  </Label>
                  <p className="text-lg font-semibold text-gray-900">
                    #{contact.id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal-600" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Email Address
                  </Label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {contact.email}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </Label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {contact.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal-600" />
                Message Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Subject
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {contact.subject}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Message
                </Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Created At
                  </Label>
                  <p className="text-gray-900">
                    {formatDate(contact.created_at)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Last Updated
                  </Label>
                  <p className="text-gray-900">
                    {formatDate(contact.updated_at)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

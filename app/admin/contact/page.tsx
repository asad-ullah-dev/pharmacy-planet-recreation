"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Eye, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import Logout from "@/components/logout/Logout";
import {
  getAllContacts,
  Contact,
  ContactsResponse,
} from "@/lib/api/contactService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function AdminContactsPage() {
  const router = useRouter();
  const [contactsData, setContactsData] = useState<ContactsResponse | null>(
    null
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const fetchContacts = async (searchTerm?: string) => {
    try {
      if (searchTerm) {
        setSearchLoading(true);
      } else {
        setLoading(true);
      }
      const data = await getAllContacts(searchTerm);
      setContactsData(data);
      setContacts(data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
    } finally {
      if (searchTerm) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchContacts(searchTerm.trim());
      } else if (searchTerm === "") {
        fetchContacts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewContact = (contact: Contact) => {
    router.push(`/admin/contact/${contact.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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
          <p className="mt-4 text-gray-600">Loading contacts...</p>
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
              <Link href="/admin/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1"
                >
                  <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                  Back to Dashboard
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Mail className="h-8 w-8 text-teal-600" />
            Contact Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor contact messages
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contacts by name, email, or subject..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    className="pl-10"
                    disabled={searchLoading}
                  />
                  {searchLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Searching for: "{searchTerm}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-teal-600" />
              Contact Messages ({contacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No contacts found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "No contact messages have been submitted yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Subject
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {contact.first_name} {contact.last_name}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-600">{contact.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-600">{contact.phone}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-600">{contact.subject}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-600">
                            {formatDate(contact.created_at)}
                          </p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Link href={`/admin/contact/${contact.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

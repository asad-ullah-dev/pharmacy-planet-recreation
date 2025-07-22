"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, User } from "@/lib/api/userService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/logout/Logout";
import { Label } from "@/components/ui/label";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserById(id);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(id)) fetchUser();
  }, [id]);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    return statusLower === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            User not found
          </h3>
          <p className="text-gray-600 mb-4">
            The user you're looking for doesn't exist.
          </p>
          <Link href="/admin/users">
            <Button variant="outline">Back to Users</Button>
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
              <Link href="/admin/users">
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1"
                >
                  <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                  Back to Users
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
            <UserIcon className="h-8 w-8 text-teal-600" />
            User Details
          </h1>
          <p className="text-gray-600 mt-2">
            Detailed information for {user.first_name} {user.last_name}
          </p>
        </div>

        {/* User Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-teal-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Full Name
                </Label>
                <p className="text-lg font-semibold text-gray-900">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Email
                </Label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Phone
                </Label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {user.phone_number}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Date of Birth
                </Label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {user.date_of_birth}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Gender
                </Label>
                <p className="text-gray-900">{user.gender}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Ethnicity
                </Label>
                <p className="text-gray-900">{user.ethnicity}</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Role
                </Label>
                <p className="text-gray-900">{user.role?.name || "N/A"}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Status
                </Label>
                <p className="text-gray-900 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 px-2 py-0.5 text-xs rounded-full"
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Email Verified
                </Label>
                <p className="text-gray-900">
                  {user.email_verified_at ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Join Date
                </Label>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Last Updated
                </Label>
                <p className="text-gray-900">
                  {new Date(user.updated_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-teal-600" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Street Address
                  </Label>
                  <p className="text-gray-900">{user.street_address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    City
                  </Label>
                  <p className="text-gray-900">{user.city}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    County
                  </Label>
                  <p className="text-gray-900">{user.county || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Postal Code
                  </Label>
                  <p className="text-gray-900">{user.zip_postal_code}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

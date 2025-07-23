"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Package,
  MessageSquare,
  Calendar,
  Activity,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Handle } from "vaul";
import Logout from "@/components/logout/Logout";
import WithAuth from "@/components/auth/WithAuth";
import axios from "axios";

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      product: "Ozempic 0.5mg",
      amount: "£299.99",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      product: "Ozempic 1mg",
      amount: "£299.99",
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      product: "Ozempic 0.5mg",
      amount: "£299.99",
      status: "Shipped",
      date: "2024-01-14",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      product: "Ozempic 1mg",
      amount: "£299.99",
      status: "Completed",
      date: "2024-01-14",
    },
  ];
  const [stats, setStats] = useState([
    {
      title: "Total Revenue",
      value: "",
      change: "",
      changeType: "positive",
      bgColor: "bg-green-100",
      color: "text-green-600",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "",
      change: "",
      changeType: "neutral",
      bgColor: "bg-blue-100",
      color: "text-blue-600",
      icon: ShoppingCart,
    },
    {
      title: "Active Users",
      value: "",
      change: "",
      changeType: "neutral",
      bgColor: "bg-purple-100",
      color: "text-purple-600",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "",
      change: "",
      changeType: "neutral",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      icon: TrendingUp,
    },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cards = response.data.data.cards;

        const formattedStats = [
          {
            title: "Total Revenue",
            value: cards.total_revenue,
            change: "+0%",
            changeType: "positive",
            icon: DollarSign,
            bgColor: "bg-green-100",
            color: "text-green-600",
          },
          {
            title: "Total Orders",
            value: cards.total_orders,
            change: "-0%",
            changeType: "negative",
            icon: ShoppingCart,
            bgColor: "bg-red-100",
            color: "text-red-600",
          },
          {
            title: "Active Users",
            value: cards.active_users,
            change: "+0%",
            changeType: "positive",
            icon: Users,
            bgColor: "bg-blue-100",
            color: "text-blue-600",
          },
          {
            title: "Conversion Rate",
            value: "",
            // value: cards.new_users_this_month,
            change: "+0%",
            changeType: "positive",
            icon: TrendingUp,
            bgColor: "bg-blue-100",
            color: "text-blue-600",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <WithAuth requiredRole="admin" redirectTo="/auth/login">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center sm:space-x-4 space-x-2">
                <Image
                  src="/images/ozempo-logo.png"
                  alt="Ozempo Admin"
                  width={150}
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
              <div className="flex items-center sm:space-x-4 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:text-sm text-xs sm:px-3 px-1.5 sm:gap-2 gap-1"
                >
                  <Calendar className="sm:h-4 h-2 w-2 sm:w-4 sm:mr-2 mr-1" />
                  Last 7 days
                </Button>
                <div>
                  <Logout />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        ${Number(stat.value || 0).toFixed(2)}
                      </p>
                      <p
                        className={`text-sm mt-2 ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from last period
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/users">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                  <h3 className="font-semibold">Manage Users</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View and manage user accounts
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/orders">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                  <h3 className="font-semibold">Orders</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Track and manage orders
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/products">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                  <h3 className="font-semibold">Products</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage product catalog
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/support">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                  <h3 className="font-semibold">Support</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Handle customer support
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/contact">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-teal-600" />
                  <h3 className="font-semibold">Contact Messages</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View and manage contact messages
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <Link href="/admin/orders">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Product
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.product}</td>
                        <td className="py-3 px-4 font-medium">
                          {order.amount}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WithAuth>
  );
}

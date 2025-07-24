"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Mail,
  X,
  Star,
  Bell,
  AlertTriangle,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logout from "@/components/logout/Logout";
import {
  getUserSupportTickets,
  getUserSupportTicketById,
  replyToUserSupportTicket,
} from "@/lib/api/supportTicketService";
import type {
  AdminSupportTicket,
  TicketReply,
} from "@/lib/api/supportTicketService";
import { toast } from "sonner";

export default function SupportPage() {
  const [tickets, setTickets] = useState<AdminSupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] =
    useState<AdminSupportTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyFiles, setReplyFiles] = useState<File[]>([]);
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getUserSupportTickets();
      setTickets(data);
    } catch (error: any) {
      console.error("Failed to fetch tickets:", error);
      if (error?.response?.status === 403) {
        const errorMessage = error?.response?.data?.message || "Access denied";
        toast.error(errorMessage);
      } else if (error?.response?.status !== 422) {
        toast.error("Failed to fetch tickets");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = async (ticket: AdminSupportTicket) => {
    setModalLoading(true);
    setIsModalOpen(true);
    try {
      const ticketDetails = await getUserSupportTicketById(ticket.id);
      setSelectedTicket(ticketDetails);
    } catch (error: any) {
      console.error("Failed to load ticket details:", error);

      if (error?.response?.status === 403) {
        const errorMessage = error?.response?.data?.message || "Access denied";
        toast.error(errorMessage);
      } else if (error?.response?.status !== 422) {
        toast.error("Failed to load ticket details");
      }
      setSelectedTicket(ticket);
    } finally {
      setModalLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedTicket) return;
    setReplyLoading(true);
    try {
      await replyToUserSupportTicket(
        selectedTicket.id,
        replyMessage,
        replyFiles
      );
      // Refresh ticket details
      const updated = await getUserSupportTicketById(selectedTicket.id);
      setSelectedTicket(updated);
      setReplyMessage("");
      setReplyFiles([]);
    } catch (error: any) {
      console.error("Failed to send reply:", error);

      if (error?.response?.status === 403) {
        const errorMessage = error?.response?.data?.message || "Access denied";
        toast.error(errorMessage);
      } else if (error?.response?.status !== 422) {
        toast.error("Failed to send reply");
      }
    } finally {
      setReplyLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800 border-red-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertTriangle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:space-x-8 space-x-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/ozempo-logo.png"
                  alt="Ozempo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="hidden md:block">
                <span className="lg:text-sm text-xs font-medium text-gray-600">
                  WEIGHT LOSS CLINIC
                </span>
              </div>
            </div>
            <div className="flex items-center sm:space-x-6 space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">Excellent</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  2,354 reviews on Trustpilot
                </Badge>
              </div>

              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    1
                  </Badge>
                </Button>
              </div>

              <Link href="/">
                <Button className="bg-primary hover:bg-blue-600 text-white">
                  HOME
                </Button>
              </Link>
              <div>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  My Account
                </h2>
                <nav className="space-y-2">
                  <Link
                    href="/dashboard/account"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <User className="w-5 h-5" />
                    <span>Manage Account Details</span>
                  </Link>
                  <Link
                    href="/dashboard/address"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Manage Address Details</span>
                  </Link>
                  <Link
                    href="/dashboard/health"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>General Health Questions</span>
                  </Link>
                  <Link
                    href="/dashboard/orders"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    href="/dashboard/newsletter"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Newsletter Subscriptions</span>
                  </Link>
                  <Link
                    href="/dashboard/support"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order Query</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    My Support Tickets
                  </h1>
                  <Link href="/dashboard/support/create-ticket">
                    <Button className="bg-primary hover:bg-blue-600 text-white">
                      Create ticket
                    </Button>
                  </Link>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-gray-500">
                    Loading tickets...
                  </div>
                ) : tickets.length === 0 ? (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      You don't have any support tickets
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {ticket.subject}
                                </h3>
                                <Badge
                                  className={getStatusColor(ticket.status)}
                                >
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(ticket.status)}
                                    {ticket.status}
                                  </div>
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {ticket.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Category: {ticket.category}</span>
                                <span>Priority: {ticket.priority}</span>
                                <span>
                                  Created:{" "}
                                  {new Date(
                                    ticket.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewTicket(ticket)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Ticket Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Ticket Details - {selectedTicket?.id}
            </DialogTitle>
          </DialogHeader>

          {modalLoading ? (
            <div className="py-12 text-center text-gray-500">
              Loading ticket details...
            </div>
          ) : (
            selectedTicket && (
              <div className="space-y-6">
                {/* Ticket Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Ticket Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Subject
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedTicket.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Category
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedTicket.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Created
                        </p>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedTicket.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Priority
                        </p>
                        <Badge
                          className={getStatusColor(selectedTicket.priority)}
                        >
                          {selectedTicket.priority}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Status
                        </p>
                        <Badge
                          className={getStatusColor(selectedTicket.status)}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedTicket.status)}
                            {selectedTicket.status}
                          </div>
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-600">
                          Message
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedTicket.message}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-gray-600">
                          Attachments
                        </p>
                        {selectedTicket.attachments &&
                        selectedTicket.attachments.length > 0 ? (
                          selectedTicket.attachments.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={url}
                                alt="attachment"
                                className="h-12 w-12 inline-block mr-2 rounded border"
                              />
                            </a>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Attachments
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conversation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {/* Original Message */}
                      <div className="p-4 rounded-lg bg-gray-50 border-l-4 border-gray-300">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium text-sm">You</span>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              selectedTicket.created_at
                            ).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900">
                          {selectedTicket.message}
                        </p>
                        {selectedTicket.attachments &&
                          selectedTicket.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {selectedTicket.attachments.map((url, idx) => (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={url}
                                    alt="attachment"
                                    className="h-8 w-8 inline-block rounded border"
                                  />
                                </a>
                              ))}
                            </div>
                          )}
                      </div>

                      {/* Replies */}
                      {selectedTicket.replies &&
                      selectedTicket.replies.length > 0 ? (
                        selectedTicket.replies.map((reply: TicketReply) => (
                          <div
                            key={reply.id}
                            className="p-4 rounded-lg bg-teal-50 border-l-4 border-teal-500"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium text-sm">
                                Support Team
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(reply.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900">
                              {reply.message}
                            </p>
                            {reply.attachments &&
                              reply.attachments.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {reply.attachments.map(
                                    (url: string, idx: number) => (
                                      <a
                                        key={idx}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={url}
                                          alt="attachment"
                                          className="h-8 w-8 inline-block rounded border"
                                        />
                                      </a>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-sm">
                          No replies yet.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Reply Form - Only show if status is not Resolved */}
                {selectedTicket.status === "Resolved" ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p className="text-lg font-medium">Ticket Resolved</p>
                        <p className="text-sm">
                          This ticket has been marked as resolved. No further
                          replies are needed.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Send Reply</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type your reply..."
                          rows={4}
                        />
                        <input
                          type="file"
                          multiple
                          onChange={(e) =>
                            setReplyFiles(Array.from(e.target.files || []))
                          }
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Close
                          </Button>
                          <Button
                            className="text-white"
                            style={{ backgroundColor: "#14b8a6" }}
                            onClick={handleReply}
                            disabled={replyLoading || !replyMessage}
                          >
                            {replyLoading ? "Sending..." : "Send Reply"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

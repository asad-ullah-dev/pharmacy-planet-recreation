"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Search, Filter, Eye, ArrowLeft, Clock, CheckCircle, AlertTriangle, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample support ticket data
const sampleTickets = [
  {
    id: "TKT-001",
    subject: "Order delivery issue",
    customer: "John Doe",
    email: "john.doe@example.com",
    priority: "High",
    status: "Open",
    category: "Delivery",
    created: "2024-01-20",
    lastUpdate: "2024-01-20",
    messages: [
      {
        from: "John Doe",
        message: "My order ORD-2024-001 was supposed to be delivered yesterday but I haven't received it yet.",
        timestamp: "2024-01-20 10:30",
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "Product information inquiry",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    priority: "Medium",
    status: "In Progress",
    category: "Product",
    created: "2024-01-19",
    lastUpdate: "2024-01-20",
    messages: [
      {
        from: "Jane Smith",
        message: "I need more information about the dosage instructions for Ozempic 1mg.",
        timestamp: "2024-01-19 14:15",
      },
      {
        from: "Support Team",
        message: "Thank you for your inquiry. I'll connect you with our medical team for detailed dosage information.",
        timestamp: "2024-01-20 09:00",
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "Account access problem",
    customer: "Mike Johnson",
    email: "mike.johnson@example.com",
    priority: "Low",
    status: "Resolved",
    category: "Account",
    created: "2024-01-18",
    lastUpdate: "2024-01-19",
    messages: [
      {
        from: "Mike Johnson",
        message: "I can't log into my account. The password reset isn't working.",
        timestamp: "2024-01-18 16:45",
      },
      {
        from: "Support Team",
        message: "I've reset your password manually. Please check your email for the new temporary password.",
        timestamp: "2024-01-19 10:00",
      },
      {
        from: "Mike Johnson",
        message: "Thank you! I can access my account now.",
        timestamp: "2024-01-19 10:30",
      },
    ],
  },
]

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState(sampleTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800 border-red-200"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertTriangle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, lastUpdate: new Date().toISOString().split("T")[0] }
          : ticket,
      ),
    )
  }

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedTicket) {
      const updatedTicket = {
        ...selectedTicket,
        messages: [
          ...selectedTicket.messages,
          {
            from: "Support Team",
            message: replyMessage,
            timestamp: new Date().toLocaleString(),
          },
        ],
        lastUpdate: new Date().toISOString().split("T")[0],
      }

      setTickets(tickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket)))

      setSelectedTicket(updatedTicket)
      setReplyMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header className="bg-white shadow-sm border-b sticky top-0 z-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                      <div className="flex items-center sm:space-x-4 space-x-2">
                        <Link href="/admin/dashboard">
                          <Button variant="ghost" size="sm" className="sm:text-sm text-xs sm:pr-3 pl-0 pr-1.5 sm:gap-2 gap-1">
                            <ArrowLeft className="sm:h-4 h-2 sm:w-4 w-2 sm:mr-2" />
                            Back to Dashboard
                          </Button>
                        </Link>
                        <div className="h-6 w-px bg-gray-300 sm:block hidden" />
                        <Image src="/images/ozempo-logo.png" alt="Ozempo Admin" width={120} height={40} className="h-8 sm:w-40 w-20" />
                        <Badge className="text-white text-xs sm:px-2 px-1 py-1" style={{ backgroundColor: "#14b8a6" }}>
                           ADMIN PANEL
                        </Badge>
                      </div>
                      <Link href="/auth/login">
                        <Button variant="outline" className="text-red-600 border-red-500 hover:bg-red-50 sm:text-sm text-xs sm:px-3 px-1.5">
                          Logout
                        </Button>
                      </Link>
                    </div>
                  </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-teal-600" />
            Support Management
          </h1>
          <p className="text-gray-600 mt-2">Manage customer support tickets and inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold text-red-600">{tickets.filter((t) => t.status === "Open").length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {tickets.filter((t) => t.status === "In Progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tickets.filter((t) => t.status === "Resolved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tickets by ID, subject, or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:w-40">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Ticket ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{ticket.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{ticket.subject}</div>
                          <div className="text-sm text-gray-600">{ticket.category}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm text-gray-900">{ticket.customer}</div>
                          <div className="text-sm text-gray-600">{ticket.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(ticket.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </div>
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{ticket.created}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTicket(ticket)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select value={ticket.status} onValueChange={(value) => updateTicketStatus(ticket.id, value)}>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Ticket Details - {selectedTicket?.id}
              </DialogTitle>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-6">
                {/* Ticket Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ticket Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Subject</p>
                        <p className="text-sm text-gray-900">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Category</p>
                        <p className="text-sm text-gray-900">{selectedTicket.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer</p>
                        <p className="text-sm text-gray-900">{selectedTicket.customer}</p>
                        <p className="text-sm text-gray-600">{selectedTicket.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Created</p>
                        <p className="text-sm text-gray-900">{selectedTicket.created}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Priority</p>
                        <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedTicket.status)}
                            {selectedTicket.status}
                          </div>
                        </Badge>
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
                      {selectedTicket.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            message.from === "Support Team"
                              ? "bg-teal-50 border-l-4 border-teal-500"
                              : "bg-gray-50 border-l-4 border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium text-sm">{message.from}</span>
                            </div>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-900">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reply Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Send Reply</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                          Close
                        </Button>
                        <Button
                          className="text-white"
                          style={{ backgroundColor: "#14b8a6" }}
                          onClick={handleSendReply}
                          disabled={!replyMessage.trim()}
                        >
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

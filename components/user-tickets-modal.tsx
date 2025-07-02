"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Ticket,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Phone,
  Mail,
} from "lucide-react"

interface UserTicketsModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
}

// Mock ticket data
const mockTickets = [
  {
    ticketId: "tkt_001",
    eventId: "evt_001",
    eventName: "Summer Music Festival",
    eventDate: "2024-07-15",
    eventLocation: "Central Park",
    timeStart: "10:00",
    timeEnd: "22:00",
    price: 100,
    status: "active",
    purchaseDate: "2024-06-15",
    checkInTime: null,
    seatNumber: "A-123",
  },
  {
    ticketId: "tkt_002",
    eventId: "evt_002",
    eventName: "Tech Conference 2024",
    eventDate: "2024-08-22",
    eventLocation: "Convention Center",
    timeStart: "09:00",
    timeEnd: "18:00",
    price: 150,
    status: "checked-in",
    purchaseDate: "2024-07-10",
    checkInTime: "2024-08-22 09:15:00",
    seatNumber: "B-456",
  },
  {
    ticketId: "tkt_003",
    eventId: "evt_003",
    eventName: "Food & Wine Expo",
    eventDate: "2024-09-10",
    eventLocation: "Downtown Arena",
    timeStart: "11:00",
    timeEnd: "20:00",
    price: 75,
    status: "cancelled",
    purchaseDate: "2024-08-01",
    checkInTime: null,
    seatNumber: "C-789",
  },
]

const mockRegistrations = [
  {
    eventId: "evt_001",
    eventName: "Summer Music Festival",
    registrationDate: "2024-06-15",
    status: "confirmed",
  },
  {
    eventId: "evt_002",
    eventName: "Tech Conference 2024",
    registrationDate: "2024-07-10",
    status: "confirmed",
  },
  {
    eventId: "evt_003",
    eventName: "Food & Wine Expo",
    registrationDate: "2024-08-01",
    status: "cancelled",
  },
]

export function UserTicketsModal({ isOpen, onClose, user }: UserTicketsModalProps) {
  const [activeTab, setActiveTab] = useState("profile")

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
        return "bg-green-500"
      case "checked-in":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "checked-in":
        return <Eye className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const totalSpent = mockTickets.reduce((sum, ticket) => (ticket.status !== "cancelled" ? sum + ticket.price : sum), 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <User className="h-6 w-6 mr-2 text-purple-400" />
            User Details & Tickets
          </DialogTitle>
          <DialogDescription className="text-purple-200">
            Complete user information, tickets, and event registrations
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20 p-1">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/20 text-white">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-white/20 text-white">
              <Ticket className="h-4 w-4 mr-2" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="registrations" className="data-[state=active]:bg-white/20 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Registrations
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {user.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">{user.fullName}</h3>
                      <p className="text-purple-200">User ID: {user.userId}</p>
                      <Badge className={`${getStatusColor(user.status)} text-white mt-2`}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email</span>
                      </div>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Phone</span>
                      </div>
                      <p className="text-white font-medium">{user.phone || "Not provided"}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Join Date</span>
                      </div>
                      <p className="text-white font-medium">{user.joinDate}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Last Seen</span>
                      </div>
                      <p className="text-white font-medium">{user.lastSeen}</p>
                    </div>
                  </div>

                  {/* Facial Recognition Info */}
                  <div className="pt-4 border-t border-white/20">
                    <h4 className="text-white font-semibold mb-3">Facial Recognition Data</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-purple-200">Face ID</p>
                        <p className="text-white font-mono text-sm">{user.faceId || "Not assigned"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-200">Rekognition ID</p>
                        <p className="text-white font-mono text-sm">{user.rekognitionId || "Not processed"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{user.registeredEvents || 0}</div>
                    <p className="text-sm text-purple-200">Registered Events</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{user.totalTickets || 0}</div>
                    <p className="text-sm text-purple-200">Total Tickets</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">${totalSpent}</div>
                    <p className="text-sm text-purple-200">Total Spent</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">User Tickets</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Tickets
              </Button>
            </div>

            <div className="grid gap-4">
              {mockTickets.map((ticket) => (
                <Card key={ticket.ticketId} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{ticket.eventName}</h4>
                        <p className="text-purple-200">Ticket ID: {ticket.ticketId}</p>
                      </div>
                      <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">{ticket.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="flex items-center text-purple-200 mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Date
                        </div>
                        <p className="text-white font-medium">{ticket.eventDate}</p>
                      </div>

                      <div>
                        <div className="flex items-center text-purple-200 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          Time
                        </div>
                        <p className="text-white font-medium">
                          {ticket.timeStart} - {ticket.timeEnd}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center text-purple-200 mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </div>
                        <p className="text-white font-medium">{ticket.eventLocation}</p>
                      </div>

                      <div>
                        <div className="flex items-center text-purple-200 mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Price
                        </div>
                        <p className="text-white font-medium">${ticket.price}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20 text-sm">
                      <div>
                        <p className="text-purple-200">Purchase Date</p>
                        <p className="text-white font-medium">{ticket.purchaseDate}</p>
                      </div>
                      <div>
                        <p className="text-purple-200">Seat Number</p>
                        <p className="text-white font-medium">{ticket.seatNumber}</p>
                      </div>
                      <div>
                        <p className="text-purple-200">Check-in Time</p>
                        <p className="text-white font-medium">{ticket.checkInTime || "Not checked in"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Event Registrations</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Registrations
              </Button>
            </div>

            <div className="grid gap-4">
              {mockRegistrations.map((registration, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{registration.eventName}</h4>
                        <p className="text-purple-200">Event ID: {registration.eventId}</p>
                        <p className="text-sm text-purple-300 mt-1">Registered on: {registration.registrationDate}</p>
                      </div>
                      <Badge className={`${getStatusColor(registration.status)} text-white`}>
                        {getStatusIcon(registration.status)}
                        <span className="ml-1 capitalize">{registration.status}</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

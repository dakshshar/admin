"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  LogOut,
  Shield,
  DollarSign,
  UserCheck,
  Clock,
  MapPin,
  Ticket,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
// Import the new components at the top
import { CreateEventModal } from "@/components/create-event-modal"
import { UserTicketsModal } from "@/components/user-tickets-modal"

interface AdminDashboardProps {
  onLogout: () => void
}

// Update the mockUsers data to include more comprehensive user information
const mockUsers = [
  {
    id: 1,
    userId: "user_001",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1-555-0101",
    faceId: "face_001",
    rekognitionId: "rek_001",
    status: "verified",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-15",
    lastSeen: "2 hours ago",
    registeredEvents: 3,
    totalTickets: 5,
  },
  {
    id: 2,
    userId: "user_002",
    fullName: "Bob Smith",
    email: "bob@example.com",
    phone: "+1-555-0102",
    faceId: "face_002",
    rekognitionId: "rek_002",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-16",
    lastSeen: "1 day ago",
    registeredEvents: 1,
    totalTickets: 2,
  },
  {
    id: 3,
    userId: "user_003",
    fullName: "Carol Davis",
    email: "carol@example.com",
    phone: "+1-555-0103",
    faceId: "face_003",
    rekognitionId: "rek_003",
    status: "verified",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-17",
    lastSeen: "3 hours ago",
    registeredEvents: 2,
    totalTickets: 3,
  },
  {
    id: 4,
    userId: "user_004",
    fullName: "David Wilson",
    email: "david@example.com",
    phone: "+1-555-0104",
    faceId: "face_004",
    rekognitionId: "rek_004",
    status: "rejected",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-18",
    lastSeen: "5 days ago",
    registeredEvents: 0,
    totalTickets: 0,
  },
  {
    id: 5,
    userId: "user_005",
    fullName: "Eva Brown",
    email: "eva@example.com",
    phone: "+1-555-0105",
    faceId: "face_005",
    rekognitionId: "rek_005",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-19",
    lastSeen: "1 hour ago",
    registeredEvents: 1,
    totalTickets: 1,
  },
]

// Update the mockEvents data to include organizer information
const mockEvents = [
  {
    id: 1,
    eventId: "evt_001",
    name: "Summer Music Festival",
    date: "2024-07-15",
    location: "Central Park",
    timeStart: "10:00",
    timeEnd: "22:00",
    ticketsSold: 1250,
    totalTickets: 1500,
    price: 100,
    revenue: 125000,
    status: "active",
    attendees: 1250,
    organiserId: "org_001",
    organiserName: "EventPro Inc.",
  },
  {
    id: 2,
    eventId: "evt_002",
    name: "Tech Conference 2024",
    date: "2024-08-22",
    location: "Convention Center",
    timeStart: "09:00",
    timeEnd: "18:00",
    ticketsSold: 890,
    totalTickets: 1000,
    price: 150,
    revenue: 133500,
    status: "active",
    attendees: 890,
    organiserId: "org_002",
    organiserName: "TechEvents Ltd.",
  },
  {
    id: 3,
    eventId: "evt_003",
    name: "Food & Wine Expo",
    date: "2024-09-10",
    location: "Downtown Arena",
    timeStart: "11:00",
    timeEnd: "20:00",
    ticketsSold: 650,
    totalTickets: 800,
    price: 75,
    revenue: 48750,
    status: "upcoming",
    attendees: 650,
    organiserId: "org_003",
    organiserName: "Culinary Events Co.",
  },
]

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Add new state for managing tickets and event creation
  const [selectedUser, setSelectedUser] = useState(null)
  // Add the new state variables after the existing useState declarations
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showUserTickets, setShowUserTickets] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = {
    totalUsers: 2847,
    verifiedUsers: 2156,
    activeEvents: 3,
    totalRevenue: 279000,
  }

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Add the handleCreateEvent function
  const handleCreateEvent = (eventData: any) => {
    // In a real app, this would make an API call
    console.log("Creating event:", eventData)
    // You could add the event to mockEvents here for demo purposes
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Thrillathon Admin</h1>
              <p className="text-sm text-purple-200">Facial Recognition Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20 p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20 text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white/20 text-white">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-white/20 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20 text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-purple-200">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Verified Users</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.verifiedUsers.toLocaleString()}</div>
                  <p className="text-xs text-purple-200">
                    {Math.round((stats.verifiedUsers / stats.totalUsers) * 100)}% verification rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Active Events</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.activeEvents}</div>
                  <p className="text-xs text-purple-200">2 upcoming this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-purple-200">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-purple-200">Manage your events and users efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setShowCreateEvent(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent User Verifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{user.fullName}</p>
                        <p className="text-xs text-purple-200">{user.email}</p>
                      </div>
                      <Badge className={`${getStatusColor(user.status)} text-white`}>{user.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Event Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-white">{event.name}</p>
                        <p className="text-xs text-purple-200">
                          {event.ticketsSold}/{event.totalTickets} sold
                        </p>
                      </div>
                      <Progress value={(event.ticketsSold / event.totalTickets) * 100} className="h-2 bg-white/20" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{user.fullName}</h3>
                          <p className="text-sm text-purple-200">{user.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-xs text-purple-300">Joined: {user.joinDate}</p>
                            <p className="text-xs text-purple-300">Last seen: {user.lastSeen}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(user.status)} text-white flex items-center space-x-1`}>
                          {getStatusIcon(user.status)}
                          <span className="capitalize">{user.status}</span>
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowUserTickets(true)
                          }}
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Tickets
                        </Button>
                        {user.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Event Management</h2>
              <Button
                onClick={() => setShowCreateEvent(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <Card
                  key={event.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{event.name}</CardTitle>
                        <CardDescription className="text-purple-200 flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </CardDescription>
                      </div>
                      <Badge className={event.status === "active" ? "bg-green-500" : "bg-yellow-500"}>
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-purple-200">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Tickets Sold</span>
                        <span className="text-white font-semibold">
                          {event.ticketsSold}/{event.totalTickets}
                        </span>
                      </div>
                      <Progress value={(event.ticketsSold / event.totalTickets) * 100} className="h-2 bg-white/20" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">${event.revenue.toLocaleString()}</p>
                        <p className="text-xs text-purple-200">Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{event.attendees}</p>
                        <p className="text-xs text-purple-200">Attendees</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Ticket className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
      {/* Add the modals at the end of the component, before the closing div */}
      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onCreateEvent={handleCreateEvent}
      />

      <UserTicketsModal isOpen={showUserTickets} onClose={() => setShowUserTickets(false)} user={selectedUser} />
    </div>
  )
}

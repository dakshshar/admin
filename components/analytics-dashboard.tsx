"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Clock, Download, Filter, RefreshCw } from "lucide-react"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000, tickets: 450 },
  { month: "Feb", revenue: 52000, tickets: 520 },
  { month: "Mar", revenue: 48000, tickets: 480 },
  { month: "Apr", revenue: 61000, tickets: 610 },
  { month: "May", revenue: 55000, tickets: 550 },
  { month: "Jun", revenue: 67000, tickets: 670 },
]

const hourlyCheckins = [
  { hour: "8AM", checkins: 45 },
  { hour: "9AM", checkins: 120 },
  { hour: "10AM", checkins: 180 },
  { hour: "11AM", checkins: 220 },
  { hour: "12PM", checkins: 280 },
  { hour: "1PM", checkins: 320 },
  { hour: "2PM", checkins: 290 },
  { hour: "3PM", checkins: 250 },
  { hour: "4PM", checkins: 180 },
  { hour: "5PM", checkins: 120 },
]

const ageGroups = [
  { name: "18-25", value: 35, color: "#8B5CF6" },
  { name: "26-35", value: 28, color: "#3B82F6" },
  { name: "36-45", value: 22, color: "#10B981" },
  { name: "46-55", value: 10, color: "#F59E0B" },
  { name: "55+", value: 5, color: "#EF4444" },
]

const eventPerformance = [
  { event: "Summer Festival", attendees: 1250, revenue: 125000, satisfaction: 4.8 },
  { event: "Tech Conference", attendees: 890, revenue: 89000, satisfaction: 4.6 },
  { event: "Food Expo", attendees: 650, revenue: 65000, satisfaction: 4.7 },
  { event: "Art Gallery", attendees: 320, revenue: 32000, satisfaction: 4.9 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-purple-200">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$67,000</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,847</div>
            <div className="flex items-center text-xs text-blue-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Avg. Check-in Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.3s</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.5s improvement
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Success Rate</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98.7%</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Revenue & Ticket Sales Trend</CardTitle>
            <CardDescription className="text-purple-200">Monthly performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Hourly Check-in Patterns</CardTitle>
            <CardDescription className="text-purple-200">Peak hours for event attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyCheckins}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="hour" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="checkins" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Age Demographics</CardTitle>
            <CardDescription className="text-purple-200">Attendee age distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ageGroups}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {ageGroups.map((group, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }}></div>
                  <span className="text-xs text-purple-200">
                    {group.name}: {group.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Event Performance Comparison</CardTitle>
            <CardDescription className="text-purple-200">Detailed metrics for each event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventPerformance.map((event, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-white">{event.event}</h4>
                    <Badge className="bg-green-500 text-white">★ {event.satisfaction}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-200">Attendees</p>
                      <p className="text-xl font-bold text-white">{event.attendees.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-purple-200">Revenue</p>
                      <p className="text-xl font-bold text-white">${event.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Real-time Activity</CardTitle>
          <CardDescription className="text-purple-200">Live updates from ongoing events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">127</div>
              <p className="text-sm text-purple-200">Active Check-ins</p>
              <div className="flex items-center justify-center mt-2 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                Live
              </div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.1s</div>
              <p className="text-sm text-purple-200">Avg Response Time</p>
              <div className="flex items-center justify-center mt-2 text-xs text-blue-400">
                <TrendingDown className="h-3 w-3 mr-1" />
                Improving
              </div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.2%</div>
              <p className="text-sm text-purple-200">Recognition Accuracy</p>
              <div className="flex items-center justify-center mt-2 text-xs text-green-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

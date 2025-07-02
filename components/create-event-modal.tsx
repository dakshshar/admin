"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, MapPin, DollarSign, Users, Plus } from "lucide-react"

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateEvent: (eventData: any) => void
}

export function CreateEventModal({ isOpen, onClose, onCreateEvent }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    location: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    totalTickets: "",
    price: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.eventId.trim()) newErrors.eventId = "Event ID is required"
    if (!formData.name.trim()) newErrors.name = "Event name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.timeStart) newErrors.timeStart = "Start time is required"
    if (!formData.timeEnd) newErrors.timeEnd = "End time is required"
    if (!formData.totalTickets || Number.parseInt(formData.totalTickets) <= 0) {
      newErrors.totalTickets = "Total tickets must be a positive number"
    }
    if (!formData.price || Number.parseFloat(formData.price) < 0) {
      newErrors.price = "Price must be a non-negative number"
    }

    // Validate time range
    if (formData.timeStart && formData.timeEnd && formData.timeStart >= formData.timeEnd) {
      newErrors.timeEnd = "End time must be after start time"
    }

    // Validate date is not in the past
    if (formData.date && new Date(formData.date) < new Date()) {
      newErrors.date = "Event date cannot be in the past"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const eventData = {
        ...formData,
        totalTickets: Number.parseInt(formData.totalTickets),
        price: Number.parseFloat(formData.price),
        ticketsSold: 0,
        revenue: 0,
        status: "upcoming",
        attendees: 0,
        organiserId: "org_admin",
        organiserName: "Admin",
      }

      onCreateEvent(eventData)

      // Reset form
      setFormData({
        eventId: "",
        name: "",
        location: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        totalTickets: "",
        price: "",
        description: "",
      })

      onClose()
    } catch (error) {
      console.error("Error creating event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateEventId = () => {
    const id = `evt_${Date.now()}`
    setFormData((prev) => ({ ...prev, eventId: id }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-md border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <Plus className="h-6 w-6 mr-2 text-purple-400" />
            Create New Event
          </DialogTitle>
          <DialogDescription className="text-purple-200">
            Fill in the details below to create a new event with facial recognition ticketing
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event ID */}
            <div className="space-y-2">
              <Label htmlFor="eventId" className="text-white">
                Event ID
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                  placeholder="evt_001"
                />
                <Button
                  type="button"
                  onClick={generateEventId}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Generate
                </Button>
              </div>
              {errors.eventId && <p className="text-red-400 text-sm">{errors.eventId}</p>}
            </div>

            {/* Event Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Event Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                placeholder="Summer Music Festival"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                placeholder="Central Park, New York"
              />
              {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white"
              />
              {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="timeStart" className="text-white flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Start Time
              </Label>
              <Input
                id="timeStart"
                name="timeStart"
                type="time"
                value={formData.timeStart}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white"
              />
              {errors.timeStart && <p className="text-red-400 text-sm">{errors.timeStart}</p>}
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <Label htmlFor="timeEnd" className="text-white flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                End Time
              </Label>
              <Input
                id="timeEnd"
                name="timeEnd"
                type="time"
                value={formData.timeEnd}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white"
              />
              {errors.timeEnd && <p className="text-red-400 text-sm">{errors.timeEnd}</p>}
            </div>

            {/* Total Tickets */}
            <div className="space-y-2">
              <Label htmlFor="totalTickets" className="text-white flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Total Tickets
              </Label>
              <Input
                id="totalTickets"
                name="totalTickets"
                type="number"
                min="1"
                value={formData.totalTickets}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                placeholder="1000"
              />
              {errors.totalTickets && <p className="text-red-400 text-sm">{errors.totalTickets}</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Ticket Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                placeholder="50.00"
              />
              {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 min-h-[100px]"
              placeholder="Describe your event..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

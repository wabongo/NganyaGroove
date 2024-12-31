import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { ScrollArea } from '../components/ui/scroll-area'
import { Rating, RatingDisplay } from '../components/ui/rating'
import { QRCodeSVG } from 'qrcode.react'
import { Star } from 'lucide-react'
import { cn } from '../lib/utils'
import './GrooveTrips.css';

const initialTrips = [
  {
    id: 1,
    name: 'Eastlands Matatu Experience',
    date: '2024-01-15',
    time: '10:00 AM',
    price: 2500,
    description: 'Experience the vibrant matatu culture of Eastlands. Visit popular stops and learn about the art and music that defines the scene.',
    route: 'CBD - Buruburu - Umoja - Kayole',
    availableSeats: 15,
    image: '/Rt 33/20240605_095219_lmc_8.4.jpg',
    category: 'Cultural',
    duration: '4 hours',
    includes: ['Guide', 'Snacks', 'Photos', 'Matatu Rides'],
    meetingPoint: 'CBD Bus Station'
  },
  {
    id: 2,
    name: 'Ngong Road Art Tour',
    date: '2024-01-20',
    time: '2:00 PM',
    price: 3000,
    description: 'Discover the artistic matatus of Ngong Road. Meet artists and learn about the inspiration behind their designs.',
    route: 'CBD - Yaya - Junction - Karen',
    availableSeats: 12,
    image: '/Rt 33/20240615_135711_lmc_8.4.jpg',
    category: 'Art',
    duration: '5 hours',
    includes: ['Artist Meet', 'Art Materials', 'Photos', 'Matatu Rides'],
    meetingPoint: 'Yaya Centre'
  },
  {
    id: 3,
    name: 'Thika Road Night Experience',
    date: '2024-01-25',
    time: '7:00 PM',
    price: 3500,
    description: 'Experience the nightlife of Thika Road matatus. See the LED lights and experience the sound systems.',
    route: 'CBD - Allsops - Roysambu - Kahawa',
    availableSeats: 10,
    image: '/Rt 33/20240615_155923_lmc_8.4.jpg',
    category: 'Night Life',
    duration: '6 hours',
    includes: ['Dinner', 'Club Entry', 'Photos', 'Matatu Rides'],
    meetingPoint: 'Thika Road Mall'
  },
  {
    id: 4,
    name: 'Mombasa Road Culture Tour',
    date: '2024-02-01',
    time: '11:00 AM',
    price: 2800,
    description: 'Explore the unique matatu culture of Mombasa Road. Visit major stops and experience different matatu designs.',
    route: 'CBD - South B - Imara - Mlolongo',
    availableSeats: 8,
    image: '/Rt 33/20240615_160357_lmc_8.4.jpg',
    category: 'Cultural',
    duration: '5 hours',
    includes: ['Lunch', 'Photos', 'Matatu Rides'],
    meetingPoint: 'South B Shopping Centre'
  },
  {
    id: 5,
    name: 'Photography Workshop Tour',
    date: '2024-02-05',
    time: '9:00 AM',
    price: 4000,
    description: 'Learn to capture the essence of matatu culture through photography. Professional photographer included.',
    route: 'CBD - Various Locations',
    availableSeats: 6,
    image: '/Rt 33/20240615_155923_lmc_8.4.jpg',
    category: 'Workshop',
    duration: '8 hours',
    includes: ['Camera Rental', 'Lunch', 'Photo Editing Session', 'Matatu Rides'],
    meetingPoint: 'KICC'
  },
  {
    id: 6,
    name: 'Matatu Music Experience',
    date: '2024-02-10',
    time: '3:00 PM',
    price: 3200,
    description: 'Immerse yourself in the music culture of matatus. Meet DJs and experience live mixing.',
    route: 'CBD - Eastlands - Westlands',
    availableSeats: 10,
    image: '/Rt 33/20240615_160357_lmc_8.4.jpg',
    category: 'Music',
    duration: '6 hours',
    includes: ['DJ Session', 'Dinner', 'Club Entry', 'Matatu Rides'],
    meetingPoint: 'Westlands'
  }
]

const trips = initialTrips.map(trip => ({
  ...trip,
  reviews: [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      comment: 'Amazing experience! The guide was very knowledgeable and friendly.',
      date: '2024-01-01'
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      comment: 'Great tour, loved learning about the matatu culture.',
      date: '2024-01-02'
    }
  ],
  averageRating: 4.5,
  totalReviews: 2
}))

const categories = ['All', 'Cultural', 'Art', 'Night Life', 'Workshop', 'Music']
const durations = ['All', '4 hours', '5 hours', '6 hours', '8 hours']
const priceRanges = ['All', '0-3000', '3001-4000', '4001+']

const GrooveTrips = () => {
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
    preferredContact: 'email'
  })
  const [ticketInfo, setTicketInfo] = useState(null)
  
  // Filtering states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDuration, setSelectedDuration] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All')
  const [sortBy, setSortBy] = useState('date') // 'date', 'price-low', 'price-high'

  const [selectedTripForReview, setSelectedTripForReview] = useState(null)
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    author: '',
    comment: ''
  })

  const filteredTrips = useMemo(() => {
    return trips
      .filter(trip => {
        const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            trip.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || trip.category === selectedCategory
        const matchesDuration = selectedDuration === 'All' || trip.duration === selectedDuration
        
        let matchesPrice = true
        if (selectedPriceRange !== 'All') {
          const [min, max] = selectedPriceRange.split('-').map(Number)
          if (max) {
            matchesPrice = trip.price >= min && trip.price <= max
          } else {
            matchesPrice = trip.price >= min
          }
        }

        return matchesSearch && matchesCategory && matchesDuration && matchesPrice
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'date':
          default:
            return new Date(a.date) - new Date(b.date)
        }
      })
  }, [searchQuery, selectedCategory, selectedDuration, selectedPriceRange, sortBy])

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const ticketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    const newTicketInfo = {
      ticketId,
      tripId: selectedTrip.id,
      tripName: selectedTrip.name,
      tripDate: selectedTrip.date,
      tripTime: selectedTrip.time,
      ...bookingInfo,
      purchaseDate: new Date().toISOString()
    }

    setTicketInfo(newTicketInfo)
  }

  const submitReview = (tripId) => {
    const trip = trips.find(t => t.id === tripId)
    if (!trip) return

    const newReview = {
      id: Date.now(),
      author: reviewForm.author,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0]
    }

    trip.reviews.push(newReview)
    trip.totalReviews += 1
    trip.averageRating = trip.reviews.reduce((acc, review) => acc + review.rating, 0) / trip.reviews.length

    setReviewForm({ rating: 0, author: '', comment: '' })
    setSelectedTripForReview(null)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={cn(
          'h-4 w-4',
          index < Math.floor(rating) 
            ? 'text-primary fill-primary' 
            : index < rating 
              ? 'text-primary fill-primary/50' 
              : 'text-muted-foreground'
        )}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Groove Trips</h1>
            <p className="text-muted-foreground">
              Experience the vibrant matatu culture through our curated trips
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 space-y-6 hidden md:block">
            <div className="space-y-4">
              <Label>Search Trips</Label>
              <Input
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-muted/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-4">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Duration</Label>
              <Select
                value={selectedDuration}
                onValueChange={(value) => setSelectedDuration(value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Price Range</Label>
              <Select
                value={selectedPriceRange}
                onValueChange={(value) => setSelectedPriceRange(value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range === 'All' ? 'All Prices' : `KSH ${range}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Sort By</Label>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trips Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <Card key={trip.id} className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{trip.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(trip.date).toLocaleDateString()} at {trip.time}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {trip.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {trip.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(trip.averageRating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({trip.totalReviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary">
                          KSH {trip.price.toLocaleString()}
                        </span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="golden"
                            >
                              Book Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>{trip.name}</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
                              <div className="space-y-4">
                                <p className="text-muted-foreground">
                                  {trip.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {renderStars(trip.averageRating)}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    ({trip.totalReviews} reviews)
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(trip.date).toLocaleDateString()} at {trip.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Meeting Point: {trip.meetingPoint}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Duration: {trip.duration}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Includes: {trip.includes.join(', ')}
                                </p>
                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                      id="name"
                                      value={bookingInfo.name}
                                      onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={bookingInfo.email}
                                      onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                      id="phone"
                                      type="tel"
                                      value={bookingInfo.phone}
                                      onChange={(e) => setBookingInfo({ ...bookingInfo, phone: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="numberOfTickets">Number of Tickets</Label>
                                    <Input
                                      id="numberOfTickets"
                                      type="number"
                                      min="1"
                                      value={bookingInfo.numberOfTickets}
                                      onChange={(e) => setBookingInfo({ ...bookingInfo, numberOfTickets: parseInt(e.target.value, 10) })}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="preferredContact">Preferred Contact</Label>
                                    <Select
                                      value={bookingInfo.preferredContact}
                                      onValueChange={(value) => setBookingInfo({ ...bookingInfo, preferredContact: value })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select contact method" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="phone">Phone</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button type="submit" variant="golden" className="w-full">
                                    Confirm Booking
                                  </Button>
                                </form>
                                {ticketInfo && (
                                  <div className="mt-4 p-4 border rounded-lg">
                                    <h4 className="font-semibold">Booking Confirmation</h4>
                                    <p>Ticket ID: {ticketInfo.ticketId}</p>
                                    <p>Trip: {ticketInfo.tripName}</p>
                                    <p>Date: {new Date(ticketInfo.tripDate).toLocaleDateString()} at {ticketInfo.tripTime}</p>
                                    <p>Name: {ticketInfo.name}</p>
                                    <p>Email: {ticketInfo.email}</p>
                                    <p>Phone: {ticketInfo.phone}</p>
                                    <p>Tickets: {ticketInfo.numberOfTickets}</p>
                                    <p>Contact: {ticketInfo.preferredContact}</p>
                                    <p>Purchase Date: {new Date(ticketInfo.purchaseDate).toLocaleString()}</p>
                                    <div className="mt-4">
                                      <QRCodeSVG value={JSON.stringify(ticketInfo)} size={128} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrooveTrips

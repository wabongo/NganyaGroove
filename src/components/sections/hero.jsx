import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Hero = ({
  title = "Join The Ride, Feel The Vibe",
  subtitle = "Nganya Groove",
  description = "Immerse yourself in the vibrant world of Kenyan matatu culture through our curated experiences, merchandise, and events.",
  image = "/Hero.png",
  primaryAction = { label: "Book a Trip", href: "/groove-trips" },
  secondaryAction = { label: "Hire a Matatu", href: "/hire" }
}) => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <h2 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {subtitle}
          </h2>
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-gray-200 text-xl mb-8">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="golden" size="lg">
              <Link to={primaryAction.href}>{primaryAction.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

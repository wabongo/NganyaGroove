import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/groove-trips', label: 'Groove Trips' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/events', label: 'Events' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-12 w-auto"
              src="/logo.jpg"
              alt="Matatu Culture"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="golden" className="ml-8">
              <Link to="/hire">Hire a Matatu</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                 className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 w-full">
              <Button asChild variant="golden" className="w-full">
                <Link to="/hire">Hire a Matatu</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

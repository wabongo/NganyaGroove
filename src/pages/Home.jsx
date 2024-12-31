import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Play, Pause, Music2 } from 'lucide-react'
import BlockRevealer from '../components/BlockRevealer/BlockRevealer'
import { cn } from '../lib/utils'

const features = [
  {
    icon: '🎵',
    title: 'Groove Trips',
    description: 'Join our curated matatu experiences with the best music and vibes',
    link: '/groove-trips'
  },
  {
    icon: '🚌',
    title: 'Hire a Matatu',
    description: 'Get a customized matatu for your special events and occasions',
    link: '/hire'
  },
  {
    icon: '👕',
    title: 'Merch Store',
    description: 'Rep the culture with our exclusive merchandise collection',
    link: '/shop'
  }
]

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          color: `rgba(var(--primary), ${Math.random() * 0.5 + 0.3})`
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      createParticles()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('/Hero.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlockRevealer>
            <h1 className="space-y-4">
              <div className="text-6xl font-bold text-primary">Matatu Culture</div>
              <div className="text-3xl text-foreground/90">Experience the Groove</div>
            </h1>
          </BlockRevealer>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="golden">
              <Link to="/groove-trips">Book a Trip</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/hire">Hire a Matatu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <BlockRevealer>
            <h2 className="text-4xl font-bold text-center text-primary mb-16">
              Experience the Vibe
            </h2>
          </BlockRevealer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="group relative"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="relative z-10 py-24 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <BlockRevealer>
            <h2 className="text-4xl font-bold text-center text-primary mb-16">
              Today's Playlist
            </h2>
          </BlockRevealer>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Button
                  variant="golden"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                
                <div className="flex-1 space-y-1.5">
                  <h3 className="text-lg font-semibold">East African Hits</h3>
                  <p className="text-sm text-muted-foreground">Curated by Ndete</p>
                </div>
                
                <div className="w-32 flex items-center gap-2">
                  <Music2 className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <audio ref={audioRef} src="/music/playlist.mp3" />
        </div>
      </section>

      {/* Speedometer */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="w-24 h-24 rounded-full border-4 border-primary relative">
          <div 
            className="absolute left-1/2 bottom-1/2 w-1 h-1/2 bg-primary origin-bottom transition-transform duration-1000"
            style={{
              transform: `rotate(${((currentTime.getSeconds() % 30) / 30) * 180 - 90}deg)`
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home

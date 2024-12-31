import React, { useState, useMemo } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { ScrollArea } from '../components/ui/scroll-area'
import { useToast } from '../components/ui/use-toast'
import { ShoppingCart, Plus, Minus, X } from 'lucide-react'
import './Shop.css';

const products = [
  {
    id: 1,
    name: 'Matatu Culture T-Shirt',
    price: 1500,
    description: 'Premium cotton t-shirt featuring iconic matatu art',
    category: 'Clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    image: '/shop/tshirt.jpg'
  },
  {
    id: 2,
    name: 'Matatu Art Print',
    price: 2500,
    description: 'High-quality print of original matatu artwork',
    category: 'Art',
    sizes: ['A4', 'A3', 'A2'],
    colors: ['Full Color'],
    image: '/shop/print.jpg'
  },
  {
    id: 3,
    name: 'Matatu Culture Cap',
    price: 1200,
    description: 'Stylish cap with embroidered matatu designs',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'Red'],
    image: '/shop/cap.jpg'
  },
  {
    id: 4,
    name: 'Matatu Photography Book',
    price: 3500,
    description: 'Coffee table book featuring stunning matatu photography',
    category: 'Books',
    sizes: ['Standard'],
    colors: ['Hardcover'],
    image: '/shop/book.jpg'
  },
  {
    id: 5,
    name: 'Matatu Culture Hoodie',
    price: 2800,
    description: 'Comfortable hoodie with unique matatu designs',
    category: 'Clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    image: '/shop/hoodie.jpg'
  },
  {
    id: 6,
    name: 'Matatu Art Canvas',
    price: 4500,
    description: 'Gallery-quality canvas print of matatu artwork',
    category: 'Art',
    sizes: ['30x40cm', '50x70cm', '70x100cm'],
    colors: ['Full Color'],
    image: '/shop/canvas.jpg'
  }
]

const categories = ['All', 'Clothing', 'Art', 'Accessories', 'Books']
const priceRanges = ['All', '0-2000', '2001-3500', '3501+']
const sizes = ['All', 'S', 'M', 'L', 'XL', 'A4', 'A3', 'A2', 'One Size', 'Standard', '30x40cm', '50x70cm', '70x100cm']
const colors = ['All', 'Black', 'White', 'Grey', 'Navy', 'Red', 'Full Color', 'Hardcover']

const Shop = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    size: 'All',
    color: 'All',
    priceRange: 'All',
    sort: 'name',
  })

  const [cart, setCart] = useState([])
  const [selectedSizeState, setSelectedSizeState] = useState({})
  const [selectedColorState, setSelectedColorState] = useState({})
  const { toast } = useToast()

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            product.description.toLowerCase().includes(filters.search.toLowerCase())
        const matchesCategory = filters.category === 'All' || product.category === filters.category
        const matchesSize = filters.size === 'All' || product.sizes.includes(filters.size)
        const matchesColor = filters.color === 'All' || product.colors.includes(filters.color)
        
        let matchesPrice = true
        if (filters.priceRange !== 'All') {
          const [min, max] = filters.priceRange.split('-').map(Number)
          if (max) {
            matchesPrice = product.price >= min && product.price <= max
          } else {
            matchesPrice = product.price >= min
          }
        }

        return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [filters.search, filters.category, filters.size, filters.color, filters.priceRange, filters.sort])

  const addToCart = (product) => {
    const size = selectedSizeState[product.id]
    const color = selectedColorState[product.id]

    if (!size || !color) {
      toast({
        title: 'Please select options',
        description: 'You must select both size and color before adding to cart',
        variant: 'destructive'
      })
      return
    }

    const existingItem = cart.find(
      item => item.id === product.id && item.size === size && item.color === color
    )

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, size, color, quantity: 1 }])
    }

    toast({
      title: 'Added to cart',
      description: `${product.name} (${size}, ${color}) has been added to your cart`
    })
  }

  const updateQuantity = (itemId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, size, color)
      return
    }

    setCart(cart.map(item =>
      item.id === itemId && item.size === size && item.color === color
        ? { ...item, quantity: newQuantity }
        : item
    ))
  }

  const removeFromCart = (itemId, size, color) => {
    setCart(cart.filter(item => 
      !(item.id === itemId && item.size === size && item.color === color)
    ))
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Matatu Culture Shop</h1>
            <p className="text-muted-foreground">
              Authentic matatu culture merchandise and collectibles
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative md:hidden">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}-${index}`}
                        className="flex items-start gap-4 p-4 border rounded-lg"
                      >
                        <div className="w-20 h-20 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Size: {item.size}</p>
                            <p>Color: {item.color}</p>
                            <p>KSH {item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {cart.length > 0 && (
                <div className="border-t mt-4 pt-4 space-y-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>KSH {cartTotal.toLocaleString()}</span>
                  </div>
                  <Button variant="golden" className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 space-y-6 hidden md:block">
            <div className="space-y-4">
              <Label>Search Products</Label>
              <Input
                placeholder="Search by name or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="bg-muted/50 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-4">
              <Label>Category</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
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
              <Label>Size</Label>
              <Select
                value={filters.size}
                onValueChange={(value) => handleFilterChange('size', value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Color</Label>
              <Select
                value={filters.color}
                onValueChange={(value) => handleFilterChange('color', value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Price Range</Label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
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
                value={filters.sort}
                onValueChange={(value) => handleFilterChange('sort', value)}
              >
                <SelectTrigger className="bg-muted/50 border-primary/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <span className="text-sm text-primary">{product.price}</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {product.category}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Size</Label>
                          <Select
                            value={selectedSizeState[product.id] || ''}
                            onValueChange={(value) => setSelectedSizeState({ ...selectedSizeState, [product.id]: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Select
                            value={selectedColorState[product.id] || ''}
                            onValueChange={(value) => setSelectedColorState({ ...selectedColorState, [product.id]: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.colors.map((color) => (
                                <SelectItem key={color} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="golden"
                          className="w-full"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative md:hidden">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}-${index}`}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="w-20 h-20 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                          <p>KSH {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {cart.length > 0 && (
              <div className="border-t mt-4 pt-4 space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>KSH {cartTotal.toLocaleString()}</span>
                </div>
                <Button variant="golden" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Shop

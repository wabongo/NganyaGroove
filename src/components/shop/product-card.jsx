import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ProductCard = ({
  image,
  title,
  price,
  description,
  onAddToCart
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-primary text-lg font-semibold">
          KSH {price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="golden"
          className="w-full"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

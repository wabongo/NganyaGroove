import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Rating({ value = 0, max = 5, onChange, readonly = false, size = 'default' }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={cn(
            'focus:outline-none',
            !readonly && 'cursor-pointer hover:scale-110 transition-transform'
          )}
          onClick={() => !readonly && onChange?.(star)}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= value
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted-foreground'
            )}
          />
        </button>
      ))}
    </div>
  )
}

export function RatingDisplay({ value = 0, max = 5, size = 'default', showValue = false }) {
  return (
    <div className="flex items-center gap-2">
      <Rating value={value} max={max} readonly size={size} />
      {showValue && (
        <span className="text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

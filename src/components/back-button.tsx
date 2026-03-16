'use client'

import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Go back
    </button>
  )
} 
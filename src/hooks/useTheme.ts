"use client"

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme
    
    // Check system preference if no stored theme
    if (!storedTheme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      console.log('Setting initial system theme:', systemTheme)
      setTheme(systemTheme)
      updateTheme(systemTheme)
    } else {
      console.log('Setting stored theme:', storedTheme)
      setTheme(storedTheme)
      updateTheme(storedTheme)
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    console.log('Updating theme to:', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('Toggling theme from', theme, 'to', newTheme)
    setTheme(newTheme)
    updateTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
    mounted
  }
}
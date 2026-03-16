"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <div className="flex items-center space-x-2 text-sm mb-6 text-muted-foreground">
      <Link href="/" className="hover:text-foreground transition-colors duration-200">Home</Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1
        const title = path.charAt(0).toUpperCase() + path.slice(1)

        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span className="text-foreground">{title}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors duration-200">
                {title}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

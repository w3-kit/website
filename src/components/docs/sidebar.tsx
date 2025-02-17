"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getComponentList } from '@/config/docs'

const sidebarItems = [
  {
    section: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ]
  },
  {
    section: 'Components',
    items: getComponentList().map(component => ({
      title: component.title,
      href: component.href,
    }))
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="md:sticky md:top-14 h-[calc(100vh-3.5rem)]">
      <div className="h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
        <nav className="px-4 py-6">
          {sidebarItems.map((section) => (
            <div key={section.section} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {section.section}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block text-sm transition-colors ${
                          isActive 
                            ? "text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
} 
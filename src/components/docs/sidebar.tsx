"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getComponentList } from '@/config/docs'

interface SidebarItem {
  title: string;
  href: string;
  isNew?: boolean;
}

interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

const sidebarItems: SidebarSection[] = [
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
      isNew: component.isNew,
    }))
  }
]

export function Sidebar() {
  const pathname = usePathname()

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      const event = new CustomEvent('closeMobileMenu');
      document.dispatchEvent(event);
    }
  };

  return (
    <aside className="md:sticky md:top-14 h-[calc(100vh-3.5rem)]">
      <div className="h-full overflow-y-auto border-r border-border [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
        <nav className="px-4 py-6">
          {sidebarItems.map((section) => (
            <div key={section.section} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {section.section}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`group flex items-center justify-between text-sm transition-colors ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{item.title}</span>
                        {item.isNew && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary group-hover:bg-primary/15 transition-colors">
                            NEW
                          </span>
                        )}
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

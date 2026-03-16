import Link from 'next/link'
import { Home } from 'lucide-react'
import { BackButton } from '@/components/back-button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="mt-10 flex items-center justify-center gap-6">
          <BackButton />
          <div className="w-px h-4 bg-border" />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="mt-12 space-y-2">
          <p className="text-sm font-medium text-foreground">
            Looking for something specific?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
            <span className="hidden sm:inline text-border">&bull;</span>
            <Link href="/docs/components" className="hover:text-foreground transition-colors">
              Components
            </Link>
            <span className="hidden sm:inline text-border">&bull;</span>
            <Link href="/docs/examples" className="hover:text-foreground transition-colors">
              Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

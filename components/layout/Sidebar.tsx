import Link from "next/link";

export function Sidebar() {
  return (
    <nav className="px-4 grow border-r border-r-foreground/10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-2xl font-bold mb-5">
          Menu
        </h1>
        <div className="flex flex-col space-y-3">
          <Link href="/dashboard" className="text-foreground hover:text-foreground/80 transition-colors duration-200">
              Dashboard
          </Link>
          <Link href="/dashboard/guild" className="text-foreground hover:text-foreground/80 transition-colors duration-200">
              Guild Manager
          </Link>
          <Link href="/dashboard/news" className="text-foreground hover:text-foreground/80 transition-colors duration-200">
              News Manager
          </Link>
          <Link href="/dashboard/preview" className="text-foreground hover:text-foreground/80 transition-colors duration-200">
            Preview Manager
          </Link>
          <Link href="/dashboard/metrics" className="text-foreground hover:text-foreground/80 transition-colors duration-200">
              Metrics
          </Link>
        </div>
      </div>
    </nav>
  )
}
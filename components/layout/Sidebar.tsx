import Link from 'next/link';

export function Sidebar() {
  return (
    <nav className='grow border-r border-r-foreground/10 px-4'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='mb-5 text-2xl font-bold text-foreground'>Menu</h1>
        <div className='flex flex-col space-y-3'>
          <Link
            href='/dashboard'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Dashboard
          </Link>
          <Link
            href='/dashboard/guild'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Guild Manager
          </Link>
          <Link
            href='/dashboard/profiles'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Profiles
          </Link>
          <Link
            href='/dashboard/referrals'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Referrals
          </Link>
          <Link
            href='/dashboard/news'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            News Manager
          </Link>
          <Link
            href='/dashboard/tags'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Vanity Tags
          </Link>
          <Link
            href='/dashboard/preview'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Preview Manager
          </Link>
          <Link
            href='/dashboard/metrics'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Metrics
          </Link>
          <Link
            href='/dashboard/redirects'
            className='text-foreground transition-colors duration-200 hover:text-foreground/80'
          >
            Redirects
          </Link>
        </div>
      </div>
    </nav>
  );
}

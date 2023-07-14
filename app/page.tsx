import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types'
import { LoginButton } from '@/components/LoginButton'
import Link from 'next/link'


export default async function Index() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: user } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        {user
          ? <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            <Link href='dashboard'>Dashboard</Link>
          </button>
          : <LoginButton />}
      </div>
    </div>
  );
}

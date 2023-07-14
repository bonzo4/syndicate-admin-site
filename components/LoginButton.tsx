"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LoginButton() {
  const supabase = createClientComponentClient();
  
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: 'http://localhost:3000',
        scopes: 'identify guilds'
      }
    })
  }

  return (
    <button
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      onClick={handleLogin}>Login
    </button>
  )
}
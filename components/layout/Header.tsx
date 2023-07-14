import { User } from "@supabase/supabase-js";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { LoginButton } from "../LoginButton";


type HeaderProps = {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 bg-background">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.user_metadata.name}!
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
    </nav>
  )
}
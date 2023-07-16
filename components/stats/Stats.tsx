"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useCountStats } from "@/hooks/stats/stats";

export function Stats() {

  const supabase = createClientComponentClient<Database>()

  const guilds = useCountStats(supabase, "guilds");
  const channels = useCountStats(supabase, "news_channels");
  const users = useCountStats(supabase, "users");
  const views = useCountStats(supabase, "views");
  const interactions = useCountStats(supabase, "interactions")
  
  return (
    <div className="flex flex-row items-center">
      <div className="animate-in flex flex-row opacity-0  text-foreground space-x-10">
        <StatsCard name="guilds" value={guilds.value} change={guilds.change} />
        <StatsCard name="channels" value={channels.value} change={channels.change} />
        <StatsCard name="users" value={users.value} change={users.change} />
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
      </div>
    </div>
  )

}
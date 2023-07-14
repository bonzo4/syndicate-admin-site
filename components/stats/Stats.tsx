"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useViewStats, useInteractions } from "@/hooks/stats/news";
import { useUserStats  } from "@/hooks/stats/stats";
import { useChannelStats, useGuildStats } from "@/hooks/stats/guilds";

export function Stats() {

  const supabase = createClientComponentClient<Database>()

  const guilds = useGuildStats(supabase);
  const channels = useChannelStats(supabase);
  const users = useUserStats(supabase);
  const views = useViewStats(supabase);
  const interactions = useInteractions(supabase)
  
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
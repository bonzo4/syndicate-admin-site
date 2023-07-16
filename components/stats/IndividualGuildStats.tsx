"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useCountStatsByGuild } from "@/hooks/stats/stats";

type IndividualGuildStatsProps = {
  guildId: string
  members: number
}

export function IndividualGuildStats({guildId, members}: IndividualGuildStatsProps) {

  const supabase = createClientComponentClient<Database>()
  const views = useCountStatsByGuild(supabase, guildId, "views");
  const interactions = useCountStatsByGuild(supabase, guildId, "interactions")
  const channels = useCountStatsByGuild(supabase, guildId, "news_channels");
  const mentions = useCountStatsByGuild(supabase, guildId, "mentions_roles");

  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
        <StatsCard name="users" value={members} />
        <StatsCard name="channels" value={channels.value} />
        <StatsCard name="mention roles" value={mentions.value} />
      </div>
    </div>
  )
}
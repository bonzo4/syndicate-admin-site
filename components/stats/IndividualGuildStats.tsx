"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useNewsChannelsByGuild, useInteractionsStatsByGuild, useViewStatsByGuild, useMentionsByGuild } from "@/hooks/stats/guilds";
import { Stats } from "./Stats";

type IndividualGuildStatsProps = {
  guildId: string
  members: number
}

export function IndividualGuildStats({guildId, members}: IndividualGuildStatsProps) {

  const supabase = createClientComponentClient<Database>()
  const views = useViewStatsByGuild(supabase, guildId)
  const interactions = useInteractionsStatsByGuild(supabase, guildId)
  const channels = useNewsChannelsByGuild(supabase, guildId)
  const mentions = useMentionsByGuild(supabase, guildId)

  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
        <StatsCard name="users" value={members} />
        <StatsCard name="channels" value={channels.length} />
        <StatsCard name="mention roles" value={mentions.length} />
      </div>
    </div>
  )
}
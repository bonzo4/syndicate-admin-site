"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useGuildStats,  useGuildSettingsStats,  useMentionRolesStats, useChannelStats} from "../../hooks/stats/guilds";

export function GuildStats() {

  const supabase = createClientComponentClient<Database>()

  const guilds = useGuildStats(supabase);
  const guildSettings = useGuildSettingsStats(supabase);
  const channels = useChannelStats(supabase);
  const mentionRoles = useMentionRolesStats(supabase);
  
  return (
    <div className="flex flex-row items-center ">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="guilds" value={guilds.value} change={guilds.change} />
        <StatsCard name="guilds setup" value={guildSettings.value} change={guildSettings.change} />
        <StatsCard name="channels" value={channels.value} change={channels.change} />
        <StatsCard name="mention roles" value={mentionRoles.value} change={mentionRoles.change} />
      </div>
    </div>
  )

}
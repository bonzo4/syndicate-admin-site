"use client";

import { useTagViews } from "@/hooks/stats/views";
import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useTagInteractions } from "@/hooks/stats/interactions";

type TagStatsProps = {
  name: string
}

export default function TagStats({name}: TagStatsProps) {

  const supabase = createClientComponentClient<Database>()

  const viewStats = useTagViews(supabase, name)

  const interactionStats = useTagInteractions(supabase, name)

  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground">
      <div className="flex flex-row">
        <StatsCard name="Views" value={viewStats.value} />
        <StatsCard name="Interactions" value={interactionStats.value} />
      </div>
    </div>
  );
}
"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useViewStatsByNews, useInteractionStatsByNews, useErrorsByNews, useViewStats, useInteractions } from "@/hooks/stats/news";

type IndividualNewsStatsProps = {
  newsId: number
}

export function IndividualNewsStats({newsId}: IndividualNewsStatsProps) {

  const supabase = createClientComponentClient<Database>()
  const views = useViewStatsByNews(supabase, newsId)
  const interactions = useInteractionStatsByNews(supabase, newsId)
  const errors = useErrorsByNews(supabase, newsId)

  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
        <StatsCard name="errors" value={errors.value} change={errors.change} />
      </div>
    </div>
  )
}
"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useCountStatsByNews } from "@/hooks/stats/stats";

type IndividualNewsStatsProps = {
  newsId: number
}

export function IndividualNewsStats({newsId}: IndividualNewsStatsProps) {

  const supabase = createClientComponentClient<Database>()
  const views = useCountStatsByNews(supabase, newsId, "views");
  const interactions = useCountStatsByNews(supabase, newsId, "interactions")
  const errors = useCountStatsByNews(supabase, newsId, "bot_errors");

  
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
"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useCountStatsByNews } from "@/hooks/stats/stats";
import { usePrimeViews } from "@/hooks/stats/views";
import { useLinkClicksCount } from "@/hooks/stats/linksClicks";

type IndividualNewsStatsProps = {
  newsId: number
  tags: string[],
  stopDate: Date
}

export function IndividualNewsStats({newsId, tags, stopDate}: IndividualNewsStatsProps) {

  const supabase = createClientComponentClient<Database>()
  const views = useCountStatsByNews(supabase, newsId, "views");
  const primeViews = usePrimeViews(supabase, newsId, tags, stopDate);
  const interactions = useCountStatsByNews(supabase, newsId, "interactions")
  const linkClicks = useLinkClicksCount(supabase, newsId);
  const errors = useCountStatsByNews(supabase, newsId, "bot_errors");
  const users = useCountStatsByNews(supabase, newsId, "_news_users");
  
  return (
    <div className="flex flex-col items-center py-2">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="prime views" value={primeViews.value} change={primeViews.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
        <StatsCard name="link clicks" value={linkClicks} />
      </div>
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="new users" value={users.value} change={users.change} />
        <StatsCard name="errors" value={errors.value} change={errors.change} />
      </div>
    </div>
  )
}
"use client";

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { StatsCard } from "./StatsCard";
import { useViewStats,  useInteractions } from "@/hooks/stats/news";

export function NewsStats() {

  const supabase = createClientComponentClient<Database>()

  const views = useViewStats(supabase);
  const interactions = useInteractions(supabase)
  
  return (
    <div className="flex flex-row items-center ">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
        <StatsCard name="views" value={views.value} change={views.change} />
        <StatsCard name="interactions" value={interactions.value} change={interactions.change} />
      </div>
    </div>
  )

}
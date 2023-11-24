'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StatsCard } from './StatsCard';
import { useCountStats } from '@/hooks/stats/stats';
import { useViews } from '@/hooks/stats/views';
import { useInteractions } from '@/hooks/stats/interactions';

export function NewsStats() {
  const supabase = createClientComponentClient<Database>();

  const views = useViews(supabase);
  const interactions = useInteractions(supabase);

  return (
    <div className='flex flex-row items-center '>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard name='views' value={views.value} change={views.change} />
        <StatsCard
          name='interactions'
          value={interactions.value}
          change={interactions.change}
        />
      </div>
    </div>
  );
}

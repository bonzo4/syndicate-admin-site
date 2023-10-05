'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StatsCard } from './StatsCard';
import { useCountStats } from '@/hooks/stats/stats';

export function ProfileStats() {
  const supabase = createClientComponentClient<Database>();

  const profiles = useCountStats(supabase, 'profiles');
  const discordActions = useCountStats(supabase, 'discord_actions');

  return (
    <div className='flex flex-row items-center '>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard
          name='profiles'
          value={profiles.value}
          change={profiles.change}
        />
        <StatsCard
          name='discord actions worth points'
          value={discordActions.value}
          change={discordActions.change}
        />
      </div>
    </div>
  );
}

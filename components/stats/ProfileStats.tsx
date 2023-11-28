'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StatsCard } from './StatsCard';
import { useCountStats } from '@/hooks/stats/stats';
import {
  useEthProfileCounts,
  useEthProfilePoints,
  useSolProfileCounts,
  useSolProfilePoints,
} from '@/hooks/metrics/profiles';

export function ProfileStats() {
  const supabase = createClientComponentClient<Database>();

  const profiles = useCountStats(supabase, 'profiles');
  const discordActions = useCountStats(supabase, 'discord_actions');
  const profileInteractions = useCountStats(supabase, 'profile_interactions');

  const solProfiles = useSolProfileCounts(supabase);
  const ethProfiles = useEthProfileCounts(supabase);
  const solPoints = useSolProfilePoints(supabase);
  const ethPoints = useEthProfilePoints(supabase);

  return (
    <div className='flex flex-col items-center '>
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
        <StatsCard
          name='profile interactions'
          value={profileInteractions.value}
          change={profileInteractions.change}
        />
      </div>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard name='Sol Profiles' value={solProfiles} />
        <StatsCard name='Eth Profiles' value={ethProfiles} />
        <StatsCard name='Sol Points' value={solPoints} />
        <StatsCard name='Eth Points' value={ethPoints} />
      </div>
    </div>
  );
}

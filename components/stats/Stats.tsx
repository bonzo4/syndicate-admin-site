'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StatsCard } from './StatsCard';
import { useCountStats } from '@/hooks/stats/stats';
import {
  useEthTagCount,
  useNoTagCount,
  useSolTagCount,
} from '@/hooks/stats/tags';
import { useViews } from '@/hooks/stats/views';
import { useInteractions } from '@/hooks/stats/interactions';

export function Stats() {
  const supabase = createClientComponentClient<Database>();

  const guilds = useCountStats(supabase, 'guilds');
  const channels = useCountStats(supabase, 'news_channels');
  const users = useCountStats(supabase, 'discord_users');
  const views = useViews(supabase);
  const interactions = useInteractions(supabase);
  const ethTags = useEthTagCount(supabase);
  const solTags = useSolTagCount(supabase);
  const noTags = useNoTagCount(supabase);

  return (
    <div className='flex flex-col items-center'>
      <div className='animate-in flex flex-row space-x-10  text-foreground opacity-0'>
        <StatsCard name='guilds' value={guilds.value} change={guilds.change} />
        <StatsCard
          name='channels'
          value={channels.value}
          change={channels.change}
        />
        <StatsCard name='users' value={users.value} change={users.change} />
        <StatsCard name='views' value={views.value} change={views.change} />
        <StatsCard
          name='interactions'
          value={interactions.value}
          change={interactions.change}
        />
      </div>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard
          name='Eth Servers'
          value={ethTags.value}
          change={ethTags.change}
        />
        <StatsCard
          name='Sol Servers'
          value={solTags.value}
          change={solTags.change}
        />
        <StatsCard name='No Tags' value={noTags.value} change={noTags.change} />
      </div>
    </div>
  );
}

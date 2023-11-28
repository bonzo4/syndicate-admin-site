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

export function GuildStats() {
  const supabase = createClientComponentClient<Database>();

  const guilds = useCountStats(supabase, 'guilds');
  const guildSettings = useCountStats(supabase, 'guild_settings', 'guild_id');
  const channels = useCountStats(supabase, 'news_channels');
  const mentionRoles = useCountStats(supabase, 'mention_roles');
  const ethTags = useEthTagCount(supabase);
  const solTags = useSolTagCount(supabase);
  const noTags = useNoTagCount(supabase);

  return (
    <div className='flex flex-col items-center '>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard name='guilds' value={guilds.value} change={guilds.change} />
        <StatsCard
          name='guilds setup'
          value={guildSettings.value}
          change={guildSettings.change}
        />
        <StatsCard
          name='channels'
          value={channels.value}
          change={channels.change}
        />
        <StatsCard
          name='mention roles'
          value={mentionRoles.value}
          change={mentionRoles.change}
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

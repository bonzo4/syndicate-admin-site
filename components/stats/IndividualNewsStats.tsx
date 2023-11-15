'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { StatsCard } from './StatsCard';
import { useCountStatsByNews } from '@/hooks/stats/stats';
import { usePrimeViews } from '@/hooks/stats/views';
import { useLinkClicksCount } from '@/hooks/stats/linksClicks';
import { useNewsMetrics } from '@/hooks/stats/newsMetrics';

type IndividualNewsStatsProps = {
  newsId: number;
  tags: string[];
  stopDate: Date;
};

export function IndividualNewsStats({
  newsId,
  tags,
  stopDate,
}: IndividualNewsStatsProps) {
  const supabase = createClientComponentClient<Database>();
  const metrics = useNewsMetrics(newsId, supabase);
  const errors = useCountStatsByNews(supabase, newsId, 'bot_errors');
  const users = useCountStatsByNews(supabase, newsId, '_news_users');

  return (
    <div className='flex flex-col items-center py-2'>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard name='views' value={metrics ? metrics.views : 0} />
        <StatsCard
          name='prime views'
          value={metrics ? metrics.prime_views : 0}
        />
        <StatsCard
          name='interactions'
          value={metrics ? metrics.interactions : 0}
        />
        <StatsCard
          name='link clicks'
          value={metrics ? metrics.link_clicks : 0}
        />
      </div>
      <div className='animate-in flex flex-row space-x-10 text-foreground opacity-0'>
        <StatsCard name='new users' value={users.value} change={users.change} />
        <StatsCard name='errors' value={errors.value} change={errors.change} />
      </div>
    </div>
  );
}

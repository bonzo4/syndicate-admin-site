'use client';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Pie } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { useGuildViewCounts } from '@/hooks/proportions/views';
import { generateRandomColors } from '@/utils/colors';
import { useGuildInteractionCounts } from '@/hooks/proportions/interactions';
import { useLinkClicksByUrl } from '@/hooks/proportions/links';

ChartJs.register(
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type ViewsAndInteractionsGraphProps = {
  newsId: number;
};

export function ViewsAndInteractionsPieGraph({
  newsId,
}: ViewsAndInteractionsGraphProps) {
  const supabase = createClientComponentClient<Database>();

  const viewCounts = useGuildViewCounts({
    supabase,
    newsId,
  });

  const interactionCounts = useGuildInteractionCounts({
    supabase,
    newsId,
  });

  const linkClickCounts = useLinkClicksByUrl({
    supabase,
    newsId,
  });

  return (
    <div className='flex w-full grow flex-col items-center py-2'>
      <div className='animate-in flex w-full grow flex-row space-x-10 text-foreground opacity-0'>
        <div className='flex w-full grow flex-col items-center space-y-2'>
          <span className='text-foreground'>Views</span>
          <Pie
            data={{
              labels: viewCounts.map((guild) => guild.guildName),
              datasets: [
                {
                  data: viewCounts.map((guild) => guild.views),
                  backgroundColor: generateRandomColors(viewCounts.length),
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
          <span className='text-foreground'>Interactions</span>
          <Pie
            data={{
              labels: interactionCounts.map((guild) => guild.guildName),
              datasets: [
                {
                  data: interactionCounts.map((guild) => guild.interactions),
                  backgroundColor: generateRandomColors(
                    interactionCounts.length
                  ),
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
          <span className='text-foreground'>Link Clicks</span>
          <Pie
            data={{
              labels: linkClickCounts.map(
                (url) => url.url.slice(0, 32) + '...'
              ),
              datasets: [
                {
                  data: linkClickCounts.map((url) => url.clicks),
                  backgroundColor: generateRandomColors(linkClickCounts.length),
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

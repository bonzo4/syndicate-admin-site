'use client';

import { useTagViewIntervals } from '@/hooks/intervals/views';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  BarElement,
} from 'chart.js';
import { useTagInteractionIntervals } from '@/hooks/intervals/interactions';

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TagsViewsAndInteractionsGraphProps = {
  tag: string;
};

export function TagViewsAndInteractionsGraph({
  tag,
}: TagsViewsAndInteractionsGraphProps) {
  const supabase = createClientComponentClient<Database>();

  const [rangeType, setRangeType] = useState<'days' | 'months' | 'years'>(
    'days'
  );
  const [range, setRange] = useState<number>(1);
  const [prime, setPrime] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>(new Date());

  const viewIntervals = useTagViewIntervals({
    supabase,
    rangeType,
    range,
    endDate,
    prime,
    tag,
  });

  const interactionIntervals = useTagInteractionIntervals({
    supabase,
    rangeType,
    range,
    endDate,
    tag,
  });

  const onPrimeChange = () => {
    setPrime(!prime);
  };

  return (
    <div className='flex w-[80%] grow flex-col items-center py-2'>
      <div className='animate-in flex w-full grow flex-row space-x-10 text-foreground opacity-0'>
        <div className='flex w-full grow flex-col items-center space-y-2'>
          <div className='flex flex-row items-center space-x-2'>
            <span className='text-foreground'>Interval:</span>
            <input
              type='radio'
              name='rangeType'
              value='days'
              checked={rangeType === 'days'}
              onChange={() => setRangeType('days')}
            />
            <span className='text-foreground'>Days</span>
            <input
              type='radio'
              name='rangeType'
              value='months'
              checked={rangeType === 'months'}
              onChange={() => setRangeType('months')}
            />
            <span className='text-foreground'>Months</span>
            <input
              type='radio'
              name='rangeType'
              value='years'
              checked={rangeType === 'years'}
              onChange={() => setRangeType('years')}
            />
            <span className='text-foreground'>Years</span>
            <input
              type='number'
              value={range}
              onChange={(e) => setRange(parseInt(e.target.value))}
              className='w-16 rounded-md border bg-background px-2 py-1 text-foreground'
            />
            <input type='checkbox' checked={prime} onChange={onPrimeChange} />
            <span className='text-foreground'>Prime</span>
          </div>
          <Bar
            data={{
              labels: viewIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Views',
                  data: viewIntervals.map((interval) => interval.views),
                  backgroundColor: '#F87171',
                  borderColor: '#F87171',
                  barThickness: 6,
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
          <Bar
            data={{
              labels: interactionIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Interactions',
                  data: interactionIntervals.map(
                    (interval) => interval.interactions
                  ),
                  backgroundColor: '#60A5FA',
                  borderColor: '#60A5FA',
                  barThickness: 6,
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

'use client';

import { useGuildIntervals } from '@/hooks/intervals/guilds';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';
import { useProfileIntervals } from '@/hooks/intervals/profiles';
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ProfileGraph() {
  const supabase = createClientComponentClient<Database>();

  const [rangeType, setRangeType] = useState<'days' | 'months' | 'years'>(
    'days'
  );
  const [range, setRange] = useState<number>(1);

  const profileIntervals = useProfileIntervals({
    rangeType,
    range,
    supabase,
  });
  return (
    <div className='flex w-full grow flex-col items-center py-2'>
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
          </div>
          <Line
            data={{
              labels: profileIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Profiles',
                  data: profileIntervals.map((interval) => interval.profiles),
                  backgroundColor: '#F87171',
                  borderColor: '#F87171',
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

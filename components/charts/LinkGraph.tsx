'use client';

import { useLinkClickIntervals } from '@/hooks/charts/links';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { generateRandomColors } from '@/utils/colors';

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
  ArcElement,
} from 'chart.js';

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function LinkClickGraph() {
  const supabase = createClientComponentClient<Database>();

  const [rangeType, setRangeType] = useState<
    'hour' | 'day' | 'week' | 'month' | 'year'
  >('day');
  const [prime, setPrime] = useState<boolean>(false);
  const linkClickIntervals = useLinkClickIntervals({
    supabase,
    rangeType,
  });

  const onPrimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrime(e.target.checked);
  };

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
              checked={rangeType === 'hour'}
              onChange={() => setRangeType('hour')}
            />
            <span className='text-foreground'>6 Hours</span>
            <input
              type='radio'
              name='rangeType'
              value='months'
              checked={rangeType === 'day'}
              onChange={() => setRangeType('day')}
            />
            <span className='text-foreground'>Day</span>
            <input
              type='radio'
              name='rangeType'
              value='years'
              checked={rangeType === 'week'}
              onChange={() => setRangeType('week')}
            />
            <span className='text-foreground'>Week</span>
            <input
              type='radio'
              name='rangeType'
              value='years'
              checked={rangeType === 'month'}
              onChange={() => setRangeType('month')}
            />
            <span className='text-foreground'>Month</span>
            <input
              type='radio'
              name='rangeType'
              value='years'
              checked={rangeType === 'year'}
              onChange={() => setRangeType('year')}
            />
            <span className='text-foreground'>Year</span>
            <input type='checkbox' checked={prime} onChange={onPrimeChange} />
            <span className='text-foreground'>Prime</span>
          </div>
          <Bar
            data={{
              labels: linkClickIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'LinkClicks',
                  data: linkClickIntervals.map((interval) => interval.links),
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
        </div>
      </div>
    </div>
  );
}

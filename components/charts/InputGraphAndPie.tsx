'use client';

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
  PieController,
  ArcElement,
} from 'chart.js';
import { useNewsInputIntervals } from '@/hooks/charts/input';
import { useGuildInputCounts } from '@/hooks/proportions/input';

ChartJs.register(
  PieController,
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

type InputGraphAndPieProps = {
  newsId: number;
};

export function InputGraphAndPie({ newsId }: InputGraphAndPieProps) {
  const supabase = createClientComponentClient<Database>();

  const [rangeType, setRangeType] = useState<'hour' | 'day' | 'week'>('day');
  const [prime, setPrime] = useState<boolean>(false);
  const inputIntervals = useNewsInputIntervals({
    supabase,
    rangeType,
    newsId,
  });

  const inputCounts = useGuildInputCounts({
    supabase,
    newsId,
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
            <input type='checkbox' checked={prime} onChange={onPrimeChange} />
            <span className='text-foreground'>Prime</span>
          </div>
          <Bar
            data={{
              labels: inputIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Inputs',
                  data: inputIntervals.map((interval) => interval.inputs),
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
          <Pie
            data={{
              labels: inputCounts.map((guild) => guild.guildName),
              datasets: [
                {
                  data: inputCounts.map((guild) => guild.inputs),
                  backgroundColor: generateRandomColors(inputCounts.length),
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

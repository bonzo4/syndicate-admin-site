'use client';

import { useGuildIntervals } from '@/hooks/intervals/guilds';

import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
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
  BarElement,
  ArcElement,
} from 'chart.js';
import { useUserIntervals } from '@/hooks/intervals/users';

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

export default function GuildAndUserGraph() {
  const supabase = createClientComponentClient<Database>();

  const [rangeType, setRangeType] = useState<'days' | 'months' | 'years'>(
    'days'
  );
  const [range, setRange] = useState<number>(1);

  const guildIntervals = useGuildIntervals({
    rangeType,
    range,
    supabase,
  });

  const userIntervals = useUserIntervals({
    rangeType,
    range,
    supabase,
  });

  // useEffect(() => {
  //   const labels: string[] = []
  //   const startDate = new Date(guildIntervals[0].interval)
  //   const endDate = new Date(guildIntervals[guildIntervals.length - 1].interval)
  //   if (rangeType === 'days') {
  //     const currentDate = startDate
  //     const currentHour = currentDate.setMinutes(0, 0)
  //     while (currentHour <= endDate.getTime()) {
  //       labels.push(new Date(currentDate).toLocaleString())
  //       currentDate.setHours(currentDate.getHours() + 1)
  //     }
  //   } else if (rangeType === 'months') {
  //     const currentDate = startDate
  //     while (currentDate <= endDate) {
  //       labels.push(new Date(currentDate).toLocaleString())
  //       currentDate.setDate(currentDate.getDate() + 1)
  //     }
  //   } else if (rangeType === 'years') {
  //     const currentDate = startDate
  //     while (currentDate <= endDate) {
  //       const monthString = currentDate.toLocaleString('default', { month: 'long' })
  //       labels.push(`${monthString} ${currentDate.getFullYear()}`)
  //       currentDate.setMonth(currentDate.getMonth() + 1)
  //     }
  //   }
  //   setLabels(labels)
  // }, [rangeType, guildIntervals])

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
              labels: guildIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Guilds',
                  data: guildIntervals.map((interval) => interval.guilds),
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
          <Line
            data={{
              labels: userIntervals.map((interval) =>
                new Date(interval.interval).toLocaleString()
              ),
              datasets: [
                {
                  label: 'Users',
                  data: userIntervals.map((interval) => interval.users),
                  // blue
                  backgroundColor: '#60A5FA',
                  borderColor: '#60A5FA',
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

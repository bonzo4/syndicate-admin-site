'use client';

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {  useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Title, Tooltip, BarElement} from 'chart.js'
import { usePrimeViews } from "@/hooks/intervals/views";
import { useEngagementIntervals } from "@/hooks/intervals/interactions";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PrimeViewsAndEngagementGraph() {

  const supabase = createClientComponentClient<Database>()

  const [range, setRange] = useState<number>(7)

  const viewIntervals = usePrimeViews(supabase, range)
  const interactionIntervals = useEngagementIntervals(supabase, range)

  return (
    <div className="flex flex-col items-center py-2 grow w-full">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10 w-full grow">
        <div className="flex flex-col items-center space-y-2 w-full grow">
          <div className="flex flex-row items-center space-x-2">
            <span className="text-foreground">Interval (Days):</span>
            <input type="number" value={range} onChange={(e) => setRange(parseInt(e.target.value))} className="w-16 px-2 py-1 rounded-md bg-background text-foreground border" />
          </div>
          <Line
            data={{
            labels: viewIntervals.map((interval) => new Date(interval.interval).toLocaleString()),
            datasets: [
              {
                label: 'Prime Views',
                data: viewIntervals.map((interval) => interval.views),
                backgroundColor: '#F87171',
                borderColor: '#F87171',
              },
            ],
          }} options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
            }} />
          <Line
            data={{
            labels: interactionIntervals.map((interval) => new Date(interval.interval).toLocaleString()),
            datasets: [
              {
                label: 'Engagement',
                data: interactionIntervals.map((interval) => interval.interactions),
                backgroundColor: '#60A5FA',
                borderColor: '#60A5FA',
              },
            ],
          }} options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
            }} />
          {/* Graph of engagments / prime views */}
          {interactionIntervals.length !== 0 && viewIntervals.length !== 0 && <Line
            data={{
              labels: interactionIntervals.map((interval) => new Date(interval.interval).toLocaleString()),
              datasets: [
                {
                  label: 'Engagement / Prime Views',
                  data: interactionIntervals.map((interval, index) => interval.interactions / viewIntervals[index].views),
                  // green
                  backgroundColor: '#34D399',
                  borderColor: '#34D399',
                },
              ],
            }} options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} />}
        </div>
      </div>
    </div>
  );
}
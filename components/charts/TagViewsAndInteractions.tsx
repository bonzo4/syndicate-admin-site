'use client';

import { useTagViewIntervals } from "@/hooks/intervals/views";
import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {  useState } from "react";
import { Bar } from "react-chartjs-2";

import { CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Title, Tooltip, BarElement} from 'chart.js'
import { useTagInteractionIntervals } from "@/hooks/intervals/interactions";

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
  tag: string
}

export function TagViewsAndInteractionsGraph({tag}: TagsViewsAndInteractionsGraphProps) {

  const supabase = createClientComponentClient<Database>()

  const [interval, setInterval] = useState<number>(24)

  const viewIntervals = useTagViewIntervals({
    supabase,
    hours: interval,
    tag
  })

  const interactionIntervals = useTagInteractionIntervals({
    supabase,
    hours: interval,
    tag
  })

  return (
    <div className="flex flex-col items-center py-2 grow w-[80%]">
      <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10 w-full grow">
        <div className="flex flex-col items-center space-y-2 w-full grow">
          <div className="flex flex-row items-center space-x-2">
            <span className="text-foreground">Interval (hours):</span>
            <input type="number" value={interval} onChange={(e) => setInterval(parseInt(e.target.value))} className="w-16 px-2 py-1 rounded-md bg-background text-foreground border" />
          </div>
          <Bar
            data={{
            labels: viewIntervals.map((interval) => new Date(interval.interval).toLocaleString()),
            datasets: [
              {
                label: 'Views',
                data: viewIntervals.map((interval) => interval.views),
                backgroundColor: '#F87171',
                borderColor: '#F87171',
                barThickness: 6,
              },
            ],
          }} options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
            }} />
          <Bar
            data={{
            labels: interactionIntervals.map((interval) => new Date(interval.interval).toLocaleString()),
            datasets: [
              {
                label: 'Interactions',
                data: interactionIntervals.map((interval) => interval.interactions),
                backgroundColor: '#60A5FA',
                borderColor: '#60A5FA',
                barThickness: 6,
              },
            ],
          }} options={{
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
}
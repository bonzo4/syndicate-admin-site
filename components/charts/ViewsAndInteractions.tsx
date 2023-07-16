'use client';

import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// import { CategoryScale, Chart as ChartJs, Legend, LineElement, LinearScale, PointElement, Title, Tooltip} from 'chart.js'

// ChartJs.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export function ViewsAndInteractionsGraph() {

  const supabase = createClientComponentClient<Database>()

  const [period, setPeriod] = useState<"day" | "week" | "month">('week')
  const [graphOptions, setGraphOptions] = useState({
    scales: {
      y: {
        beginAtZero: true
      }
    }
  })


  // const views = useViewsOverTime(supabase, period)
  // const interactions = useInteractionsOverTime(supabase, period)

  useEffect(() => {
    if (period === 'day') {
      setGraphOptions({
        scales: {
          y: {
            beginAtZero: true
          }
        }
      })
    }
    if (period === 'week') {
      setGraphOptions({
        scales: {
          y: {
            beginAtZero: true
          }
        }
      })
    }
    if (period === 'month') {
      setGraphOptions({
        scales: {
          y: {
            beginAtZero: true
          }
        }
      })
    }
  }, [period])

  return (
    <div className="flex flex-col items-center py-2">
      </div>
    // <div className="flex flex-col items-center py-2">
    //   <div className="animate-in flex flex-row opacity-0 text-foreground space-x-10">
    //     <div className="flex flex-col items-center">
    //       <h1 className="text-foreground text-2xl font-bold">Views</h1>
    //       <div className="flex flex-row items-center space-x-2">
    //         <button onClick={() => setPeriod('day')} className={`px-2 py-1 rounded-md ${period === 'day' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Day</button>
    //         <button onClick={() => setPeriod('week')} className={`px-2 py-1 rounded-md ${period === 'week' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Week</button>
    //         <button onClick={() => setPeriod('month')} className={`px-2 py-1 rounded-md ${period === 'month' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Month</button>
    //       </div>
    //       <Line data={{
    //         labels: views.labels,
    //         datasets: [
    //           {
    //             label: 'Views',
    //             data: views.data,
    //             fill: false,
    //             backgroundColor: '#F87171',
    //             borderColor: '#F87171',
    //           },
    //         ],
    //       }} options={graphOptions} />
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <h1 className="text-foreground text-2xl font-bold">Interactions</h1>
    //       <div className="flex flex-row items-center space-x-2">
    //         <button onClick={() => setPeriod('day')} className={`px-2 py-1 rounded-md ${period === 'day' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Day</button>
    //         <button onClick={() => setPeriod('week')} className={`px-2 py-1 rounded-md ${period === 'week' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Week</button>
    //         <button onClick={() => setPeriod('month')} className={`px-2 py-1 rounded-md ${period === 'month' ? 'bg-foreground text-background' : 'bg-background text-foreground'}`}>Month</button>
    //       </div>
    //       <Line data={{
    //         labels: interactions.labels,
    //         datasets: [
    //           {
    //             label: 'Interactions',
    //             data: interactions.data,
    //             fill: false,
    //             backgroundColor: '#F87171',
    //             borderColor: '#F87171',
    //           },
    //         ],
    //       }} options={graphOptions} />
    //     </div>
    //   </div>
    // </div>
  );
}
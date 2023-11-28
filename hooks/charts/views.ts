import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type ViewInterval = {
  views: number;
  interval: string;
};

type useViewIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week' | 'month' | 'year';
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

type useNewsViewIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week' | 'month' | 'year';
  supabase: SupabaseClient<Database>;
  newsId: number;
  prime: boolean;
};

export function useViewIntervals({
  rangeType,
  supabase,
  prime,
}: useViewIntervalOptions): ViewInterval[] {
  const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

  useEffect(() => {
    const fetchViewIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_views_hour', {
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_views_day', {
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_views_week', {
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'month') {
        const { data, error } = await supabase.rpc('get_views_month', {
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'year') {
        const { data, error } = await supabase.rpc('get_views_year', {
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
    };
    fetchViewIntervals();
  }, [supabase, rangeType, prime]);

  return viewIntervals;
}

export function useNewsViewIntervals({
  rangeType,
  newsId,
  supabase,
  prime,
}: useNewsViewIntervalOptions): ViewInterval[] {
  const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

  useEffect(() => {
    const fetchViewIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_views_hour', {
          news_doc_id: newsId,
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_views_day', {
          news_doc_id: newsId,
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_views_week', {
          news_doc_id: newsId,
          primed: prime,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setViewIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              views: interval.document_count,
            }))
          );
        }
      }
    };
    fetchViewIntervals();
  }, [supabase, rangeType, newsId, prime]);

  return viewIntervals;
}

type useTagViewIntervalOptions = {
  rangeType: 'days' | 'months' | 'years';
  range: number;
  tag: string;
  endDate: Date;
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

export function useTagViewIntervals({
  rangeType,
  range,
  tag,
  supabase,
  endDate,
  prime,
}: useTagViewIntervalOptions): ViewInterval[] {
  const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

  useEffect(() => {
    const fetchTagViewIntervals = async () => {
      console.log(rangeType, range, tag, endDate, prime);
      const { data, error } = await supabase.rpc('get_tag_view_graph', {
        range_type: 'days',
        range: 1,
        v_tag: 'pilot',
        end_date: endDate.toISOString(),
      });

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setViewIntervals(
          data.map((interval) => ({
            interval: interval.time_segment,
            views: interval.document_count,
          }))
        );
      }
    };
    fetchTagViewIntervals();
  }, [supabase, rangeType, range, tag, endDate, prime]);

  return viewIntervals;
}

// export const usePrimeViews = (
//   supabase: SupabaseClient<Database>,
//   days: number
// ): ViewInterval[] => {
//   const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

//   useEffect(() => {
//     const fetchViewIntervals = async () => {
//       const { data, error } = await supabase.rpc('get_prime_view_graph', {
//         days,
//       });

//       if (error) {
//         console.log(error);
//         return;
//       }
//       if (data) {
//         const groupedIntervals: { [key: string]: ViewInterval[] } = {};
//         data.forEach((interval) => {
//           const day = interval.news_schedule.split('T')[0]; // Extract the date portion
//           if (!groupedIntervals[day]) {
//             groupedIntervals[day] = [];
//           }
//           groupedIntervals[day].push({
//             interval: interval.news_schedule,
//             views: interval.view_count,
//           });
//         });

//         const averagedIntervals = Object.values(groupedIntervals).map(
//           (intervals) => ({
//             interval: intervals[0].interval, // Use the date from the first interval in the group
//             views:
//               intervals.reduce((total, interval) => total + interval.views, 0) /
//               intervals.length,
//           })
//         );

//         setViewIntervals(averagedIntervals);
//       }
//     };
//     fetchViewIntervals();
//   }, [supabase, days]);

//   return viewIntervals;
// };

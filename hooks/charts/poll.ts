import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type PollInterval = {
  polls: number;
  interval: string;
};

type useNewsPollIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useNewsPollIntervals({
  rangeType,
  newsId,
  supabase,
}: useNewsPollIntervalOptions): PollInterval[] {
  const [pollIntervals, setPollIntervals] = useState<PollInterval[]>([]);

  useEffect(() => {
    const fetchPollIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_poll_hour', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setPollIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              polls: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_poll_day', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setPollIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              polls: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_poll_week', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setPollIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              polls: interval.document_count,
            }))
          );
        }
      }
    };
    fetchPollIntervals();
  }, [supabase, rangeType, newsId]);

  return pollIntervals;
}

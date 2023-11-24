import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type InputInterval = {
  inputs: number;
  interval: string;
};

type useNewsInputIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

export function useNewsInputIntervals({
  rangeType,
  newsId,
  supabase,
  prime,
}: useNewsInputIntervalOptions): InputInterval[] {
  const [inputIntervals, setInputIntervals] = useState<InputInterval[]>([]);

  useEffect(() => {
    const fetchInputIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_input_hour', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setInputIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              inputs: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_input_day', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setInputIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              inputs: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_input_week', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setInputIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              inputs: interval.document_count,
            }))
          );
        }
      }
    };
    fetchInputIntervals();
  }, [supabase, rangeType, newsId, prime]);

  return inputIntervals;
}

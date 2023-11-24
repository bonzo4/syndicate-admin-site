import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type LinkInterval = {
  links: number;
  interval: string;
};

type useNewsLinkIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

export function useNewsLinkIntervals({
  rangeType,
  newsId,
  supabase,
  prime,
}: useNewsLinkIntervalOptions): LinkInterval[] {
  const [linkIntervals, setLinkIntervals] = useState<LinkInterval[]>([]);

  useEffect(() => {
    const fetchLinkIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_link_hour', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setLinkIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              links: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_link_day', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setLinkIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              links: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_link_week', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setLinkIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              links: interval.document_count,
            }))
          );
        }
      }
    };
    fetchLinkIntervals();
  }, [supabase, rangeType, newsId, prime]);

  return linkIntervals;
}

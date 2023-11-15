import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type NewsMetrics = Database['public']['Tables']['news_metrics']['Row'];

export const useNewsMetrics = (
  newsId: number,
  supabase: SupabaseClient<Database>
): NewsMetrics | null => {
  const [metrics, setMetrics] = useState<NewsMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data, error } = await supabase
        .from('news_metrics')
        .select()
        .eq('news_id', newsId)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setMetrics(data);
      }
    };
    fetchMetrics();
  }, [supabase, newsId]);

  return metrics;
};

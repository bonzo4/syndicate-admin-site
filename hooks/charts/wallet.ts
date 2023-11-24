import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type WalletInterval = {
  wallets: number;
  interval: string;
};

type useNewsWalletIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

export function useNewsWalletIntervals({
  rangeType,
  newsId,
  supabase,
  prime,
}: useNewsWalletIntervalOptions): WalletInterval[] {
  const [walletIntervals, setWalletIntervals] = useState<WalletInterval[]>([]);

  useEffect(() => {
    const fetchWalletIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_wallet_hour', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setWalletIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              wallets: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_wallet_day', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setWalletIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              wallets: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_wallet_week', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setWalletIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              wallets: interval.document_count,
            }))
          );
        }
      }
    };
    fetchWalletIntervals();
  }, [supabase, rangeType, newsId, prime]);

  return walletIntervals;
}

import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type LinkInterval = {
  links: number;
  interval: string;
};

type useLinkClickIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week' | 'month' | 'year';
  supabase: SupabaseClient<Database>;
};

export function useLinkClickIntervals({
  rangeType,
  supabase,
}: useLinkClickIntervalOptions): LinkInterval[] {
  const [linkIntervals, setLinkIntervals] = useState<LinkInterval[]>([]);

  useEffect(() => {
    const fetchLinkIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_link_click_hour', {});

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
        const { data, error } = await supabase.rpc('get_link_click_day', {});

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
        const { data, error } = await supabase.rpc('get_link_click_week', {});

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
      if (rangeType === 'month') {
        const { data, error } = await supabase.rpc('get_link_click_month', {});

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
      if (rangeType === 'year') {
        const { data, error } = await supabase.rpc('get_link_click_year', {});

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
  }, [supabase, rangeType]);

  return linkIntervals;
}

type useNewsLinkIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useNewsLinkIntervals({
  rangeType,
  newsId,
  supabase,
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
  }, [supabase, rangeType, newsId]);

  return linkIntervals;
}

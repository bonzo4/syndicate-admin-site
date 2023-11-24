import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type QuizInterval = {
  quizs: number;
  interval: string;
};

type useNewsQuizIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  newsId: number;
  supabase: SupabaseClient<Database>;
  prime: boolean;
};

export function useNewsQuizIntervals({
  rangeType,
  newsId,
  supabase,
  prime,
}: useNewsQuizIntervalOptions): QuizInterval[] {
  const [quizIntervals, setQuizIntervals] = useState<QuizInterval[]>([]);

  useEffect(() => {
    const fetchQuizIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_news_quiz_hour', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setQuizIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              quizs: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_news_quiz_day', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setQuizIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              quizs: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_news_quiz_week', {
          news_doc_id: newsId,
        });

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setQuizIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              quizs: interval.document_count,
            }))
          );
        }
      }
    };
    fetchQuizIntervals();
  }, [supabase, rangeType, newsId, prime]);

  return quizIntervals;
}

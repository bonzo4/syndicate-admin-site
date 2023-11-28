import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type ProfileInterval = {
  profiles: number;
  interval: string;
};

type useNewsProfileIntervalOptions = {
  rangeType: 'hour' | 'day' | 'week';
  supabase: SupabaseClient<Database>;
};

export function useProfileIntervals({
  rangeType,
  supabase,
}: useNewsProfileIntervalOptions): ProfileInterval[] {
  const [profileIntervals, setProfileIntervals] = useState<ProfileInterval[]>(
    []
  );

  useEffect(() => {
    const fetchProfileIntervals = async () => {
      if (rangeType === 'hour') {
        const { data, error } = await supabase.rpc('get_profile_hour', {});

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setProfileIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              profiles: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'day') {
        const { data, error } = await supabase.rpc('get_profile_day', {});

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setProfileIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              profiles: interval.document_count,
            }))
          );
        }
      }
      if (rangeType === 'week') {
        const { data, error } = await supabase.rpc('get_profile_week', {});

        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setProfileIntervals(
            data.map((interval) => ({
              interval: interval.time_segment,
              profiles: interval.document_count,
            }))
          );
        }
      }
    };
    fetchProfileIntervals();
  }, [supabase, rangeType]);

  return profileIntervals;
}

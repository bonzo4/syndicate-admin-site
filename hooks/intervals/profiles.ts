import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type ProfileInterval = {
  profiles: number;
  interval: string;
};

type useProfileIntervalOptions = {
  rangeType: 'days' | 'months' | 'years';
  range: number;
  supabase: SupabaseClient<Database>;
};

export function useProfileIntervals({
  rangeType,
  range,
  supabase,
}: useProfileIntervalOptions): ProfileInterval[] {
  const [profileIntervals, setProfileIntervals] = useState<ProfileInterval[]>(
    []
  );

  useEffect(() => {
    const fetchProfileIntervals = async () => {
      const { data, error } = await supabase.rpc('get_profile_graph', {
        range_type: rangeType,
        range: range,
      });

      if (error) {
        console.log(error);
        return;
      }
      console.log(data);
      if (data) {
        setProfileIntervals(
          data.map((interval) => ({
            interval: interval.time_segment,
            profiles: interval.document_count,
          }))
        );
      }
    };
    fetchProfileIntervals();
  }, [supabase, rangeType, range]);

  return profileIntervals;
}

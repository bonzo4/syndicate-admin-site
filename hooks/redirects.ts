import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type useRedirectListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
};

type Redirect = Database['public']['Tables']['website_redirects']['Row'];

export function useRedirectList({
  supabase,
  page,
}: useRedirectListOptions): Redirect[] {
  const [redirects, setRedirects] = useState<Redirect[]>([]);

  useEffect(() => {
    const fetchRedirects = async () => {
      const { data, error } = await supabase
        .from('website_redirects')
        .select('*')
        .order('clicks', { ascending: false })
        .range(page, page + 10);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setRedirects(data);
      }
    };
    fetchRedirects();
  }, [supabase, page]);

  return redirects;
}

import { Database } from '@/types';
import { getPagination } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type ProfileRow = {
  name: string;
  points: number;
  referrals: number;
  solWallet: string | null;
  ethWallet: string | null;
  created_at: Date;
};

export const useProfileList = (
  supabase: SupabaseClient<Database>,
  page: number,
  search: string
): ProfileRow[] => {
  const { from, to } = getPagination(page, 10);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setProfiles(
          await Promise.all(
            data.map(async (profile) => {
              const { count } = await supabase
                .from('guild_referrals')
                .select('guild_id', { count: 'exact' })
                .eq('discord_user_id', profile.discord_id)
                .eq('type', 'PROFILE');
              return {
                name: profile.name,
                points: profile.points,
                referrals: count || 0,
                created_at: new Date(profile.created_at),
                solWallet: profile.sol_wallet,
                ethWallet: profile.eth_wallet,
              };
            })
          )
        );
      }
    };
    fetchProfiles();
  }, [supabase, from, to, search]);

  return profiles;
};

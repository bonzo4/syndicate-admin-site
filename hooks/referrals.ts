import { Database } from '@/types';
import { getPagination } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type UserReferral = {
  referrerName: string;
  userName: string;
  createdAt: Date;
};

type Referral = {
  userName: string;
  guildName: string;
  guildId: string;
  createdAt: Date;
  members: number;
  isSetup: boolean;
  views: number | null;
  checked: boolean;
  setReferrals: (referrals: Referral[]) => void;
};

type useReferralListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
  userId?: string;
  search?: string;
};

export function useUserReferralList({
  supabase,
  page,
  userId,
  search,
}: useReferralListOptions): UserReferral[] {
  const { from, to } = getPagination(page, 10);
  const [referrals, setReferrals] = useState<UserReferral[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (userId) {
        const query = supabase
          .from('user_referrals')
          .select('*, discord_users!user_id(name)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(from, to);

        if (search) {
          query.ilike('discord_users.name', `%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.log(error);
          return;
        }

        if (data)
          setReferrals(
            await Promise.all(
              data.map(async (referral) => {
                const { data, error } = await supabase
                  .from('discord_users')
                  .select('name')
                  .eq('user_id', referral.referrer_id)
                  .single();

                return {
                  referrerName: data?.name ?? 'Unknown',
                  userName: referral.discord_users[0]?.name ?? 'Unknown',
                  createdAt: new Date(referral.created_at),
                };
              })
            )
          );
      }

      const { data, error } = await supabase
        .from('user_referrals')
        .select('*, discord_users!user_id(name)')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data)
        setReferrals(
          await Promise.all(
            data.map(async (referral) => {
              console.log(referral);
              const { data, error } = await supabase
                .from('discord_users')
                .select('name')
                .eq('id', referral.referrer_id)
                .single();

              return {
                referrerName: data?.name ?? 'Unknown',
                userName: (referral.discord_users as any).name || 'Unknown',
                createdAt: new Date(referral.created_at),
              };
            })
          )
        );
    };
    fetchReferrals();
  }, [supabase, from, to, userId, search]);

  return referrals;
}

export function useReferralList({
  supabase,
  page,
  userId,
}: useReferralListOptions): Referral[] {
  const { from, to } = getPagination(page, 10);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from('guild_referrals')
          .select('*, discord_users(name), guilds(name, member_count)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) {
          console.log(error);
          return;
        }

        console.log(data);

        if (data) {
          setReferrals(
            await Promise.all(
              data.map(async (referral) => {
                const { data } = await supabase
                  .from('news_channels')
                  .select('id')
                  .eq('guild_id', referral.guild_id);

                const { count, error } = await supabase
                  .from('views')
                  .select('id')
                  .eq('guild_id', referral.guild_id);

                console.log(error);

                return {
                  userName: referral.discord_users?.name ?? 'Unknown',
                  guildName: referral.guilds?.name ?? 'Unknown',
                  guildId: referral.guild_id,
                  createdAt: new Date(
                    referral.updated_at ?? referral.created_at
                  ),
                  members: referral.guilds?.member_count ?? 0,
                  views: count,
                  isSetup: Boolean(data?.length),
                  checked: referral.checked,
                  setReferrals,
                };
              })
            )
          );
        }
        return;
      }

      const { data, error } = await supabase
        .from('guild_referrals')
        .select('*, discord_users(name), guilds(name, member_count)')
        .neq('discord_user_id', null)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setReferrals(
          await Promise.all(
            data.map(async (referral) => {
              const { data } = await supabase
                .from('news_channels')
                .select('id')
                .eq('guild_id', referral.guild_id);

              const { count, error } = await supabase
                .from('views')
                .select('id', { count: 'exact' })
                .eq('guild_id', referral.guild_id);

              console.log(error);

              return {
                userName: referral.discord_users?.name ?? 'Unknown',
                guildName: referral.guilds?.name ?? 'Unknown',
                guildId: referral.guild_id,
                createdAt: new Date(referral.updated_at ?? referral.created_at),
                members: referral.guilds?.member_count ?? 0,
                views: count,
                isSetup: Boolean(data?.length),
                checked: referral.checked,
                setReferrals,
              };
            })
          )
        );
      }
    };
    fetchReferrals();
  }, [supabase, from, to, userId]);

  return referrals;
}

type Ambassador = {
  userId: string;
  userName: string;
  code: string;
  referralCount: number;
};

type useAmbassadorListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
  search?: string;
};

export function useAmbassadorList({
  supabase,
  page,
  search,
}: useAmbassadorListOptions): Ambassador[] {
  const { from, to } = getPagination(page, 10);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      const query = supabase
        .from('ambassador_codes')
        .select('*')
        .order('created_at', { ascending: false })
        .neq('code', null)
        .range(from, to);

      if (search) {
        console.log(search);
        query.ilike('code', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setAmbassadors(
          await Promise.all(
            data.map(async (ambassador) => {
              if (!ambassador.discord_id)
                return {
                  userId: '',
                  userName: '',
                  code: '',
                  referralCount: 0,
                };
              const { data } = await supabase
                .from('discord_users')
                .select('name')
                .eq('id', ambassador.discord_id)
                .single();
              const { count } = await supabase
                .from('guild_referrals')
                .select('guild_id', { count: 'exact' })
                .eq('discord_user_id', ambassador.discord_id);

              return {
                userId: ambassador.discord_id ?? '',
                userName: data?.name ?? 'Unknown',
                code: ambassador.code ?? '',
                referralCount: count ?? 0,
              };
            })
          )
        );
      }
    };
    fetchAmbassadors();
  }, [supabase, from, to, search]);

  return ambassadors;
}

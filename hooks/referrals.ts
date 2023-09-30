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
};

type useReferralListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
  userId?: string;
};

export function useUserReferralList({
  supabase,
  page,
  userId,
}: useReferralListOptions): UserReferral[] {
  const { from, to } = getPagination(page, 10);
  const [referrals, setReferrals] = useState<UserReferral[]>([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from('user_referrals')
          .select('*, discord_users!user_id(name)')
          .eq('user_id', userId)
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
  }, [supabase, from, to, userId]);

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

                return {
                  userName: referral.discord_users?.name ?? 'Unknown',
                  guildName: referral.guilds?.name ?? 'Unknown',
                  guildId: referral.guild_id,
                  createdAt: new Date(
                    referral.updated_at ?? referral.created_at
                  ),
                  members: referral.guilds?.member_count ?? 0,
                  isSetup: Boolean(data?.length),
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

              return {
                userName: referral.discord_users?.name ?? 'Unknown',
                guildName: referral.guilds?.name ?? 'Unknown',
                guildId: referral.guild_id,
                createdAt: new Date(referral.updated_at ?? referral.created_at),
                members: referral.guilds?.member_count ?? 0,
                isSetup: Boolean(data?.length),
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
  referralCode: string;
  referralCount: number;
};

type useAmbassadorListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
};

export function useAmbassadorList({
  supabase,
  page,
}: useAmbassadorListOptions): Ambassador[] {
  const { from, to } = getPagination(page, 10);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      const { data, error } = await supabase
        .from('discord_users')
        .select('*')
        .order('created_at', { ascending: false })
        .neq('referral_code', null)
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setAmbassadors(
          await Promise.all(
            data.map(async (ambassador) => {
              const { data } = await supabase
                .from('guild_referrals')
                .select('guild_id')
                .eq('discord_user_id', ambassador.id);

              return {
                userId: ambassador.id,
                userName: ambassador.name,
                referralCode: ambassador.referral_code ?? '',
                referralCount: data?.length ?? 0,
              };
            })
          )
        );
      }
    };
    fetchAmbassadors();
  }, [supabase, from, to]);

  return ambassadors;
}

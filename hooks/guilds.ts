import { Database } from '@/types';
import { getPagination } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export type GuildDoc = {
  isSetup: boolean;
} & Database['public']['Tables']['guilds']['Row'];

type useGuildListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
  search: string;
  guildType: 'all' | 'sol' | 'eth';
};

export const useGuildList = ({
  supabase,
  page,
  search,
  guildType,
}: useGuildListOptions): GuildDoc[] => {
  const { from, to } = getPagination(page, 10);
  const [guilds, setGuilds] = useState<GuildDoc[]>([]);

  useEffect(() => {
    const fetchGuilds = async () => {
      if (guildType === 'sol') {
        const { data, error } = await supabase
          .from('_guild_tags')
          .select('*, guilds(*, guild_settings(*))')
          .eq('tag', 'Solana')
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          const solGuilds = data
            .map((tag) => {
              if (!tag.guilds) return null;
              return {
                ...tag.guilds,
                isSetup: Boolean(tag.guilds.guild_settings),
              };
            })
            .filter((guild) => guild !== null) as GuildDoc[];
          setGuilds(solGuilds);
          return;
        }
      } else if (guildType === 'eth') {
        const { data, error } = await supabase
          .from('_guild_tags')
          .select('*, guilds(*)')
          .eq('tag', 'Ethereum')
          .order('created_at', { ascending: false });
      }
      if (search) {
        const { data, error } = await supabase
          .from('guilds')
          .select('*, guild_settings(*)')
          .order('created_at', { ascending: false })
          .textSearch('name', search, { config: 'english' })
          .range(from, to);

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          setGuilds(
            data.map((guild) => ({
              ...guild,
              isSetup: Boolean(guild.guild_settings),
            }))
          );
          return;
        }
      }

      const { data, error } = await supabase
        .from('guilds')
        .select('*, guild_settings(*)')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setGuilds(
          data.map((guild) => ({
            ...guild,
            isSetup: Boolean(guild.guild_settings),
          }))
        );
      }
    };
    fetchGuilds();
  }, [supabase, from, to, search]);
  return guilds;
};

export const useGuildErrors = (
  supabase: SupabaseClient<Database>,
  guildId: string,
  page: number
): Database['public']['Tables']['bot_errors']['Row'][] => {
  const { from, to } = getPagination(page, 10);
  const [errors, setErrors] = useState<
    Database['public']['Tables']['bot_errors']['Row'][]
  >([]);

  useEffect(() => {
    const fetchGuilds = async () => {
      const { data, error } = await supabase
        .from('bot_errors')
        .select('*')
        .eq('guild_id', guildId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setErrors(data);
      }
    };
    fetchGuilds();
  }, [supabase, from, to]);
  return errors;
};

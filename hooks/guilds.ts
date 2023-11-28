import { Database } from '@/types';
import { getPagination } from '@/utils';
import { SupabaseClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export type GuildDoc = {
  isSetup: boolean;
  views: number;
  linkClicks: number;
  tags: string[];
} & Database['public']['Tables']['guilds']['Row'];

type useGuildListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
  search: string;
  setup: boolean | null;
};

export const useGuildList = ({
  supabase,
  page,
  search,
  setup,
}: useGuildListOptions): GuildDoc[] => {
  const { from, to } = getPagination(page, 10);
  const [guilds, setGuilds] = useState<GuildDoc[]>([]);

  useEffect(() => {
    const fetchGuilds = async () => {
      if (search === 'sol') {
        const { data, error } = await supabase
          .from('_guild_tags')
          .select('*, guilds(*, guild_settings(*))', { count: 'exact' })
          .eq('tag', 'Solana')
          .range(from, to);

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          const solGuilds = (await Promise.all(
            data
              .map(async (tag) => {
                if (!tag.guilds) return null;
                const { count: views } = await supabase
                  .from('views')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', tag.guilds.id);
                const { count: linkClicks } = await supabase
                  .from('redirect_clicks')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', tag.guilds.id);
                return {
                  ...tag.guilds,
                  isSetup: Boolean(tag.guilds.guild_settings),
                  views: views || 0,
                  linkClicks: linkClicks || 0,
                  tags: ['Solana'],
                };
              })
              .filter((guild) => guild !== null)
          )) as GuildDoc[];
          setGuilds(solGuilds);
          return;
        }
      } else if (search === 'eth') {
        const { data, error } = await supabase
          .from('_guild_tags')
          .select('*, guilds(*, guild_settings(*))')
          .eq('tag', 'Solana')
          .range(from, to);

        if (error) {
          console.log(error);
          return;
        }

        if (data) {
          const ethGuilds = (await Promise.all(
            data
              .map(async (tag) => {
                if (!tag.guilds) return null;
                const { count: views } = await supabase
                  .from('views')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', tag.guilds.id);
                const { count: linkClicks } = await supabase
                  .from('redirect_clicks')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', tag.guilds.id);
                return {
                  ...tag.guilds,
                  isSetup: Boolean(tag.guilds.guild_settings),
                  views: views || 0,
                  linkClicks: linkClicks || 0,
                  tags: ['Ethereum'],
                };
              })
              .filter((guild) => guild !== null)
          )) as GuildDoc[];
          setGuilds(ethGuilds);
          return;
        }
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
          const guilds = (await Promise.all(
            data
              .map(async (guild) => {
                const { count: views } = await supabase
                  .from('views')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', guild.id);
                const { count: linkClicks } = await supabase
                  .from('redirect_clicks')
                  .select('*', { count: 'exact' })
                  .eq('guild_id', guild.id);
                const { data: tags } = await supabase
                  .from('_guild_tags')
                  .select('tag')
                  .eq('guild_id', guild.id);
                return {
                  ...guild,
                  isSetup: Boolean(guild.guild_settings),
                  views: views || 0,
                  linkClicks: linkClicks || 0,
                  tags: tags?.map((tag) => tag.tag) || [],
                };
              })
              .filter((guild) => guild !== null)
          )) as GuildDoc[];
          setGuilds(guilds);
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
        const guilds = (await Promise.all(
          data
            .map(async (guild) => {
              const { count: views } = await supabase
                .from('views')
                .select('*', { count: 'exact' })
                .eq('guild_id', guild.id);
              const { count: linkClicks } = await supabase
                .from('redirect_clicks')
                .select('*', { count: 'exact' })
                .eq('guild_id', guild.id);
              const { data: tags } = await supabase
                .from('_guild_tags')
                .select('tag')
                .eq('guild_id', guild.id);
              return {
                ...guild,
                isSetup: Boolean(guild.guild_settings),
                views: views || 0,
                linkClicks: linkClicks || 0,
                tags: tags?.map((tag) => tag.tag) || [],
              };
            })
            .filter((guild) => guild !== null)
        )) as GuildDoc[];
        setGuilds(guilds);
      }
    };
    fetchGuilds();
  }, [supabase, from, to, search]);
  return guilds;
};

type useLeftGuildListOptions = {
  supabase: SupabaseClient<Database>;
  page: number;
};

export const useLeftGuildList = ({
  supabase,
  page,
}: useLeftGuildListOptions): GuildDoc[] => {
  const { from, to } = getPagination(page, 10);
  const [guilds, setGuilds] = useState<GuildDoc[]>([]);

  useEffect(() => {
    const fetchGuilds = async () => {
      const { data, error } = await supabase
        .from('guilds')
        .select('*')
        .lt('left_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        const guilds = (await Promise.all(
          data
            .map(async (guild) => {
              const { count: views } = await supabase
                .from('views')
                .select('*', { count: 'exact' })
                .eq('guild_id', guild.id);
              const { count: linkClicks } = await supabase
                .from('redirect_clicks')
                .select('*', { count: 'exact' })
                .eq('guild_id', guild.id);
              const { data: tags } = await supabase
                .from('_guild_tags')
                .select('tag')
                .eq('guild_id', guild.id);
              return {
                ...guild,
                created_at: guild.left_at || guild.created_at,
                isSetup: false,
                views: views || 0,
                linkClicks: linkClicks || 0,
                tags: tags?.map((tag) => tag.tag) || [],
              };
            })
            .filter((guild) => guild !== null)
        )) as GuildDoc[];
        setGuilds(guilds);
      }
    };
    fetchGuilds();
  }, [supabase, from, to]);
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

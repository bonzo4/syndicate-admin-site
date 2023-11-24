import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type LinkClick = {
  url: string;
  clicks: number;
};

type useLinkClicksByUrlOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export const useLinkClicksByUrl = ({
  newsId,
  supabase,
}: useLinkClicksByUrlOptions): LinkClick[] => {
  const [linkClicks, setLinkClicks] = useState<LinkClick[]>([]);

  useEffect(() => {
    const fetchLinkClicks = async () => {
      const { data, error } = await supabase.rpc('get_clicks_by_url', {
        news_doc_id: newsId,
      });

      if (error || !data) {
        return;
      }
      setLinkClicks(
        data.map((link) => ({
          url: link.url,
          clicks: link.clicks_count,
        }))
      );
    };
    fetchLinkClicks();
  }, [supabase, newsId]);

  return linkClicks.sort((a, b) => b.clicks - a.clicks);
};

type GuildLinkCount = {
  links: number;
  guildId: string;
  guildName: string;
};

type useGuildLinkCountsOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useGuildLinkCounts({
  newsId,
  supabase,
}: useGuildLinkCountsOptions): GuildLinkCount[] {
  const [guildLinks, setGuildLinks] = useState<GuildLinkCount[]>([]);

  useEffect(() => {
    const fetchLinkIntervals = async () => {
      const { data, error } = await supabase.rpc(
        'get_news_link_clicks_per_guild',
        {
          news_doc_id: newsId,
        }
      );

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 5);
        const otherGuilds = data.filter((guild) => guild.doc_count <= 5);
        setGuildLinks([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            links: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            links: otherGuilds.reduce((acc, curr) => acc + curr.doc_count, 0),
          },
        ]);
      }
    };
    fetchLinkIntervals();
  }, [supabase, newsId]);

  return guildLinks.sort((a, b) => b.links - a.links);
}

import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type GuildPollCount = {
  polls: number;
  guildId: string;
  guildName: string;
};

type useGuildPollCountsOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useGuildPollCounts({
  newsId,
  supabase,
}: useGuildPollCountsOptions): GuildPollCount[] {
  const [guildPolls, setGuildPolls] = useState<GuildPollCount[]>([]);

  useEffect(() => {
    const fetchPollIntervals = async () => {
      const { data, error } = await supabase.rpc('get_news_polls_per_guild', {
        news_doc_id: newsId,
      });

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 5);
        const otherGuilds = data.filter((guild) => guild.doc_count <= 5);
        setGuildPolls([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            polls: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            polls: otherGuilds.reduce((acc, curr) => acc + curr.doc_count, 0),
          },
        ]);
      }
    };
    fetchPollIntervals();
  }, [supabase, newsId]);

  return guildPolls.sort((a, b) => b.polls - a.polls);
}

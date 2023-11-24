import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type GuildInputCount = {
  inputs: number;
  guildId: string;
  guildName: string;
};

type useGuildInputCountsOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useGuildInputCounts({
  newsId,
  supabase,
}: useGuildInputCountsOptions): GuildInputCount[] {
  const [guildInputs, setGuildInputs] = useState<GuildInputCount[]>([]);

  useEffect(() => {
    const fetchInputIntervals = async () => {
      const { data, error } = await supabase.rpc('get_news_inputs_per_guild', {
        news_doc_id: newsId,
      });

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 5);
        const otherGuilds = data.filter((guild) => guild.doc_count <= 5);
        setGuildInputs([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            inputs: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            inputs: otherGuilds.reduce((acc, curr) => acc + curr.doc_count, 0),
          },
        ]);
      }
    };
    fetchInputIntervals();
  }, [supabase, newsId]);

  return guildInputs.sort((a, b) => b.inputs - a.inputs);
}

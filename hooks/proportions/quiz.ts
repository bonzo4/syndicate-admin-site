import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type GuildQuizCount = {
  quizs: number;
  guildId: string;
  guildName: string;
};

type useGuildQuizCountsOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useGuildQuizCounts({
  newsId,
  supabase,
}: useGuildQuizCountsOptions): GuildQuizCount[] {
  const [guildQuizs, setGuildQuizs] = useState<GuildQuizCount[]>([]);

  useEffect(() => {
    const fetchQuizIntervals = async () => {
      const { data, error } = await supabase.rpc('get_news_quiz_per_guild', {
        news_doc_id: newsId,
      });

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 5);
        const otherGuilds = data.filter((guild) => guild.doc_count <= 5);
        setGuildQuizs([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            quizs: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            quizs: otherGuilds.reduce((acc, curr) => acc + curr.doc_count, 0),
          },
        ]);
      }
    };
    fetchQuizIntervals();
  }, [supabase, newsId]);

  return guildQuizs.sort((a, b) => b.quizs - a.quizs);
}

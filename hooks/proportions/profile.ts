import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type GuildProfileCount = {
  profiles: number;
  guildId: string;
  guildName: string;
};

type useGuildProfileCountsOptions = {
  supabase: SupabaseClient<Database>;
};

export function useGuildProfileCounts({
  supabase,
}: useGuildProfileCountsOptions): GuildProfileCount[] {
  const [guildProfiles, setGuildProfiles] = useState<GuildProfileCount[]>([]);

  useEffect(() => {
    const fetchProfileIntervals = async () => {
      const { data, error } = await supabase.rpc('get_profiles_per_guild', {});

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 3);
        const otherGuilds = data.filter((guild) => guild.doc_count >= 3);
        setGuildProfiles([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            profiles: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            profiles: otherGuilds.reduce(
              (acc, curr) => acc + curr.doc_count,
              0
            ),
          },
        ]);
      }
    };
    fetchProfileIntervals();
  }, [supabase]);

  return guildProfiles.sort((a, b) => b.profiles - a.profiles);
}

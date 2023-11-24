import { Database } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

type GuildWalletCount = {
  wallets: number;
  guildId: string;
  guildName: string;
};

type useGuildWalletCountsOptions = {
  newsId: number;
  supabase: SupabaseClient<Database>;
};

export function useGuildWalletCounts({
  newsId,
  supabase,
}: useGuildWalletCountsOptions): GuildWalletCount[] {
  const [guildWallets, setGuildWallets] = useState<GuildWalletCount[]>([]);

  useEffect(() => {
    const fetchWalletIntervals = async () => {
      const { data, error } = await supabase.rpc('get_news_wallets_per_guild', {
        news_doc_id: newsId,
      });

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const guilds = data.filter((guild) => guild.doc_count > 5);
        const otherGuilds = data.filter((guild) => guild.doc_count <= 5);
        setGuildWallets([
          ...guilds.map((guild) => ({
            guildId: guild.guild_id,
            guildName: guild.guild_name,
            wallets: guild.doc_count,
          })),
          {
            guildId: 'other',
            guildName: 'Other',
            wallets: otherGuilds.reduce((acc, curr) => acc + curr.doc_count, 0),
          },
        ]);
      }
    };
    fetchWalletIntervals();
  }, [supabase, newsId]);

  return guildWallets.sort((a, b) => b.wallets - a.wallets);
}

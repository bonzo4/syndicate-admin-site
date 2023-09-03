import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type GuildInteractionCount = {
    interactions: number;
    guildId: string;
    guildName: string;
}

type useGuildInteractionCountsOptions = {
    newsId: number;
    supabase: SupabaseClient<Database>;
}

export function useGuildInteractionCounts({newsId, supabase}: useGuildInteractionCountsOptions): GuildInteractionCount[] {
    const [guildInteractions, setGuildInteractions] = useState<GuildInteractionCount[]>([]);

    useEffect(() => {
        const fetchInteractionIntervals = async () => {

            const { data, error } = await supabase
                    .rpc("get_news_interactions", { news_doc_id: newsId });

                if (error) {
                    console.log(error);
                    return;
                }
            if (data) {
                const guilds = data;
                    setGuildInteractions([...guilds.map((guild) => ({
                        guildId: guild.guild_id,
                        guildName: guild.guild_name,
                        interactions: guild.interaction_count
                    }))]);
                }
        };
        fetchInteractionIntervals();
    }, [supabase, newsId]);

    return guildInteractions.sort((a, b) => b.interactions - a.interactions);
}
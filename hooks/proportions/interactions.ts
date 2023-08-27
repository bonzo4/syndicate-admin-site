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
                console.log(data);
            if (data) {
                const guilds = data.filter((guild) => guild.interaction_count > 3);
                const otherGuilds = data.filter((guild) => guild.interaction_count <= 3);
                    setGuildInteractions([...guilds.map((guild) => ({
                        guildId: guild.guild_id,
                        guildName: guild.guild_name,
                        interactions: guild.interaction_count
                    })), {
                        guildId: "other",
                        guildName: "Other",
                        interactions: otherGuilds.reduce((acc, curr) => acc + curr.interaction_count, 0)
                    }]);
                }
        };
        fetchInteractionIntervals();
    }, [supabase, newsId]);

    return guildInteractions.sort((a, b) => b.interactions - a.interactions);
}
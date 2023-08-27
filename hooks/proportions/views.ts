import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type GuildViewCount = {
    views: number;
    guildId: string;
    guildName: string;
}

type useGuildViewCountsOptions = {
    newsId: number;
    supabase: SupabaseClient<Database>;
}

export function useGuildViewCounts({newsId, supabase}: useGuildViewCountsOptions): GuildViewCount[] {
    const [guildViews, setGuildViews] = useState<GuildViewCount[]>([]);

    useEffect(() => {
        const fetchViewIntervals = async () => {

            const { data, error } = await supabase
                    .rpc("get_news_views", { news_doc_id: newsId });

                if (error) {
                    console.log(error);
                    return;
                }
                console.log(data);
            if (data) {
                const guilds = data.filter((guild) => guild.view_count > 5);
                const otherGuilds = data.filter((guild) => guild.view_count <= 5);
                    setGuildViews([...guilds.map((guild) => ({
                        guildId: guild.guild_id,
                        guildName: guild.guild_name,
                        views: guild.view_count
                    })), {
                        guildId: "other",
                        guildName: "Other",
                        views: otherGuilds.reduce((acc, curr) => acc + curr.view_count, 0)
                    }]);
                }
        };
        fetchViewIntervals();
    }, [supabase, newsId]);

    return guildViews.sort((a, b) => b.views - a.views);
}
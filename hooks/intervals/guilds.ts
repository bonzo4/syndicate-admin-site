import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type GuildInterval = {
    guilds: number;
    interval: string;
}

type useGuildIntervalOptions = {
    rangeType: "days" | "months" | "years";
    range: number;
    supabase: SupabaseClient<Database>;
}

export function useGuildIntervals({ rangeType, range, supabase }: useGuildIntervalOptions): GuildInterval[] {
    const [guildIntervals, setGuildIntervals] = useState<GuildInterval[]>([]);

    useEffect(() => {
        const fetchGuildIntervals = async () => {
            const { data, error } = await supabase
                .rpc("get_guild_graph", {
                    range_type: rangeType,
                    range: range
                });

            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setGuildIntervals(data.map((interval) => ({
                    interval: interval.time_segment,
                    guilds: interval.document_count
                })));
            }
        };
        fetchGuildIntervals();
    }, [supabase, rangeType, range]);

    return guildIntervals;
}
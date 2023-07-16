import { Database } from "@/types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export type Stats = {
    value: number;
    change: number;
} 

export const useCountStats = (supabase: SupabaseClient<Database>, table: string, idName: string = "id"): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from(table)
                .select(idName, { count: 'exact' });
            const { count: countToday, error: error2 } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || !count || !countToday ) {
                return;
            }

            setCountStats({ 
                value: count,
                change: countToday
            });
        }
        getCount();
    }, [supabase, table, idName]);

    return countStats;
}

export const useCountStatsByNews = (supabase: SupabaseClient<Database>,newsId: number, table: string,  idName: string = "id"): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("news_id", newsId);
            const { count: countToday, error: error2 } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("news_id", newsId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || !count || !countToday) {
                return;
            }

            setCountStats({
                value: count,
                change: countToday
            });
        }
        getCount();
    }, [supabase, table, idName, newsId]);

    return countStats;
}

export const useCountStatsByGuild = (supabase: SupabaseClient<Database>,guildId: string, table: string,  idName: string = "id"): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("guild_id", guildId);
            const { count: countToday, error: error2 } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("guild_id", guildId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || !count || !countToday ) {
                return;
            }

            setCountStats({ 
                value: count,
                change: countToday
            });
        }
        getCount();
    }, [supabase, table, idName, guildId]);

    return countStats;
}

export const useCountStatsByUser = (supabase: SupabaseClient<Database>, table: string, userId: string, idName: string = "id"): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("user_id", userId);
            const { count: countToday, error: error2 } = await supabase
                .from(table)
                .select(idName, { count: 'exact' })
                .eq("user_id", userId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || !count || !countToday ) {
                return;
            }

            setCountStats({ 
                value: count,
                change: countToday
            });
        }
        getCount();
    }, [supabase, table, idName, userId]);

    return countStats;
}




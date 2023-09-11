import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Stats } from "./stats";
import { useState, useEffect } from "react";

export function useEthTagCount(supabase: SupabaseClient<Database>): Stats {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from("_guild_tags")
                .select("*", { count: 'exact' })
                .eq("tag", "Ethereum");
            
            if (error || !count) {
                console.log(error)
                return;
            }

            setCountStats({
                value: count,
                change: 0
            });
        }
        getCount();
    }, [supabase]);

    return countStats;
}

export function useSolTagCount(supabase: SupabaseClient<Database>): Stats {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from("_guild_tags")
                .select("*", { count: 'exact' })
                .eq("tag", "Solana");
            
            if (error || !count) {
                return;
            }

            setCountStats({
                value: count,
                change: 0
            });
        }
        getCount();
    }, [supabase]);

    return countStats;
}

export function useNoTagCount(supabase: SupabaseClient<Database>): Stats {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { data, error } = await supabase
                .rpc("get_no_tag_guild_count");
            
            if (error || !data) {
                return;
            }

            setCountStats({
                value: data,
                change: 0
            });
        }
        getCount();
    }, [supabase]);

    return countStats;
}

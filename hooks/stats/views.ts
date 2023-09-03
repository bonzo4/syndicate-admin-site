import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Stats } from "./stats";


export const usePrimeViews = (supabase: SupabaseClient<Database>, newsId: number, tags: string[], stopDate: Date): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { count, error } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId)
                .lte("created_at", stopDate.toISOString());
            
            if (error || !count) {
                return;
            }

            setCountStats({
                value: count,
                change: 0
            });
        }
        getCount();
    }, [supabase, newsId]);

    return countStats;
}

export const useTagViews = (supabase: SupabaseClient<Database>, tag: string): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { data, error } = await supabase
                .rpc("get_views_count_by_tag", { vanity_tag_name: tag });
            
            if (error || !data) {
                return;
            }

            setCountStats({
                value: data,
                change: 0
            });
        }
        getCount();
    }, [supabase, tag]);

    return countStats;
}
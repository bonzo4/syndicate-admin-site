import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Stats } from "./stats";


export const usePrimeViews = (supabase: SupabaseClient<Database>, newsId: number, tags: string[]): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            let stopDate = new Date()
            const { data: nextNews, error: error1 } = await supabase
                .from("_news_tags")
                .select("news_id, discord_news(schedule)")
                .in("tag", tags)
                .gt("news_id", newsId)
                .limit(tags.length)
        
            // check if nextNews has the same news_ids
            const sameIds = nextNews && nextNews.length === tags.length  && nextNews.every((news) => news.news_id === nextNews[0].news_id)
            
            if (!error1 && nextNews[0] && nextNews[0].discord_news && sameIds) {
                stopDate = new Date(nextNews[0].discord_news.schedule)
            }
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
import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type ViewInterval = {
    views: number;
    interval: string;
}

type useViewIntervalOptions = {
    hours: number;
    newsId?: number;
    supabase: SupabaseClient<Database>;
}

export function useViewIntervals({hours, newsId, supabase}: useViewIntervalOptions): ViewInterval[] {
    const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

    useEffect(() => {
        const fetchViewIntervals = async () => {
            if (newsId) {
                const { data, error } = await supabase
                    .rpc("get_news_views_intervals", { hours_range: hours, news_doc_id: newsId });

                if (error) {
                    console.log(error);
                    return;
                }
                if (data) {
                    setViewIntervals(data.map((interval) => ({
                        interval: interval.hour_segment,
                        views: interval.document_count
                    })));
                }
                return;
            }
            const { data, error } = await supabase
                .rpc("get_view_intervals", { hours_range: hours });

            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setViewIntervals(data.map((interval) => ({
                    interval: interval.hour_segment,
                    views: interval.document_count
                })));
            }
        };
        fetchViewIntervals();
    }, [supabase, hours]);

    return viewIntervals;
}

type useTagViewIntervalOptions = {
    hours: number;
    tag: string;
    supabase: SupabaseClient<Database>;
}

export function useTagViewIntervals({hours, tag, supabase}: useTagViewIntervalOptions): ViewInterval[] {
    const [viewIntervals, setViewIntervals] = useState<ViewInterval[]>([]);

    useEffect(() => {
        const fetchViewIntervals = async () => {
            const { data, error } = await supabase
                .rpc("get_news_views_intervals_by_tag", { hours_range: hours, vanity_tag_name: tag });

            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setViewIntervals(data.map((interval) => ({
                    interval: interval.hour_segment,
                    views: interval.document_count
                })));
            }
        };
        fetchViewIntervals();
    }, [supabase, hours, tag]);

    return viewIntervals;
}
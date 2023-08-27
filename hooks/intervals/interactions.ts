import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type InteractionInterval = {
    interactions: number;
    interval: string;
}

type useInteractionIntervalOptions = {
    hours: number;
    supabase: SupabaseClient<Database>;
    newsId?: number;
}

export function useInteractionIntervals({hours, supabase, newsId}: useInteractionIntervalOptions): InteractionInterval[] {
    const [interactionIntervals, setInteractionIntervals] = useState<InteractionInterval[]>([]);

    useEffect(() => {
        const fetchInteractionIntervals = async () => {
            if (newsId) {
                const { data, error } = await supabase
                    .rpc("get_news_interactions_intervals", { hours_range: hours, news_doc_id: newsId });
                
                if (error) {
                    console.log(error);
                    return;
                }

                if (data) {
                    setInteractionIntervals(data.map((interval) => ({
                        interval: interval.hour_segment,
                        interactions: interval.document_count
                    })));
                }
                return;
            }
            const { data, error } = await supabase
                .rpc("get_interaction_intervals", { hours_range: hours });

            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setInteractionIntervals(data.map((interval) => ({
                    interval: interval.hour_segment,
                    interactions: interval.document_count
                })));
            }
        };
        fetchInteractionIntervals();
    }, [supabase, hours]);

    return interactionIntervals;
}

type useTagViewIntervalOptions = {
    hours: number;
    tag: string;
    supabase: SupabaseClient<Database>;
}

export function useTagInteractionIntervals({hours, tag, supabase}: useTagViewIntervalOptions): InteractionInterval[] {
    const [viewIntervals, setViewIntervals] = useState<InteractionInterval[]>([]);

    useEffect(() => {
        const fetchViewIntervals = async () => {
            const { data, error } = await supabase
                .rpc("get_news_interaction_intervals_by_tag", { hours_range: hours, vanity_tag_name: tag });

            if (error) {
                console.log(error);
                return;
            }
            if (data) {
                setViewIntervals(data.map((interval) => ({
                    interval: interval.hour_segment,
                    interactions: interval.document_count
                })));
            }
        };
        fetchViewIntervals();
    }, [supabase, hours, tag]);

    return viewIntervals;
}
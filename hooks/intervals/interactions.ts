import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type InteractionInterval = {
    interactions: number;
    interval: string;
}

type useInteractionIntervalOptions = {
    rangeType: "days" | "months" | "years";
    range: number;
    endDate: Date;
    newsId?: number;
    supabase: SupabaseClient<Database>;
}

export function useInteractionIntervals({rangeType, range, supabase, newsId, endDate}: useInteractionIntervalOptions): InteractionInterval[] {
    const [interactionIntervals, setInteractionIntervals] = useState<InteractionInterval[]>([]);

    useEffect(() => {
        const fetchInteractionIntervals = async () => {
            const { data, error } = await supabase
                    .rpc("get_interaction_graph", {
                        range_type: rangeType,
                        range: range,
                        news_doc_id: newsId,
                        end_date: endDate?.toISOString() 
                    });
                
                if (error) {
                    console.log(error);
                    return;
                }

                if (data) {
                    setInteractionIntervals(data.map((interval) => ({
                        interval: interval.time_segment,
                        interactions: interval.document_count
                    })));
                }
        };
        fetchInteractionIntervals();
    }, [supabase, rangeType, range, newsId, endDate]);

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
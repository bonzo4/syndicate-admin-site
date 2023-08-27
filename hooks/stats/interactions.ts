import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Stats } from "./stats";
import { useState, useEffect } from "react";


export const useTagInteractions = (supabase: SupabaseClient<Database>, tag: string): Stats => {
    const [countStats, setCountStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getCount = async () => {
            const { data, error } = await supabase
                .rpc("get_interaction_count_by_tag", { vanity_tag_name: tag });
            
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
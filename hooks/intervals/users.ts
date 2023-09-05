import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type UserInterval = {
    users: number;
    interval: string;
}

type useUserIntervalOptions = {
    rangeType: "days" | "months" | "years";
    range: number;
    supabase: SupabaseClient<Database>;
}

export function useUserIntervals({ rangeType, range, supabase }: useUserIntervalOptions): UserInterval[] {
    const [userIntervals, setUserIntervals] = useState<UserInterval[]>([]);

    useEffect(() => {
        const fetchUserIntervals = async () => {
            const { data, error } = await supabase
                .rpc("get_discord_user_graph", {
                    range_type: rangeType,
                    range: range
                });

            if (error) {
                console.log(error);
                return;
            }
            console.log(data)
            if (data) {
                setUserIntervals(data.map((interval) => ({
                    interval: interval.time_segment,
                    users: interval.document_count
                })));
            }
        };
        fetchUserIntervals();
    }, [supabase, rangeType, range]);

    return userIntervals;
}
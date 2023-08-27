import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type LinkClick = {
    url: string,
    clicks: number
}

type useLinkClicksByUrlOptions = {
    newsId: number;
    supabase: SupabaseClient<Database>;
}

export const useLinkClicksByUrl = ({newsId, supabase}: useLinkClicksByUrlOptions): LinkClick[] => {
    const [linkClicks, setLinkClicks] = useState<LinkClick[]>([]);

    useEffect(() => {
        const fetchLinkClicks = async () => {
            const { data, error } = await supabase
                .rpc("get_clicks_by_url", { news_doc_id: newsId });
            
            if (error || !data) {
                return;
            }
            setLinkClicks(data.map((link) => ({
                url: link.url,
                clicks: link.clicks_count
                })));
        }
        fetchLinkClicks();
    }, [supabase, newsId]);

    return linkClicks.sort((a, b) => b.clicks - a.clicks);
}
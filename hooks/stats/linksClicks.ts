import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export const useLinkClicksCount = (supabase: SupabaseClient<Database>, newsId: number) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const getCount = async () => {
            const { data, error } = await supabase
                .rpc("get_link_clicks", { news_doc_id: newsId });
            
            console.log(data)
            
            if (error || !data) {
                return;
            }
            setCount(data);
        }
        getCount();
    }, [supabase, newsId]);

    return count;
}
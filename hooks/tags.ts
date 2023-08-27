import { Database } from "@/types";
import { getPagination } from "@/utils"
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type TagDoc =  Database["public"]["Tables"]["vanity_tags"]["Row"];

export const useTagList = (supabase: SupabaseClient<Database>, page: number) => {
    const { from, to } = getPagination(page, 10);
    const [tags, setTags] = useState<TagDoc[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const { data, error } = await supabase
                .from("vanity_tags")
                .select("*")
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) {
                console.log(error);
                return;
            }

            
            if (data) {
                setTags(data);
            }
        };
        fetchTags();
    }, [supabase, from, to, page]);
            
    return tags;
}
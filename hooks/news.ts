import { Database } from "@/types";
import { getPagination } from "@/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type NewsDoc = {
    tags: string[]
} & Database["public"]["Tables"]["discord_news"]["Row"];

export const useNewsList = (supabase: SupabaseClient<Database>, page: number, search: string) => {
    const { from, to } = getPagination(page, 10);
    const [news, setNews] = useState<NewsDoc[]>([]);

    useEffect(() => {
        const fetchNews = async () => {

            if (search) {
                const { data, error } = await supabase
                    .from("discord_news")
                    .select("*, tags(*)")
                    .order("created_at", { ascending: false })
                    .textSearch("title", search, { config: "english" })
                    .range(from, to);
                
                if (error) {
                    console.log(error);
                    return;
                }

                if (data) {
                    setNews(data.map((news) => ({
                        ...news,
                        tags: news.tags.map((tag) => tag.name)
                    })));
                    return;
                }
            }

            const { data, error } = await supabase
                .from("discord_news")
                .select("*, tags(*)")
                .order("created_at", { ascending: false })
                .range(from, to);
            
            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setNews(data.map((news) => ({
                    ...news,
                    tags: news.tags.map((tag) => tag.name)
                })));
            }
        };
        fetchNews();
    }, [supabase, from, to, search]);
    return news;
}

type NewsErrors = {
    guildName?: string;
} & Database["public"]["Tables"]["bot_errors"]["Row"];

export const useNewsErrors = (supabase: SupabaseClient<Database>, newsId: number, page: number): NewsErrors[] => {
    const { from, to } = getPagination(page, 10);
    const [errors, setErrors] = useState<NewsErrors[]>([]);

    useEffect(() => {
        const fetchNews = async () => {

            const { data, error } = await supabase
                .from("bot_errors")
                .select("*, guilds(name)")
                .eq("news_id", newsId)
                .order("created_at", { ascending: false })
                .range(from, to);
            
            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setErrors(data.map((errors) => {
                    return {
                        ...errors,
                        guildName: errors.guilds?.name
                    }
                }));
            }
        };
        fetchNews();
    }, [supabase, from, to]);
    return errors;
}

type NewsInteractions = {
    user: Database["public"]["Tables"]["discord_users"]["Row"] | null;
    choice: Database["public"]["Tables"]["poll_choices"]["Row"] | Database["public"]["Tables"]["quiz_choices"]["Row"] | null;
    guildName: string;
} & Database["public"]["Tables"]["interactions"]["Row"];

export const useNewsInteractions = (supabase: SupabaseClient<Database>, newsId: number, page: number): NewsInteractions[] => {

    const { from, to } = getPagination(page, 10);

    const [interactions, setInteractions] = useState<NewsInteractions[]>([]);

    useEffect(() => {
        const fetchInteractions = async () => {

            const { data, error } = await supabase
                .from("interactions")
                .select("*, discord_users(*), quiz_choices(*), poll_choices(*), guilds(name)")
                .eq("news_id", newsId)
                .order("created_at", { ascending: false })
                .range(from, to);
            
            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setInteractions(data.map((interactions) => {
                    return {
                        ...interactions,
                        user: interactions.discord_users,
                        choice: interactions.quiz_choices || interactions.poll_choices,
                        guildName: interactions.guilds?.name || ""
                    }
                }));
            }
        };
        fetchInteractions();
    }, [supabase, from, to]);
    return interactions;
}

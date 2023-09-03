import { Database } from "@/types";
import { getPagination } from "@/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type GuildDoc = {
    isSetup: boolean;
} & Database["public"]["Tables"]["guilds"]["Row"];

export const useGuildList = (supabase: SupabaseClient<Database>, page: number, search: string): GuildDoc[] => {
    const { from, to } = getPagination(page, 10);
    const [guilds, setGuilds] = useState<GuildDoc[]>([]);

    useEffect(() => {
        const fetchGuilds = async () => {

            if (search) {
                const { data, error } = await supabase
                .from("guilds")
                .select("*, guild_settings(*)")
                .order("created_at", { ascending: false })
                .textSearch("name", search, { config: "english" })
                    .range(from, to);
                
                if (error) {
                    console.log(error);
                    return;
                }

                if (data) {
                    setGuilds(data.map((guild) => ({
                        ...guild,
                        isSetup: Boolean(guild.guild_settings)
                    })));
                    return;
                }
            }

            const { data, error } = await supabase
                .from("guilds")
                .select("*, guild_settings(*)")
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setGuilds(data.map((guild) => ({
                    ...guild,
                    isSetup: Boolean(guild.guild_settings)
                    })));
            }
        };
        fetchGuilds();
    }, [supabase, from, to ,search]);
    return guilds;
}



export const useGuildErrors = (supabase: SupabaseClient<Database>, guildId: string, page: number): Database["public"]["Tables"]["bot_errors"]["Row"][] => {
    const { from, to } = getPagination(page, 10);
    const [errors, setErrors] = useState<Database["public"]["Tables"]["bot_errors"]["Row"][]>([]);

    useEffect(() => {
        const fetchGuilds = async () => {
            const { data, error } = await supabase
                .from("bot_errors")
                .select("*")
                .eq("guild_id", guildId)
                .order("created_at", { ascending: false })
                .range(from, to);

            if (error) {
                console.log(error);
                return;
            }

            if (data) {
                setErrors(data);
            }
        };
        fetchGuilds();
    }, [supabase, from, to]);
    return errors;
}


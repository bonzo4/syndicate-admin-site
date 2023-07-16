import { Database } from "@/types";
import { getGuildCount, getGuildsLastMonth, getGuildsLastWeek, getGuildsLeftLastMonth, getGuildsLeftLastWeek, getGuildsPerMonth, getGuildsPerWeek } from "@/utils/stats/guild";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type GuildMetrics = {
    totalGuilds: number;
    guildsPerMonth: number;
    guildsLastMonth: number;
    guildsPerWeek: number;
    guildsLastWeek: number;
    guildsLeftLastWeek: number;
    guildsLeftLastMonth: number;
}

export const useGuildMetrics = (supabase: SupabaseClient<Database>): GuildMetrics => {
    const [totalGuilds, setTotalGuilds] = useState<number>(0);
    const [guildsPerMonth, setGuildsPerMonth] = useState<number>(0);
    const [guildsLastMonth, setGuildsLastMonth] = useState<number>(0);
    const [guildsPerWeek, setGuildsPerWeek] = useState<number>(0);
    const [guildsLastWeek, setGuildsLastWeek] = useState<number>(0);
   
    
    const [guildsLeftLastWeek, setGuildsLeftLastWeek] = useState<number>(0);
    const [guildsLeftLastMonth, setGuildsLeftLastMonth] = useState<number>(0);

    useEffect(() => {
        const getGuildMetrics = async () => {
            const totalGuilds = await getGuildCount(supabase);
            setTotalGuilds(totalGuilds);
            setGuildsPerMonth(await getGuildsPerMonth(supabase, totalGuilds));
            setGuildsLastMonth(await getGuildsLastMonth(supabase));
            setGuildsPerWeek(await getGuildsPerWeek(supabase, totalGuilds));
            setGuildsLastWeek(await getGuildsLastWeek(supabase));
            setGuildsLeftLastMonth(await getGuildsLeftLastMonth(supabase));
            setGuildsLeftLastWeek(await getGuildsLeftLastWeek(supabase));
        }
        getGuildMetrics();
    }, [supabase])

    return {
        totalGuilds,
        guildsPerMonth,
        guildsLastMonth,
        guildsPerWeek,
        guildsLastWeek,
        guildsLeftLastMonth,
        guildsLeftLastWeek,
        
    }
}
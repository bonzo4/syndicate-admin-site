import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getGuildCount(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("guilds")
        .select("id", { count: 'exact' });
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getGuildsPerMonth(supabase: SupabaseClient<Database>, totalGuilds: number): Promise<number> {
    const { data: firstGuild, error } = await supabase
        .from("guilds")
        .select("joined_at")
        .order("joined_at", { ascending: true })
        .limit(1)
        .single()
    
    if (error || !firstGuild) {
        console.log
        return 0;
    }

    const date = new Date(firstGuild.joined_at);
    return totalGuilds / (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);
}

export async function getGuildsPerWeek(supabase: SupabaseClient<Database>, totalGuilds: number): Promise<number>{
    const { data, error } = await supabase
        .from("guilds")
        .select("joined_at")
        .order("joined_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }
    
    const date = new Date(data.joined_at);

    return totalGuilds / (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 7);
}

export async function getGuildsLastWeek(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("guilds")
        .select("joined_at", { count: 'exact' })
        .gte("joined_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getGuildsLastMonth(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("guilds")
        .select("id", { count: 'exact' })
        .gte("joined_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getGuildsLeftLastWeek(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("guilds")
        .select("id", { count: 'exact' })
        .neq("left_at", null)
        .gte("left_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getGuildsLeftLastMonth(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("guilds")
        .select("id", { count: 'exact' })
        .neq("left_at", null)
        .gte("left_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

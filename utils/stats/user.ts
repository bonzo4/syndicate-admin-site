import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserCount(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("discord_users")
        .select("id", { count: 'exact' });

    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getUsersPerDay(supabase: SupabaseClient<Database>, totalUsers: number): Promise<number> {
    const { data, error } = await supabase
        .from("discord_users")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }
    
    const date = new Date(data.created_at);

    return totalUsers / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export async function getUsersLastDay(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("discord_users")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}
import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getNewsCount(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("news_metrics")
        .select("news_id", { count: 'exact' })
        .gt("interactions", 10);
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getInteractionCount(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("interactions")
        .select("id", { count: 'exact' });
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getViewCount(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("views")
        .select("id", { count: 'exact' });
    
    if (error || !count) {
        return 0;
    }

    return count;
}   

export async function getInteractionsPerDay(supabase: SupabaseClient<Database>, totalInteractions: number): Promise<number> {
    const { data, error } = await supabase
        .from("interactions")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalInteractions / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export async function getInteractionsLastDay(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("interactions")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getInteractionsPerWeek(supabase: SupabaseClient<Database>, totalInteractions: number): Promise<number> {
    const { data, error } = await supabase
        .from("interactions")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalInteractions / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

export async function getInteractionsLastWeek(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("interactions")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getInteractionsPerMonth(supabase: SupabaseClient<Database>, totalInteractions: number): Promise<number> {
    const { data, error } = await supabase
        .from("interactions")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalInteractions / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export async function getInteractionsLastMonth(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("interactions")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getViewsPerMonth(supabase: SupabaseClient<Database>, totalViews: number): Promise<number> {
    const { data, error } = await supabase
        .from("views")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalViews / (Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)) ? Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)) : 1);
}

export async function getViewsLastMonth(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("views")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getViewsPerWeek(supabase: SupabaseClient<Database>, totalViews: number): Promise<number> {
    const { data, error } = await supabase
        .from("views")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalViews / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

export async function getViewsLastWeek(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("views")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getViewsPerDay(supabase: SupabaseClient<Database>, totalViews: number): Promise<number> {
    const { data, error } = await supabase
        .from("views")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalViews / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export async function getViewsLastDay(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("views")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getNewsPerWeek(supabase: SupabaseClient<Database>, totalNews: number): Promise<number> {
    const { data, error } = await supabase
        .from("discord_news")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalNews / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

export async function getNewsPerMonth(supabase: SupabaseClient<Database>, totalNews: number): Promise<number> {
    const { data, error } = await supabase
        .from("discord_news")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .single();
    
    if (error || !data) {
        return 0;
    }

    const date = new Date(data.created_at);

    return totalNews / Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
}

export async function getNewsLastWeek(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("discord_news")
        .select("created_at", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 7)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}

export async function getNewsLastMonth(supabase: SupabaseClient<Database>): Promise<number> {
    const { count, error } = await supabase
        .from("discord_news")
        .select("id", { count: 'exact' })
        .gte("created_at", new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toISOString());
    
    if (error || !count) {
        return 0;
    }

    return count;
}
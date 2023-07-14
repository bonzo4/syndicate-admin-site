import { useEffect, useState } from "react";
import { Stats } from "./stats";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types";

export const useGuildStats = (supabase: SupabaseClient<Database>): Stats => {

    const [guildStats, setGuildStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getGuildCount = async () => {
            const { count: guilds, error } = await supabase
                .from("guilds")
                .select("id", { count: 'exact' });
            const { count: guildsToday, error: error2 } = await supabase
                .from("guilds")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: guildsYesterday, error: error3 } = await supabase
                .from("guilds")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !guilds || !guildsToday || !guildsYesterday) {
                return;
            }

            const guildsTodayChange = guildsToday - guildsYesterday;
            const guildsTodayChangePercent = guildsTodayChange / guildsYesterday * 100;

            setGuildStats({ 
                value: guilds,
                change: guildsTodayChangePercent
             });
        }
        getGuildCount();
    }, [supabase]);
            
    return guildStats;
}

export const useGuildSettingsStats = (supabase: SupabaseClient<Database>): Stats => {
    const [guildSettingsStats, setGuildSettingsStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getGuildSettingsCount = async () => {
            const { count: guildSettings, error } = await supabase
                .from("guild_settings")
                .select("guild_id", { count: 'exact' });
            const { count: guildSettingsToday, error: error2 } = await supabase
                .from("guild_settings")
                .select("guild_id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: guildSettingsYesterday, error: error3 } = await supabase
                .from("guild_settings")
                .select("guild_id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !guildSettings || !guildSettingsToday || !guildSettingsYesterday) {
                return;
            }

            const guildSettingsTodayChange = guildSettingsToday - guildSettingsYesterday;
            const guildSettingsTodayChangePercent = guildSettingsTodayChange / guildSettingsYesterday * 100;

            setGuildSettingsStats({ 
                value: guildSettings,
                change: guildSettingsTodayChangePercent
            });
        }
        getGuildSettingsCount();
    }, [supabase]);
            
    return guildSettingsStats;
}

export const useMentionRolesStats = (supabase: SupabaseClient<Database>): Stats => {
    const [mentionRolesStats, setMentionRolesStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getMentionRolesCount = async () => {
            const { count: mentionRoles, error } = await supabase
                .from("mention_roles")
                .select("id", { count: 'exact' });
            const { count: mentionRolesToday, error: error2 } = await supabase
                .from("mention_roles")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: mentionRolesYesterday, error: error3 } = await supabase
                .from("mention_roles")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !mentionRoles || !mentionRolesToday || !mentionRolesYesterday) {
                return;
            }

            const mentionRolesTodayChange = mentionRolesToday - mentionRolesYesterday;
            const mentionRolesTodayChangePercent = mentionRolesTodayChange / mentionRolesYesterday * 100;

            setMentionRolesStats({
                value: mentionRoles,
                change: mentionRolesTodayChangePercent
            });
        }
        getMentionRolesCount();
    }, [supabase]);

    return mentionRolesStats;
}

export function useChannelStats(supabase: SupabaseClient<Database>): Stats {
    const [channelStats, setChannelStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getChannelCount = async () => {
            const { count: channels, error } = await supabase
                .from("news_channels")
                .select("id", { count: 'exact' });
            const { count: channelsToday, error: error2 } = await supabase
                .from("news_channels")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: channelsYesterday, error: error3 } = await supabase
                .from("news_channels")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !channels || !channelsToday || !channelsYesterday) {
                return;
            }

            const channelsTodayChange = channelsToday - channelsYesterday;
            const channelsTodayChangePercent = channelsTodayChange / channelsYesterday * 100;

            setChannelStats({ 
                value: channels,
                change: channelsTodayChangePercent
            });
        }
        getChannelCount();
    }, [supabase]);
            
    return channelStats;
}

export function useViewStatsByGuild(supabase: SupabaseClient<Database>, guildId: string): Stats {
    const [viewStats, setViewStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getViewCount = async () => {
            const { count: views, error } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId);
            const { count: viewsToday, error: error2 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: viewsYesterday, error: error3 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            
            if (error || error2 || error3 || !views || !viewsToday || !viewsYesterday) {
                return;
            }

            const viewsTodayChange = viewsToday - viewsYesterday;
            const interactionsTodayChangePercent = viewsTodayChange / viewsYesterday * 100;

            setViewStats({
                value: views,
                change: interactionsTodayChangePercent
            });
        }

            getViewCount();
    }, [supabase, guildId]);

    return viewStats;
}

export function useInteractionsStatsByGuild(supabase: SupabaseClient<Database>, guildId: string): Stats {
    const [interactionsStats, setInteractionsStats] = useState<Stats>({
        value: 0,
        change: 0
    })

    useEffect(() => {
        const getInteractionsCount = async () => {
            const { count: interactions, error } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId);
            const { count: interactionsToday, error: error2 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: interactionsYesterday, error: error3 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("guild_id", guildId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            
            if (error || error2 || error3 || !interactions || !interactionsToday || !interactionsYesterday) {
                return;
            }

            const interactionsTodayChange = interactionsToday - interactionsYesterday;
            const interactionsTodayChangePercent = interactionsTodayChange / interactionsYesterday * 100;

            setInteractionsStats({
                value: interactions,
                change: interactionsTodayChangePercent
            });
        }

            getInteractionsCount();
    }, [supabase, guildId]);

    return interactionsStats;
}

export const useNewsChannelsByGuild = (supabase: SupabaseClient<Database>, guildId: string) => {
    const [newsChannels, setNewsChannels] = useState<string[]>([]);

    useEffect(() => {
        const getNewsChannels = async () => {
            const { data: newsChannels, error } = await supabase
                .from("news_channels")
                .select("id")
                .eq("guild_id", guildId);
            if (error || !newsChannels) {
                return;
            }

            setNewsChannels(newsChannels.map(channel => channel.id));
        }

        getNewsChannels();
    }, [supabase, guildId]);

    return newsChannels;
}

export const useMentionsByGuild = (supabase: SupabaseClient<Database>, guildId: string) => {
    const [mentions, setMentions] = useState<string[]>([]);

    useEffect(() => {
        const getMentions = async () => {
            const { data: mentions, error } = await supabase
                .from("mention_roles")
                .select("id")
                .eq("guild_id", guildId);
            if (error || !mentions) {
                return;
            }

            setMentions(mentions.map(mention => mention.id));
        }

        getMentions();
    }, [supabase, guildId]);

    return mentions;
}


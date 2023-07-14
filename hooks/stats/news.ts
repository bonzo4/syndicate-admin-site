import { Database } from "@/types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Stats } from "./stats";

export const useViewStats = (supabase: SupabaseClient<Database>): Stats => {
    const [viewStats, setViewStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getViewCount = async () => {
            const { count: views, error } = await supabase
                .from("views")
                .select("id", { count: 'exact' });
            const { count: viewsToday, error: error2 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: viewsYesterday, error: error3 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !views || !viewsToday || !viewsYesterday) {
                return;
            }

            const viewsTodayChange = viewsToday - viewsYesterday;
            const viewsTodayChangePercent = viewsTodayChange / viewsYesterday * 100;

            setViewStats({ 
                value: views,
                change: viewsTodayChangePercent
            });
        }
        getViewCount();
    }, [supabase]);
            
    return viewStats;
}

export const useInteractions = (supabase: SupabaseClient<Database>): Stats => {
    const [interactionStats, setInteractionStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getInteractionCount = async () => {
            const { count: interactions, error } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' });
            const { count: interactionsToday, error: error2 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: interactionsYesterday, error: error3 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !interactions || !interactionsToday || !interactionsYesterday) {
                return;
            }

            const interactionsTodayChange = interactionsToday - interactionsYesterday;
            const interactionsTodayChangePercent = interactionsTodayChange / interactionsYesterday * 100;

            setInteractionStats({ 
                value: interactions,
                change: interactionsTodayChangePercent
            });
        }
        getInteractionCount();
    }, [supabase]);
            
    return interactionStats;
}

export const useInteractionStatsByNews = (supabase: SupabaseClient<Database>, newsId: number): Stats => {
    const [interactionStats, setInteractionStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getViewCount = async () => {
            const { count: interactions, error } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId);
            console.log(interactions);
            const { count: interactionsToday, error: error2 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString())
            console.log(interactionsToday)
            const { count: interactionsYesterday, error: error3 } = await supabase
                .from("interactions")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            console.log(interactionsYesterday)
            if (error || error2 || error3 || !interactions || !interactionsToday) {
                return;
            }

            const interactionsTodayChange = interactionsYesterday ? interactionsToday - interactionsYesterday : interactionsToday;
            const interactionsTodayChangePercent = interactionsYesterday ? interactionsTodayChange / interactionsYesterday * 100 : 0;

            setInteractionStats({ 
                value: interactions,
                change: interactionsTodayChangePercent
            });
        }
        getViewCount();
    }, [supabase]);
            
    return interactionStats;
}

export const useViewStatsByNews = (supabase: SupabaseClient<Database>, newsId: number): Stats => {
    const [viewStats, setViewStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getViewCount = async () => {
            const { count: views, error } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId);
            const { count: viewsToday, error: error2 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: viewsYesterday, error: error3 } = await supabase
                .from("views")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId)
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !views || !viewsToday) {
                return;
            }

            const viewsTodayChange = viewsYesterday ? viewsToday - viewsYesterday : viewsToday;
            const viewsTodayChangePercent = viewsYesterday ? viewsTodayChange / viewsYesterday * 100: 0;

            setViewStats({ 
                value: views,
                change: viewsTodayChangePercent
            });
        }
        getViewCount();
    }, [supabase, newsId]);
            
    return viewStats;
}

export const useErrorsByNews = (supabase: SupabaseClient<Database>, newsId: number): Stats => {
    const [errorStats, setErrorStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getErrorCount = async () => {
            const { count: errors, error } = await supabase
                .from("bot_errors")
                .select("id", { count: 'exact' })
                .eq("news_id", newsId);
            
            if (error  || !errors ) {
                return;
            }


            setErrorStats({ 
                value: errors,
                change: 0
            });
        }
        getErrorCount();
    }, [supabase, newsId]);
            
    return errorStats;
}

type ViewsTimeStats = {
    views: number,
    date: string,
}

export const useViewsOverTime = (supabase: SupabaseClient<Database>, period: "day" | "week" | "month"): {data: ViewsTimeStats[], labels: string[]} => {
    const [viewStats, setViewStats] = useState<ViewsTimeStats[]>([])
    
    useEffect(() => {
        const getViewsCounts = async () => {
            switch (period) {
                case "day":
                    const { data: viewsToday, error: error2 } = await supabase
                        .from("views")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
                    if (error2 || !viewsToday) {
                        return;
                    }
                    const viewsTodayGrouped = viewsToday.reduce((acc: ViewsTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                views: 1,
                                date
                            })
                        } else {
                            acc[index].views++;
                        }
                        return acc;
                    }, []);
                    setViewStats(viewsTodayGrouped);
                    break;
                case "week":
                    const { data: viewsWeek, error: error3 } = await supabase
                        .from("views")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString());
                    if (error3 || !viewsWeek) {
                        return;
                    }
                    const viewsWeekGrouped = viewsWeek.reduce((acc: ViewsTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                views: 1,
                                date
                            })
                        } else {
                            acc[index].views++;
                        }
                        return acc;
                    }, []);
                    setViewStats(viewsWeekGrouped);
                    break;
                case "month":
                    const { data: viewsMonth, error: error4 } = await supabase
                        .from("views")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString());
                    if (error4 || !viewsMonth) {
                        return;
                    }
                    const viewsMonthGrouped = viewsMonth.reduce((acc: ViewsTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                views: 1,
                                date
                            })
                        } else {
                            acc[index].views++;
                        }
                        return acc;
                    }, []);
                    setViewStats(viewsMonthGrouped);
                    break;
            }
            getViewsCounts();
        }
    }, [supabase, period]);
    if (period === "day") {
        return {
            data: viewStats,
            labels: viewStats.map((item) => item.date)
        }
    } else if (period === "week") {
        return {
            data: viewStats,
            labels: viewStats.map((item) => item.date)
        }
    }
    return {
        data: viewStats,
        labels: viewStats.map((item) => item.date)
    }
}

type InteractionTimeStats = {
    interactions: number,
    date: string
}

export const useInteractionsOverTime = (supabase: SupabaseClient<Database>, period: "day" | "week" | "month"): {data: InteractionTimeStats[], labels: string[]} => {
    const [interactionStats, setInteractionStats] = useState<InteractionTimeStats[]>([])

    useEffect(() => {
        const getInteractionsCounts = async () => {
            switch (period) {
                case "day":
                    const { data: interactionsToday, error: error2 } = await supabase
                        .from("interactions")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
                    if (error2 || !interactionsToday) {
                        return;
                    }
                    const interactionsTodayGrouped = interactionsToday.reduce((acc: InteractionTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                interactions: 1,
                                date
                            })
                        } else {
                            acc[index].interactions++;
                        }
                        return acc;
                    }, []);
                    setInteractionStats(interactionsTodayGrouped);
                    break;
                case "week":
                    const { data: interactionsWeek, error: error3 } = await supabase
                        .from("interactions")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString());
                    if (error3 || !interactionsWeek) {
                        return;
                    }
                    const interactionsWeekGrouped = interactionsWeek.reduce((acc: InteractionTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                interactions: 1,
                                date
                            })
                        } else {
                            acc[index].interactions++;
                        }
                        return acc;
                    }, []);
                setInteractionStats(interactionsWeekGrouped);
                    break;
                case "month":
                    const { data: interactionsMonth, error: error4 } = await supabase
                        .from("interactions")
                        .select("id, created_at")
                        .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString());
                    if (error4 || !interactionsMonth) {
                        return;
                    }
                    const interactionsMonthGrouped = interactionsMonth.reduce((acc: InteractionTimeStats[], curr) => {
                        const date = new Date(curr.created_at).toLocaleDateString();
                        const index = acc.findIndex((item) => item.date === date);
                        if (index === -1) {
                            acc.push({
                                interactions: 1,
                                date
                            })
                        } else {
                            acc[index].interactions++;
                        }
                        return acc;
                    }, []);
                    setInteractionStats(interactionsMonthGrouped);
                    break;
            }
        }
        getInteractionsCounts();
    }, [supabase, period])
    
    if (period === "day") {
        return {
            data: interactionStats,
            labels: interactionStats.map((item) => item.date)
        }
    } else if (period === "week") {
        return {
            data: interactionStats,
            labels: interactionStats.map((item) => item.date)
        }
    }
    return {
        data: interactionStats,
        labels: interactionStats.map((item) => item.date)
    }
}

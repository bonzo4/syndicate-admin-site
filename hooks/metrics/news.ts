import { Database } from "@/types";
import { getNewsCount, getNewsPerMonth, getNewsLastMonth, getNewsPerWeek, getNewsLastWeek, getViewCount, getViewsLastMonth, getViewsLastWeek, getViewsPerMonth, getViewsPerWeek, getViewsPerDay, getViewsLastDay, getInteractionCount, getInteractionsLastMonth, getInteractionsLastWeek, getInteractionsPerMonth, getInteractionsPerWeek, getInteractionsPerDay, getInteractionsLastDay } from "@/utils/stats/news";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type NewsMetrics = {
    totalNews: number;
    totalNewsPerMonth: number;
    totalNewsLastMonth: number;
    totalNewsPerWeek: number;
    totalNewsLastWeek: number;
}

export const useNewsMetrics = (supabase: SupabaseClient<Database>): NewsMetrics => {
    const [totalNews, setTotalNews] = useState<number>(0);
    const [totalNewsPerMonth, setTotalNewsPerMonth] = useState<number>(0);
    const [totalNewsLastMonth, setTotalNewsLastMonth] = useState<number>(0);
    const [totalNewsPerWeek, setTotalNewsPerWeek] = useState<number>(0);
    const [totalNewsLastWeek, setTotalNewsLastWeek] = useState<number>(0);

    useEffect(() => {
        const getNewsMetrics = async () => {
            const totalNews = await getNewsCount(supabase);
            setTotalNews(totalNews);
            setTotalNewsPerMonth(await getNewsPerMonth(supabase, totalNews));
            setTotalNewsLastMonth(await getNewsLastMonth(supabase));
            setTotalNewsPerWeek(await getNewsPerWeek(supabase, totalNews));
            setTotalNewsLastWeek(await getNewsLastWeek(supabase));
        }
        getNewsMetrics();
    }, [supabase])

    return {
        totalNews,
        totalNewsPerMonth,
        totalNewsLastMonth,
        totalNewsPerWeek,
        totalNewsLastWeek
    }
}

type ViewMetrics = {
    totalViews: number;
    totalViewsPerMonth: number;
    totalViewsLastMonth: number;
    totalViewsPerWeek: number;
    totalViewsLastWeek: number;
    totalViewsPerDay: number;
    totalViewsToday: number;
}

export const useViewMetrics = (supabase: SupabaseClient<Database>): ViewMetrics => {
    const [totalViews, setTotalViews] = useState<number>(0);
    const [totalViewsPerMonth, setTotalViewsPerMonth] = useState<number>(0);
    const [totalViewsLastMonth, setTotalViewsLastMonth] = useState<number>(0);
    const [totalViewsPerWeek, setTotalViewsPerWeek] = useState<number>(0);
    const [totalViewsLastWeek, setTotalViewsLastWeek] = useState<number>(0);
    const [totalViewsPerDay, setTotalViewsPerDay] = useState<number>(0);
    const [totalViewsToday, setTotalViewsToday] = useState<number>(0);

    useEffect(() => {
        const getViewMetrics = async () => {
            const totalViews = await getViewCount(supabase);
            setTotalViews(totalViews);
            setTotalViewsPerMonth(await getViewsPerMonth(supabase, totalViews));
            setTotalViewsLastMonth(await getViewsLastMonth(supabase));
            setTotalViewsPerWeek(await getViewsPerWeek(supabase, totalViews));
            setTotalViewsLastWeek(await getViewsLastWeek(supabase));
            setTotalViewsPerDay(await getViewsPerDay(supabase, totalViews));
            setTotalViewsToday(await getViewsLastDay(supabase));
        }
        getViewMetrics();
    }, [supabase])

    return {
        totalViews,
        totalViewsPerMonth,
        totalViewsLastMonth,
        totalViewsPerWeek,
        totalViewsLastWeek,
        totalViewsPerDay,
        totalViewsToday
    }
}

type InteractionMetrics = {
    totalInteractions: number;
    totalInteractionsPerMonth: number;
    totalInteractionsLastMonth: number;
    totalInteractionsPerWeek: number;
    totalInteractionsLastWeek: number;
    totalInteractionsPerDay: number;
    totalInteractionsToday: number;
}

export const useInteractionMetrics = (supabase: SupabaseClient<Database>): InteractionMetrics => {
    const [totalInteractions, setTotalInteractions] = useState<number>(0);
    const [totalInteractionsPerMonth, setTotalInteractionsPerMonth] = useState<number>(0);
    const [totalInteractionsLastMonth, setTotalInteractionsLastMonth] = useState<number>(0);
    const [totalInteractionsPerWeek, setTotalInteractionsPerWeek] = useState<number>(0);
    const [totalInteractionsLastWeek, setTotalInteractionsLastWeek] = useState<number>(0);
    const [totalInteractionsPerDay, setTotalInteractionsPerDay] = useState<number>(0);
    const [totalInteractionsToday, setTotalInteractionsToday] = useState<number>(0);

    useEffect(() => {
        const getInteractionMetrics = async () => {
            const totalInteractions = await getInteractionCount(supabase);
            setTotalInteractions(totalInteractions);
            setTotalInteractionsPerMonth(await getInteractionsPerMonth(supabase, totalInteractions));
            setTotalInteractionsLastMonth(await getInteractionsLastMonth(supabase));
            setTotalInteractionsPerWeek(await getInteractionsPerWeek(supabase, totalInteractions));
            setTotalInteractionsLastWeek(await getInteractionsLastWeek(supabase));
            setTotalInteractionsPerDay(await getInteractionsPerDay(supabase, totalInteractions));
            setTotalInteractionsToday(await getInteractionsLastDay(supabase));
        }
        getInteractionMetrics();
    }, [supabase])

    return {
        totalInteractions,
        totalInteractionsPerMonth,
        totalInteractionsLastMonth,
        totalInteractionsPerWeek,
        totalInteractionsLastWeek,
        totalInteractionsPerDay,
        totalInteractionsToday
    }
}
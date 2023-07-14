import { Database } from "@/types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export type Stats = {
    value: number;
    change: number;
} 

export const useUserStats = (supabase: SupabaseClient<Database>): Stats => {
    const [userStats, setUserStats] = useState<Stats>({
        value: 0,
        change: 0
    })
    
    useEffect(() => {
        const getUserCount = async () => {
            const { count: users, error } = await supabase
                .from("discord_users")
                .select("id", { count: 'exact' });
            const { count: usersToday, error: error2 } = await supabase
                .from("discord_users")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            const { count: usersYesterday, error: error3 } = await supabase
                .from("discord_users")
                .select("id", { count: 'exact' })
                .gte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString())
                .lte("created_at", new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString());
            if (error || error2 || error3 || !users || !usersToday || !usersYesterday) {
                return;
            }

            const usersTodayChange = usersToday - usersYesterday;
            const usersTodayChangePercent = usersTodayChange / usersYesterday * 100;

            setUserStats({ 
                value: users,
                change: usersTodayChangePercent
            });
        }
        getUserCount();
    }, [supabase]);
            
    return userStats;
}





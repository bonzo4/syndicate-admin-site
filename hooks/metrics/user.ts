import { Database } from "@/types";
import { getUserCount, getUsersLastDay, getUsersPerDay } from "@/utils/stats/user";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type UserMetrics = {
    totalUsers: number;
    usersPerDay: number;
    usersToday: number;
}

export const useUserMetrics = (supabase: SupabaseClient<Database>): UserMetrics => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [usersPerDay, setTotalUsersPerDay] = useState<number>(0);
    const [usersToday, setTotalUsersToday] = useState<number>(0);

    useEffect(() => {
        const getUserMetrics = async () => {
            const totalUsers = await getUserCount(supabase);
            setTotalUsers(totalUsers);
            setTotalUsersPerDay(await getUsersPerDay(supabase, totalUsers));
            setTotalUsersToday(await getUsersLastDay(supabase));
        }
        getUserMetrics();
    }, [supabase])

    return {
        totalUsers,
        usersPerDay,
        usersToday
    }
}
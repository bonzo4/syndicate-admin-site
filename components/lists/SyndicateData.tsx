import { getGuildsLastMonth, getGuildsPerMonth, getGuildsPerWeek, getGuildsLastWeek, getGuildsLeftLastMonth, getGuildsLeftLastWeek, getGuildCount } from "@/utils/stats/guild";
import { getInteractionCount, getInteractionsLastDay, getInteractionsLastMonth, getInteractionsLastWeek, getInteractionsPerDay, getInteractionsPerMonth, getInteractionsPerWeek, getNewsCount, getNewsLastMonth, getNewsLastWeek, getNewsPerMonth, getNewsPerWeek, getViewCount, getViewsLastDay, getViewsLastMonth, getViewsLastWeek, getViewsPerDay, getViewsPerMonth, getViewsPerWeek } from "@/utils/stats/news";
import { getUserCount, getUsersLastDay, getUsersPerDay } from "@/utils/stats/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function SyndicateStats() {

  const supabase = createServerComponentClient({ cookies })

  const totalGuilds = await getGuildCount(supabase);
  const totalUsers = await getUserCount(supabase);
  const totalNews = await getNewsCount(supabase);
  const totalViews = await getViewCount(supabase);
  const totalInteractions = await getInteractionCount(supabase);

  const stats: { label: string, value: number, unit: string }[] = [
    {
      label: "Guilds per month",
      value: await getGuildsPerMonth(supabase, totalGuilds),
      unit: "guilds"
    },
    {
      label: "Guilds this month",
      value: await getGuildsLastMonth(supabase),
      unit: "guilds"
    },
    {
      label: "Guilds left this month",
      value: await getGuildsLeftLastMonth(supabase),
      unit: "guilds"
    },
    {
      label: "Guilds per week",
      value: await getGuildsPerWeek(supabase, totalGuilds),
      unit: "guilds"
    },
    {
      label: "Guilds this week",
      value: await getGuildsLastWeek(supabase),
      unit: "guilds"
    },
    {
      label: "Guilds left this week",
      value: await getGuildsLeftLastWeek(supabase),
      unit: "guilds"
    },
    {
      label: "Posts per month",
      value: await getNewsPerMonth(supabase, totalNews),
      unit: "posts"
    },
    {
      label: "Posts this month",
      value: await getNewsLastMonth(supabase),
      unit: "posts"
    },
    {
      label: "Posts per week",
      value: await getNewsPerWeek(supabase, totalNews),
      unit: "posts"
    },
    {
      label: "Posts this week",
      value: await getNewsLastWeek(supabase),
      unit: "posts"
    },
    {
      label: "Views per month",
      value: await getViewsPerMonth(supabase, totalViews),
      unit: "views"
    },
    {
      label: "Views this month",
      value: await getViewsLastMonth(supabase),
      unit: "views"
    },
    {
      label: "Views per week",
      value: await getViewsPerWeek(supabase, totalViews),
      unit: "views"
    },
    {
      label: "Views this week",
      value: await getViewsLastWeek(supabase),
      unit: "views"
    },
    {
      label: "Views per day",
      value: await getViewsPerDay(supabase, totalViews),
      unit: "views"
    },
    {
      label: "Views today",
      value: await getViewsLastDay(supabase),
      unit: "views"
    },
    {
      label: "Interactions per month",
      value: await getInteractionsPerMonth(supabase, totalInteractions),
      unit: "interactions"
    },
    {
      label: "Interactions this month",
      value: await getInteractionsLastMonth(supabase),
      unit: "interactions"
    },
    {
      label: "Interactions per week",
      value: await getInteractionsPerWeek(supabase, totalInteractions),
      unit: "interactions"
    },
    {
      label: "Interactions this week",
      value: await getInteractionsLastWeek(supabase),
      unit: "interactions"
    },
    {
      label: "Interactions per day",
      value: await getInteractionsPerDay(supabase, totalInteractions),
      unit: "interactions"
    },
    {
      label: "Interactions today",
      value: await getInteractionsLastDay(supabase),
      unit: "interactions"
    },
    {
      label: "Unique users per day",
      value: await getUsersPerDay(supabase, totalUsers),
      unit: "users"
    },
    {
      label: "Unique users today",
      value: await getUsersLastDay(supabase),
      unit: "users"
    },
    {
      label: "Unique users per server",
      value: totalUsers / totalGuilds,
      unit: "users"
    },
    {
      label: "Total views per server",
      value: totalViews / totalGuilds,
      unit: "views"
    },
    {
      label: "Total interactions per server",
      value: totalInteractions / totalGuilds,
      unit: "interactions"
    },
  ];

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Label</th>
          <th className="px-4 py-2">Value</th>
        </tr>
      </thead>
      <tbody className="">
        {stats.map((stat, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{stat.label}</td>
            <td className="border px-4 py-2">{stat.value.toFixed(0)} {stat.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
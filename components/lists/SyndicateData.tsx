"use client"
import { useGuildMetrics } from "@/hooks/metrics/guild";
import { useNewsMetrics, useInteractionMetrics, useViewMetrics } from "@/hooks/metrics/news";
import { useUserMetrics } from "@/hooks/metrics/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function SyndicateStats() {

  const supabase = createClientComponentClient()

  const guildMetrics = useGuildMetrics(supabase);
  const newsMetrics = useNewsMetrics(supabase);
  const userMetrics = useUserMetrics(supabase);
  const interactionMetrics = useInteractionMetrics(supabase);
  const viewMetrics = useViewMetrics(supabase);

  const miscMetrics = {
    "Unique users per server": userMetrics.totalUsers / guildMetrics.totalGuilds,
    "Total views per server": viewMetrics.totalViews / guildMetrics.totalGuilds,
    "Total interactions per server": interactionMetrics.totalInteractions / guildMetrics.totalGuilds,
  }


  // const stats: { label: string, value: number, unit: string }[] = [
  //   {
  //     label: "Guilds per month",
  //     value: await getGuildsPerMonth(supabase, totalGuilds),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Guilds this month",
  //     value: await getGuildsLastMonth(supabase),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Guilds left this month",
  //     value: await getGuildsLeftLastMonth(supabase),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Guilds per week",
  //     value: await getGuildsPerWeek(supabase, totalGuilds),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Guilds this week",
  //     value: await getGuildsLastWeek(supabase),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Guilds left this week",
  //     value: await getGuildsLeftLastWeek(supabase),
  //     unit: "guilds"
  //   },
  //   {
  //     label: "Posts per month",
  //     value: await getNewsPerMonth(supabase, totalNews),
  //     unit: "posts"
  //   },
  //   {
  //     label: "Posts this month",
  //     value: await getNewsLastMonth(supabase),
  //     unit: "posts"
  //   },
  //   {
  //     label: "Posts per week",
  //     value: await getNewsPerWeek(supabase, totalNews),
  //     unit: "posts"
  //   },
  //   {
  //     label: "Posts this week",
  //     value: await getNewsLastWeek(supabase),
  //     unit: "posts"
  //   },
  //   {
  //     label: "Views per month",
  //     value: await getViewsPerMonth(supabase, totalViews),
  //     unit: "views"
  //   },
  //   {
  //     label: "Views this month",
  //     value: await getViewsLastMonth(supabase),
  //     unit: "views"
  //   },
  //   {
  //     label: "Views per week",
  //     value: await getViewsPerWeek(supabase, totalViews),
  //     unit: "views"
  //   },
  //   {
  //     label: "Views this week",
  //     value: await getViewsLastWeek(supabase),
  //     unit: "views"
  //   },
  //   {
  //     label: "Views per day",
  //     value: await getViewsPerDay(supabase, totalViews),
  //     unit: "views"
  //   },
  //   {
  //     label: "Views today",
  //     value: await getViewsLastDay(supabase),
  //     unit: "views"
  //   },
  //   {
  //     label: "Interactions per month",
  //     value: await getInteractionsPerMonth(supabase, totalInteractions),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Interactions this month",
  //     value: await getInteractionsLastMonth(supabase),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Interactions per week",
  //     value: await getInteractionsPerWeek(supabase, totalInteractions),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Interactions this week",
  //     value: await getInteractionsLastWeek(supabase),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Interactions per day",
  //     value: await getInteractionsPerDay(supabase, totalInteractions),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Interactions today",
  //     value: await getInteractionsLastDay(supabase),
  //     unit: "interactions"
  //   },
  //   {
  //     label: "Unique users per day",
  //     value: await getUsersPerDay(supabase, totalUsers),
  //     unit: "users"
  //   },
  //   {
  //     label: "Unique users today",
  //     value: await getUsersLastDay(supabase),
  //     unit: "users"
  //   },
  //   {
  //     label: "Unique users per server",
  //     value: totalUsers / totalGuilds,
  //     unit: "users"
  //   },
  //   {
  //     label: "Total views per server",
  //     value: totalViews / totalGuilds,
  //     unit: "views"
  //   },
  //   {
  //     label: "Total interactions per server",
  //     value: totalInteractions / totalGuilds,
  //     unit: "interactions"
  //   },
  // ];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Guilds</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(guildMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">News</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(newsMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Views</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(viewMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Interactions</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(interactionMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Users</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(userMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Misc</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="">
            {
              Object.entries(miscMetrics).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2">{key}</td>
                  <td className="border px-4 py-2">{value.toFixed(0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
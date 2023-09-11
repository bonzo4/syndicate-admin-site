
import GuildAndUserGraph from "@/components/charts/GuildAndUserGraph";
import PrimeViewsAdnEngagementGraph from "@/components/charts/PrimeViewsAndEngagmentGraph";
import { Stats } from "@/components/stats/Stats";

export default function Dashboard() {
  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground grow w-[80%] justify-center">
      <Stats />
      <GuildAndUserGraph />
      <PrimeViewsAdnEngagementGraph />
        {/* <ViewsAndInteractionsGraph /> */}
      </div>
  )
}

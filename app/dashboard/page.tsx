import { ActivityGraph } from "@/components/ActivityGraphs";
import { ViewsAndInteractionsGraph } from "@/components/charts/ViewsAndInteractions";
import { Stats } from "@/components/stats/Stats";

export default function Dashboard() {
  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground grow w-[80%]">
        <Stats />
        <ViewsAndInteractionsGraph />
      </div>
  )
}

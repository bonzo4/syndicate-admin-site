import { SyndicateStats } from "@/components/lists/SyndicateData";

export default function MetricsPage() {
  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground">
      <h1 className="text-foreground text-4xl font-bold">
        Metrics
      </h1>
      <SyndicateStats />
    </div>
  )
}
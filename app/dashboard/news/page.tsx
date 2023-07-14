
import { NewsList } from "@/components/lists/NewsList";
import { NewsStats } from "@/components/stats/NewsStats";

export default function Dashboard() {
  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground">
      <NewsStats />
      <NewsList />
    </div>
  );
}

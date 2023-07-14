
import { GuildList } from "@/components/lists/GuildList";
import { GuildStats } from "@/components/stats/GuildStats";

export default function Dashboard() {
  return (
    <div className="animate-in flex flex-col items-center opacity-0 px-3 text-foreground">
      <GuildStats />
      <GuildList />
    </div>
  );
}

import { GuildList } from '@/components/lists/GuildList';
import { LeftGuildList } from '@/components/lists/LeftGuildList';
import { GuildStats } from '@/components/stats/GuildStats';

export default function Dashboard() {
  return (
    <div className='animate-in flex flex-col items-center px-3 text-foreground opacity-0'>
      <GuildStats />
      <GuildList />
      <LeftGuildList />
    </div>
  );
}

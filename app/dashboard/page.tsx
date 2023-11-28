import GuildAndUserGraph from '@/components/charts/GuildAndUserGraph';
import { LinkClickGraph } from '@/components/charts/LinkGraph';
import { ViewGraph } from '@/components/charts/ViewGraph';
import { ViewsAndInteractionsGraph } from '@/components/charts/ViewsAndInteractions';
import { Stats } from '@/components/stats/Stats';

export default function Dashboard() {
  return (
    <div className='animate-in flex w-[80%] grow flex-col items-center justify-center px-3 text-foreground opacity-0'>
      <Stats />
      <GuildAndUserGraph />
      <ViewGraph />
      <LinkClickGraph />
    </div>
  );
}

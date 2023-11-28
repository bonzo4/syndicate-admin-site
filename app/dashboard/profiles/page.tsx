import ProfileGraph from '@/components/charts/ProfileGraph';
import { ProfileGraphAndPie } from '@/components/charts/ProfileGraphAndPie';
import { ProfileList } from '@/components/lists/ProfileList';
import { ProfileStats } from '@/components/stats/ProfileStats';

export default function Dashboard() {
  return (
    <div className='animate-in flex flex-col items-center px-3 text-foreground opacity-0'>
      <ProfileStats />
      <ProfileList />
      <ProfileGraph />
      <ProfileGraphAndPie />
    </div>
  );
}

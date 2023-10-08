import { RedirectList } from '@/components/lists/RedirectList';

export default function Dashboard() {
  return (
    <div className='animate-in flex flex-col items-center px-3 text-foreground opacity-0'>
      <RedirectList />
    </div>
  );
}

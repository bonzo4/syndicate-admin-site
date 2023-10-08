import { TagViewsAndInteractionsGraph } from '@/components/charts/TagViewsAndInteractions';
import TagStats from '@/components/stats/TagStats';
import { Database } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { name: string } }) {
  // extract name from url params
  const tagName = decodeURIComponent(params.name);

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from('vanity_tags')
    .select('*')
    .eq('name', tagName)
    .single();

  if (!data || error) return;

  return (
    <div className='animate-in flex flex-col items-center px-3 py-10 text-foreground opacity-0'>
      <h1 className='text-4xl font-bold'>Vanity Tag: {data.name}</h1>
      {/* <TagStats name={tagName} /> */}
      <TagViewsAndInteractionsGraph tag={tagName} />
    </div>
  );
}

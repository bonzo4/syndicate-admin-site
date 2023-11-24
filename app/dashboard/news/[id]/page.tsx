import { IndividualNewsStats } from '@/components/stats/IndividualNewsStats';
import { Database } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NewsErrorList } from '@/components/lists/NewsErrorList';
import { ViewsAndInteractionsPieGraph } from '@/components/charts/ViewsAndInteractionsPie';
import { ViewGraphAndPie } from '@/components/charts/ViewGraphAndPie';
import { PollGraphAndPie } from '@/components/charts/PollGraphAndPie';
import { QuizGraphAndPie } from '@/components/charts/QuizGraphAndPie';
import { InputGraphAndPie } from '@/components/charts/InputGraphAndPie';
import { LinkGraphAndPie } from '@/components/charts/LinkGraphAndPie';
import { WalletGraphAndPie } from '@/components/charts/WalletGraphAndPie';

export default async function NewsInfoPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: news, error } = await supabase
    .from('discord_news')
    .select('*, _news_tags(*)')
    .eq('id', params.id)
    .limit(1)
    .single();

  if (!news || error) return;

  const { data: embeds, error: error2 } = await supabase
    .from('news_embeds')
    .select('*')
    .eq('news_id', news.id);

  if (!embeds || error2) return;

  const interactions = embeds
    .map((embed) => embed.interaction_types)
    .flat()
    .filter((interaction) => interaction !== null);

  let stopDate = new Date();
  const tags = news._news_tags.map((tag) => tag.tag);
  const { data: nextNews, error: error1 } = await supabase
    .from('_news_tags')
    .select('news_id, discord_news(schedule)')
    .in('tag', tags)
    .gt('news_id', news.id)
    .limit(tags.length);

  // check if nextNews has the same news_ids
  const sameIds =
    nextNews &&
    nextNews.length === tags.length &&
    nextNews.every((news) => news.news_id === nextNews[0].news_id);

  if (!error1 && nextNews[0] && nextNews[0].discord_news && sameIds) {
    stopDate = new Date(nextNews[0].discord_news.schedule);
  }

  return (
    <div className='animate-in flex flex-col items-center py-3 text-foreground opacity-0'>
      <div className='flex flex-row space-x-2'>
        <h1 className='text-2xl font-bold text-white'>{news.title}</h1>
        <h2 className='text-2xl font-bold text-white'>
          {' '}
          Approved:{news.approved ? '✅' : '❌'}
        </h2>
        <h2 className='text-2xl font-bold text-white'>
          Schedule: {new Date(news.schedule).toLocaleString()}
        </h2>
      </div>
      <IndividualNewsStats newsId={news.id} />
      <div className='flex w-[75%] flex-col'>
        <ViewGraphAndPie newsId={news.id} />
        <LinkGraphAndPie newsId={news.id} />
        {interactions.includes('POLL') && <PollGraphAndPie newsId={news.id} />}
        {interactions.includes('QUIZ') && <QuizGraphAndPie newsId={news.id} />}
        {interactions.includes('INPUT') && (
          <InputGraphAndPie newsId={news.id} />
        )}

        {interactions.includes('WALLET') && (
          <WalletGraphAndPie newsId={news.id} />
        )}

        {/* {interactions.includes('PROFILE') && <PollGraphAndPie newsId={news.id} />}
        {interactions.includes('DIRECT') && <PollGraphAndPie newsId={news.id} />}
        {interactions.includes('PROMO') && <PollGraphAndPie newsId={news.id} />} */}
      </div>
      <div className='flex min-w-[50%] flex-col space-y-10'>
        {/* <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Interactions</h1>
          <NewsInteractionsList newsId={news.id} />
        </div> */}
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold text-white'>Bot Errors</h1>
          <NewsErrorList newsId={news.id} />
        </div>
      </div>
    </div>
  );
}

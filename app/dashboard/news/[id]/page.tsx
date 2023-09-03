import { GuildErrorList } from "@/components/lists/GuildErrorList"
import { IndividualGuildStats } from "@/components/stats/IndividualGuildStats"
import { IndividualNewsStats } from "@/components/stats/IndividualNewsStats"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NewsErrorList } from "@/components/lists/NewsErrorList"
import { NewsInteractionsList } from "@/components/lists/NewsInteractionList"
import { NewsGuildsList } from "@/components/lists/NewsGuildsList"
import { ViewsAndInteractionsGraph } from "@/components/charts/ViewsAndInteractions"
import { ViewsAndInteractionsPieGraph } from "@/components/charts/ViewsAndInteractionsPie"

export default async function NewsInfoPage({ params }: { params: { id: number } }) {
  
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: news, error } = await supabase
    .from('discord_news')
    .select('*, _news_tags(*)')
    .eq('id', params.id)
    .limit(1)
        .single()
  
  if (!news || error) return

  const { data: embeds, error: error2 } = await supabase
    .from('news_embeds')
    .select('*')
    .eq('news_id', news.id)
  
  if (!embeds || error2) return

  let stopDate = new Date()
  const tags = news._news_tags.map((tag) => tag.tag)
  const { data: nextNews, error: error1 } = await supabase
      .from("_news_tags")
      .select("news_id, discord_news(schedule)")
      .in("tag", tags)
      .gt("news_id", news.id)
      .limit(tags.length)

  // check if nextNews has the same news_ids
  const sameIds = nextNews && nextNews.length === tags.length  && nextNews.every((news) => news.news_id === nextNews[0].news_id)
  
  if (!error1 && nextNews[0] && nextNews[0].discord_news && sameIds) {
      stopDate = new Date(nextNews[0].discord_news.schedule)
  }


  return (
    <div className="animate-in flex flex-col items-center opacity-0 py-3 text-foreground">
      <div className="flex flex-row space-x-2">
        <h1 className="text-2xl font-bold text-white">
          {news.title}
        </h1>
        <h2 className="text-2xl font-bold text-white"> Approved:{news.approved ? '✅' : '❌'}</h2>
        <h2 className="text-2xl font-bold text-white">Schedule: {new Date(news.schedule).toLocaleString()}</h2>
      </div>
      <IndividualNewsStats newsId={news.id} tags={news._news_tags.map((tag) => tag.tag)} stopDate={stopDate}/>
      <div className="flex flex-col w-[75%]">
        <ViewsAndInteractionsGraph newsId={news.id} stopDate={stopDate} />
      </div>
      <div className="flex flex-col space-y-10 min-w-[50%]">
        {/* <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Interactions</h1>
          <NewsInteractionsList newsId={news.id} />
        </div> */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Bot Errors</h1>
          <NewsErrorList newsId={news.id} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Guilds</h1>
          <ViewsAndInteractionsPieGraph newsId={news.id} />
          {/* <NewsGuildsList newsId={news.id} /> */}
        </div>
      </div>
    </div>
  );
}
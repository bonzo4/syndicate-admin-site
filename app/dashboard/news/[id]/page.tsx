import { GuildErrorList } from "@/components/lists/GuildErrorList"
import { IndividualGuildStats } from "@/components/stats/IndividualGuildStats"
import { IndividualNewsStats } from "@/components/stats/IndividualNewsStats"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NewsErrorList } from "@/components/lists/NewsErrorList"
import { NewsInteractionsList } from "@/components/lists/NewsInteractionList"

export default async function GuildInfoPage({ params }: { params: { id: number } }) {
  
  const supabase = createServerComponentClient<Database>({ cookies })
  
  
  const { data: news, error } = await supabase
    .from('discord_news')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (!news || error) return
  
  const { data: embeds, error: error2 } = await supabase
    .from('news_embeds')
    .select('*')
    .eq('news_id', news.id)
  
  if (!embeds || error2) return

  return (
    <div className="animate-in flex flex-col items-center opacity-0 py-3 text-foreground">
      <div className="flex flex-row space-x-2">
        <h1 className="text-2xl font-bold text-white">
          {news.title}
        </h1>
        <h1 className="text-2xl font-bold text-white"> Approved?{news.approved ? '✅' : '❌'}</h1>
      </div>
      <IndividualNewsStats newsId={news.id} />
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Interactions</h1>
          <NewsInteractionsList newsId={news.id} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Bot Errors</h1>
          <NewsErrorList newsId={news.id} />
        </div>
      </div>
    </div>
  );
}
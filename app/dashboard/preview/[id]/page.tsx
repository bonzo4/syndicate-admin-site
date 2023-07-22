import { PreviewForm } from "@/components/PreviewForm";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function PreviewCreate({ params }: { params: { id: number } }) {

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: news, error } = await supabase
    .from('discord_news')
    .select('*, news_previews(*)')
    .eq('id', params.id)
    .single()
    
  
  if (!news || error) return

  const newsPreviews = news.news_previews as any

  return (
    <div className="animate-in flex flex-col items-center opacity-0 py-20 px-3 text-foreground">
      <h1>Preview Create</h1>
      <span>{news.title}</span>
      <span>clicks: {newsPreviews.clicks}</span>
      <span>inputs: {newsPreviews.inputs}</span>
      <PreviewForm id={params.id} clicks={newsPreviews.clicks} inputs={newsPreviews.inputs}/>
    </div>
  );
}
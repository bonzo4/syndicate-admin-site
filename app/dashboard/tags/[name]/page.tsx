import { TagViewsAndInteractionsGraph } from "@/components/charts/TagViewsAndInteractions";
import TagStats from "@/components/stats/TagStats";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { name: string } }) {

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from('vanity_tags')
    .select('*')
    .eq('name', params.name)
    .single()
    
  if (!data || error) return


  return (
    <div className="animate-in flex flex-col items-center opacity-0 py-10 px-3 text-foreground">
      <h1 className="text-4xl font-bold">Vanity Tag: {data.name}</h1>
      <TagStats name={params.name} />
      <TagViewsAndInteractionsGraph tag={params.name} />
    </div>
  );
}
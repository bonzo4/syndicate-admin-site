import { GuildErrorList } from "@/components/lists/GuildErrorList"
import { IndividualGuildStats } from "@/components/stats/IndividualGuildStats"
import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function GuildInfoPage({ params }: { params: { id: string } }) {
  
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const { data: guild, error } = await supabase
    .from('guilds')
    .select('*')
    .eq('id', params.id)
    .single()
  
  const { data: guildSettings } = await supabase
    .from('guild_settings')
    .select('*')
    .eq('guild_id', params.id)
    .single()
  
  const { data: guildReferral } = await supabase
    .from('guild_referrals')
    .select('user_id')
    .eq('guild_id', params.id)
    .single()
  
  if (error) return 

  return (
    <div className="animate-in flex flex-col items-center opacity-0 py-3 text-foreground">
      <div className="flex flex-row space-x-2">
        <h1 className="text-2xl font-bold text-white">
          {guild.name}
        </h1>
        <h1 className="text-2xl font-bold text-white"> Setup?{guildSettings ? '✅' : '❌'}</h1>
       
        <h1 className="text-2xl font-bold text-white">Referred?{guildReferral?.user_id ? '✅' : '❌'}</h1>
        {guild.invite &&
          <a className="underline hover:no-underline my-auto" href={guild.invite} target="_blank" rel="noreferrer" >
            Visit 🔗
          </a>}
        
      </div>
      <IndividualGuildStats guildId={guild.id} members={guild.member_count} />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Bot Errors</h1>
          <GuildErrorList guildId={guild.id} />
        </div>
      </div>
    </div>
  );
}
import { Database } from "@/types";

type GuildInfoProps = {
  guild: Database["public"]["Tables"]["guilds"]["Row"];
  guildSettings: Database["public"]["Tables"]["guild_settings"]["Row"] | null;
}

export function GuildInfo({ guild, guildSettings }: GuildInfoProps) {
  return (
    <div className="flex flex-col items-center opacity-0 px-3 text-foreground">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white">{guild.name}</h1>
        <h2 className="text-2xl font-bold">{guild.id}</h2>
      </div>
    </div>
  )
}
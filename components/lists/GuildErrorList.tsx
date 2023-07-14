"use client"

import { useGuildErrors, useGuildList } from "@/hooks/guilds"
import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type GuildErrorListProps = {
  guildId: string
}

export function GuildErrorList({ guildId }: GuildErrorListProps) {

  const supabase = createClientComponentClient<Database>()

  const [page, setPage] = useState<number>(0)
  const errors = useGuildErrors(supabase, guildId, page)
    
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">News ID</th>
          </tr>
        </thead>
        <tbody className="">
          {errors.map((error) => (
            <tr key={error.id}>
              <td className="border px-4 py-2">{new Date(error.created_at).toLocaleString()}</td>
              <td className="border px-4 py-2">{error.message}</td>
              {error.news_id && <td className="border px-4 py-2 underline hover:no-underline"><Link href={`/dashboard/news/${error.news_id}`}>News</Link></td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row space-x-2">
        {page > 0 && <button className="px-2 py-3 bg-slate-900 " onClick={() => setPage(page - 1)}>Previous</button>}
        <button className="px-2 py-3 bg-slate-900 " onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
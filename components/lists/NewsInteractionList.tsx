"use client"

import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useState } from "react"
import { useNewsInteractions } from "@/hooks/news"
type NewsInteractionsListProps = {
  newsId: number
}

export function NewsInteractionsList({ newsId }: NewsInteractionsListProps) {

  const supabase = createClientComponentClient<Database>()

  const [page, setPage] = useState<number>(0)
  const interactions = useNewsInteractions(supabase, newsId, page)
    
  return (
    <div className="w-full flex flex-col items-center space-y-2">

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Guild</th>
            <th className="px-4 py-2">Input</th>
            <th className="px-4 py-2">Choice</th>
          </tr>
        </thead>
        <tbody className="">
          {interactions.map((interaction) => (
            <tr key={interaction.id}>
              <td className="border px-4 py-2">{new Date(interaction.created_at).toLocaleString()}</td>
              {interaction.user && <td className=" flex flex-row border px-4 py-2">{interaction.user.name}</td>}
              {interaction.guildName && <td className="border px-4 py-2 underline hover:no-underline"><Link href={`/dashboard/news/${interaction.guildName}`}>{interaction.guildName}</Link></td>}
              <td className="border px-4 py-2">{interaction.input}</td>
              <td className="border px-4 py-2">{interaction.choice?.text}</td>
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
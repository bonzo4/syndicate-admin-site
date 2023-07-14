"use client"

import { useGuildErrors, useGuildList } from "@/hooks/guilds"
import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useNewsErrors } from "@/hooks/news"

type NewsErrorListProps = {
  newsId: number
}

export function NewsErrorList({ newsId }: NewsErrorListProps) {

  const supabase = createClientComponentClient<Database>()

  const [page, setPage] = useState<number>(0)
  const errors = useNewsErrors(supabase, newsId, page)
    
  return (
    <div className="w-full flex flex-col items-center space-y-2">

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Guild</th>
          </tr>
        </thead>
        <tbody className="">
          {errors.map((error) => (
            <tr key={error.id}>
              <td className="border px-4 py-2">{new Date(error.created_at).toLocaleString()}</td>
              <td className="border px-4 py-2">{error.message}</td>
              {error.guildName && <td className="border px-4 py-2 underline hover:no-underline"><Link href={`/dashboard/news/${error.guildName}`}>{error.guildName}</Link></td>}
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
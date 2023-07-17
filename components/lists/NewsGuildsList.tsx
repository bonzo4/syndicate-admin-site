"use client"

import { useNewsGuildList } from "@/hooks/news"
import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

type NewsGuildsListProps = {
  newsId: number
}

export function NewsGuildsList({ newsId }: NewsGuildsListProps) {
  const supabase = createClientComponentClient<Database>()

  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState<string>("")
  const guilds = useNewsGuildList(supabase, newsId, page, search);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <input className="bg-gray-800 text-white rounded-md px-4 py-2" placeholder="Search" onChange={onSearchChange}></input>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Views</th>
            <th className="px-4 py-2">Interactions</th>
          </tr>
        </thead>
        <tbody className="">
          {guilds.map((guild) => (
            <tr key={guild.id}>
              <td className="flex flex-row space-x-2 border px-4 py-2">
                <h1 className="text-white">
                  {guild.name}
                </h1>
              </td>
              <td className="border px-4 py-2">{guild.views}</td>
              <td className="border px-4 py-2">{guild.interactions}</td>
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
"use client"

import { useNewsList, usePreviewsList } from "@/hooks/news"
import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useState } from "react"


export function PreviewList() {
  const supabase = createClientComponentClient<Database>()

  const [page, setPage] = useState<number>(0)
  const news = usePreviewsList(supabase, page)


  return (
    <div className="w-full flex flex-col items-center space-y-2">

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Approved</th>
            <th className="px-4 py-2">Created at</th>
            <th className="px-4 py-2">Scheduled For</th>
            <th className="px-4 py-2">tags</th>
            <th className="px-4 py-2">Preview</th>
          </tr>
        </thead>
        <tbody className="">
          {news.map((news) => (
            <tr key={news.id}>
              <td className="flex flex-row space-x-2 border px-4 py-2">
                <h1 className="text-white">
                  {news.title}
                </h1>
              </td>
              <td className="border px-4 py-2">{news.approved ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">{new Date(news.created_at).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{new Date(news.schedule).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{news.tags.map((tag) => (tag))}</td>
              <td className="border px-4 py-2">{
                news.newsPreview && news.newsPreview.title && news.newsPreview.slug && news.newsPreview.thumbnail && news.newsPreview.tags ?  '✅' : '❌'
              }</td>
              <td className="border px-4 py-2 underline hover:no-underline"><Link href={`/dashboard/preview/${news.id}`}>Create a Preview</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row space-x-2">
        {page > 0 && <button className="px-2 py-3 bg-slate-900 " onClick={() => setPage(page - 1)}>Previous</button>}
        <button className="px-2 py-3 bg-slate-900 " onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}
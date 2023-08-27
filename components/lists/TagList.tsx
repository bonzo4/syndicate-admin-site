"use client";
import { useTagList } from "@/hooks/tags";
import { Database } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TagList() {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()

  const [newTag, setNewTag] = useState<string>("")

  const [page, setPage] = useState<number>(0)
  const tags = useTagList(supabase, page)

  const createTag = async () => {
    if (newTag.length > 0) {
      const { error } = await supabase.from("vanity_tags").insert({ name: newTag })
      if (error) {
        alert(error.message)
      }
      setNewTag("")
      setPage(0)
    }
  }

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <h1 className="text-white text-2xl font-bold">Vanity Tags</h1>
      <div className="flex flex-row space-x-2">
        <label className="text-white my-auto">Create tag:</label>
        <input
          value={newTag} onChange={(e) => setNewTag(e.target.value)}
          className="bg-gray-800 text-white rounded-md px-4 py-2" placeholder="Search" />
        <button className="px-2 py-3 bg-slate-900 " onClick={createTag}>Create</button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Stats</th>
          </tr>
        </thead>
        <tbody className="">
          {tags.map((tag) => (
            <tr key={tag.name}>
              <td className="border px-4 py-2">{tag.name}</td>
              <td className="border px-4 py-2">{new Date(tag.created_at).toLocaleDateString()}</td>
              <td className="border px-4 py-2 underline hover:no-underline"><Link href={`/dashboard/tags/${tag.name}`}>View</Link></td>
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
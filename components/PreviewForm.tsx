"use client"

import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { NewsPreview } from "./NewsPreview"

type PreviewFormProps = {
  id: number
  clicks: number
  inputs: number
}

export function PreviewForm({ id, clicks, inputs }: PreviewFormProps) {

  const supabase = createClientComponentClient<Database>()

  const [title, setTitle] = useState<string>("")
  const [slug, setSlug] = useState<string>("")
  const [thumbnail, setThumbnail] = useState<string>("")
  const [tag, setTag] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !slug || !thumbnail) return alert("Please fill out all fields")
    const { error } = await supabase
      .from('news_previews')
      .update({
        news_id: id,
        title,
        slug,
        thumbnail,
        tags
      })
      .eq('news_id', id)
    
    if (error) alert(error.message)

    alert("Preview Created")
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value)
        break;
      case "slug":
        setSlug(e.target.value)
        break;
      case "thumbnail":
        setThumbnail(e.target.value)
        break;
      case "tag":
        setTag(e.target.value)
        break;
    }
  }

  const addTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!tag) return alert("Please make sure you have a tag")
    setTags([...tags, tag])
    setTag("")
  }

  return (
    <div className="flex flex-col space-y-10">
      <form className="flex flex-col space-y-2" onSubmit={addTag}>
          <label className="flex flex-col space-y-2">
            <span className="text-white">Tag</span>
          <input value={tag} name="tag" className="bg-slate-900" type="text" onChange={onChange} />
          </label>
          <button className="px-1 py-1 bg-slate-900">Add Tag</button>
        </form>
      <form className="flex flex-col space-y-3" onSubmit={onSubmit}>
        <label className="flex flex-col space-y-2">
          <span className="text-white">Title</span>
          <input name="title" className="bg-slate-900" type="text" onChange={onChange} />
        </label>
        <label className="flex flex-col space-y-2">
          <span className="text-white">Slug</span>
          <input name="slug" className="bg-slate-900" type="text" onChange={onChange} />
        </label>
        <label className="flex flex-col space-y-2">
          <span className="text-white">Thumbnail</span>
          <input name="thumbnail" className="bg-slate-900" type="text" onChange={onChange} />
        </label>
        
        <button className="px-2 py-3 bg-slate-900">Submit</button>
      </form>
      <NewsPreview news={{
        title,
        slug,
        thumbnail,
        tags,
        clicks,
        inputs
      }} />
    </div>
  );
}
"use client"

import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai"
import { RxChatBubble } from "react-icons/rx"
import Image from "next/image"
 
type NewsCardProps = {
  news: {
    title: string
    slug: string
    thumbnail: string | null
    tags: string[]
    clicks: number
    inputs: number
  }
  removeTag: (tag: string) => void
}

export function NewsPreview({ news, removeTag }: NewsCardProps) {

  const date = new Date()

  return (
    <div className=' text-black flex flex-row drop-shadow-xl justify-between rounded-lg overflow-hidden bg-white'>
      <div className='flex flex-col py-2 pl-4 pr-4 space-y-1 w-full'>
        <p className="text-[12px]">{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</p>
        <h1 className="text-[20px] font-bold">{news.title}</h1>
        <p className="text-[16px]">{news.slug}</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            {news.tags.map((tag) => (
              <div className="bg-[#DADADA] px-2 py-1 rounded-full">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 text-[12px]">x</button>
              </div>
            ))}
          </div>
          <div className="flex flex-row space-x-1 my-auto">
            {news.clicks !== 0 && <div className="flex flex-row text-[12px]">
              <AiOutlineHeart className="my-auto mr-px" />
              <p className="my-auto">{news.clicks}</p>
            </div>}
            {news.inputs !== 0 && <div className="flex flex-row text-[12px]">
              <RxChatBubble className="my-auto mr-1" />
              <p className="my-auto">{news.inputs}</p>
            </div>}
            <AiOutlineShareAlt className="my-auto" />
          </div>
        </div>
      </div>
      {news.thumbnail && <div className="bg-black hidden lg:flex min-w-[200px] relative">
        <Image src={news.thumbnail} alt="news" fill objectFit="cover" />
      </div>}
    </div>
  );
}
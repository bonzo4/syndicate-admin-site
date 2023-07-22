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
  
}

export function NewsPreview({ news }: NewsCardProps) {
  return (
    <div className=' flex flex-row drop-shadow-xl justify-between rounded-lg bg-[#FAFAFF] text-black overflow-hidden'>
      <div className='flex flex-col py-2 pl-4 pr-4 grow'>
        <p className="text-[8px]">{new Date().toISOString().split('T')[0].replaceAll('-','/')}</p>
        <h1 className="text-[18px] font-bold">{news.title}</h1>
        <p className="text-[14px]">{news.slug}</p>
        <div className="flex flex-row  justify-between">
          <div className="flex flex-row space-x-2">
            {news.tags.map((tag) => (
              <p className="bg-[#DADADA] px-2 py-1 text-[10px] rounded-full">{tag}</p>
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
      {news.thumbnail && <div className="bg-black rounded-lg overflow-hidden hidden lg:flex">
        <Image src={news.thumbnail} alt="news" width={200} height={88} />
      </div>}
    </div>
  );
}
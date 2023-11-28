'use client';

import { useNewsList } from '@/hooks/news';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState } from 'react';

export function NewsList() {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const news = useNewsList(supabase, page, search);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <div className='flex w-full flex-col items-center space-y-2'>
      <input
        className='rounded-md bg-gray-800 px-4 py-2 text-white'
        placeholder='Search'
        onChange={onSearchChange}
      ></input>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Title</th>
            <th className='px-4 py-2'>Approved</th>
            <th className='px-4 py-2'>Created at</th>
            <th className='px-4 py-2'>Scheduled For</th>
            <th className='px-4 py-2'>tags</th>
            <th className='px-4 py-2'>Late</th>
          </tr>
        </thead>
        <tbody className=''>
          {news.map((news) => (
            <tr key={news.id}>
              <td className='flex flex-row space-x-2 border px-4 py-2'>
                <h1 className='text-white'>{news.title}</h1>
              </td>
              <td className='border px-4 py-2'>
                {news.approved ? 'Yes' : 'No'}
              </td>
              <td className='border px-4 py-2'>
                {new Date(news.created_at).toLocaleString()}
              </td>
              <td className='border px-4 py-2'>
                {new Date(news.schedule).toLocaleString()}
              </td>
              <td className='border px-4 py-2'>
                {news.tags.map((tag) => tag)}
              </td>
              <td className='border px-4 py-2 underline hover:no-underline'>
                {news.tags.includes('news') &&
                new Date(news.schedule).getHours() > 10
                  ? 'Yes'
                  : null}
              </td>
              <td className='border px-4 py-2 underline hover:no-underline'>
                <Link href={`/dashboard/news/${news.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex flex-row space-x-2'>
        {page > 0 && (
          <button
            className='bg-slate-900 px-2 py-3 '
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
        <button
          className='bg-slate-900 px-2 py-3 '
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

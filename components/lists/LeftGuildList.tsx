'use client';

import { useGuildList, useLeftGuildList } from '@/hooks/guilds';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function LeftGuildList() {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const guilds = useLeftGuildList({
    supabase,
    page,
  });

  return (
    <div className='flex w-full flex-col items-center space-y-2'>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Members</th>
            <th className='px-4 py-2'>Left at</th>
            <th className='px-4 py-2'>Setup?</th>
            <th className='px-4 py-2'>Tags</th>
            <th className='px-4 py-2'>Views</th>
            <th className='px-4 py-2'>Link Clicks</th>
          </tr>
        </thead>
        <tbody className=''>
          {guilds.map((guild) => (
            <tr key={guild.id}>
              <td className='flex flex-row space-x-2 border px-4 py-2'>
                {guild.icon && (
                  <Image src={guild.icon} alt='icon' width={32} height={32} />
                )}
                <h1 className='text-white'>{guild.name}</h1>
              </td>
              <td className='border px-4 py-2'>{guild.member_count}</td>
              <td className='border px-4 py-2'>
                {new Date(guild.joined_at).toLocaleDateString()}
              </td>
              <td className='border px-4 py-2'>
                {guild.isSetup ? 'Yes' : 'No'}
              </td>
              <td className='border px-4 py-2'>
                {guild.tags.map((tag) => tag)}
              </td>
              <td className='border px-4 py-2'>{guild.views}</td>
              <td className='border px-4 py-2'>{guild.linkClicks}</td>
              <td className='border px-4 py-2 underline hover:no-underline'>
                <Link href={`/dashboard/guild/${guild.id}`}>View</Link>
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

'use client';

import { useGuildList } from '@/hooks/guilds';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function GuildList() {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const guilds = useGuildList({
    supabase,
    page,
    search,
    guildType: 'all',
  });

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
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Members</th>
            <th className='px-4 py-2'>Joined at</th>
            <th className='px-4 py-2'>Setup?</th>
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

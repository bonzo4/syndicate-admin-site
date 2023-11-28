'use client';

import { useProfileList } from '@/hooks/profiles';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export function ProfileList() {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const profiles = useProfileList(supabase, page, search);

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
            <th className='px-4 py-2'>Rank</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Points</th>
            <th className='px-4 py-2'>Referrals</th>
            <th className='px-4 py-2'>Sol Wallet</th>
            <th className='px-4 py-2'>Eth Wallet</th>
            <th className='px-4 py-2'>Joined at</th>
          </tr>
        </thead>
        <tbody className=''>
          {profiles.map((profile, index) => (
            <tr key={profile.name}>
              <td className='border px-4 py-2'>{page * 10 + index + 1}.</td>
              <td className='flex flex-row space-x-2 border px-4 py-2'>
                <h1 className='text-white'>{profile.name}</h1>
              </td>
              <td className='border px-4 py-2'>{profile.points}</td>
              <td className='border px-4 py-2'>{profile.referrals}</td>
              <td className='border px-4 py-2'>
                {profile.solWallet?.slice(0, 5)}...
              </td>
              <td className='border px-4 py-2'>
                {profile.ethWallet?.slice(0, 5)}...
              </td>
              <td className='border px-4 py-2'>
                {new Date(profile.created_at).toLocaleDateString()}
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

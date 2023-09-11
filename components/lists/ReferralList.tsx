'use client';

import { useReferralList } from '@/hooks/referrals';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

type ReferralListProps = {
  userId?: string;
};

export function ReferralList({ userId }: ReferralListProps) {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const referrals = useReferralList({
    supabase,
    page,
    userId,
  });

  return (
    <div className='flex w-full flex-col items-center space-y-2'>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Guild</th>
            <th className='px-4 py-2'>User</th>
            <th className='px-4 py-2'>Member Count</th>
            <th className='px-4 py-2'>Setup?</th>
            <th className='px-4 py-2'>Created at</th>
          </tr>
        </thead>
        <tbody className=''>
          {referrals.map((referral) => (
            <tr key={referral.guildName}>
              <td className='border px-4 py-2'>{referral.guildName}</td>
              <td className='border px-4 py-2'>{referral.userName}</td>
              <td className='border px-4 py-2'>{referral.members}</td>
              <td className='border px-4 py-2'>
                {referral.isSetup ? 'Yes' : 'No'}
              </td>
              <td className='border px-4 py-2'>
                {referral.createdAt.toLocaleString()}
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

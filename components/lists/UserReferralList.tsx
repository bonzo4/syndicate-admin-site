'use client';

import { useReferralList, useUserReferralList } from '@/hooks/referrals';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

type ReferralListProps = {
  userId?: string;
};

export function UserReferralList({ userId }: ReferralListProps) {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const referrals = useUserReferralList({
    supabase,
    page,
    userId,
  });

  return (
    <div className='mt-10 flex w-full flex-col items-center space-y-2'>
      <h1 className='text-3xl font-bold'>User Referrals</h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>User</th>
            <th className='px-4 py-2'>Referrer</th>
            <th className='px-4 py-2'>Created at</th>
          </tr>
        </thead>
        <tbody className=''>
          {referrals.map((referral) => (
            <tr key={referral.userName}>
              <td className='border px-4 py-2'>{referral.userName}</td>
              <td className='border px-4 py-2'>{referral.referrerName}</td>
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

'use client';

import { useAmbassadorList } from '@/hooks/referrals';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

type AmbassadorListProps = {
  userId?: string;
  setUserId: (userId: string | undefined) => void;
};

export function AmbassadorList({ userId, setUserId }: AmbassadorListProps) {
  const supabase = createClientComponentClient<Database>();

  const [page, setPage] = useState<number>(0);
  const ambassadors = useAmbassadorList({
    supabase,
    page,
  });

  const handleSetUserId = (userId: string | undefined) => {
    setUserId(userId);
  };

  return (
    <div className='mt-10 flex w-full flex-col items-center space-y-2'>
      <h1 className='text-3xl font-bold'>Ambassadors</h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>User</th>
            <th className='px-4 py-2'>Referral Code</th>
            <th className='px-4 py-2'>Referral Count</th>
          </tr>
        </thead>
        <tbody className=''>
          {ambassadors.map((referral) => (
            <tr key={referral.userId}>
              <td className='border px-4 py-2'>{referral.userName}</td>
              <td className='border px-4 py-2'>{referral.referralCode}</td>
              <td className='border px-4 py-2'>{referral.referralCount}</td>
              <td className='border px-4 py-2'>
                {userId === referral.userId ? (
                  <button
                    className='bg-slate-900 px-2 py-3 '
                    onClick={() => handleSetUserId(undefined)}
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    className='bg-slate-900 px-2 py-3 '
                    onClick={() => handleSetUserId(referral.userId)}
                  >
                    Select
                  </button>
                )}
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

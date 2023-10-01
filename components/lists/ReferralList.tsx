'use client';

import { useReferralList } from '@/hooks/referrals';
import { Database } from '@/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
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

  const handleCheck = async (guildId: string, checked: boolean) => {
    await supabase
      .from('guild_referrals')
      .update({ checked })
      .eq('guild_id', guildId);
  };

  return (
    <div className='mt-10 flex w-full flex-col items-center space-y-2'>
      <h1 className='text-3xl font-bold'>Guild Referrals</h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Audited?</th>
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
              <td className='border px-4 py-2'>
                <input
                  type='checkbox'
                  checked={referral.checked}
                  onClick={() =>
                    handleCheck(referral.guildId, !referral.checked)
                  }
                />
              </td>
              <td className='border px-4 py-2 underline'>
                <Link href={`guild/${referral.guildId}`}>
                  {referral.guildName}
                </Link>
              </td>
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

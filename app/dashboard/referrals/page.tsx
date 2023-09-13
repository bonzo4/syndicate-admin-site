'use client';

import { AmbassadorList } from '@/components/lists/AmbassadorList';
import { ReferralList } from '@/components/lists/ReferralList';
import { UserReferralList } from '@/components/lists/UserReferralList';
import { useState } from 'react';

export default function ReferralPage() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  return (
    <div className='animate-in flex flex-col items-center px-3 text-foreground opacity-0'>
      <UserReferralList userId={userId} />
      <AmbassadorList userId={userId} setUserId={setUserId} />
      <ReferralList userId={userId} />
    </div>
  );
}

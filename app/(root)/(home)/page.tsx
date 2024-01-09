import { getUserByClerkId } from '@/lib/actions/user.actions';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';

import React from 'react';

const page = async () => {
  const { userId } = auth();
  if (!userId) return <div>no user id</div>;
  const result = await getUserByClerkId({ userId });

  console.log(result);

  return (
    <div className="flex items-center justify-start p-10">
      <div className="flex flex-col gap-5">
        <UserButton />
        <div className="gap-10">
          <h3 className="flex flex-row">
            Wallet address:<p className="text-green-500">{result.user.web3Wallet}</p>
          </h3>
          <h3 className="flex flex-row">
            balance:<p className="text-green-500">{result.user.amount}</p>
          </h3>
        </div>
        <Link href={'/topup'}>充值</Link>
      </div>
    </div>
  );
};

export default page;

'use client';

import { SignIn, UserButton, useAuth, useUser } from '@clerk/nextjs';
import React from 'react';

const UserProfile = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  if (!user) {
    return <SignIn />;
  }
  const primaryWeb3Wallet = user?.primaryWeb3Wallet;
  return (
    <div className="flex flex-col gap-5">
      <UserButton />
      <div>userId:{userId}</div>
      <div>metamask address!!!!!:{primaryWeb3Wallet ? primaryWeb3Wallet.web3Wallet : 'Not found'}</div>
    </div>
  );
};

export default UserProfile;

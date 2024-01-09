import { UserButton } from '@clerk/nextjs';
import React from 'react';

interface UserProfileProps {
  userId: string;
  wallet: string;
  amount: number;
}

const UserProfile = ({ userId, wallet, amount }: UserProfileProps) => {
  return (
    <div className="flex flex-col gap-5">
      <UserButton />
      <div>userId:{userId}</div>
      <div>metamask address!:{wallet}</div>
      <div>currency$:{amount}</div>
    </div>
  );
};

export default UserProfile;

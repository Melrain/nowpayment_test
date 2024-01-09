import { IUser } from '@/database/user.model';

export interface CreateUserParams {
  clerkId: string;
  web3Wallet: string;
  amount?: number;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
  path: string;
}

export interface GetUserByClerkIdParams {
  userId: string;
}

export interface MakePaymentParams {
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  ipn_callback_url: string;
  order_id: string;
  order_description: string;
}

export interface CreateInvoiceParams {
  price_amount: number;
  price_currency: string;
  order_id: string;
  ipn_callback_url?: string;
  order_description: string;
  success_url?: string;
  cancel_url?: string;
}

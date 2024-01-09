import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams, DeleteUserParams, GetUserByClerkIdParams, UpdateUserParams } from './shared.types';
import { revalidatePath } from 'next/cache';

export async function getUserByClerkId(params: GetUserByClerkIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error('User not found');
    return { user };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return { newUser };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = userData;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {}

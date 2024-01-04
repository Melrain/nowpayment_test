'use server';

import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.NEXT_MONGODB_URL) return console.log('MISSING MONGODB_URL');

  if (isConnected) return console.log('=> using existing database connection');

  // connect to DB
  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URL, { dbName: 'devflow' });
    isConnected = true;
    console.log('connected to database');
  } catch (error) {
    console.error(error);
  }
};

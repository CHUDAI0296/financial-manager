import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string; // 密码不会在客户端返回
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const collection = client.db().collection('users');
  return collection.findOne({ email }) as Promise<User | null>;
}

export async function getUserById(id: string): Promise<User | null> {
  const client = await clientPromise;
  const collection = client.db().collection('users');
  return collection.findOne({ _id: new ObjectId(id) }) as Promise<User | null>;
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const client = await clientPromise;
  const collection = client.db().collection('users');
  
  const now = new Date();
  const newUser = {
    ...userData,
    createdAt: now,
    updatedAt: now,
  };
  
  const result = await collection.insertOne(newUser);
  return {
    ...newUser,
    _id: result.insertedId,
  } as User;
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const client = await clientPromise;
  const collection = client.db().collection('users');
  
  const update = {
    ...userData,
    updatedAt: new Date(),
  };
  
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  
  return getUserById(id);
} 
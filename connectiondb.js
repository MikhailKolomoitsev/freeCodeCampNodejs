import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

export default async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`Database ${db.connection.name} connected! \n${db.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

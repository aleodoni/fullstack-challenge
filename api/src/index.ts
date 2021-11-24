require('dotenv').config();

import { app } from './app';

const start = async () => {
  if (!process.env.PORT) {
    throw new Error('PORT must be defined');
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be defined');
  }

  app.listen(process.env.PORT, () => {
    console.log(`🚀 API Listening on port ${process.env.PORT} 🚀`);
  });
}

start();

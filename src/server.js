import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //       options: {
  //         colorize: true,
  //       },
  //     },
  //   }),
  // );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  console.log('uploaded to the ', UPLOAD_DIR);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;

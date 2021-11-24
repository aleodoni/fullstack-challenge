import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';

import { errorHandler, NotFoundError } from './common';
import { indexRouter } from './routes/index.route';
import { categoryRouter } from './routes/category.route';
import { orderRouter } from './routes/order.route';

const app = express();

const allowedOrigins = ['*'];

const corsOptions ={
  origin:'http://localhost:3000',
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(json());

app.use(indexRouter);
app.use(categoryRouter);
app.use(orderRouter);

app.all('*', () => {
  throw new NotFoundError();
})

app.use(errorHandler);

export { app };

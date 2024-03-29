import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';


// import { errorHandler } from './middlewares/error-handlers';
// import { NotFoundError } from './errors/not-found-error';

import { errorHandler, currentUser } from '@algreetickets/common';
import { NotFoundError } from '@algreetickets/common';


import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';



const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)



app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }
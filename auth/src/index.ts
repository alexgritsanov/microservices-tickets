import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}))

import { currentUserRouter } from './routes/current-user'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';


app.use(currentUserRouter)
app.use(signupRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',
        )
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log("Listening on port 3001!")
    })

}

start()




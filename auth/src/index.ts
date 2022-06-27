import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

const app = express();
app.use(json());

import { currentUserRouter } from './routes/current-user'
import { signUpRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';


app.use(currentUserRouter)
app.use(signUpRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Listening on port 3000!")
})


import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error"
import { DatabaseConnectionError } from "../errors/database-connection-error"
import { RequestValidationError } from "../errors/request-validation-error"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    // console.log('Something went wrong', err)

    // if (err instanceof RequestValidationError) {
    //     return res.status(err.statusCode).send({ error: err.serializeErrors() })
    //     // const formattedErrors = err.errors.map(error => {
    //     //     return { message: error.msg, field: error.param }
    //     // })
    //     // return res.status(400).send({ errors: formattedErrors })
    // }

    // if (err instanceof DatabaseConnectionError) {
    //     return res.status(err.statusCode).send({ error: err.serializeErrors() })
    //     // return res.status(500).send({
    //     //     errors: [
    //     //         { message: err.reason }
    //     //     ]
    //     // })
    // }

    if (err instanceof CustomError) {
        console.log(err)
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }

    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    })
}
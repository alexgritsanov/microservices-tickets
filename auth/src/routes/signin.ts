import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
// import { BadRequestError } from '../errors/bad-request-error';

import { BadRequestError } from '@algreetickets/common';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { validateRequest } from '../middlewares/validate-request';
import { validateRequest } from '@algreetickets/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     throw new RequestValidationError(errors.array());
        // }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordsMatch = await Password.compare(existingUser.password, password)
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credantials')
        }

        //Generate JWT 
        console.log(existingUser)

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
            process.env.JWT_KEY!
        )

        //Store it on session object 
        req.session = {
            jwt: userJwt
        }
        res.status(200).send(existingUser);

    })

export { router as signinRouter }
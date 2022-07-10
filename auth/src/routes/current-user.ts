import express, { Router } from 'express'
import jwt from 'jsonwebtoken'
// import { currentUser } from '../middlewares/current-user'
// import { requireAuth } from '../middlewares/require-auth'
import { currentUser } from '@algreetickets/common'


const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // if (!req.session?.jwt) {
    //     return res.send({ currentUser: null })
    // }

    // try {
    //     const payload = jwt.verify(
    //         req.session.jwt, process.env.JWT_KEY!)
    //     res.send({ currentUser: payload })
    // } catch (err) {
    //     res.send({ currentUser: null })
    // }

    res.send({ currentUser: req.currentUser || null })

})

export { router as currentUserRouter }
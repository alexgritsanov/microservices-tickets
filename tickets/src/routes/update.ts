import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@algreetickets/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Ticket } from '../../models/ticket'

const router = express.Router()

router.put('/api/tickets/:id', requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage("Tittle is required"),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage("Price must be provided and must be greater than 0")


    ]
    , validateRequest, async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) {
            throw new NotFoundError()
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        })

        res.send(ticket)

    })

export { router as updateTicketRouter }
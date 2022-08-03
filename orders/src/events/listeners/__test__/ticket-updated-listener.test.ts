import { TicketUpdatedEvent } from "@algreetickets/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-update-listener"

const setup = async () => {
    //Create  a listener 
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket 
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })
    await ticket.save()

    // Create and fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'asdasda'
    }

    //Create a fake msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    // return all of this stuff
    return { msg, data, ticket, listener }
}

it('finds, updates, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup()

    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);


});


it('acks the message', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, ticket, listener } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg)
    } catch (err) {

    };


    expect(msg.ack).not.toHaveBeenCalled();
});
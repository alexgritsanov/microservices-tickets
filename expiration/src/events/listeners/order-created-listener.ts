import { Listener, OrderCreatedEvent, Subjects } from "@algreetickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expirtaion-queue";
import { queueGroupName } from "./queue-group-name";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = queueGroupName
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
        console.log('Waiting this many milliseconds to proccess the job:', delay)

        await expirationQueue.add({
            orderId: data.id
        },
            {
                delay
            }
        );

        msg.ack()
    }
}
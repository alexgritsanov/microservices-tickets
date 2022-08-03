import { OrderCreatedEvent, Publisher, Subjects } from "@algreetickets/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}


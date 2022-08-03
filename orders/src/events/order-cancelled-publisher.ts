// import { OrderCancelledEvent, Publisher, Subjects } from "@algreetickets/common";

import { OrderCancelledEvent, Publisher, Subjects } from "@algreetickets/common";



export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}

import { Publisher, Subjects, TicketUpdatedEvent } from "@algreetickets/common";



export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}


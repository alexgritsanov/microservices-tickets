import { PaymentCreatedEvent, Publisher, Subjects } from '@algreetickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated

}
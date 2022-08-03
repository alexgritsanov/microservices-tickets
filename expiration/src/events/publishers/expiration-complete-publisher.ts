import { ExpirationCompleteEvent, Publisher, Subjects } from "@algreetickets/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
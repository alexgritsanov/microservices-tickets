import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: "http://localhost:4222"
});

stan.on('connect', () => {
    console.log("Listener connected to Nats")

    stan.on('close', () => {
        console.log('NATS connection closed!')
        process.exit();
    })

    const options = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service')


    const subscription = stan.subscribe('ticket:created',
        //  "orders-service-queue-group",
        "queue-group-name",
        options)

    subscription.on('message', (msg: Message) => {
        const data = msg.getData()

        if (typeof data === 'string') {
            console.log(`Recieved event #${msg.getSequence()}, with data ${data}`)
        }

        msg.ack()
    })
})

process.on("SIGINT", () => stan.close())
process.on("SIGTERM", () => stan.close())

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string
    private client: Stan;
    protected ackWait = 5 * 1000

    constructor(client: Stan) {
        this.client = client
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            )
        })
    }
}
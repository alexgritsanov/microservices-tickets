import request from 'supertest'
import { Ticket } from '../../../models/ticket'
import { app } from '../../app'
import { natsWrapper } from '../../nats-wrapper'



it("has a route handler listening /api/tickets for post requests", async () => {
    const response = await request(app).post('/api/tickets').send({})

    expect(response.status).not.toEqual(404)
})

it("can only be accessed if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({})

    expect(response.status).toEqual(401)
})

it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({})

    console.log(response.status)
    expect(response.status).not.toEqual(401)
})

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "",
            price: 10,
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({

            price: 10,
        })
        .expect(400)


})

it("returns an error if invalid price is provided", async () => {

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'sdad',
            price: -10,
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'sdad'
        })
        .expect(400)


})

it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    const title = 'sdad'

    // add in a check to make sure ticket was saved
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20
        })
        .expect(201)

    tickets = await Ticket.find({})
    console.log(tickets[0])
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(20)
    expect(tickets[0].title).toEqual(title)



})

it('publishes an event', async () => {
    const title = 'sdad'

    // add in a check to make sure ticket was saved
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 20
        })
        .expect(201)

    console.log(natsWrapper)
})
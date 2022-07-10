import request from 'supertest'
import { app } from '../../app'

it('fails when a mail that does not exist supplied', async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400)

    // expect(response.get("Set-Cookie")).toBeDefined()
})

it('fails when incorrect mail  supplied', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "@#@passworda!@#"
        })
        .expect(400)


})

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)

    expect(response.get("Set-Cookie")).toBeDefined()

})
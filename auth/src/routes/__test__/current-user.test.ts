import { header } from 'express-validator'
import request from 'supertest'
import { app } from '../../app'


it('response with details with current user', async () => {
    // const authResponse = await request(app)
    //     .post("/api/users/signup")
    //     .send({
    //         email: "test@test.com",
    //         password: "password"
    //     })
    //     .expect(201)

    // const cookie = authResponse.get('Set-Cookie')

    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com')

    // expect(response.get("Set-Cookie")[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})


it('response with null if not authenticated', async () => {



    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null)

    // expect(response.get("Set-Cookie")[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfq'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }

})


// afterAll(async () => {
//     if (mongo) {
//         await mongo.stop();
//     }
//     await mongoose.connection.close();
// });


afterAll(async () => {
    await mongoose.connection.close(); // Close client's connections first
    await mongo.stop();                // Then stop the mongo server
});

global.signin = async () => {
    const email = "test@test.com"
    const password = "password"

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie')

    return cookie
}
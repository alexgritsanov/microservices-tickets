import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken'

declare global {
    // var signin: () => Promise<string[]>;
    var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper')

//optional
process.env.STRIPE_KEY = "sk_test_51LT7HwIRe58gS0tPADFEfOglgSQdLio2d2tWcKcJ8TLc2v58O5csxDdh3BqWLfiiRM4GWseZr7RqwDAGTm3vA5Jf00iqiImsHR"

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfq'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    jest.clearAllMocks()
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

global.signin = (id?: string) => {
    // Build a JWT payload  { id , email }
    // const payload = {
    //     id: 'asdk1231',
    //     email: "test@test.com"
    // }

    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    }



    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // Build session Object { jwt: MY_JWT}
    const session = { jwt: token }
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    //  Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')
    //  returin a string thats the cookie with the encoded data
    return [`session=${base64}`];

    // const email = "test@test.com"
    // const password = "password"

    // const response = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email, password
    //     })
    //     .expect(201)

    // const cookie = response.get('Set-Cookie')

    // return cookie
}




// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import { app } from '../app';

// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): Promise<string[]>;
//     }
//   }
// }

// let mongo: any;
// // beforeAll(async () => {
// //   process.env.JWT_KEY = 'asdfasdf';
// //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// //   mongo = new MongoMemoryServer();
// //   const mongoUri = await mongo.getUri();

// //   await mongoose.connect(mongoUri, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   });
// // });
// beforeAll(async () => {
//     process.env.JWT_KEY = 'asdfq'
//     mongo = await MongoMemoryServer.create();
//     const mongoUri = mongo.getUri();

//     await mongoose.connect(mongoUri, {});
// })


// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   await mongo.stop();
//   await mongoose.connection.close();
// });

// global.signin = async () => {
//   // Build a JWT payload.  { id, email }
//   // Create the JWT!
//   // Build session Object. { jwt: MY_JWT }
//   // Turn that session into JSON
//   // Take JSON and encode it as base64
//   // return a string thats the cookie with the encoded data
// };




// import { MongoMemoryServer } from 'mongodb-memory-server'
// import mongoose from 'mongoose';

// let mongo: any
// beforeAll(async () => {
//     process.env.JWT_KEY = 'asdfq'
//     mongo = await MongoMemoryServer.create();
//     const mongoUri = mongo.getUri();

//     await mongoose.connect(mongoUri, {});
// })

// beforeEach(async () => {
//     const collections = await mongoose.connection.db.collections()

//     for (let collection of collections) {
//         await collection.deleteMany({})
//     }

// })


// afterAll(async () => {
//     if (mongo) {
//         await mongo.stop();
//     }
//     await mongoose.connection.close();
// });


// // afterAll(async () => {
// //     await mongoose.connection.close(); // Close client's connections first
// //     await mongo.stop();                // Then stop the mongo server
// // });
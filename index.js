import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
let _client 

const createClient = async () => {
    if (!_client) {
        _client = new MongoClient(process.env.MONGO_URL);
        await _client.connect();
    }
    return _client;
};


const getBuyersCollection = async () =>{
    const client = await createDealer();
    const db = client.db('db2');
    return db.collection('Dealership');
}


const createCars  = async ({ name, dob, email }) => {
    const userCollection = await getUserCollection();
    await userCollection.insertOne({ name, dob, email });
    return { name, dob, email };
  };

cont run = async () => {
  const cars = await createCars();
  await createCars({
    make: faker.vehical.model(),
    model: faker.model.
  })
}


  

  // const getUsers = async () => {
  //   const userCollection = await getUserCollection();
  //   const ret = await userCollection.find({});

  //   return ret.toArray();
  // }
  

  const run = async () => {
    const client = await createClient();
    await createUser({
      name: "John",
      dob: new Date("09/10/2002"),
      email: "John.sweeney09@icloud.com",
    }).then();
    await client.close();

  };
  run().then();




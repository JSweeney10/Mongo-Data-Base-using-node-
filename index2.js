import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import faker from "faker";

dotenv.config();
let _client;

// connect to cluster to cache client connection;
//function to keep using for each clientt
// only create1 client, if already exits just return
const createClient = async () => {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL);
    await _client.connect();
  }
  return _client;
};

const getCarsCollection = async () => {
  const client = await createClient();
  const db = client.db("dealership");
  return db.collection("cars");
};

const getBuyersCollection = async () => {
  const client = await createClient();
  const db = client.db("dealership");
  return db.collection("buyers");
};

const getOrdersCollection = async () => {
  const client = await createClient();
  const db = client.db("dealership");
  return db.collection("orders");
};

const createCars = async ({ make, model, price }) => {
  const carsCollection = await getCarsCollection();
  await carsCollection.insertOne({ make, model, price });
  return { make, model, price };
};

const createBuyers = async ({ name, address, phone }) => {
  const carsCollection = await getBuyersCollection();
  await carsCollection.insertOne({ name, address, phone });
  return { name, address, phone };
};

const createOrders = async ({ date, carID, buyerID }) => {
  const carsCollection = await getOrdersCollection();
  await carsCollection.insertOne({ date, carID, buyerID });
  return { date, carID, buyerID };
};

const run = async () => {
  const client = await createClient();
  const orders = await readOrder();
  console.log(orders);
  

//     make: faker.vehicle.model(),
//     model: faker.vehicle.type(),
//     price: faker.datatype.number(),
//   });


//   await createBuyers({
//     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//     address: faker.address.streetAddress(),
//     phone: faker.phone.phoneNumber(),
//   });
//   await createOrders({
//     date: faker.date.month(),
//     carID: "61560824ed93030fdf4ac782",
//     buyerID: "61560824ed93030fdf4ac783",
//   });
//  await client.close();
//  };



const getUsers = async () => {
    const userCollection = await getOrdersCollection();
    const ret = await userCollection.find({});
    return ret.toArray()
  };

  
run().then();

//create a variable for each line 55, 60 
//consoll log before closing connection

// new ObjectId("61560824ed93030fdf4ac782")
// new ObjectId("61560824ed93030fdf4ac783")

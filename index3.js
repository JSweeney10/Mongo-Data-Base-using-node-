import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import faker from "faker";

dotenv.config();
let _client;

// only ever create 1 client, if it already exists just return it;
const createClient = async () => {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL);
    await _client.connect();
  }
  return _client;
};

const getCarsCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
  return db.collection("cars");
};

const getBuyersCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
  return db.collection("cars");
};

const getOrdersCollection = async () => {
  const dealer = await createClient();
  const db = dealer.db("dealership");
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
}

const readOrder = async () => {
    const userCollection = await getCarsCollection();
    //const ret = await userCollection.find({"make": "CTS"});
    const ret = await userCollection.findOne({"_id": ObjectId("6156027771005f7645ea9a5e")});
    return ret // object single doc
    // return ret1.toArray()
  };
  

const run = async () => {
  const client = await createClient();
  const orders = await readOrder();
  console.log(orders);

    await createCars({
      make: faker.vehicle.model(),
      model: faker.vehicle.type(),
      price: faker.datatype.number(),
    });
    await createBuyers({
      name: `${faker.name.firstName()} ${faker.name.lastName}`,
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
    });
    await createOrders({
      date: faker.date.month(),
      carID: "6156027771005f7645ea9a5e",
      buyerID: "6156027771005f7645ea9a5f",
    });
  await client.close();
};

run().then();


// to get ids you have to =
//1.return on create functions line 37,43,49
//2. create a variable for each on line 55,60
// and console.log before closing connection
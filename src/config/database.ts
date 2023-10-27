import { MongoClient } from "mongodb"
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)
//https://www.mongodb.com/docs/drivers/node/current/quick-reference/

// export async function connectToDb() {
//   try {
//     const dbClient = await client.connect()
//     return dbClient
//     console.log("connected to mongoDB")
//   } catch (error) {
//     console.log("Error connecting to mongo db", error)
//   }
// }

export const connectToDb = async () => {
  const dbClient = await client.connect()
  return dbClient
}

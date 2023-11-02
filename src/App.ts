import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import { addUser, editUser, getUser, deleteUser, getAllUser } from "./api/users"
import { addPost, deletePost, editPost, getPost } from "./api/posts"
import cors from "cors"

const app = express()
app.use(cors())
const port = 3300

type User = {
  id: number
  name: string
  year: number
  email: string
}

async function main() {
  const client = await connectToDb()

  const database = client?.db("mydb")
  const whichone = database?.collection<User>("whichoneusers")
  const userDataArr = await whichone?.find({}).toArray()
  console.log("Database data: ", userDataArr)

  // Start your Express.js application once the MongoDB connection is established
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  app.use(bodyParser.json())

  getAllUser(app, database)
  getUser(app, database)
  addUser(app, database)
  editUser(app, database)
  deleteUser(app, database)

  addPost(app, database)
  getPost(app, database)
  deletePost(app, database)
  editPost(app, database)
}

main()

import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import {
  addUser,
  editUser,
  getUser,
  deleteUser,
  getAllUsers,
} from "./api/users"
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getAllPosts,
} from "./api/posts"
import { voteOnPost } from "./api/voting"

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

  getAllUsers(app, database)
  getUser(app, database)

  addUser(app, database)
  editUser(app, database)
  deleteUser(app, database)

  getAllPosts(app, database)
  getPost(app, database)

  addPost(app, database)
  deletePost(app, database)
  editPost(app, database)

  voteOnPost(app, database)
}

main()

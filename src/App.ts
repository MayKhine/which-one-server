import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import { getAllUsers, patchUser } from "./api/users"

import cors from "cors"
import { getAllPostsExceptLoginUser } from "./api/posts"

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
  // const whichone = database?.collection<User>("whichoneusers")
  // const userDataArr = await whichone?.find({}).toArray()
  // console.log("Database data: ", userDataArr)

  // Start your Express.js application once the MongoDB connection is established
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  app.use(bodyParser.json())

  // getAllUsers(app, database)
  // getUser(app, database)

  // addUser(app, database)
  // editUser(app, database)
  // deleteUser(app, database)

  // getAllPosts(app, database)
  // getPost(app, database)

  // addPost(app, database)
  // deletePost(app, database)
  // editPost(app, database)

  // voteOnPost(app, database)
  // getPostByUser(app, database)
  // deletePostByUser(app, database)
  // editPostByUser(app, database)

  patchUser(app, database)
  getAllUsers(app, database)
  getAllPostsExceptLoginUser(app, database)
}

main()

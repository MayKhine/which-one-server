import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import {
  addUser,
  editUser,
  getUser,
  deleteUser,
  getAllUsers,
  patchUser,
} from "./api/users"
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getAllPosts,
  getPostByUser,
  deletePostByUser,
  editPostByUser,
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
// var request = require("request")

// var options = {
//   method: "POST",
//   url: "https://dev-7q5k3j3ynd5hljge.us.auth0.com/oauth/token",
//   headers: { "content-type": "application/json" },
//   body: '{"client_id":"xCmsejuRj7n8E92KmOLlJl0bTFt6hipQ","client_secret":"QNNrz6oir8ZEYYMegSB9GUB4ihZV26i2U8WuEbAtgNOoFEp8QFk-pzFeTG8uioe8","audience":"http://localhost:3300","grant_type":"client_credentials"}',
//   // body: '{"client_id":"qpxc2Hu732gLhkNj1JxeX4LoNRHHx26c","client_secret":"qGYdetlCZxYx-HkJWVnH2zOYkLUxntFbEJEfEXZ8sjSzVVI4wMbKIKhc5PnJ2-bD","audience":"http://localhost:5173","grant_type":"client_credentials"}',
// }

// request(options, function (error, response, body) {
//   if (error) throw new Error(error)

//   console.log(body)
// })

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
  getPostByUser(app, database)
  deletePostByUser(app, database)
  editPostByUser(app, database)

  patchUser(app, database)
}

main()

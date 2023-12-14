import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import { getAllUsers, getUserInfoAndPosts, patchUser } from "./api/users"
import multer from "multer"
import path from "path"
import cors from "cors"
import {
  createPost,
  // getAllPostsExceptLoginUser,
  getPosts,
  getPostsByEmail,
  addImage,
} from "./api/posts"
import { getImageByID } from "./api/images"

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

  // Serve the images folder statically
  // app.use("images", express.static("images"))
  app.use(express.static("images"))
  //http://localhost:3300/f702ccb0-2982-49c7-b756-becbc4f68b9a.jpg

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  app.use(bodyParser.json())

  // voteOnPost(app, database)
  // getPostByUser(app, database)
  // deletePostByUser(app, database)
  // editPostByUser(app, database)

  patchUser(app, database)
  getAllUsers(app, database)
  getPosts(app, database)
  getUserInfoAndPosts(app, database)
  getPostsByEmail(app, database)
  createPost(app, database)
  addImage(app, database)
  getImageByID(app)
}

main()

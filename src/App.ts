import express from "express"
import bodyParser from "body-parser"
import { connectToDb } from "./config/database"
import { addUser, updateUser, getUser, deleteUser } from "./api/users"

const app = express()
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
  const whichone = database?.collection<User>("whichone")
  const userDataArr = await whichone?.find({}).toArray()
  console.log("Database data: ", userDataArr)

  // Start your Express.js application once the MongoDB connection is established
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  app.use(bodyParser.json())

  getUser(app, database)
  addUser(app, database)
  updateUser(app, database)
  deleteUser(app, database)
}

main()

// app.use(bodyParser.json())

// app.use(express.static("public"))

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST")
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//   next()
// })

/*
//get
app.get("/", (req, res) => {
  res.send("Which one")
})

app.get("/users/:userID", (req, res) => {
  const userID = parseInt(req.params.userID, 10)
  console.log("Get user:", userID)

  const user = users.find((user) => user.id === userID)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: "UserNotfound" })
  }
})

//update


//post
app.post("/register", (req, res) => {
  console.log("res ", res.status)
  res.send("Got a POST request")

  const jsonData = req.body
  console.log(jsonData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

*/

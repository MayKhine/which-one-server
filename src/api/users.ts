import { Db } from "mongodb"
const userCollectionName = "whichoneusers"

export const getAllUsers = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.get("/users", async (req, res) => {
    const users = await userCollection.find({}).toArray()
    console.log("Get all users", users)
    res.json(users)
  })
}

// export const getUser = (app: any, database: Db) => {
//   const userCollection = database.collection(userCollectionName)

//   app.get("/users/:userID", async (req, res) => {
//     const userID = parseInt(req.params.userID, 10)
//     const user = await userCollection.findOne({ id: userID })
//     console.log("Get user ", userID)
//     res.json({ message: "User information updated", result: user })
//   })
// }

export const getUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.get("/users/:userName", async (req, res) => {
    const userName = req.params.userName
    const user = await userCollection.findOne({ name: userName })
    console.log("Get user ", userName)
    res.json({ message: "success", result: user })
  })
}

//add user : POST
export const addUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.post("/register", async (req, res) => {
    console.log("res ", res.status)
    // res.send("Got a POST request")

    const newUser = req.body
    const newUserName = newUser.name
    const curUser = await userCollection.findOne({ name: newUserName })
    console.log("newUserName: ", newUserName, "and curUser: ", curUser)

    if (curUser === null) {
      const result = await userCollection.insertOne(newUser)
      res.json({ message: `User ${newUserName} is created.`, result: result })
    } else {
      res.json({
        message: "User name already exists. Please try with another one.",
        curUser,
      })
    }
  })
}

//update user : PUT
export const editUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)
  app.put("/users/:userID", async (req, res) => {
    const userID = parseInt(req.params.userID, 10)
    const updatedUserData = req.body
    const filter = { id: userID }
    const options = { upsert: false }
    console.log("filter: ", filter)
    const result = await userCollection.updateOne(
      filter,
      { $set: updatedUserData },
      options
    )
    res.json({ message: "User information updated" })
  })
}

//delete user
export const deleteUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.delete("/users/:userID", async (req, res) => {
    const userID = parseInt(req.params.userID, 10)
    const filter = { id: userID }
    const result = userCollection.deleteOne(filter)

    res.json({ message: "User is deleted:", result: result })
  })
}

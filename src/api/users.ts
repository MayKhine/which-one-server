import { Db } from "mongodb"

export const getUser = (app: any, database: Db) => {
  const userCollection = database.collection("whichone")

  app.get("/users/:userID", async (req, res) => {
    const userID = parseInt(req.params.userID, 10)

    const user = await userCollection.findOne({ id: userID })
    console.log("Get user ", userID, user)
    res.json(user)
  })
}

//add user : POST
export const addUser = (app: any, database: Db) => {
  const userCollection = database.collection("whichone")

  app.post("/register", async (req, res) => {
    console.log("res ", res.status)
    res.send("Got a POST request")

    const newUser = req.body
    console.log(newUser)
    console.log("new user: ", newUser)
    const result = await userCollection.insertOne(newUser)
    if (result) {
      console.log("Add user: success")
    }
  })
}

//update user : PUT
export const updateUser = (app: any, database: Db) => {
  const userCollection = database.collection("whichone")

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
    return res.json({ message: "User information updated" })
  })
}

//delete user
export const deleteUser = (app: any, database: Db) => {
  const userCollection = database.collection("whichone")

  app.delete("/users/:userID", async (req, res) => {
    const userId = parseInt(req.params.userID, 10)
    const filter = { id: userId }
    const result = userCollection.deleteOne(filter)

    return res.json({ message: "User is deleted:", result: result })
  })
}

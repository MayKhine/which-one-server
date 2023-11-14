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

export const getUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.get("/users/:userName", async (req, res) => {
    const userName = req.params.userName
    const user = await userCollection.findOne({ name: userName })
    console.log("Get user ", userName)
    if (user != null) {
      res.json({ success: true, message: "success", result: user })
    } else {
      res.json({ success: false, message: "failed", result: user })
    }
  })
}

//check if user ald exists , if not upsert
export const patchUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.patch("/register", async (req, res) => {
    const userInfo = req.body
    const userEmail = userInfo.email
    const user = await userCollection.findOne({ email: userEmail })
    console.log("Get user ", user)
    if (user == null) {
      //add user to db
      // res.json({ success: true, message: "success", result: user })
    } else {
      // res.json({ success: false, message: "failed", result: user })
    }
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

    if (curUser == null) {
      const result = await userCollection.insertOne(newUser)
      res.json({
        success: true,
        message: `User ${newUserName} is created.`,
        result: result,
      })
    } else {
      res.json({
        success: false,
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
    if (result != null) {
      res.json({
        success: true,
        message: "user updated",
        result: result,
      })
    } else {
      res.json({
        success: false,
        message: "not updated",
        result: result,
      })
    }
  })
}

//delete user
export const deleteUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.delete("/users/:userID", async (req, res) => {
    const userID = parseInt(req.params.userID, 10)
    const filter = { id: userID }
    const result = userCollection.deleteOne(filter)

    // res.json({ message: "User is deleted:", result: result })

    if (result != null) {
      res.json({
        success: true,
        message: "User is deleted",
        result: result,
      })
    } else {
      res.json({
        success: false,
        message: "User is  not deleted",
        result: result,
      })
    }
  })
}

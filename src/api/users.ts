import { Db } from "mongodb"

export const setUpUsers = (app: any, database: Db) => {
  const userCollection = database.collection("whichone")
  // const users = await whichone.find({}).toArray()

  app.get("/users/:userID", async (req, res) => {
    const userID = parseInt(req.params.userID, 10)
    const user = await userCollection.findOne({ id: userID })
    console.log("User: ", user)

    res.json(user)
  })
}

//add user

//update user

//delete user

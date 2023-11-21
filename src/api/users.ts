import { Db } from "mongodb"
const userCollectionName = "whichoneusers"

//get all users
export const getAllUsers = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.get("/users", async (req, res) => {
    const users = await userCollection.find({}).toArray()
    console.log("Get all users", users)
    res.json(users)
  })
}

//check if user ald exists , if not upsert
export const patchUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.patch("/register", async (req, res) => {
    const userInfo = req.body
    console.log("NEW USER INFO: ", req.body)
    const userEmail = userInfo.email
    const user = await userCollection.findOne({ email: userEmail })
    const newUser = {
      name: userInfo.nickname,
      email: userInfo.email,
      picture: userInfo.picture,
    }

    if (user === null) {
      //add user to db
      const result = await userCollection.insertOne(newUser)
      console.log("Patch User - added a new user", result)
      res.json({
        success: true,
        message: `User ${newUser} is created.`,
        result: result,
      })
    } else {
      console.log("Patch User: Already exists", user)
      res.json({
        success: false,
        message: `User  ${user}  already existed`,
        result: user,
      })
    }
  })
}

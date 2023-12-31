import { Db } from "mongodb"
const userCollectionName = "whichoneusers"

//get all users
export const getAllUsers = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.get("/users", async (req, res) => {
    const users = await userCollection.find({}).toArray()
    // console.log("Get all users", users)
    res.json(users)
  })
}

//check if user ald exists , if not upsert
export const patchUser = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)

  app.patch(
    "/register",
    async (req, res) => {
      const userInfo = req.body
      const userEmail = userInfo.email
      // const user = await userCollection.findOne({ email: userEmail })

      // if (user) {
      //   console.log("user ald existed")
      //   res.json({
      //     success: false,
      //     message: `User  ${user}  already existed`,
      //     result: user,
      //   })
      // } else {
      const newUser = {
        name: userInfo.nickname,
        email: userInfo.email,
        picture: userInfo.picture,
      }
      // console.log("what is uer : ", user)
      // if (user === null) {
      //add user to db
      // const result = await userCollection.insertOne(newUser)
      const result = await userCollection.updateOne(
        { email: userEmail }, //filter
        { $set: newUser }, //update
        { upsert: true } //upsert
      )

      console.log("UpdateOne  : ", result)
      res.json({
        success: true,
        message: `User ${newUser} is created.`,
        result: result,
      })
      // } else {
      //   // console.log("Patch User: Already exists", user)
      //   res.json({
      //     success: false,
      //     message: `User  ${user}  already existed`,
      //     result: user,
      //   })
      // }
    }
    // }
  )
}

// export const getUserInfoAndPosts = (app: any, database: Db) => {
//   const userCollection = database.collection(userCollectionName)
//   const postCollectionName = "whichoneposts"
//   const postCollection = database.collection(postCollectionName)

//   app.get("/users/:userEmail", async (req, res) => {
//     const userEmail = req.params.userEmail

//     const userInfoAndPosts = await userCollection
//       .aggregate([
//         {
//           $lookup: {
//             from: "whichoneposts",
//             localField: "email",
//             foreignField: "postCreater",
//             as: "postsArr",
//           },
//         },
//         { $match: { email: userEmail } },
//       ])
//       .toArray()

//     if (userInfoAndPosts !== null) {
//       res.json({ success: true, message: "success", result: userInfoAndPosts })
//     } else {
//       res.json({ success: false, message: "failed", result: userInfoAndPosts })
//     }
//   })
// }

export const getUserInfo = (app: any, database: Db) => {
  const userCollection = database.collection(userCollectionName)
  const postCollectionName = "whichoneposts"
  const postCollection = database.collection(postCollectionName)

  app.get("/users/:userEmail", async (req, res) => {
    const userEmail = req.params.userEmail

    const user = await userCollection.findOne({ email: userEmail })
    if (user != null) {
      res.json({ success: true, message: "success", result: user })
    } else {
      res.json({ success: false, message: "failed", result: user })
    }
  })

  //   const userInfoAndPosts = await userCollection
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: "whichoneposts",
  //           localField: "email",
  //           foreignField: "postCreater",
  //           as: "postsArr",
  //         },
  //       },
  //       { $match: { email: userEmail } },
  //     ])
  //     .toArray()

  //   if (userInfoAndPosts !== null) {
  //     res.json({ success: true, message: "success", result: userInfoAndPosts })
  //   } else {
  //     res.json({ success: false, message: "failed", result: userInfoAndPosts })
  //   }
  // })
}

import { Db } from "mongodb"
import { v4 as uuidv4 } from "uuid"
const postCollectionName = "whichoneposts"

// export const getAllPostsExceptLoginUser = (app: any, database: Db) => {
//   const postCollection = database.collection(postCollectionName)

//   app.get("/posts-except-login-user", async (req, res) => {
//     const queryParams = req.query
//     // Access the parameters from the query string

//     // const posts = await postCollection
//     //   .find({ postCreater: { $ne: queryParams.userEmail } })
//     //   .toArray()

//     const posts = await postCollection
//       .aggregate([
//         {
//           $lookup: {
//             from: "whichoneusers",
//             localField: "postCreater",
//             foreignField: "email",
//             as: "postCreaterInfo",
//           },
//         },
//         { $match: { postCreater: { $ne: queryParams.userEmail } } },
//       ])
//       .toArray()

//     // db.whichoneposts.aggregate({$lookup: {from: "whichoneusers", localField: "postCreater", foreignField: "email", as: "postCreaterInfo"}}, {$match: {"postCreater": {$ne: "tester1@gmail.com"}}})

//     // console.log("Found posts: ", posts)

//     // if (posts.length > 0) {
//     //   res.json({ success: true, message: "got posts", result: posts })
//     // } else {
//     //   res.json({ success: false, message: "got no posts", result: posts })
//     // }
//     res.json({ result: posts })
//   })
// }

export const getPosts = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/posts", async (req, res) => {
    const posts = await postCollection
      .aggregate([
        {
          $lookup: {
            from: "whichoneusers",
            localField: "postCreater",
            foreignField: "email",
            as: "postCreaterInfo",
          },
        },
      ])
      .toArray()

    // console.log("Found posts: ", posts)
    // res.json(posts)

    if (posts.length > 0) {
      res.json({ success: true, message: "got posts", result: posts })
    } else {
      res.json({ success: false, message: "got no posts", result: posts })
    }
  })
}

export const getPostsByEmail = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/postsbyemail", async (req, res) => {
    // const queryParams = req.query
    const userEmail = req.query.email

    console.log("POSTS BY EMAIL: ", userEmail)

    const posts = await postCollection
      .aggregate([
        {
          $lookup: {
            from: "whichoneusers",
            localField: "postCreater",
            foreignField: "email",
            as: "postCreaterInfo",
          },
        },
        { $match: { postCreater: userEmail } },
      ])
      .toArray()

    if (posts.length > 0) {
      res.json({ success: true, message: "got posts", result: posts })
    } else {
      //get user info
      const userCollectionName = "whichoneusers"

      const userCollection = database.collection(userCollectionName)

      const getUserInfo = async () => {
        const userInfo = await userCollection.findOne({ email: userEmail })
        console.log("WHAT IS USERINFO: ", userInfo)
        res.json({ success: false, message: "got no posts", result: userInfo })
      }
      getUserInfo()
      // res.json({ success: false, message: "got no posts", result: posts })
    }
  })
}

export const createPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.post("/:userEmail/createpost", async (req, res) => {
    const userEmail = req.params.userEmail
    const post = req.body
    const question = post.question
    // console.log("Create Post : ", post, " by userEmai: ", userEmail)

    const result = await postCollection.findOne({
      question: question,
      postCreater: userEmail,
    })

    if (result != null) {
      res.json({
        success: false,
        message: "Question has been asked",
        result: result,
      })
    } else {
      const newPost = {
        id: uuidv4(),
        postCreater: userEmail,
        ...post,
      }
      const insertResult = await postCollection.insertOne(newPost)
      if (insertResult != null) {
        res.json({
          success: true,
          message: "Created a new post",
          result: insertResult,
        })
      } else {
        res.json({
          success: false,
          message: "Had an error adding a new post",
          result: insertResult,
        })
      }
    }
  })
}

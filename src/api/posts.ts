import { Db } from "mongodb"
const postCollectionName = "whichoneposts"

export const getAllPostsExceptLoginUser = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/posts-except-login-user", async (req, res) => {
    const queryParams = req.query
    // Access the parameters from the query string

    // const posts = await postCollection
    //   .find({ postCreater: { $ne: queryParams.userEmail } })
    //   .toArray()

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
        { $match: { postCreater: { $ne: queryParams.userEmail } } },
      ])
      .toArray()

    // db.whichoneposts.aggregate({$lookup: {from: "whichoneusers", localField: "postCreater", foreignField: "email", as: "postCreaterInfo"}}, {$match: {"postCreater": {$ne: "tester1@gmail.com"}}})

    console.log("Found posts: ", posts)

    // if (posts.length > 0) {
    //   res.json({ success: true, message: "got posts", result: posts })
    // } else {
    //   res.json({ success: false, message: "got no posts", result: posts })
    // }
    res.json({ result: posts })
  })
}

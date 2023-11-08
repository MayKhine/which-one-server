import { Db } from "mongodb"
const postCollectionName = "whichoneposts"
export const addPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.post("/createpost", async (req, res) => {
    const newPost = req.body
    console.log("Add new post: ", newPost)

    const result = await postCollection.insertOne(newPost)

    console.log("Added a new post: ", result)
    res.json({ message: "success" })
  })
}

export const getAllPosts = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/posts", async (req, res) => {
    const posts = await postCollection.find({}).toArray()

    console.log("Found posts: ", posts)
    res.json(posts)
  })
}

export const getPostByUser = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/users/:userName/posts", async (req, res) => {
    const userName = req.params.userName
    console.log("GET POST BY USER NAME: ", userName)

    const filter = { userName: userName }

    const posts = await postCollection.find(filter).toArray()
    if (posts.length > 0) {
      res.json({ success: true, message: "got posts", result: posts })
    } else {
      res.json({ success: false, message: "no posts", result: posts })
    }
  })
}

export const getPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.get("/posts/:postID", async (req, res) => {
    const postID = req.params.postID //parseInt(req.params.postID, 10)
    const filter = { id: postID }
    console.log("Post ID : ", postID, "post filer: ", filter)

    const post = await postCollection.findOne({ id: postID })

    console.log("Found post: ", post)
    res.json(post)
  })
}

export const deletePost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.delete("/posts/:postID", async (req, res) => {
    const postID = req.params.postID
    const filter = { id: postID }
    console.log("Delete post by post id: ", postID)
    const result = await postCollection.deleteOne(filter)
    console.log("Delete post")
    res.json(result)
  })
}

export const editPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.put("/posts/:postID", async (req, res) => {
    const postID = req.params.postID
    const updatedPostData = req.body
    const filter = { id: postID }
    const options = { upsert: false }
    const result = postCollection.updateOne(
      filter,
      { $set: updatedPostData },
      options
    )
    res.json({ message: "updated post", result })
  })
}

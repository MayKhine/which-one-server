import { Db } from "mongodb"
import { v4 as uuidv4 } from "uuid"
import multer from "multer"
import path from "path"
import { DateTime } from "luxon"

const postCollectionName = "whichoneposts"

// UUID
let tempImgFileName = ""

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images") // Destination folder for storing images
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + path.extname(file.originalname)) // File naming strategy
    tempImgFileName = uuidv4() + path.extname(file.originalname)
    cb(null, tempImgFileName) // File naming strategy
  },
})

const upload = multer({ storage: storage })

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
    }
  })
}

export const createPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.post("/:userEmail/createpost", async (req, res) => {
    const userEmail = req.params.userEmail
    const post = req.body
    const question = post.question

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
      const ansOptionLength = post.answers.length
      const votingArr = new Array(ansOptionLength).fill([])

      const newPost = {
        id: uuidv4(),
        createTime: DateTime.now(),
        postCreater: userEmail,
        voting: votingArr,
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

export const addImage = (app: any, database: Db) => {
  const postCollection = database.collection("testposts")
  app.post("/image", upload.single("image"), (req, res) => {
    res.json({
      success: true,
      image: tempImgFileName,
    })
  })
}

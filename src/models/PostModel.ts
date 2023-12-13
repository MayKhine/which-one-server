import mongoose, { Schema, model } from "mongoose"

const PostSchema = new Schema({
  id: String,
  postCreater: String,
  question: String,
  answers: Array<String>,
  images: Array<String>,
})

export const PostModel = mongoose.model("whinoneposts", PostSchema)

const TestImgSchema = new Schema({
  id: String,
  postCreater: String,
  image: String,
})

export const TestImgModel = mongoose.model("testposts", TestImgSchema)

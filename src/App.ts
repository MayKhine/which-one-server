const express = require("express")
const mongoose = require("mongoose")
import bodyParser from "body-parser"

const app = express()
const port = 3300

//connect to mongo db using mongoose
mongoose.connect("mongodb://localhost/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//check db connection status
const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDb connection error"))

db.once("open", () => {
  console.log("Connected to mongoDb")

  app.use(bodyParser.json())
  // app.use(express.static("public"))

  // app.use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*")
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST")
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  //   next()
  // })

  // get
  app.get("/", (req, res) => {
    res.send("Which one")
  })

  // post
  app.post("/register", (req, res) => {
    console.log("res ", res.status)
    res.send("Got a POST request")

    const jsonData = req.body
    console.log(jsonData)
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

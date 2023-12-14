import fs from "fs"
import path from "path"

export const getImageByID = (app: any) => {
  app.get("/getimage", (req, res) => {
    const imgFileName = path.join(
      __dirname,
      "..",
      "..",
      "images",
      req.query.img
    )
    console.log("GETIMG BY ID: ", imgFileName)
    const image = getImageFileFromDirectory(imgFileName)
    // console.log("IMAGE from file: ", image)
    try {
      res.json({ image })
      // res.json({ imageBuffer: req.file.buffer.toString("base64") })
    } catch (error: any) {
      console.log("Error sending img to fe: ", error.message)
    }
  })
}

export const getImageFileFromDirectory = (filePath: string) => {
  try {
    const imageFileContent = fs.readFileSync(filePath, "utf-8")
    return imageFileContent
  } catch (error: any) {
    console.error("error reading file: ", error.message)
  }
}

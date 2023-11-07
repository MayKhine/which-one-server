import { Db } from "mongodb"
const postCollectionName = "whichoneposts"

const checkUserVoted = (voteData: Array<Array<string>>, userName: string) => {
  console.log("Check user voted", userName, voteData)
  for (let i = 0; i <= voteData.length; i++) {
    for (let j = 0; j <= voteData[i]?.length; j++) {
      console.log("Current Checking: ", voteData[i][j], userName)
      if (voteData[i][j] == userName) {
        return true
      }
    }
  }

  return false
}

export const voteOnPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.put("/posts/:postID/vote", async (req, res) => {
    const postID = req.params.postID
    const postData = req.body
    const voterName = postData.votingUser
    const answer = postData.answer
    const answerIndex = postData.answerIndex
    // console.log("From front end : ", postData, postID)
    //get the current data
    const curPostData = await postCollection.findOne({ id: postID })

    const response = JSON.stringify(curPostData)
    // console.log("Response: ", response)

    const curVoteData = curPostData?.voting

    //check if the user already booked
    if (checkUserVoted(curVoteData, voterName)) {
      res.json({
        success: false,
        message: "User already voted on this quesions",
      })
      return
    } else {
      const voteChoiceArrToUpdate = curVoteData[answerIndex]
      // console.log("Cur Vote Data: ", curVoteData)

      // console.log("voteChoiceToUpdate ", voteChoiceArrToUpdate)

      voteChoiceArrToUpdate.push(voterName)
      // console.log("voteChoiceToUpdate after push", voteChoiceArrToUpdate)

      curVoteData[answerIndex] = voteChoiceArrToUpdate
      const updatedPostData = {
        ...curPostData,
        voting: curVoteData,
      }
      // console.log("updatedPostData: ", updatedPostData)
      const result = await postCollection.findOneAndUpdate(
        { id: postID },
        { $set: updatedPostData }
      )
      const isPostUpdated = await postCollection.findOne({ id: postID })
      // console.log("Is post updated from db: ", isPostUpdated)

      res.json({
        success: true,
        message: "Voted",
      })
    }
  })
}

import { Db } from "mongodb"
const postCollectionName = "whichoneposts"

const checkUserVoted = (
  voterData: Array<Array<string>>,
  curVoterEmail: string
) => {
  for (let i = 0; i <= voterData.length; i++) {
    for (let j = 0; j <= voterData[i]?.length; j++) {
      console.log("Current Checking: ", voterData[i][j], curVoterEmail)
      if (voterData[i][j] == curVoterEmail) {
        return true
      }
    }
  }
  return false
}

export const voteOnPost = (app: any, database: Db) => {
  const postCollection = database.collection(postCollectionName)

  app.put("/vote", async (req, res) => {
    const votingData = req.body
    const email = votingData.voterEmail
    const answerIndex = votingData.ansIndex
    const postID = votingData.postID
    //get the current data
    const curPostData = await postCollection.findOne({ id: postID })

    const response = JSON.stringify(curPostData)
    console.log("votingDtaa: ", votingData)
    console.log("curPostData: ", response)

    const curVoteData = curPostData?.voting

    console.log("curVoteData: ", curVoteData)
    //check if the user already booked
    if (checkUserVoted(curVoteData, email)) {
      res.json({
        success: false,
        message: "User already voted on this quesions",
      })
      return
    } else {
      const voteChoiceArrToUpdate = curVoteData[answerIndex]

      voteChoiceArrToUpdate.push(email)

      curVoteData[answerIndex] = voteChoiceArrToUpdate
      const updatedPostData = {
        ...curPostData,
        voting: curVoteData,
      }
      const result = await postCollection.findOneAndUpdate(
        { id: postID },
        { $set: updatedPostData }
      )
      const isPostUpdated = await postCollection.findOne({ id: postID })

      res.json({
        success: true,
        message: "Voted",
      })
    }
  })
}

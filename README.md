- Mongo DB
- mongosh: connect to mongo db
- show dbs: show all db
- use dbName: use the db with dbName
- show collections: show all collection
- db.createCollection("collectionName"): create a new collection
  pnpm install @types/mongodb
  -- delete collection: db.collectionName.deleteMany({})
- add data to whichone
  db.createCollection("whichoneusers")
  db.whichoneusers.insertMany([{id: 1, name: 'user1', password: 'abcd', year: 1991, email: 'user1@test.com'}, {id: 2, name: 'user2', password: 'abcd', year: 1992, email: 'user2@test.com'}, {id: 3, name: 'user3',password: 'abcd', year: 1993, email: 'user3@test.com'}])

db.createCollection("whichoneposts")

-- post
db.createCollection("whichoneposts")

db.whichoneposts.insertMany([{id: 111,userId: 1, question: 'which color is better', answerType: 'img', answers: ['red','white', 'black'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] }, { id: 222,userId: 2,question: 'which food is better',answerType: 'text',answers: ['chicken', 'white', 'black'],imgDesc: []}])

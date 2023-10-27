- Mongo DB
- mongosh: connect to mongo db
- show dbs: show all db
- use dbName: use the db with dbName
- show collections: show all collection
- db.createCollection("collectionName"): create a new collection
  pnpm install @types/mongodb
- add data to whichone

  db.whichone.insertMany([{id: 1, name: 'user1', year: 1991, email: 'user1@test.com'}, {id: 2, name: 'user2', year: 1992, email: 'user2@test.com'}, {id: 3, name: 'user3', year: 1993, email: 'user3@test.com'}])

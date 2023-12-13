- Mongo DB
- mongosh: connect to mongo db
- show dbs: show all db
- use dbName: use the db with dbName
- show collections: show all collection
- delete collection: db.collectionName.drop()
- db.createCollection("collectionName"): create a new collection
  pnpm install @types/mongodb
  -- delete collection: db.collectionName.deleteMany({})
- add data to whichone
  db.createCollection("whichoneusers")
  db.whichoneusers.insertMany([{id: 1, name: 'user1', password: 'abcd', year: 1991, email: 'user1@test.com'}, {id: 2, name: 'user2', password: 'abcd', year: 1992, email: 'user2@test.com'}, {id: 3, name: 'user3',password: 'abcd', year: 1993, email: 'user3@test.com'}])

db.createCollection("whichoneposts")

-- post
db.createCollection("whichoneposts")

db.whichoneposts.insertMany([{id: 111,userName: 'test', question: 'which color is better', answerType: 'img', answers: ['red','white', 'black'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] }, { id: 222,userName: 'test',question: 'which food is better',answerType: 'text',answers: ['chicken', 'white', 'black'],imgDesc: []}])

//insert with voting
db.whichoneposts.insertOne({id: '111',user: 'tester@gmail.com', question: 'which color is better', answerType: 'img', answers: ['red','white'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] ,
voting: [['user3@gmail.com', 'user2@email.com'] , ['test@email.com']]})

db.whichoneposts.insertMany([
{
id: 111,
userName: 'test',
question: 'which color is better',
answerType: 'img',
answers: ['red','white', 'black'],
imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] ,
voting: [['user1', 'user2'] , ['test']]
},

{ id: 222,userName: 'test',question: 'which food is better',answerType: 'text',answers: ['chicken', 'white', 'black'],imgDesc: []}])

db.whichoneposts.deleteMany({})
db.whichoneusers.deleteMany({})
db.whichoneusers.find({})

---

db.whichoneposts.aggregate([{$lookup:{from: 'whichoneusers', localField: 'postCreater', foreignField: 'name', as: 'userEmail'}},{$unwind: '$userEmail'}, {$project: {id: 1, postCreater: 1, question: 1, answerType: 1, answers: 1, imgDesc: 1, voting: 1, userName: '$whichoneusers.name', userEmail: '$whichoneusers.email', userPicture: '$whichoneusers.picture' }}])

db.whichoneposts.aggregate({$lookup: {from: "whichoneusers", localField: "postCreater", foreignField: "email", as: "postCreaterInfo"}})

## db.whichoneposts.aggregate({$lookup: {from: "whichoneusers", localField: "postCreater", foreignField: "email", as: "postCreaterInfo"}}, {$match: {"postCreater": {$ne: "tester1@gmail.com"}}})

db.whichoneposts.aggregate({$lookup: {from: "whichoneusers", localField: "postCreater", foreignField: "email", as: "postCreaterInfo"}}, {$match: {"postCreater": "tester1@gmail.com"}})

example post

db.whichoneposts.insertOne({id: '111',postCreater: 'tester1@gmail.com', question: 'which color is better', answerType: 'img', answers: ['red','white'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] ,
voting: [['user3@gmail.com', 'user2@email.com'] , ['test@email.com']]})

db.whichoneposts.insertOne({id: '122',postCreater: 'maykhine.mm@gmail.com', question: 'May questions is better', answerType: 'img', answers: ['ansA','ansb'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] ,
voting: [['user3@gmail.com', 'user2@email.com'] , ['test@email.com']]})

db.whichoneposts.insertOne({id: '1212',postCreater: 'eman@gmail.com', question: 'Ethan questions', answerType: 'img', answers: ['ansA','ansb'],imgDesc: ['redcolor', 'whitecolor', 'blackcolor'] ,
voting: [['user3@gmail.com', 'user2@email.com'] , ['test@email.com']]})

db.whichoneposts.insertOne({id: '1-def-212',postCreater: 'tester2@gmail.com', question: 'tester2 questions', answers: ['ansA','ansb']})
db.whichoneposts.insertOne({id: '1-def-212',postCreater: 'tester1@gmail.com', question: 'tester1 test questions', answers: ['hello','howdy']})

---

example user

db.whichoneusers.insertOne({name: 'tester 1', email:'tester1@gmail.com', picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAYFBMVEX////MzMxNTU3R0dHJyclKSkrU1NTw8PDr6+tGRkZAQEDZ2dlRUVH09PT7+/vf399kZGSrq6s7OzvDw8M1NTW6urrl5eVqampYWFiTk5Obm5uMjIyioqJeXl5+fn52dnYRf8AaAAAEcklEQVR4nO2ai3KiMBSGiyEgyD0iioLv/5YbsO5qe/7ACdCdnc0/0+lMbcLnueUk4ePDycnJycnJycnJ6X9WlqZhGKZp9leenoang/A8z/f1j/4tDqcw/VGAPBgf/ib9hyD/IYw0//78F44fwNgLCPDEEPutCYwAnxgbUuyDOQRbUmSzCUaKYIN83TMARghvdVMcOEb4pDisSpDNisVvEGJFf4TwMSIYJODnq/kDhYLw1K2/3+/9TXkAw18JYg/8IMpGxpGUMoplU24KARACda7k7ilZnVWwGQSNINRV/iEYKeSVplgOkZEE4pJEu6+Kkp4Oi6XZQU0q6uI7wUjR1eT/L0OgSlNQVpJEGMKiJPyxrFhRwSBKRDCaoiUssSQk6GDYmRh2saIG2YcE5QnR0rHw2xBXyhDW3qDTMjEiaFGDrL1Bpbto4wmEmIoI29wgzRD0xmjQkneK3dIQZL1R50mGMxmVVoago6GeigYNQTJYGYJeCGtzVowBUZMjLQyR0mtVWU0yVPQ67vM3PznNcJtKC22HG23CnM1ATjMjNTGDx0WgXbHIDmxn0K5YEg98Z9CN2ay8iOi80PWNh5CCaTw1uVzsErI+DOI5I4QnDN1knezg2JDFcIL7qmaSoUFDfV5AHNA8YgYD3Hbxugg0jd9PhsNu1yMj8so1muQyXR50gbigr8BBIBtJraCY8sTojQJlNqetRKkZTFeoQRVi4CQnYvBnMoCAYFVrdOCgZjKAKsUqEKhEiZkMKCZZDGCOpTHJYQAr9+QG5yFyvzf6Yo2Y9PzpJUsvWrDQcxhQfZjlDNkgV/C2nWiSOYUSl0leN4dP+5qp1Kga6AreegHXTd1JmUMiQV2Ux103QTs5TnQ3hYS8Y3z/xGKAfZQ26NWUn+Txw5OB10fB5Jxq7+HmYhCzuYfp5Xml0Q4lHsjsq00Boc4GBnrj/xB3f4Gq9fB1DEEZkQcgD/E3vfjriBIHRIz2WIO4CCZn4P4e9/Xszn6QwRnihqLSlBUW5w+Gco2dYXKFzYEUujoZzswtGOwO5vBXqtG6VeHFwu6AEhtCHQHDEVYH24NanOqQAY7g1sgJQwjhQwZfgHMg69sD4txeBHV561FuRv2trInrzgW3KN/bSlF2kRZA0EVKf9gRybHgSuvdG8Kri2hGTxsV9fvl2rKrvRdvCNEW8CLrC0VVtC+BsfTy/TlT4F/ieB7BwxbxxX/m1cJ7vc+QED51oWlWlFx8sTQYHtIhIdT1POf85avi81Vpl/C6SBqivMczIpGS9si9XOXSXR3tCEaKo1oD4ePDtzTDYIiVEHRfx8iIN4SY379B7TurmOxWfTUou7JNIeN+TYJBteQViEjWayPoLWjPyA957FcoC4S8ZiaFPDYrBuO7MtXNCAsZd2rLl1szVRyN1UJGx2JTglF5myAMDZC0/O2UjbK8bZKqil7eTpIyqqqkafMffMM4O4myL5Lh2dHAkhR9KU5/5RXn8JQfgkN+2iYPnZycnJycnJycnP4V/QIqS0HycgoL0gAAAABJRU5ErkJggg=='})

db.whichoneusers.insertOne({name: 'tester 2', email:'tester2@gmail.com', picture: 'data:image/png;base64,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'})

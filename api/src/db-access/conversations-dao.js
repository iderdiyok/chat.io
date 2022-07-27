const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")


async function insertConversation(conversation) {
    const db = await getDB()
    const insertionResult = await db.collection("conversations").insertOne(conversation)
    return insertionResult
}
async function findConversationById(conversationId) {
    const db = await getDB()
    const foundConversation = await db.collection("conversations").findOne({ _id: new ObjectId(conversationId) })
    return foundConversation
}
async function findConversationsOfUser(userId) {
    const db = await getDB()
    const getConversation = await db.collection("conversations").find({ members :  {$in : [userId]}  }).toArray()
    return getConversation
}
async function findConversationsOfTwoUsers({users}) {
    const db = await getDB()
    const getConversation = await db.collection("conversations").find({
        members: { $in: [users.firstUserId, users.secondUserId] }
    }).toArray()      
    return getConversation
}


module.exports = {
    insertConversation,
    findConversationById,
    findConversationsOfUser,
    findConversationsOfTwoUsers
}
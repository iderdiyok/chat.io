const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")


async function insertMessage(message) {
    const db = await getDB()
    const insertionResult = await db.collection("messages").insertOne(message)
    return insertionResult
}
async function findMessageById(messageId) {
    const db = await getDB()
    const foundMessage = await db.collection("messages").findOne({ _id: new ObjectId(messageId) })
    return foundMessage
}
async function findMessages(conversationId) {
    const db = await getDB()
    const foundMessages = await db.collection("messages").find({ conversation_id: conversationId }).toArray()
    return foundMessages
}
module.exports = {
    insertMessage,
    findMessageById,
    findMessages
}
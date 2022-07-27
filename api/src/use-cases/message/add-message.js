const { MessageDAO } = require("../../db-access")
const { makeMessage } = require("../../domain/Message")

async function addMessage({ conversation_id, sender, text, created_at }) {
    const newMessage = makeMessage({ conversation_id, sender, text, created_at})
    const insertResult = await MessageDAO.insertMessage(newMessage)

    const wasSuccess = insertResult.acknowledged === true && insertResult.insertedId 

    if (!wasSuccess) {
        throw new Error("Adding a new Message failed, try again")
    }

    const foundMessage = MessageDAO.findMessageById(insertResult.insertedId)
    return foundMessage
}

module.exports = { addMessage }
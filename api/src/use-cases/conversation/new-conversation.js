const { ConversationDAO } = require("../../db-access")
const { makeConversation } = require("../../domain/Conversation")

async function addConversation({ members, created_at }) {
    const newConversation = makeConversation({ members, created_at})
    const insertResult = await ConversationDAO.insertConversation(newConversation)

    const wasSuccess = insertResult.acknowledged === true && insertResult.insertedId 

    if (!wasSuccess) {
        throw new Error("Adding a new Conversation failed, try again")
    }

    const foundConversation = ConversationDAO.findConversationById(insertResult.insertedId)
    return foundConversation
}

module.exports = { addConversation }
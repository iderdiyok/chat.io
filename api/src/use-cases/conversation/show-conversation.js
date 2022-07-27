const { ConversationDAO } = require("../../db-access");

async function showConversation(userId) {
    const foundConversation = await ConversationDAO.findConversationsOfUser(userId)
    
    if (!foundConversation) {
        throw new Error("Conversation with provided id not found...")
    }
    return {
        foundConversation
    }
}
module.exports = { showConversation }
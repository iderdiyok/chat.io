const { ConversationDAO } = require("../../db-access");

async function findConversationOfTwoUsers({users}) {
    const foundConversation = await ConversationDAO.findConversationsOfTwoUsers({users})
    
    if (!foundConversation) {
        throw new Error("Conversation with provided id not found...")
    }
    return {
        foundConversation
    }
}
module.exports = { findConversationOfTwoUsers }
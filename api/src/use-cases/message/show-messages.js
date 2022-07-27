const { MessageDAO } = require("../../db-access");

async function showMessages(conversationId) {
    const foundMessage = await MessageDAO.findMessages(conversationId)
    
    if (!foundMessage) {
        throw new Error("Messages with provided id not found...")
    }
    return {
        foundMessage
    }
}
module.exports = { showMessages }
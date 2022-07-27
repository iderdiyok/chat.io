function makeMessage({
    _id,
    conversation_id,
    sender,
    text,
    created_at
}) {
    if (!conversation_id) {
        throw new Error("Message must include conversation_id")
    }
    if (!sender) {
        throw new Error("Message must include sender_id")
    }
    if (!text) {
        throw new Error("Message must include message")
    }

    return {
        conversation_id,
        sender,
        text,
        created_at
    }
}
module.exports = { makeMessage }
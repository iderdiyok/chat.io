function makeConversation({
    _id,
    members,
    created_at
}) {
    return {
        members,
        created_at
    }
}
module.exports = { makeConversation }
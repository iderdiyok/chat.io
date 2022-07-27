//UserService
const { registerUser } = require("./user/register-user")
const { loginUser } = require("./user/login-user")
const { showUserInfo } = require("./user/user-info")
const { listAllUsers } = require("./user/listAllUsers")
const { refreshUserToken } = require("./user/refresh-token")


//ConvService
const { addConversation } = require("./conversation/new-conversation")
const { showConversation } = require("./conversation/show-conversation")
const { findConversationOfTwoUsers } = require("./conversation/find-conv-two-users")

//MessageService
const { addMessage } = require("./message/add-message")
const { showMessages } = require("./message/show-messages")


const UserService = {
    registerUser,
    loginUser,
    showUserInfo,
    listAllUsers,
    refreshUserToken,
}

const ConversationService = {
    addConversation,
    showConversation,
    findConversationOfTwoUsers
}
const MessageService = {
    addMessage,
    showMessages
}
module.exports = { UserService, ConversationService, MessageService }
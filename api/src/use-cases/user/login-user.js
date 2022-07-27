const { UserDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");
const { createPasswordHash, createToken } = require("../../utils/hash");


async function loginUser({ email, password }) {
    const invalidLoginMessage = "Invalid Login"
    const foundUser = await UserDAO.findUserByEmail(email)
    
    if (!foundUser) {
        throw new Error("user not found")
    }
    const user = makeUser(foundUser)
    const passwordHash = createPasswordHash(password, user.passwordSalt)
    const correctPassword = passwordHash === user.passwordHash
    if (!correctPassword) {
        throw new Error(invalidLoginMessage)
    }
    const TEN_MINUTES = 60 * 10
    const token = createToken(user, "access", TEN_MINUTES)

    const ONE_DAY = 60 * 60 * 24
    const refreshToken = createToken(user, "refresh", ONE_DAY)

    return { token, refreshToken }
}


module.exports = {
    loginUser
}
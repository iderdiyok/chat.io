const jwt = require("jsonwebtoken")
const { UserDAO } = require("../../db-access")
const { makeUser } = require("../../domain/User")
const { createToken } = require("../../utils/hash")


async function refreshUserToken({ refreshToken }) {
    try {
        const tokenPayload = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const isRefreshToken = tokenPayload.type === "refresh"
        if (!isRefreshToken) {
            throw new Error(" RefreshToken Not found.")
        }

        const userId = tokenPayload.sub
        const foundUser = await UserDAO.findUserById(userId)
        if (!foundUser) {
            throw new Error("Not found.")
        }
        const user = makeUser(foundUser)
        const TEN_MINUTES = 60 * 10
        const token = createToken(user, "access", TEN_MINUTES)
        return { token }
    } catch (error) {
        console.log(error);
        throw new Error("Not found...")
    }
}
module.exports = { refreshUserToken }
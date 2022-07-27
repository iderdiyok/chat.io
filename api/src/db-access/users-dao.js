const { getDB } = require("./getDB");
const { ObjectId } = require("mongodb");


async function findUserById(id) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return foundUser
}
async function findUserByEmail(userEmail) {
    const db = await getDB()
    const foundUser = db.collection("users").findOne({ email: userEmail })
    return foundUser
}
async function insertUser(userInfo) {
    const db = await getDB()
    const insertResult = await db.collection("users").insertOne(userInfo)
    return insertResult
}
async function findAllUsers() {
    const db = await getDB()
    const allUsers = db.collection("users").find().toArray()
    return allUsers
}



module.exports = {
    findUserById,
    findUserByEmail,
    insertUser,
    findAllUsers
}
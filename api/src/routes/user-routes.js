const express = require("express")
const multer = require("multer")
const { doAuthMiddleware } = require("../auth/doAuthMiddleware.js")
const { UserService } = require("../use-cases")
const { imageBufferToBase64 } = require("../utils/hash")


const upload = multer()
const pictureUploadMiddleware = upload.single("avatar")
const userRouter = express.Router()


userRouter.post("/register", pictureUploadMiddleware, async (req, res) => {
    try {
        const userInfo = req.body
        let avatar
        if (req.file === undefined) {
            avatar = "https://thumbs.dreamstime.com/b/no-user-profile-picture-24185395.jpg"
        } else {
            avatar = imageBufferToBase64(req.file.buffer, req.file.mimetype)
        }
        const user = await UserService.registerUser({ ...userInfo, avatar })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    }
}
)

userRouter.post("/login", async (req, res) => {
    try {
        const result = await UserService.loginUser({
            email: req.body.email,
            password: req.body.password
        })

        if (result.refreshToken) {
            req.session.refreshToken = result.refreshToken
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while logging in." } })
    }
})

// get same user info
userRouter.get("/userinfo", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub
        const userInfo = await UserService.showUserInfo({ userId })
        res.status(200).json(userInfo)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: { message: err.message } })
    }
})

//get a user
userRouter.get("/", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.query.userId;  
        const user = await UserService.showUserInfo({ userId })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

userRouter.post("/refreshtoken", async (req, res) => {
    try {
        const result = await UserService.refreshUserToken({
            refreshToken: req.session.refreshToken || req.body.refreshToken
        })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ err: { message: err ? err.message : "Unknown error while refreshing your token." } })
    }
}
)

userRouter.get("/allUsers",doAuthMiddleware, async (_, res) => {
    try {
        const allUsers = await UserService.listAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: { message: error ? error.message : "Unknown error while loading all users." } })
    }
})

// userRouter.get("/logout", async (req, res) => {
//     req.session.refreshToken = null
//     res.status(200).json({})
// })



module.exports = { userRouter }
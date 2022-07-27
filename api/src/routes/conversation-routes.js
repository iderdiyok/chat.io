const express = require("express")
const { ConversationService } = require("../use-cases")
const { doAuthMiddleware } = require("../auth/doAuthMiddleware")
const conversationsRouter = express.Router()

//new conv
conversationsRouter.post("/add",
    doAuthMiddleware,
    async (req, res) => {
        try {
            const created_atTimeStamp = new Date().getTime()
            const result = await ConversationService.addConversation({
                members : [req.body.senderId, req.body.receiverId],
                created_at: created_atTimeStamp
            })

            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while adding a new conversation" } })
        }
    }

)

//get conv of a user
conversationsRouter.get("/:userId", 
    doAuthMiddleware, 
    async (req, res) => {
        try {
            const result = await ConversationService.showConversation(req.params.userId)
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading." } })
        }
    }
)

// get conv includes two userId
conversationsRouter.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const users = {
            "firstUserId" : req.params.firstUserId, 
            "secondUserId" : req.params.secondUserId
        } 
      const conversation = await ConversationService.findConversationOfTwoUsers({users});
      console.log("conversation: ", conversation);
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = { conversationsRouter }
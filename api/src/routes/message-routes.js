const express = require("express")
const { MessageService } = require("../use-cases")
const { doAuthMiddleware } = require("../auth/doAuthMiddleware")
const messagesRouter = express.Router()

//add message
messagesRouter.post("/add",
    doAuthMiddleware,
    async (req, res) => {
        try {
            const message = req.body.message
            const created_at = new Date().getTime()
            const result = await MessageService.addMessage({...message, created_at})

            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while adding a newmessage" } })
        }
    }

)

//get message
messagesRouter.get("/:conversationId",
    async (req, res) => {
        try {
            const result = await MessageService.showMessages(req.params.conversationId)
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: { message: err ? err.message : "Unknown error while loading." } })
            
        }
    }

)
module.exports = { messagesRouter }
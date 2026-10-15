const express = require("express");
const repository = require("../repositories/conversation");
const userRepository = require("../repositories/user")
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get('find/:idReciever', async (req, res) => {
    const idReciever = req.params.idReciever;
    const reciever = userRepository.find(idReciever);

    const conversation = repository.getConversation(req.user, reciever);

    return res.json(conversation);
});
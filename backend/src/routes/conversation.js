const express = require("express");
const repository = require("../repositories/conversation");
const userRepository = require("../repositories/user")
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get('/find/:idReceiver', async (req, res) => {
    const { idReceiver } = req.params;
    const reciever = await userRepository.find(idReceiver);

    const conversation = await repository.getConversation(req.user, reciever);

    return res.json(conversation);
});

module.exports = router;
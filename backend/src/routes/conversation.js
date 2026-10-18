const express = require("express");
const repository = require("../repositories/conversation");
const userRepository = require("../repositories/user")
const messageRepository = require("../repositories/message")
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get('/', async(req, res) => {
    const conversations = await repository.all(req.user);

    return res.json({ data: conversations });
});

router.get('/find/:idReceiver', async (req, res) => {
    const { idReceiver } = req.params;
    const reciever = await userRepository.find(idReceiver);

    const conversation = await repository.getConversation(req.user, reciever);

    return res.json({ data: conversation });
});

router.post('/:id/message', async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const conversation = await repository.find(id, req.user);

    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }

    const message = messageRepository.create({
        sender: req.user,
        conversation: conversation,
        type: 'text',
        text: text,
    });

    res.json(message);
});

router.get('/:id/message', async (req, res) => {
    const { id } = req.params;
    const conversation = await repository.find(id, req.user);

    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }

    const messages = await messageRepository.fromConversation(conversation);

    res.json({ data: messages });
});

module.exports = router;
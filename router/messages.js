const { Router } = require('express');
const router = Router();
const {checkAuthentication, checkAdmin} = require('../middlewares/auth');
const MessagesController = require('../controllers/controllerMessages');

const messagesController = new MessagesController();

router.get('/', checkAuthentication, messagesController.getMessages);
router.post('/', checkAuthentication, messagesController.addMessage);


module.exports = router;

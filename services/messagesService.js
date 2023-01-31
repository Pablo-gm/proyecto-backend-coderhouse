const {errorLogger} = require('../utils/logger');

const MessageRepo = require('../repositories/messageRepository')
const messageRepo = new MessageRepo();

class MessageService {
    constructor() {};

    async getAllMessages() {
        try {
            return await messageRepo.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getMyMessages(email) {
        try {
            return await messageRepo.getMyMessages(email);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async addMessage(message) {
        try {
            return await messageRepo.save(message);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

};

module.exports = MessageService;
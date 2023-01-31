const { Messages } = require('../daos/daoFactory.js');

class MessageRepo {
    constructor() {
        this.dao = Messages;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getMyMessages(email) {
        return await this.dao.getMyMessages(email);
    }

    async save(message) {
        return await this.dao.save(message);
    }

}

module.exports = MessageRepo;
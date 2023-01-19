const { User } = require('../daos/daoFactory.js');
const {errorLogger} = require('../utils/logger');

class UserService {
    constructor() {};

    async getAllUSers() {
        try {
            return await User.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getUserById(id) {
        try {
            return await User.getById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async addUser(product) {
        try {
            return await User.save(product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async updateUser(id,product) {
        try {
            return await User.update(id,product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async deleteUserById(id) {
        try {
            return await User.deleteById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

};

module.exports = UserService;
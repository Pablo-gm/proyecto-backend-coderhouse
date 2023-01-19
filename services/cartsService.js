const { Carts, Products } = require('../daos/daoFactory.js');
const {errorLogger} = require('../utils/logger');

class CartsService {
    constructor() {};

    async getAllCarts() {
        try {
            return await Carts.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getCartById(id) {
        try {
            return await Carts.getById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async createCart(cart) {
        try {
            return await Carts.save(cart);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async deleteCartById(id) {
        try {
            return await Carts.deleteById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async addProductToCart(id,pid, quantity) {
        try {
            return await Carts.addToCart(id,pid, quantity);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async removeProductFromCart(id,pid) {
        try {
            return await Carts.removeFromCart(id,pid);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async cleanCart(id) {
        try {
            return await Carts.cleanCart(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

};

module.exports = CartsService;
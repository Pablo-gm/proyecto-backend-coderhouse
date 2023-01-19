const { Orders } = require('../daos/daoFactory.js');
const {errorLogger} = require('../utils/logger');

class OrdersService {
    constructor() {};

    async getAllOrders() {
        try {
            return await Orders.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async createOrder(cartId, cart) {
        try {
            return await Orders.createOrder(cartId, cart);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async nextOrder() {
        try {
            return await Orders.nextOrderNumber();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async allFromUser(userId) {
        try {
            return await Orders.allFromUser(userId);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }
    
};

module.exports = OrdersService;
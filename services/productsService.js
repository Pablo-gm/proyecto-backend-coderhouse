const { Products } = require('../daos/dao.js');
const {errorLogger} = require('../utils/logger');

class ProductsService {
    constructor() {};

    async getAllProducts() {
        try {
            return await Products.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductsByIdArray(ids) {
        try {
            return await Products.getByIdArray(ids);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductById(id) {
        try {
            return await Products.getById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductsByIds(ids) {
        try {
            return await Products.getByIdArray(ids);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async addProduct(product) {
        try {
            return await Products.save(product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async updateProduct(id,product) {
        try {
            return await Products.update(id,product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async deleteProductById(id) {
        try {
            return await Products.deleteById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

};

module.exports = ProductsService;
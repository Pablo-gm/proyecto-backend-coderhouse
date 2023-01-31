const {errorLogger} = require('../utils/logger');

const ProductRepo = require('../repositories/productRepository')
const productRepo = new ProductRepo();

class ProductsService {
    constructor() {};

    async getAllProducts() {
        try {
            return await productRepo.getAll();
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductsByIdArray(ids) {
        try {
            return await productRepo.getByIdArray(ids);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductById(id) {
        try {
            return await productRepo.getById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductsByIds(ids) {
        try {
            return await productRepo.getByIdArray(ids);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async getProductsByCategory(category) {
        try {
            return await productRepo.getProductsByCategory(category);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async addProduct(product) {
        try {
            return await productRepo.save(product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async updateProduct(id,product) {
        try {
            return await productRepo.update(id,product);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

    async deleteProductById(id) {
        try {
            return await productRepo.deleteById(id);
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
        }
    }

};

module.exports = ProductsService;
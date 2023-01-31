const { Products } = require('../daos/daoFactory.js');

class ProductRepo {
    constructor() {
        this.dao = Products;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getByIdArray(ids) {
        return await this.dao.getByIdArray(ids);
    }

    async getById(id) {
        return await this.dao.getById(id);

    }

    async getProductsByCategory(category) {
        return await this.dao.getProductsByCategory(category);
    }

    async save(product) {
        return await this.dao.save(product);
    }

    async update(id,product) {
        return await this.dao.update(id,product);
    }

    async deleteById(id) {
        return await this.dao.deleteById(id);
    }
}

module.exports = ProductRepo;
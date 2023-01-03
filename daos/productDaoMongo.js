const productModel = require('../models/product');
const Container = require('../containers/containerMongoDB');

class ProductsMongo extends Container {
    constructor() {
        super(productModel);
    };
};

module.exports = ProductsMongo;
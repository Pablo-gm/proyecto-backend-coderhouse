const Container = require('../containers/containerFirebase');

class ProductsFirebase extends Container {
    constructor() {
        super('products');
    };
};

module.exports = ProductsFirebase;
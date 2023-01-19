const productModel = require('../models/product');
const Container = require('../containers/containerMongoDB');

let instance = null;

class ProductsMongo extends Container {
    constructor() {
        super(productModel);
    };

    static getInstance(){
        if(!instance){
            instance = new ProductsMongo();
        }
        return instance
    }
};

module.exports = ProductsMongo;
const productModel = require('../models/product');
const Container = require('../containers/containerMongoDB');

let instance = null;

class ProductsMongo extends Container {
    constructor() {
        super(productModel);
    };

    async getProductsByCategory(category) {
        try {
            const docs = await this.model.find({category: category}).lean().then(ds => {
                if (ds.length) {
                    return ds.map(d => {
                        d.id = String(d._id); // we add id explicitly
                        return d;
                    });
                }
                return [];
            });

            return { status: 'success', message: 'Productos encontrados.', data: docs };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al encontrar productos por categoría: ${err}` };
        }
    }

    static getInstance(){
        if(!instance){
            instance = new ProductsMongo();
        }
        return instance
    }
};

module.exports = ProductsMongo;
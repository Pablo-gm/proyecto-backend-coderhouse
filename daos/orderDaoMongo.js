const orderModel = require('../models/order');
const Container = require('../containers/containerMongoDB');
const CartsMongo = require('./cartDaoMongo');
const UsersMongo = require('./userDaoMongo');
const {errorLogger} = require('../utils/logger');

let instance = null;

class OrdersMongo extends Container {
    constructor() {
        super(orderModel);
        this.carts = new CartsMongo();
        this.users = new UsersMongo();
    };

    async createOrder(cartId, cart) {
        try {
            const orderAnswer = await this.save(cart);
        
            if (orderAnswer.status === 'error') {
                return orderAnswer;
            }

            const cartAnswer = await this.carts.cleanCart(cartId);

            return { status: 'success', message: 'Orden generada.' };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al generar orden: ${err}` };
        }
    }

    async nextOrderNumber() {
        try {
            const n = await this.model.find().sort({order_number:-1}).limit(1);
            const next = n.length == 0 ? 1 : n[0].order_number + 1;

            return { status: 'success', message: 'Orden generada.', next };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al generar orden: ${err}` };
        }
    }

    async allFromUser(userId) {
        try {
            const docs = await this.model.find({buyer: userId}).sort({order_number:-1}).lean().then(ds => {
                if (ds.length) {
                    return ds.map(d => {
                        d.id = String(d._id); // we add id explicitly
                        return d;
                    });
                }
                return [];
            });

            return { status: 'success', message: 'Ordenes encontradas.', orders: docs };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al encontrar ordenes: ${err}` };
        }
    }

    static getInstance(){
        if(!instance){
            instance = new OrdersMongo();
        }
        return instance
    }

};

module.exports = OrdersMongo;
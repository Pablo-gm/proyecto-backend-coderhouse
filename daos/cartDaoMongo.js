const cartModel = require('../models/cart');
const Container = require('../containers/containerMongoDB');
const ProductsMongo = require('./productDaoMongo');
const {errorLogger} = require('../utils/logger');

let instance = null;

class CartsMongo extends Container {
    constructor() {
        super(cartModel);
        this.products = ProductsMongo.getInstance();
    };

    async addToCart(id, pid, quantity) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }

            const product = { 
                _id: productInInventory.data.id,
            }
            const cart = await this.getById(id);

            if (cart.status === 'error') {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data;

            if (cartData.products.filter(ps => ps.product.toString() === pid).length > 0) {
                return { status: 'error', message: `El producto ya se encuentra en el carrito.` };
            }

            const newCartProducts =  cartData.products;
            newCartProducts.push({product, quantity} );

            await this.model.updateOne({ _id: id }, {$set: {products: newCartProducts}})

            return { status: 'success', message: 'Producto agregado al carrito.' };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al intentar añadir producto al carrito: ${err}` };
        }
    }

    async removeFromCart(id, pid) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }
            
            const cart = await this.getById(id);

            if (cart.status === 'error') {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data;
            if (cartData.products.filter(ps => ps.product.toString() === pid).length == 0) {
                return { status: 'error', message: `El producto no se encontraba en el carrito.` };
            }

            const newCartProducts =  cartData.products.filter(ps => ps.product.toString() !== pid);

            await this.model.updateOne({ _id: id }, {$set: {products: newCartProducts}})

            return { status: 'success', message: 'Producto removido del carrito.' };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al intentar remover producto del carrito: ${err}` };
        }

    }

    async cleanCart(id) {
        try {

            const cart = await this.getById(id);

            if (cart.status === 'error') {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const newCartProducts = [];

            await this.model.updateOne({ _id: id }, {$set: {products: newCartProducts}})

            return { status: 'success', message: 'Carrito vaciado.' };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al intentar vaciar el carrito: ${err}` };
        }

    }

    static getInstance(){
        if(!instance){
            instance = new CartsMongo();
        }
        return instance
    }

};

module.exports = CartsMongo;
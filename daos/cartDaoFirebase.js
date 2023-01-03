const Container = require('../containers/containerFirebase');
const ProductsFirebase = require('./productDaoFirebase');

class CartsFirebase extends Container {
    constructor() {
        super('carts');
        this.products = new ProductsFirebase();
    };

    // id = cartId, pid = productId
    async addToCart(id, pid) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }
            
            const product = { 
                id: productInInventory.data.id,
                title: productInInventory.data.title,
                description: productInInventory.data.description,
                thumbnail: productInInventory.data.thumbnail 
            }

            const cartRef = this.collection.doc(id);
            const cart = await cartRef.get();
            if (!cart.exists) {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data();
            if (cartData.products.some(p => p.id === pid)) {
                return { status: 'error', message: `El producto ya se encuentra en el carrito.` };
            }

            const newCartProducts =  cartData.products;
            newCartProducts.push(product);

            await this.collection.doc(id).update({
                products: newCartProducts
            });
            // products: this.FieldValue.arrayUnion(product)

            return { status: 'success', message: 'Producto agregado al carrito.' };
        } catch (err) {
            return { status: 'error', message: `Error al intentar añadir producto al carrito: ${err}` };
        }
    }

    async removeFromCart(id, pid) {
        try {

            const productInInventory = await this.products.getById(pid);
            if (productInInventory.status === 'error') {
                return { status: 'error', message: `No hay producto con id: ${pid}` };
            }
            
            const cartRef = this.collection.doc(id);
            const cart = await cartRef.get();
            if (!cart.exists) {
                return { status: 'error', message: `No hay carrito con id: ${id}` };
            }

            const cartData = cart.data();
            if (!cartData.products.some(p => p.id === pid)) {
                return { status: 'error', message: `El producto no se encontraba en el carrito.` };
            }

            const newCartProducts =  cartData.products.filter(p => p.id !== pid);

            await this.collection.doc(id).update({
                products: newCartProducts
            });

            return { status: 'success', message: 'Producto removido del carrito.' };
        } catch (err) {
            return { status: 'error', message: `Error al intentar remover producto del carrito: ${err}` };
        }

    }

};

module.exports = CartsFirebase;
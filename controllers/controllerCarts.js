const CartsService = require('../services/cartsService');
const ProductsService = require('../services/productsService');
const cartDTO = require('../dtos/cartDTO');
const productDTO = require('../dtos/productDTO');

class CartsController {
    constructor() {
        this.Products = new ProductsService();
        this.Carts = new CartsService();
    } 

    getCart = async (req, res) => {
        let cart;
        let products;
        let total = 0;

        if(req.user){
            const answer = await this.Carts.getCartById(req.user.cart);
            if(answer.status === 'error'){
                req.flash('error', `No se encontró carrito con id: ${req.params.id}`);
            }else{
                cart = new cartDTO(answer.data);

                const productsIds = cart.products.map(p => p.product);
                const productsAnswer = await this.Products.getProductsByIdArray(productsIds);

                if(productsAnswer.status === 'error'){
                    req.flash('error', `Error al obtener productos del carrito`);
                }else{
                    products = [];
                    productsAnswer.data.forEach( (p, index) => {
                        total +=  p.price * cart.products[index].quantity;
                        const tempProduct = {product: new productDTO(p), quantity: cart.products[index].quantity, total: p.price * cart.products[index].quantity};
                        products.push(tempProduct);
                    })
                }
            }
        }else{
            req.flash('error', 'El ID es requerido');
        }

        res.render('pages/cart', {cart, products, total, notifications: req.flash() } );
    }

    //Get all products or product selected by id
    getCarts = async (req, res) => {
        let carts;
        const allCarts = await this.Carts.getAllCarts();
        let error;
        if(allCarts.status === 'error'){
            error = allCarts.message;
            req.flash('error', error);
        }else{
            carts = allCarts.data;
        }

        res.render('pages/carts', {carts, notifications: req.flash() } );
    }

    createCart = async (req, res) => {
        const {userId} = req.body;
        const newCart = {
            products: [],
            userId: userId
        }

        if(!userId ){
            req.flash('error', `Id de usuario es necesario.`);
        }else{
            const answer = await this.Carts.createCart(newCart);
            req.flash(answer.status, answer.message);
        }

        res.redirect('./view');
    }

    deleteCartAndRedirect = async (req, res) => {
        if(req.body.id){
            const {id}  = req.body;    
            const answer = await this.Carts.deleteById(id);

            if(answer.status === 'success'){
                answer.message = 'Carrito eliminado.'
            }

            req.flash(answer.status, answer.message);
        }else{
            req.flash('error', "No se envió Id.");
        }

        res.redirect('../carrito');
    }

    addProductToCartAndRedirect = async (req, res) => {
        const {pid, quantity} = req.body;
        const id = req.user ? req.user.cart : null;
        const q = parseInt(quantity);

        if(q && q < 0 ){
            req.flash('error', 'La cantidad no es válida.');
        }else{
            if(id && pid){
                const answer = await this.Carts.addProductToCart(id,pid,q);
                if(answer.status === 'error'){
                    req.flash('error', answer.message);
                }else{
                    req.flash(answer.status, `Producto agregado al carrito.`);
                }
            }else{
                req.flash('error', 'El ID del producto y el carrito son necesarios.');
            }
        }

        res.redirect(`../productos`);
        //res.render(pages/updateCart/${}`, {cart: cartAnswer.data , products,  notifications: req.flash() } );
    }

    removeProductFromCartAndRedirect = async (req, res) => {
        const {pid} = req.body;
        const id = req.user ? req.user.cart : null;
        if(id && pid){
            const answer = await this.Carts.removeProductFromCart(id,pid);
            req.flash(answer.status, answer.message);
        }else{
            req.flash('error', 'El ID del producto y el carrito son necesarios.');
        }

        res.redirect(`../carrito`);
    }

    cleanCartAndRedirect = async (req, res) => {
        const id = req.user ? req.user.cart : null;
        if(id){
            const answer = await this.Carts.cleanCart(id);
            req.flash(answer.status, answer.message);
        }else{
            req.flash('error', 'El ID del carrito es necesario.');
        }

        res.redirect(`../../productos`);
    }


}




module.exports = CartsController;
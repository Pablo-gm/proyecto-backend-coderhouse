const CartsService = require('../services/cartsService');
const OrdersService = require('../services/ordersService');
const ProductsService = require('../services/productsService');

const orderDTO = require('../dtos/orderDTO');

const sendEmail = require('../utils/nodemailerGmail');
const {sendSMS, sendWhatsapp} = require('../utils/twilio');
const { ADMIN_EMAIL, NOTIFICATIONS_EMAIL } = require('../config/options')

class OrdersController {
    constructor() {
        this.Products = new ProductsService();
        this.Orders = new OrdersService();
        this.Carts = new CartsService();
    } 

    getOrders = async (req, res) => {
        let orders;
        const allOrders = await this.Orders.getAllOrders();
        let error;

        if(allOrders.status === 'error'){
            error = allOrders.message;
            req.flash('error', error);
        }else{
            orders = allOrders.data.map(ord => new orderDTO(ord));
        }

        res.render('pages/ordersAll', {orders, notifications: req.flash() } );
    }

    allFromUser = async (req, res) => {
        const id = req.user ? req.user._id : null;
        let orders;
        if(id){
            const answer = await this.Orders.allFromUser(id);
            if(answer.status === 'error'){
                req.flash(answer.status, answer.message);
            }else{
                orders = answer.orders.map(ord => new orderDTO(ord));
            }
            
        }else{
            req.flash('error', 'El usuario no tiene una sesión activa');
        }

        res.render('pages/ordersMy',{ orders, notifications: req.flash() });
    }

    //Get all products or product selected by id
    createOrder = async (req, res) => {
        const newOrder = {};
        let cart, products;
        let total = 0;
        if(req.user){
            const cartAnswer = await this.Carts.getCartById(req.user.cart);

            if(cartAnswer.status === 'error'){
                req.flash('error', `No se encontró carrito`);
            }else{
                cart = cartAnswer.data;
                const productsIds = cart.products.map(p => p.product);
                const productsAnswer = await this.Products.getProductsByIdArray(productsIds);
                if(productsAnswer.status === 'error'){
                    req.flash('error', `Error al obtener productos para generar orden`);
                }else{
                    products = [];
                    productsAnswer.data.forEach( (p, index) => {
                        total +=  p.price * cart.products[index].quantity;
                        products.push({title: p.title, code: p.code, price: p.price, quantity: cart.products[index].quantity, total: p.price * cart.products[index].quantity});
                    })
                }
                
                const newNumber = await this.Orders.nextOrder();
                if(newNumber.status === 'error'){
                    req.flash('error', newNumber.message);
                }else{
                    newOrder.buyer = req.user._id;
                    newOrder.products = products;
                    newOrder.email = cart.email;
                    newOrder.delivery_address = cart.delivery_address;
                    newOrder.total = total;
                    newOrder.order_number = newNumber.next;
                }

                const answer = await this.Orders.createOrder(req.user.cart, newOrder);
                await this.Carts.cleanCart(req.user.cart);

                let mailOrder = ``;
                let whatsappOrder = `Nuevo pedido de ${req.user.fullname} ${cart.email}`;

                newOrder.products.forEach(p => {
                    mailOrder += `<li>Producto: ${p.title} - ${p.code}, Cantidad: ${p.quantity}, total: ${p.total} </li>`;
                    whatsappOrder += `Producto: ${p.title} - ${p.code}, Cantidad: ${p.quantity}, total: ${p.total}`;
                });

                const mailOptions = {
                    from: ADMIN_EMAIL,
                    to: NOTIFICATIONS_EMAIL,
                    subject: `Nuevo pedido de ${req.user.fullname} ${cart.email}`,
                    html: `
                        <p> Se creó una orden de compra de ${req.user.fullname} ${cart.email} con los siguientes productos:</p>
                        <ul>
                            ${mailOrder}
                        </ul>  
                    `
                }

                //const emailAnswer = await sendEmail(mailOptions);
                //const answerSMS = await sendSMS('Su pedido ha sido recibido y se encuentra en proceso', req.user.phone);
                //const answerWhats = await sendWhatsapp(whatsappOrder, req.user.phone);

                req.flash(answer.status, answer.message);
            }
        }else{
            req.flash('error', 'El usuario no tiene una sesión activa');
        }
        res.redirect(`../../productos`);
    }

}

module.exports = OrdersController;
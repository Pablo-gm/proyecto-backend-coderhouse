const { Router } = require('express');
const router = Router();
const {checkAuthentication, checkAdmin} = require('../middlewares/auth');
const OrdersController = require('../controllers/controllerOrders');

const orderController = new OrdersController();

//router.get('/', checkAdmin, cartController.getCart);
router.get('/', checkAuthentication, orderController.allFromUser);
router.get('/admin', checkAdmin, orderController.getOrders);
router.post('/make', checkAuthentication, orderController.createOrder);

module.exports = router;
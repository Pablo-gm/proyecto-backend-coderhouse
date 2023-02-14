const { Router } = require('express');
const router = Router();
const {getJWTstrategy, checkAuthenticationAPI, checkAdminAPI} = require('../middlewares/auth');
const OrdersController = require('../controllers/controllerOrders');

const orderController = new OrdersController();
getJWTstrategy();

router.get('/', checkAuthenticationAPI, orderController.allFromUserAPI);
router.get('/admin', checkAdminAPI, orderController.getOrdersAPI);
router.post('/make', checkAuthenticationAPI, orderController.createOrderAPI);

module.exports = router;
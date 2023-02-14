const { Router } = require('express');
const router = Router();
const {checkAuthentication} = require('../middlewares/auth');
const CartsController = require('../controllers/controllerCarts');

const cartController = new CartsController();

router.get('/', cartController.getCart);
router.post('/addProduct', cartController.addProductToCartAndRedirect);
router.post('/removeProduct', checkAuthentication, cartController.removeProductFromCartAndRedirect);
router.post('/cleanCart', checkAuthentication, cartController.cleanCartAndRedirect);

module.exports = router;
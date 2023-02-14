const { Router } = require('express');
const router = Router();
const {getJWTstrategy, checkAuthenticationAPI, checkAdminAPI} = require('../middlewares/auth');
const CartsController = require('../controllers/controllerCarts');

const cartController = new CartsController();
getJWTstrategy();

router.get('/', checkAuthenticationAPI, cartController.getCartAPI);
router.post('/addProduct', checkAuthenticationAPI, cartController.addProductToCartAPI);
router.post('/removeProduct', checkAuthenticationAPI, cartController.removeProductFromCartAPI);
router.post('/cleanCart', checkAuthenticationAPI, cartController.cleanCartAPI);

module.exports = router;
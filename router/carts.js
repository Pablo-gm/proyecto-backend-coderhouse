const { Router } = require('express');
const router = Router();
const {checkAuthentication} = require('../middlewares/auth');
const CartsController = require('../controllers/controllerCarts');

const cartController = new CartsController();

router.get('/', cartController.getCart);
router.post('/addProduct', cartController.addProductToCartAndRedirect);
router.post('/removeProduct', checkAuthentication, cartController.removeProductFromCartAndRedirect);
router.post('/cleanCart', checkAuthentication, cartController.cleanCartAndRedirect);
// falta ruta eliminar/modificar carrito en  /carrito:id 
/*
router.get('/view', cartController.getCarts);
router.post('/view/', cartController.createCart);

router.get('/update/:id', cartController.getCartById);
router.post('/update', cartController.addProductToCartAndRedirect);
router.post('/update/delete', cartController.deleteProductFromCartAndRedirect);


router.post('/delete', cartController.deleteCartAndRedirect);
*/
module.exports = router;
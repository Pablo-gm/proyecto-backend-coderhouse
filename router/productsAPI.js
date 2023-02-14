
const { Router } = require('express');
const router = Router();
const {getJWTstrategy, checkAuthenticationAPI, checkAdminAPI} = require('../middlewares/auth');

const ProductsController = require('../controllers/controllerProducts');

const productsController = new ProductsController();

getJWTstrategy();

router.get('/categoria/:category?', checkAuthenticationAPI, productsController.getProductsByCategoryAPI);
router.get('/:id?', checkAuthenticationAPI, productsController.getProductsAPI);
router.post('/', checkAdminAPI, productsController.addProductAPI);
router.put('/', checkAdminAPI, productsController.updateProductAPI);
router.delete('/', checkAdminAPI, productsController.deleteProductAPI);



module.exports = router;

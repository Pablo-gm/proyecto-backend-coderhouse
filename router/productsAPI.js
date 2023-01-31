
const { Router } = require('express');
const router = Router();
const {checkAuthentication, checkAdmin} = require('../middlewares/auth');
const ProductsController = require('../controllers/controllerProducts');

const productsController = new ProductsController();

router.get('/:id?', productsController.getProductsAPI);
router.post('/', productsController.addProductAPI);
router.put('/:id', productsController.updateProductAPI);
router.delete('/:id', productsController.deleteProductAPI);
router.get('/categoria/:category?', productsController.getProductsByCategoryAPI);


module.exports = router;

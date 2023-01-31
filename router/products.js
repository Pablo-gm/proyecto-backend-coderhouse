
const { Router } = require('express');
const router = Router();
const {checkAuthentication, checkAdmin} = require('../middlewares/auth');
const ProductsController = require('../controllers/controllerProducts');

const productsController = new ProductsController();

//router.get('/:id?', checkAuthentication, productsController.getProducts);
router.get('/:id?', checkAuthentication, productsController.getProducts);
router.post('/', checkAdmin, productsController.addProduct);

router.get('/update/:id', checkAdmin, productsController.getProductById);
router.post('/update', checkAdmin, productsController.updateProductAndRedirect);

router.post('/delete', checkAdmin, productsController.deleteProductAndRedirect);

router.get('/categoria/:category?', checkAuthentication, productsController.getProductsByCategory);

//router.put('/view/:id', updateProduct);

module.exports = router;

const { Router } = require('express');

const userRouter = require('./users');
const productRouter = require('./products');
const cartRouter = require('./carts');
const orderRouter = require('./orders')

const router = Router();

router.use("/", userRouter);
router.use("/productos", productRouter);
router.use("/carrito", cartRouter);
router.use("/ordenes", orderRouter);

module.exports = router;

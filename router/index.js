const { Router } = require('express');

const userRouter = require('./users');
const productRouter = require('./products');
const productAPIRouter = require('./productsAPI');
const cartRouter = require('./carts');
const orderRouter = require('./orders')
const messageRouter = require('./messages')
const otherRouter = require('./others')

const router = Router();

router.use("/", userRouter);
router.use("/extra", otherRouter);
router.use("/productos", productRouter);
router.use("/api/productos", productAPIRouter);
router.use("/carrito", cartRouter);
router.use("/ordenes", orderRouter);
router.use("/chat", messageRouter);

module.exports = router;

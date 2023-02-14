const { Router } = require('express');

const userRouter = require('./users');
const userAPIrouter = require('./usersAPI')
const productRouter = require('./products');
const productAPIRouter = require('./productsAPI');
const cartRouter = require('./carts');
const cartAPIRouter = require('./cartsAPI');
const orderRouter = require('./orders')
const orderAPIRouter = require('./ordersAPI')
const messageRouter = require('./messages')
const otherRouter = require('./others')

const router = Router();

router.use("/", userRouter);
router.use("/api/", userAPIrouter);
router.use("/extra", otherRouter);
router.use("/productos", productRouter);
router.use("/api/productos", productAPIRouter);
router.use("/carrito", cartRouter);
router.use("/api/carrito", cartAPIRouter);
router.use("/ordenes", orderRouter);
router.use("/api/ordenes", orderAPIRouter);
router.use("/chat", messageRouter);

module.exports = router;

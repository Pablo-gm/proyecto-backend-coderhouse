require('dotenv').config();

let Products;
let User;
let Carts;
let Orders;
let method = "mongodb";

switch (method) {
    case "mongodb":
        const pm = require('./productDaoMongo');
        const cm = require('./cartDaoMongo');
        const um = require('./userDaoMongo');
        const om = require('./orderDaoMongo');
        Products = new pm();
        Carts = new cm();
        User = new um();
        Orders = new om();
        break;
    case "firebase":
        const pf = require('./productDaoFirebase');
        const cf = require('./cartDaoFirebase');
        // fix later if possible
        const uf = require('./userDaoMongo');
        Products = new pf();
        Carts = new cf();
        User = new uf();
        break
    default:
}

module.exports = { Products, Carts, User, Orders }
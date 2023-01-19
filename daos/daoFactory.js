let Products;
let User;
let Carts;
let Orders;
let Messages;
let method = "mongodb";

switch (method) {
    case "mongodb":
        const pm = require('./productDaoMongo');
        const cm = require('./cartDaoMongo');
        const um = require('./userDaoMongo');
        const om = require('./orderDaoMongo');
        const mm = require('./messageDaoMongo');
        Products = pm.getInstance();
        Carts = cm.getInstance();
        User = um.getInstance();
        Orders = om.getInstance();
        Messages = mm.getInstance();
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
        const pd = require('./productDaoMongo');
        const cd = require('./cartDaoMongo');
        const ud = require('./userDaoMongo');
        const od = require('./orderDaoMongo');
        const md = require('./messageDaoMongo');
        Products = pd.getInstance();
        Carts = cd.getInstance();
        User = ud.getInstance();
        Orders = od.getInstance();
        Messages = md.getInstance();
        break;
}

module.exports = { Products, Carts, User, Orders, Messages }
const userModel = require('../models/user');
const Container = require('../containers/containerMongoDB');

class UserMongo extends Container {
    constructor() {
        super(userModel);
    };
};

module.exports = UserMongo;
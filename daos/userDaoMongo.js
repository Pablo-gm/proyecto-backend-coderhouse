const userModel = require('../models/user');
const Container = require('../containers/containerMongoDB');

let instance = null;

class UserMongo extends Container {
    constructor() {
        super(userModel);
    };

    static getInstance(){
        if(!instance){
            instance = new UserMongo();
        }
        return instance
    }

};

module.exports = UserMongo;
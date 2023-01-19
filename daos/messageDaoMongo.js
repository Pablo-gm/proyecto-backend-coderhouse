const messageModel = require('../models/message');
const Container = require('../containers/containerMongoDB');

let instance = null;

class MessagesMongo extends Container {
    constructor() {
        super(messageModel);
    };

    static getInstance(){
        if(!instance){
            instance = new MessagesMongo();
        }
        return instance
    }
};

module.exports = MessagesMongo;
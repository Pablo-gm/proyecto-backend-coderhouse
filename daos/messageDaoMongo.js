const messageModel = require('../models/message');
const Container = require('../containers/containerMongoDB');

let instance = null;

class MessagesMongo extends Container {
    constructor() {
        super(messageModel);
    };

    async getMyMessages(email) {
        try {
            const docs = await this.model.find({email: email}).lean().then(ds => {
                if (ds.length) {
                    return ds.map(d => {
                        d.id = String(d._id); // we add id explicitly
                        return d;
                    });
                }
                return [];
            });

            return { status: 'success', message: 'Mensajes encontrados.', data: docs };
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al encontrar mensajes por email: ${err}` };
        }
    }

    static getInstance(){
        if(!instance){
            instance = new MessagesMongo();
        }
        return instance
    }
};

module.exports = MessagesMongo;
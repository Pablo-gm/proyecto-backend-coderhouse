const MessagesService = require('../services/messagesService');
const messageDTO = require('../dtos/messageDTO');

class MessagesController {
    constructor() {
        this.Messages = new MessagesService();
    }

    //Get all products or product selected by id
    getMessages = async (req, res) => {
        res.render('pages/messagesIO', { notifications: req.flash(), use_chat: 1 } );
    }

    getMyMessages = async (req, res) => {
        let messages;
        const allMessages = await this.Messages.getMyMessages(req.user.email);

        if(allMessages.status === 'error'){
            error = allMessages.message;
            req.flash('error', error);
        }else{
            messages = allMessages.data.map(m => new messageDTO(m));
        }

        res.render('pages/messages', {messages, notifications: req.flash() } );
    }

    getMessagesStatic = async (req, res) => {
        let messages;
        const allMessages = await this.Messages.getAllMessages();

        if(allMessages.status === 'error'){
            error = allMessages.message;
            req.flash('error', error);
        }else{
            messages = allMessages.data.map(m => new messageDTO(m));
        }

        res.render('pages/messages', {messages, notifications: req.flash() } );
    }

    addMessage = async (req, res) => {
        const {body, forEmail} = req.body;
        if(req.user){
            const newMessage = {
                type: req.user.is_admin ? 'system' : 'user',
                email: req.user.is_admin ? forEmail : req.user.email,
                body
            }

            if(!body || !newMessage.email){
                req.flash('error', `Todos los campos son necesarios para agregar un mensaje.`);
            }else{
                const answer = await this.Messages.addMessage(newMessage);
                if(answer.status === 'error'){
                    req.flash(answer.status, answer.message);
                }else{
                    req.flash(answer.status, `Mensaje enviado.`);
                }
            }
        }else{
            req.flash('error', `Solo usuarios registrados pueden publicar mensajes.`);
        }
        
        res.redirect('./chat');
    }

}

module.exports =  MessagesController;

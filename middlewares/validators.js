const { body } = require('express-validator');

const validateSignup = () => {
    return [
        body('email', 'El email es requerido').not().isEmpty().isEmail().withMessage('El formato de email no es correcto: ejemplo@dominio.com'), 
        body('password', 'Introduce una contraseña').not().isEmpty().trim(),
        body('password2', 'Confirma tu contraseña').not().isEmpty().trim(), 
        body('phone', 'Introduce tu teléfono con prefijo internacional, ejemplo: +123...').not().isEmpty().trim().isLength({ min: 10 }).withMessage('El teléfono debe contener al menos 10 dígitos, ejemplo: +123...'),
        body('fullname', 'Introduce tu nombre completo').not().isEmpty().trim(), 
        body('address', 'Introduce una direccion para el envio de mercancia').not().isEmpty().trim(),
        body('age', 'Introduce tu edad').not().isEmpty().trim().isNumeric().withMessage('Escribe tu edad en formato numérico'), 
    ]
}

module.exports = {
    validateSignup
}
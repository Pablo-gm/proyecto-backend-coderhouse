const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { Carts } = require('../daos/daoFactory');
const {errorLogger} = require('../utils/logger');
const sendEmail = require('../utils/nodemailerGmail');
const { ADMIN_EMAIL, NOTIFICATIONS_EMAIL } = require('../config/options')

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
} 

const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        User.findOne({
            email
        }, (error, user) => {

            if (error) {
                errorLogger.error(`Error: ${error}`);
                return done(error); 
            } 

            if (!user) {
                errorLogger.error(`Error: el usuario con email: ${email} no existe`);
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                errorLogger.error(`Error: ${email} passsord incorrecto`);
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {

            if (password != req.body.password2) {
                req.flash('error', 'Las contraseñas son distintas');
                return done(null, false);
            }

            const { fullname, address, email, phone, age } = req.body;

            if(!fullname || !address || !email || !phone || !age){
                req.flash('error', `Todos los campos son necesarios para el registro de usuario.`);
                return done(null, false);
            }

            const newCart = await Carts.save({ products: [], email, delivery_address: address });

            User.findOne({
                $or: [{ username }, { email: req.body.email }, { phone: req.body.phone }]
            }, (error, user) => {

                if (error) {
                    req.flash('error', "Error al registrar usuario " + error);
                    errorLogger.error(`Error: ${error}`);
                    return done(error);
                } 
    
                if (user) {
                    req.flash('error', `El nombre de usuario "${username}", correo "${req.body.email}" o teléfono "${req.body.phone}" ya fueron registrados`);
                    return done(null, false);
                }
    
                const avatar = req.file ? req.file.filename : 'default-user.png';
    
                const newUser = {
                    username,
                    password: createHash(password),
                    fullname,
                    address,
                    email,
                    phone,
                    age,
                    avatar,
                    cart: newCart.id
                }
    
                User.create(newUser, async (error, userWithId) => {
                    if (error) {
                        errorLogger.error(`Error: ${error}`);
                        return done(error);
                    }
                    
                    const mailOptions = {
                        from: ADMIN_EMAIL,
                        to: NOTIFICATIONS_EMAIL,
                        subject: 'Nuevo registro',
                        html: `
                            <p> Se a registrado un nuevo usuario con los datos:</p>
                            <ul>
                                <li> Nombre de usuario: ${newUser.username}</li>
                                <li> Nombre completo: ${newUser.fullname}</li>
                                <li> Dirección: ${newUser.address}</li>
                                <li> Email: ${newUser.email}</li>
                                <li> Teléfono: ${newUser.phone}</li>
                                <li> Edad: ${newUser.age}</li>
                            </ul>  
                        `
                    }

                    //const emailAnswer = await sendEmail(mailOptions);

                    return done(null, userWithId);
                });
                
            });
        } catch (error) {
            errorLogger.error(`Error: ${error}`);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done)
});

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

const checkAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.is_admin) {
        next();
    } else {
        req.flash('error', `No cuentas con permisos para ver la ruta '${req.originalUrl}'`);
        res.redirect('/');
    }
}


module.exports = { checkAuthentication, checkAdmin} ;

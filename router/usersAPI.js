const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {getJWTstrategy, checkAdmin, checkAuthenticationAPI} = require('../middlewares/auth');
const UsersController = require('../controllers/controllerUsers');
const {  JWT_SECRET } = require('../config/options')

const {errorLogger} = require('../utils/logger');

const userController = new UsersController();

getJWTstrategy();

// User profile
router.get("/profile", checkAuthenticationAPI, userController.profileUserAPI);

// User login
router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (!user) {
                        return res.json({error: 'No se pudo logear. Revise el email y password e intente de nuevo.'});
                    }

                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        return next(error);
                    }

                    req.login(
                        user, {
                            session: false
                        },
                        async (error) => {
                            if (error) return next(error);

                            const body = {
                                _id: user._id,
                                email: user.email,
                                cart: user.cart,
                                is_admin: user.is_admin
                            };
                            const token = jwt.sign({
                                user: body
                            }, JWT_SECRET);

                            return res.json({token});
                        }
                    );
                } catch (error) {
                    errorLogger.error(`Error: ${error}`);
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;
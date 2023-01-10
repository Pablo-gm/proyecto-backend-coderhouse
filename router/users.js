const express = require('express');
const { Router } = express;
const router = Router();
const passport = require('passport');
const { validateSignup } = require('../middlewares/validators');
const {checkAdmin, checkAuthentication} = require('../middlewares/auth');
const UsersController = require('../controllers/controllerUsers');

const userController = new UsersController();

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

const { body, validationResult } =  require('express-validator');

// Login
router.get("/", userController.login);
router.post("/login",passport.authenticate('login', { failureRedirect: '/faillogin' }), userController.loginUser);
router.get('/faillogin', userController.failLogin);

// Signup
router.get('/signup', userController.signup);

router.post('/signup', upload.single('avatar'), validateSignup(), function(req,res, next){
    let errors = validationResult(req); 
    if(!errors.isEmpty()){
        res.render("pages/signup.hbs",{errors: errors.array()});
    }else{
        passport.authenticate('signup', { failureRedirect: '/failsignup',  failureFlash: true })(req,res,next);
    }

}, userController.signupUser);

router.get('/failsignup', userController.failSignup);


// Logout
router.get("/logout", userController.logoutUser);

// User profile
router.get("/profile", checkAuthentication, userController.profileUser);


module.exports = router;
const UsersService = require('../services/userService');
const userDTO = require('../dtos/userDTO');

class UsersController {
    constructor() {
        this.Users = new UsersService();
    }
    // Web methods

    login = (req, res) => {
        var error = req.flash('error');
        return res.render("pages/login.hbs", {hide_navigation: 1, error});
    };

    loginUser = (req, res) => {
        return res.redirect("/productos");
    };

    failLogin = (req, res) => {
        return res.render("pages/loginfail.hbs", {hide_navigation: 1});
    };

    signup = (req, res) => {
        return res.render("pages/signup.hbs", {hide_navigation: 1});
    };

    signupUser = (req, res) => {
        return res.redirect("/productos");
    };

    failSignup = (req, res) => {
        const error = req.flash('error');
        return res.render("pages/signupfail.hbs", {error, hide_navigation: 1});
    };

    logoutUser = (req, res) => {
        const username = req.session.username; 
        req.session.destroy((err) => {
            if (!err) {
                res.render("pages/logout.hbs", {username, hide_navigation: 1});
            } else {
                res.status(404).json({error: err});
            } 
        });
    };

    profileUser = (req, res) => {
        const user = req.user ? req.user.toObject() : {};
        res.render("pages/profile.hbs", {user});
    };

    profileUserAPI = async (req, res) => {
        const loggedUser = req.user ? req.user : 0;
        let user = {error: 'Usuario no encontrado'};

        if(loggedUser){
            const answer = await this.Users.getUserById(loggedUser.id || loggedUser._id);
            if(answer.status === 'error'){
                user = {error: answer.message};
            }else{
                user = new userDTO(answer.data);
            }
        }

        res.json({user});
    };

}


module.exports = UsersController;
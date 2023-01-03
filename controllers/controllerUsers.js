
class UsersController {
    constructor() {}
        
    // Login
    login = (req, res) => {
        var error = req.flash('error');
        return res.render("pages/login.hbs", {hide_navigation: 1, error});
    };

    loginUser = (req, res) => {
        //const {username} = req.body;
        //req.session.username = req.user.username;
        return res.redirect("/productos");
    };

    failLogin = (req, res) => {
        return res.render("pages/loginfail.hbs", {hide_navigation: 1});
    };

    // Signup
    signup = (req, res) => {
        //var message = req.flash('message')
        return res.render("pages/signup.hbs", {hide_navigation: 1});
    };

    signupUser = (req, res) => {
        return res.redirect("/productos");
    };

    failSignup = (req, res) => {
        //var message = req.flash('message')
        const error = req.flash('error');
        return res.render("pages/signupfail.hbs", {error, hide_navigation: 1});
    };

    // Logout
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
        //const {username} = req.body;

        const user = req.user ? req.user.toObject() : {};
        res.render("pages/profile.hbs", {user});
    };

}


module.exports = UsersController;
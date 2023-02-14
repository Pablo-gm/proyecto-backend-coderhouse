class UserDTO{
    constructor (user){
        this.id = user._id || user.id
        this.email = user.email
        this.username = user.username
        this.fullname = user.fullname
        this.phone = user.phone
        this.age = user.age
        this.cart = user.cart
        this.address = user.address
        this.is_admin = user.is_admin
    }
}

module.exports = UserDTO;
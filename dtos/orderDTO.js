class OrderDTO{
    constructor (order){
        this.id = order._id || order.id
        this.buyer = order.buyer
        this.status = order.status
        this.total = order.total
        this.email = order.email
        this.order_number = order.order_number
        this.delivery_address = order.delivery_address
        this.products = order.products
        this.createdAt = order.createdAt
    }
}

module.exports = OrderDTO;
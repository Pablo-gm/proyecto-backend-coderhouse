class ProductDTO{
    constructor (product){
        this.id = product._id || product.id
        this.title = product.title
        this.price = product.price
        this.description = product.description
        this.thumbnail = product.thumbnail
        this.category = product.category
        this.code = product.code
        this.stock = product.stock
        this.createdAt = product.createdAt
    }
}

module.exports = ProductDTO;
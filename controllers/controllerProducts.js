const ProductsService = require('../services/productsService');
const productDTO = require('../dtos/productDTO');

class ProductsController {
    constructor() {
        this.Products = new ProductsService();
    }

    // API methods
    getProductsAPI = async (req, res) => {
        let products;
        let error;
        if(req.params.id){
            const product = await this.Products.getProductById(req.params.id);
            if(product.status === 'error'){
                req.flash('error', `No se encontró producto con id: ${req.params.id}`);
                error = product.message;
            }else{
                products = [new productDTO(product.data)];
            }
        }else{
            const allProducts = await this.Products.getAllProducts();

            if(allProducts.status === 'error'){
                error = allProducts.message;
                req.flash('error', error);
            }else{
                products = allProducts.data.map(p => new productDTO(p));
            }
        }

        res.json(products);
    }

    //Get all products or product selected by category
    getProductsByCategoryAPI = async (req, res) => {
        let products;
        let message;
        if(req.params.category){
            const allProducts = await this.Products.getProductsByCategory(req.params.category);
            if(allProducts.status === 'error'){
                message = allProducts.message;
            }else{
                products = allProducts.data.map(p => new productDTO(p));
                message = allProducts.status;
            }
        }else{
            req.flash('error', `La categoria es necesaria.`);
        }
        res.json({ products, message});
    }

    addProductAPI = async (req, res) => {
        let result;
        const {title, price, thumbnail, description, stock, category} = req.body;
        
        const newProduct = {
            title,
            price,
            thumbnail,
            description,
            stock,
            category,
            code: `CODE_${Date.now()}`,
        }
        // maybe validate no parameter is missing?
        if(!title || !price || !thumbnail || !description || !stock){
            result = { error: `Todos los campos son necesarios para agregar un producto.`}
        }else{
            const answer = await this.Products.addProduct(newProduct);
            result = answer;
            req.flash(answer.status, answer.message);
        }
        res.json(result);
    }

    updateProductAPI = async (req, res) => {
        const id = req.params.id;
        if(id){
            const {title, price, thumbnail, description, stock, category}  = req.body;
            const tempProduct = {
                title,
                price,
                category,
                thumbnail,
                description,
                stock,
            }
        
            const answer = await this.Products.updateProduct(id, tempProduct);
            res.json(answer);
        }else{
            res.json({error: "No se envió Id."});
        }
    }

    deleteProductAPI = async (req, res) => {
        const id = req.params.id;
        if(id){
            const answer = await this.Products.deleteProductById(id);
            res.json(answer);
        }else{
            res.json({error: "No se envió Id."});
        }
    }

    //Get all products or product selected by id
    getProducts = async (req, res) => {
        let products;
        let error;
        if(req.params.id){
            const product = await this.Products.getProductById(req.params.id);
            if(product.status === 'error'){
                //res.status(404).json({status: 'error', message: 'Producto no encontrado'});
                req.flash('error', `No se encontró producto con id: ${req.params.id}`);
                error = product.message;
            }else{
                //res.json(product);
                products = [new productDTO(product.data)];
            }
        }else{
            //return res.json(await Products.getAll());
            const allProducts = await this.Products.getAllProducts();

            if(allProducts.status === 'error'){
                error = allProducts.message;
                req.flash('error', error);
            }else{
                products = allProducts.data.map(p => new productDTO(p));
            }
        }

        res.render('pages/products', {products, notifications: req.flash() } );
        //res.render('pages/products', {products , error } );
    }

    getProductById = async (req, res) => {
        let product;
    
        if(req.params.id){
            const answer = await this.Products.getProductById(req.params.id);
            if(answer.status === 'error'){
                req.flash('error', `No se encontró producto con id: ${req.params.id}`);
            }else{
                product = answer.data;
            }
        }else{
            req.flash('error', 'El ID es requerido');
        }
    
        res.render('pages/updateProduct', {product , notifications: req.flash() } );
    }

    //Get all products or product selected by category
    getProductsByCategory = async (req, res) => {
        let products;
        let error;
        if(req.params.category){
            const allProducts = await this.Products.getProductsByCategory(req.params.category);
            if(allProducts.status === 'error'){
                req.flash('error', `No se encontró producto con categoria: ${req.params.category}`);
                error = allProducts.message;
            }else{
                products = allProducts.data.map(p => new productDTO(p));
            }
        }else{
            req.flash('error', `La categoria es necesaria.`);
        }

        res.render('pages/productsCategory', {products, category: req.params.category, notifications: req.flash() } );
    }

    addProduct = async (req, res) => {
        const {title, price, thumbnail, description, stock, category} = req.body;
        
        const newProduct = {
            title,
            price,
            thumbnail,
            description,
            stock,
            category,
            code: `CODE_${Date.now()}`,
        }
        // maybe validate no parameter is missing?
        if(!title || !price || !thumbnail || !description || !stock){
            req.flash('error', `Todos los campos son necesarios para agregar un producto.`);
        }else{
            const answer = await this.Products.addProduct(newProduct);
            req.flash(answer.status, answer.message);
        }
    
        res.redirect('./productos');
    }

    updateProductAndRedirect = async (req, res) => {

        if(req.body.id){
            const {id, title, price, thumbnail, description, stock, category}  = req.body;
            const tempProduct = {
                title,
                price,
                category,
                thumbnail,
                description,
                stock,
            }
        
            // maybe validate no parameter is missing?
            if(!title || !price || !thumbnail || !description || !stock){
                req.flash('error', `Todos los campos son necesarios para actualizar un producto.`);
            }else{
                const answer = await this.Products.updateProduct(id, tempProduct);
                if(answer.status === 'success'){
                    answer.message = 'Producto actualizado.'
                }
                req.flash(answer.status, answer.message);
            }
        }else{
            //res.json({error: "No se envió Id."});
            req.flash('error', "No se envió Id.");
        }
    
        res.redirect('../');
    }

    deleteProductAndRedirect = async (req, res) => {
        if(req.body.id){
            const {id}  = req.body;    
            const answer = await this.Products.deleteProductById(id);
    
            if(answer.status === 'success'){
                answer.message = 'Producto eliminado.'
            }
    
            req.flash(answer.status, answer.message);
        }else{
            //res.json({error: "No se envió Id."});
            req.flash('error', "El id es requerido para eliminar un producto.");
        }
    
        res.redirect('../');
    }

}


module.exports =  ProductsController;

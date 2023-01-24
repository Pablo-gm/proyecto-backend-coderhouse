const assert = require('assert').strict;
const axios = require('axios');

const getProducts = async () => {
    const answer = await axios.get('http://localhost:8080/api/productos');
    return { data: answer.data, status: answer.status };
}

const addProduct = async (product) => {
    const answer = await axios.post('http://localhost:8080/api/productos', product);
    return { data: answer.data, status: answer.status };
}

const updateProduct = async (productId, product) => {
    const answer = await axios.put('http://localhost:8080/api/productos/' + productId, product);
    return { data: answer.data, status: answer.status };
}

const deleteProduct = async (productId) => {
    const answer = await axios.delete('http://localhost:8080/api/productos/' + productId);
    return { data: answer.data, status: answer.status };
}

const testProducto = {
    title: 'Producto Axios',
    price: 100,
    thumbnail: 'https://via.placeholder.com/150',
    description: 'prueba con Axios',
    stock: 90
}

describe("Revisamos funcionalidad API con axios", function(){
    
    it("GET: Deber retornar status 200", async function(){
        const res = await getProducts();
        assert.strictEqual(res.status, 200)
    })

    it("GET: Deber obtener 3 productos", async function(){
        const res = await getProducts();
        assert.strictEqual(res.data.length, 3)
    })

    it("POST: Deber agregar 1 producto", async function(){
        const res = await addProduct(testProducto);
        assert.strictEqual(res.status, 200)

        const resGet = await getProducts();
        assert.strictEqual(resGet.data.length, 4)
    })

    it("PUT: Deber actualizar 1 producto", async function(){
        const resGet = await getProducts();
        assert.strictEqual(resGet.status, 200);

        const addedProduct = resGet.data[resGet.data.length -1];

        const resPut = await updateProduct(addedProduct.id, {title: 'Producto Axios Modificado'});
        assert.strictEqual(resPut.status, 200);

        const resGetAfter = await getProducts();
        assert.strictEqual(resGetAfter.status, 200);
        assert.strictEqual(resGetAfter.data[resGet.data.length -1].title, 'Producto Axios Modificado')
    })

    it("DELETE: Deber eliminar 1 producto", async function(){
        const resGet = await getProducts();
        assert.strictEqual(resGet.status, 200);

        const lastProduct = resGet.data[resGet.data.length -1];

        const resDelete = await deleteProduct(lastProduct.id);
        assert.strictEqual(resDelete.status, 200);

        const resGetAfter = await getProducts();
        assert.strictEqual(resGetAfter.status, 200);
        assert.strictEqual(resGetAfter.data.length, 3)
    })

})

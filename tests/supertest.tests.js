const request = require('supertest')('http://localhost:8080/api/productos');
const expect = require('chai').expect;

const testProducto = {
    title: 'Producto Supertest',
    price: 100,
    thumbnail: 'https://via.placeholder.com/150',
    description: 'prueba con supertest',
    stock: 90
}

describe("Revisamos funcionalidad API con supertest", function(){
    
    it("GET: Deber retornar status 200", async function(){
        const res = await request.get('/');
        expect(res.status).to.eql(200);
    })

    it("GET: Deber obtener 3 productos", async function(){
        const res = await request.get('/');
        expect(res._body.length).to.eql(3);
    })

    it("POST: Deber agregar 1 producto", async function(){
        const res = await request.post('/').send(testProducto);
        expect(res.status).to.eql(200);

        const resGet = await request.get('/');
        expect(resGet._body.length).to.eql(4);
    })

    it("PUT: Deber actualizar 1 producto", async function(){
        const resGet = await request.get('/');
        expect(resGet.status).to.eql(200);

        const addedProduct = resGet._body[resGet._body.length -1];

        const resPut = await request.put('/' + addedProduct.id).send({title: 'Producto Supertest Modificado'});
        expect(resPut.status).to.eql(200);

        const resGetAfter = await request.get('/');
        expect(resGetAfter.status).to.eql(200);
        expect(resGetAfter._body[resGetAfter._body.length -1].title).to.eql('Producto Supertest Modificado');
    })

    it("DELETE: Deber eliminar 1 producto", async function(){
        const resGet = await request.get('/');
        expect(resGet.status).to.eql(200);

        const lastProduct = resGet._body[resGet._body.length -1];

        const resDelete = await request.delete('/' + lastProduct.id);
        expect(resDelete.status).to.eql(200);

        const resGetAfter = await request.get('/');
        expect(resGetAfter.status).to.eql(200);
        expect(resGetAfter._body.length).to.eql(3);
    })

})
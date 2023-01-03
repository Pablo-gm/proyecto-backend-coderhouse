const admin = require("firebase-admin");
const {firebaseConfig} = require('../config/options');

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig.serviceAccount)
})

const db = admin.firestore();

class Container {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
        this.FieldValue = admin.firestore.FieldValue;
    }

    async save(object) {
        try {
            // automatic Id generation, otherwise use: await this.collection.doc('yourId').set(object);
            const newDoc = await this.collection.add(object);
            return { status: 'success', message: `Documento agregado con id: ${newDoc.id}`}
        } catch (err){
            return { status: 'error', message: `Error al agregar documento: ${err}`}
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.collection.get();
            const documents =  querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return {status: 'success', message: 'Se obtuvieron de manera exitosa los datos.', data: documents}
        } catch (err) {
            return { status: 'error', message: `Error al buscar registros: ${err}`}
        }
    }

    async getById(id) {
        try { 
            const docRef = this.collection.doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return { status: 'error', message: `No hay registro con id: ${id}`}
            } 

            return { status: 'success', message: 'Documento encontrado.', data: {id: doc.id, ...doc.data()} }
        } catch (err) {
            return { status: 'error', message: `Error al buscar registro con id ${id}. ${err}`}
        }
    }

    async update(id, object) {
        try {
            const docRef = this.collection.doc(id);
            const doc = await docRef.update(object);
            return { status: 'success', message: 'Documento actualizado.'}
        } catch (err) {
            return { status: 'error', message: `No se pudo actualizar el documento: ${err}`}
        }
    }

    async deleteById(id) {
        try {
            const test = await this.getById(id);

            if(test.status === 'success'){
                const docRef = this.collection.doc(id);
                await docRef.delete();

                return { status: 'success', message: 'Se elimino con éxito el documento.'}
            }
            
            return test;
        } catch (err) {
            return { status: 'error', message: `No se pudo eliminar el documento: ${err}` }
        }
    }

}

module.exports = Container;
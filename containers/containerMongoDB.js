const {MONGO_URI} = require('../config/options')
const mongoose = require('mongoose');
const {errorLogger} = require('../utils/logger');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


class Container {
    constructor(containerModel) {
        this.model = containerModel;
    }

    async save(object) {
        try {
            const newDoc = await this.model.create(object);
            return { status: 'success', message: `Documento agregado con id: ${newDoc._id}`, id: newDoc._id}
        } catch (err){
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al agregar documento: ${err}`}
        }
    }

    async getAll() {
        try {
            // we use lean() for handlebars
            //const docs = await this.model.find({});
            const docs = await this.model.find({}).lean().then(ds => {
                if (ds.length) {
                    return ds.map(d => {
                        d.id = String(d._id); // we add id explicitly
                        return d;
                    });
                }
                return [];
            });
            return {status: 'success', message: 'Se obtuvieron de manera exitosa los datos.', data: docs}
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al buscar registros: ${err}`}
        }
    }

    async getById(id) {
        try { 
            //const doc = await this.model.findById(id);
            const doc = await this.model.findById(id).lean();
            return { status: 'success', message: 'Documento encontrado.', data: {id: doc._id, ...doc}}
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al buscar registro con id ${id}. ${err}`}
        }
    }

    async getByIdArray(ids) {
        try { 
            //const doc = await this.model.findById(id);
            const docs = await this.model.find({ _id: { $in: ids } }).lean().then(ds => {
                if (ds.length) {
                    return ds.map(d => {
                        d.id = String(d._id); // we add id explicitly
                        return d;
                    });
                }
                return [];
            });

            return { status: 'success', message: 'Documento encontrado.', data: docs}
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `Error al buscar registros con ids ${ids}. ${err}`}
        }
    }

    async update(id, object) {
        try {
            await this.model.updateOne({ _id: id }, object)
            return { status: 'success', message: 'Documento actualizado.'}
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `No se pudo actualizar el documento: ${err}`}
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteOne({ _id: id })
            return { status: 'success', message: 'Se elimino con éxito el elemento.'}
        } catch (err) {
            errorLogger.error(`Error: ${err}`);
            return { status: 'error', message: `No se pudo eliminar el documento: ${err}` }
        }
    }

}


module.exports = Container;
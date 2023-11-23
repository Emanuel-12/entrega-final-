const {Schema,model} = require('mongoose');

const SerieSchema = new Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    imagen: {
        public_id: String,
        secure_url: String
    }
}, { collection: 'series',timestamps: true });

const Serie = model('serie', SerieSchema);


module.exports= Serie;
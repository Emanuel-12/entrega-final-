const {Schema,model} = require('mongoose');

const PeliculaSchema = new Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    imagen: {
        public_id: String,
        secure_url: String
    }
}, { collection: 'Peliculas',timestamps: true });

const Pelicula = model('Pelicula', PeliculaSchema);


module.exports= Pelicula;
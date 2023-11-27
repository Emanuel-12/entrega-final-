const Peliculas= require('../models/peliculasModel.js')
const fs = require('fs-extra')
const { uploadPeliculasPhoto,deletePhoto } = require('../utils/cloudinary.js');
const { log } = require('handlebars');

const getAllPeliculas = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const peliculas = await Peliculas.find().lean();
        res.status(200).render('peliculas', peliculas);
    } catch (err) {
        res.status(500).render('error','error',{ error: "error al obtener lista de peliculas" });
    }
}


const getPeliculaById = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const pelicula = await Peliculas.findById(req.params.id).lean();
        if (!pelicula) {
            return res.status(404).render('error',{ error: "pelicula no encontrado" });
        }
     
        res.render('peliculaId', {
            pelicula
        })
    } catch (err) {
        res.status(500).render('error',{ error: "error al obtener producto" });
    }
}

const createPelicula = async (req, res) => {
  
    try {
        
        const pelicula1 = await Peliculas.findOne({ nombre: req.body.nombre});
        if (pelicula1) {
            console.log(pelicula1)
            if (req.files?.image) {
                console.log(req.files.image)
                await fs.unlink(req.files.image.tempFilePath);
            }
            return res.send("pelicula ya registrada")
        }
        const peliculaNueva = new Peliculas(req.body);
        console.log(req.files.image)
        if (req.files?.image) {
            
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            const peliImg = await uploadPeliculasPhoto(req.files.image.tempFilePath);
            peliculaNueva.imagen = {
                public_id: peliImg.public_id,
                secure_url: peliImg.secure_url
            }
            // const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
            // await fs.rename(tempFilePath, newTempFilePath, (err) => {
            //     if (err) {
            //         console.log(err)
            //     }
            // })
            await fs.unlink(req.files.image.tempFilePath);
        } else {
            res.render('error',{
                error:"imagen no cargada"
            })
        }
        await peliculaNueva.save();
        const pelicula = await Peliculas.findById(peliculaNueva._id).lean();
    
        
        res.render('peliculaIdAdmin', {
            pelicula
        })
    } catch (err) {
        res.render('error', {
            error: err
        })
    }
}


const deletePelicula = async (req, res) => {
    
    try {
        
        const peliculaId = req.params.id;
        const pelicula = await Peliculas.findById(peliculaId).lean();
        
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        if (pelicula.imagen?.secure_url) {
            await deletePhoto(pelicula.imagen.public_id);
        }
        const peliculaEliminado = await Peliculas.findByIdAndDelete(peliculaId);

        if (!peliculaEliminado) {
            return res.render("error",{error:"no se pudo eliminar la pelicula"});
        }
        const peliculas= await Peliculas.find().lean();
        
        res.render("adminPeliculas",{peliculas});
    } catch (err) {
        res.render("error",{error:"no se pudo eliminar la pelicula"});
    }
}



const viewUpdatePelicula = async (req, res) => {
    try {
        const pelicula = await Peliculas.findById(req.params.id).lean();
        if (!pelicula) {
            return res.status(404).render('errorAdmin',{ error: "producto no encontrado" });
        }
        res.render('actualizarPelicula', {
            pelicula
        })
    } catch (err) {
        res.status(500).render('errorAdmin',{ error: "error al obtener producto" });
    }
}



const updatePelicula = async (req, res) => {
    
    try {
        const peliculaId = req.params.id;
        const peliculaActualizada = await Peliculas.findById(peliculaId, req.body);
        if (!peliculaActualizada) {
            return res.status(404).render('errorAdmin',{ error: "producto no encontrado" });
        }
        const peliculaNueva = await Peliculas.findByIdAndUpdate(peliculaId, req.body, { new: true });
        if (req.files?.image) {
            if(peliculaNueva.imagen.public_id){
                await deletePhoto(peliculaNueva.imagen.public_id);
            }
            let peliImg= await uploadPeliculasPhoto(req.files.image.tempFilePath);
            peliculaNueva.imagen = {
                public_id: peliImg.public_id,
                secure_url: peliImg.secure_url
            }
            
            await fs.unlink(req.files.image.tempFilePath);
            await peliculaNueva.save();
        } 
        await peliculaNueva.save();
        const pelicula=await Peliculas.findById(peliculaId).lean();
        res.render('peliculaIdAdmin', {
            pelicula
        })
    }
    catch (err) {
        res.status(500).render('errorAdmin',{ error: "producto no encontrado" });
    }
}



const viewUpdateHomePelicula = async (req, res) => {
    const pelicula = await Peliculas.findById(req.params.id).lean();
    if (!pelicula) {
        if(req.session.rol==1){
            return res.status(404).render('errorAdmin',{ error: "pelicula no encontrado" });
        }
        return res.status(404).render('errorAdmin',{ error: "pelicula no encontrado" });
    }
 
    res.render('homeEdit', {
        pelicula
    })
}

module.exports = {
    getAllPeliculas,
    getPeliculaById,
    createPelicula,
    updatePelicula,
    viewUpdatePelicula,
    deletePelicula,
    viewUpdateHomePelicula,

}
const Serie =require( '../models/seriesModel.js')
const {deletePhoto,uploadSeriesPhoto}=require('../utils/cloudinary.js')
const fs = require('fs-extra')
const getAllSeries = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const series = await Serie.find();
        res.status(200).render(series);
    } catch (err) {
        res.status(500).render('error','error',{ error: "error al obtener lista de productos" });
    }
}


const getSerieById = async (req, res) => {
    try {
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        const serie = await Serie.findById(req.params.id).lean();
        if (!serie) {
            return res.status(404).render('error',{ error: "serie no encontrado" });
        }
       
        res.render('serieId', {
            serie
        })
    } catch (err) {
        res.status(500).render('error',{ error: "error al obtener producto" });
    }
}


const createSerie = async (req, res) => {
    try {
        const serie1 = await Serie.findOne({ nombre: req.body.nombre, categoria: req.body.categoria });
        if (serie1) {
            if (req.files?.image) {
                await fs.unlink(req.files.image.tempFilePath);
            }
            return res.send("producto ya registrado")
        }
        const serieNueva = new Serie(req.body);
        
        if (req.files?.image) {
            const tempFilePath = req.files.image.tempFilePath
            const originalName = req.files.image.name
            const fileExtencion = originalName.split('.').pop()
            const serieImg = await uploadSeriesPhoto(req.files.image.tempFilePath);
            serieNueva.imagen = {
                public_id: serieImg.public_id,
                secure_url: serieImg.secure_url
            }
            // const newTempFilePath = `${req.files.image.tempFilePath}.${fileExtencion}`
            // await fs.rename(tempFilePath, newTempFilePath, (err) => {
            //     if (err) {
                    
            //     }
            // })
            // await fs.unlink(req.files.image.tempFilePath);
        } else {
            res.render('error',{
                error:"imagen no cargada"
            })
        }
        await serieNueva.save();
        const serie = await Serie.findById(serieNueva._id).lean();
        res.render('serieIdAdmin', {
            serie
        })
    } catch (err) {
        console.log(err)
        res.render('error', {
            error: err
        })
    }
}


const deleteSerie = async (req, res) => {
    
    try {
        
        const serieId = req.params.id;
        const serie = await Serie.findById(serieId).lean();
        if (req.files?.image) {
            await fs.unlink(req.files.image.tempFilePath);
        }
        if (serie.imagen?.secure_url) {
            await deletePhoto(serie.imagen.public_id);
        }
        const serieEliminado = await Serie.findByIdAndDelete(serieId);

        if (!serieEliminado) {
            return res.render("error",{error:"no se pudo eliminar serie"});
        }
       
        const series= await Serie.find().lean();
        
        res.render("adminSeries",{series});
    } catch (err) {
        res.render("error",{error:"no se pudo eliminar serie"});
    }
}


const viewUpdateSerie = async (req, res) => {
    try {
        const serie = await Serie.findById(req.params.id).lean();
        if (!serie) {
            return res.status(404).render('errorAdmin',{ error: "producto no encontrado" });
        }
        res.render('actualizarSerie', {
            serie
        })
    } catch (err) {
        res.status(500).render('errorAdmin',{ error: "error al obtener producto" });
    }
}


const updateSerie = async (req, res) => {
    try {
        const serieId = req.params.id;
        const serieActualizada = await Serie.findById(serieId, req.body);
        if (!serieActualizada) {
            return res.status(404).render('errorAdmin',{ error: "producto no encontrado" });
        }
        const serieNueva = await Serie.findByIdAndUpdate(serieId, req.body, { new: true });
        if (req.files?.image) {
            if(serieNueva.imagen.public_id){
                await deletePhoto(serieNueva.imagen.public_id);
            }
            let serieImg= await uploadSeriesPhoto(req.files.image.tempFilePath);
            serieNueva.imagen = {
                public_id: serieImg.public_id,
                secure_url: serieImg.secure_url
            }
            
            await fs.unlink(req.files.image.tempFilePath);
            await serieNueva.save();
        } 
        await serieNueva.save();
        const serie=await Serie.findById(serieId).lean();
        res.render('serieIdAdmin', {
            serie
        })
    }
    catch (err) {
        res.status(500).render('errorAdmin',{ error: "producto no encontrado" });
    }
}



const viewUpdateHomeSerie = async (req, res) => {
    const serie = await Serie.findById(req.params.id).lean();
    if (!serie) {
        return res.status(404).render('errorAdmin', { error: "serie no encontrado" });
    }
    
    res.render('homeEdit', {
        serie
    })
}




module.exports={
    viewUpdateHomeSerie,
    updateSerie,
    viewUpdateSerie,
    deleteSerie,
    createSerie,
    getAllSeries,
    getSerieById,

}







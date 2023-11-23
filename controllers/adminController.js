const Admin =require( '../models/adminModel.js')
const Peliculas =require( '../models/peliculasModel.js')
const Series =require( '../models/seriesModel.js')
const getAllAdmins=async (req,res)=>{
    try{
        const administradores=await Admin.find();
        res.status(200).json(administradores);
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al obtener lista de administradores"});
    }
}
const getAdminById=async (req,res)=>{
    try{
        const administrador=await Admin.findById(req.params.id);
        if(!administrador){
            return res.status(404).render('errorAdmin',{error:"administrador no encontrado"});
        }
        res.status(200).json(administrador);
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al obtener administrador"});
    }
}
const updateAdmin=async (req,res)=>{
    try{
        const administradorId=req.params.id;
        const administradorActualizado=await Admin.findByIdAndUpdate(
            administradorId,
            req.body,
            {new:true}
            );
        if(!administradorActualizado){
            return res.status(404).render('errorAdmin',{error:"administrador no encontrado"});
        }
        res.status(200).json(administradorActualizado);
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al actualizar administrador"});
    }
}
const deleteAdmin=async (req,res)=>{
    try{
        const administradorId=req.params.id;
        const administradorEliminado=await Admin.findByIdAndDelete(administradorId);
        if(!administradorEliminado){
            return res.status(404).render('errorAdmin',{error:"administrador no encontrado"});
        }
        res.status(200).json(administradorEliminado);
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al eliminar administrador"});
    }
}
const createAdmin=async (req,res)=>{
    try{
        const nuevoAdministrador=await Admin.create(req.body);
        await nuevoAdministrador.save();
        res.render('homeAdmin',{
            msg:"usuario registrado exitosamente"
        })
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al crear administrador"});
    }
}
const goHome=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    // console.log(peliculas,series)
    res.render('adminHome',{
        peliculas,series
    })
}


const goCategorias=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
        res.render('adminCategoria',{
            peliculas,series
        })
}

const goPeliculas=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    res.render('adminPeliculas',{
        peliculas,series
    })
}
const goSeries=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    res.render('adminSeries',{
        peliculas,series
    })
}



const goCrearPelicula=(req,res)=>{
    res.render('crearPelicula')
}
const goCrearSerie=(req,res)=>{
    res.render('crearSerie')
}

const goPerfil=(req,res)=>{
    res.render('adminPerfil')
}



module.exports={
    goCrearPelicula,
    goCrearSerie,
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    goCategorias,
    goHome,
    goSeries,
    goPeliculas,
    goPerfil
}




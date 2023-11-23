
const Cliente =require( '../models/clienteModel.js')
const Peliculas =require( '../models/peliculasModel.js')
const Series =require( '../models/seriesModel.js')
const getAllClientes=async (req,res)=>{
    try{
        const clientes=await Cliente.find();
        res.status(200).render('clientes',clientes);
    }catch(err){
        res.status(500).render('error',{error:"error al obtener lista de clientes"});
    }
}

const getClienteById=async (req,res)=>{
    const {email,password}=req.body;
    try{
        
        const cliente=await Cliente.findOne({email:email});
        console.log("esto es cliente|: ",cliente.password,'password: ',password);
        if(!cliente ){
            return res.status(404).render({error:"cliente no encontrado"});
        }else if(cliente.password===password){
            res.status(201).json({msg:`Bienvenido ${cliente.nombre}`});
        }else{
            res.status(404).render('errorAdmin',{error:"contraseña incorrecta"});
        }
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al obtener cliente"});
    }
}


const crearCliente=async (req,res)=>{
    try{
        const {emailRegistrar,passwordRegistrar,username}=req.body;
        const nuevoCliente=await Cliente.create({
            email:emailRegistrar,
            password:passwordRegistrar,
            nombre:username
        });
        await nuevoCliente.save();
        res.render('home',{
            msg:"usuario registrado exitosamente"
        })
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al crear cliente"});
    }
}

const updateCliente=async (req,res)=>{

    try{
        const clienteId=req.params.id;
       
        const clienteActualizado=await Cliente.findByIdAndUpdate(
            clienteId,
            req.body,
            {new:true}
            );
        if(!clienteActualizado){
            return res.status(404).render({error:"cliente no encontrado"});
        }
        res.status(200).render(clienteActualizado);
    }catch(err){
        res.status(500).render('errorAdmin',{error:"error al actualizar cliente"});
    }
}


const deleteCliente=async (req,res)=>{
    try{
        const clienteId=req.params.id;
        const clienteEliminado=await Cliente.findByIdAndDelete(clienteId);
        if(!clienteEliminado){
            return res.status(404).render('error',{error:"cliente no encontrado"});
        }
        res.status(200).json(clienteEliminado);
    }catch(err){
        res.status(500).render('error',{error:"error al eliminar cliente"});
    }
}

const goHome=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    res.render('home',{
        peliculas,series
    })
}


const goCategorias=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
        res.render('categoria',{
            peliculas,series
        })
}

const goPeliculas=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    res.render('peliculas',{
        peliculas,series
    })
}
const goSeries=async(req,res)=>{
    const peliculas=await Peliculas.find().lean()
    const series=await Series.find().lean()
    res.render('series',{
        peliculas,series
    })
}
const goPerfil=(req,res)=>{
    res.render('perfil')
}




module.exports={
    getAllClientes,
    getClienteById,
    crearCliente,
    updateCliente,
    deleteCliente,
    goHome,
    goCategorias,
    goPeliculas,
    goSeries,
    goPerfil
}
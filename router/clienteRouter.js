const express=require( "express");
const router=express.Router();
const loginRequired  =require( '../auth/authController.js');
const {getAllClientes,goPerfil, getClienteById, crearCliente, updateCliente, deleteCliente, goHome, goCategorias, goSeries, goPeliculas}=require('../controllers/clienteController.js')



router.get('/traer',loginRequired,getAllClientes);

router.post('/traer/email',loginRequired,getClienteById);

router.post('/crear',loginRequired,crearCliente);

router.put('/update/:id',loginRequired,updateCliente);

router.delete('/borrar/:id',loginRequired,deleteCliente);


router.get('/home',goHome);

router.get('/categorias',goCategorias);
router.get('/series',goSeries);
router.get('/peliculas',goPeliculas);
router.get('/perfil',goPerfil)

module.exports=router;











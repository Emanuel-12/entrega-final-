const express=require( "express");
const router=express.Router();
const {getAllAdmins,goPerfil, getAdminById, createAdmin, updateAdmin, deleteAdmin, goHome, goCategorias, goSeries, goPeliculas, goCrearPelicula, goCrearSerie}=require('../controllers/adminController.js')

const loginRequired =require( '../auth/authController.js');







router.get('/traer',loginRequired,getAllAdmins);

router.get('/traer/:id',loginRequired,getAdminById);

router.post('/crear',createAdmin);

router.put('/update/:id',loginRequired,updateAdmin);

router.delete('/borrar/:id',loginRequired,deleteAdmin);



router.get('/home',loginRequired,goHome);
router.get('/categorias',loginRequired,goCategorias);
router.get('/series',loginRequired,goSeries);
router.get('/series/crear',loginRequired,goCrearSerie);
router.get('/peliculas/crear',loginRequired,goCrearPelicula);



router.get('/peliculas',loginRequired,goPeliculas);
router.get('/crear/pelicula',loginRequired,goCrearPelicula);
router.get('/crear/serie',loginRequired,goCrearSerie);

router.get('/perfil',goPerfil)

module.exports=router;








































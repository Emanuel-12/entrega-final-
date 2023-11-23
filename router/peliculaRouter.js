const express=require( "express");
const router=express.Router();
const {getAllPeliculas,getPeliculaById,createPelicula,updatePelicula,deletePelicula,viewUpdatePelicula, viewCreatePelicula}=require( '../controllers/peliculaController.js');
const loginRequired =require( '../auth/authController.js');


router.get('/',getAllPeliculas);

router.get('/:id',getPeliculaById);

router.post('/',createPelicula);


router.post('/update/:id',loginRequired,updatePelicula);
router.get('/update/:id',loginRequired,viewUpdatePelicula);


router.post('/:id',loginRequired,deletePelicula);









module.exports=router;



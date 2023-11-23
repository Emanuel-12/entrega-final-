const express=require( "express");
const router=express.Router();

const  loginRequired  =require( '../auth/authController.js');
const { getAllSeries, getSerieById, createSerie, updateSerie, viewUpdateSerie, deleteSerie,viewCreateSerie } = require("../controllers/serieController.js");




router.get('/',getAllSeries);

router.get('/:id',getSerieById);

router.post('/',createSerie);


router.post('/update/:id',loginRequired,updateSerie);
router.get('/update/:id',loginRequired,viewUpdateSerie);

router.post('/:id',loginRequired,deleteSerie);






module.exports=router;


const express=require( "express");
const router=express.Router();
const {login,register,logout}=require( '../controllers/usuariosController.js')  

router.post('/login',login)
router.post('/register',register)
router.get('/logout',logout)
router.get('/login',(req,res)=>{
    res.render('loginLayout', { layout: null })
})



module.exports=router





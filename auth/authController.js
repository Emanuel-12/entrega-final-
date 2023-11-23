
const Usuario=require( "../models/usuariosModel.js")
const loginRequired=async(req,res,next)=>{
    if(!req.session||!req.session.userId){
        return res.redirect('/')
    }
    req.user=await Usuario.findById(req.session.userId)
    if(!req.user){
        return res.redirect('/login')
    }
    if(req.user.rol==1){
        next()
    } else{
        return res.redirect('/login')
    }

}
module.exports=loginRequired



















const  Usuario =require( '../models/usuariosModel.js')
const  bcrypt =require( 'bcrypt')
const  _ =require( 'lodash');
const  { dbSecretFields } =require( '../config.js')
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const usuarios=await Usuario.find()
        const usuario = await Usuario.findOne({ email: email })
        if (!usuario) {
            res.render('loginLayout',{layout: null,
                error: 'Email is incorrect'
            })
        }
        const isCorretcPassword = await bcrypt.compare(password, usuario.password)
        if (!isCorretcPassword) {
            return res.status(400).render('error', { error: 'Password is incorrect' })
        };

        req.session.rol = usuario.rol
        req.session.email = usuario.email
        req.session.userId = usuario._id
        req.session.save()
        if (usuario.rol == 1) {
            res.redirect('/admin/home')
        } else {
            res.redirect('/cliente/home')
        }
    } catch (error) {
        
    }
}

const logout = async (req, res) => {
    req.session.rol = null
    req.session.email = null
    req.session.userId = null
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Error al cerrar sesión');
        } else {
           
            res.render('loginLayout', { layout: null });
        }
    });


}

const register = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    const user = await Usuario.create({ ...req.body, password: hashedPassword })
    return res.redirect('/login')   
}



module.exports={
    login,
    logout,
    register
}























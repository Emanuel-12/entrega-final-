const {Schema,model}=require( 'mongoose');

const AdminSchema = new Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String
}, { collection: 'administradores',timestamps: true  });

const Admin = model('administradore', AdminSchema);

module.exports=Admin



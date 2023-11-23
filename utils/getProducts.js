const { Productos } =require('../models/productoModel.js')
const { updateProducto } =require('../controllers/productoController.js')

export const getProducts=async (categoria)=>{
    return await Productos.find({categoria})
}


module.exports=getProducts



























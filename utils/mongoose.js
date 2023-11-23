const {connect} =require('mongoose')
const {DB_MONGOATLAS} =require('../config.js')

const connectDB = async()=>{
    try {
        await connect(DB_MONGOATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        
    }
    
}

module.exports=connectDB








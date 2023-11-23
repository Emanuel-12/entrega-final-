const dotenv=require("dotenv");
dotenv.config();

const DB_MONGOATLAS=process.env.DB_MONGOATLAS

const API_NAME_CLOUD=process.env.API_NAME_CLOUD
const API_KEY_CLOUD=process.env.API_KEY_CLOUD
const API_KEY_SECRET=process.env.API_KEY_SECRET


const dbSecretFields=['__v','password']
const SESSION_SECRET=process.env.SESSION_SECRET




module.exports={
    DB_MONGOATLAS,
    API_NAME_CLOUD,
    API_KEY_CLOUD,
    API_KEY_SECRET,
    dbSecretFields,
    SESSION_SECRET  
}




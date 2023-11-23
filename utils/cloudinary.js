const cloudinary = require("cloudinary").v2;
const { API_KEY_CLOUD, API_NAME_CLOUD, API_KEY_SECRET } = require("../config.js");



cloudinary.config({
    cloud_name: API_NAME_CLOUD,
    api_key: API_KEY_CLOUD,
    api_secret: API_KEY_SECRET,
    secure: true
});




async function uploadPeliculasPhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "peliculas"
    })
}
async function uploadSeriesPhoto(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "series"
    })
}





async function deletePhoto(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}

module.exports={
    uploadPeliculasPhoto,
    uploadSeriesPhoto,
    deletePhoto
}
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET

});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'syllabite_DEV',
    allowed_formats: ["pdf"],
    resource_type: "raw",
    use_filename: true,         // keep the original name
    unique_filename: false,      // don’t randomize it
    // overwrite : true,
    public_id: (req, file) => {
      // remove existing extension and add timestamp
      const name = file.originalname.replace(/\.[^/.]+$/, '');
      return `${name}-${Date.now()}`;
    }
  },
  
});


module.exports = {
    cloudinary,
    storage,
};

const User = require('../models/user');
const cloudinary = require('cloudinary').v2;

const fs = require('fs');
const path = require('path');
const sequelize = require('../sync');

async function  checkIfExist (email){
    const user = await User.findOne({ where: { email } });    
    return !!user
}



async function generateUrl(req){
     
     const uploadsDir = path.join(__dirname, 'uploads');
     if (!fs.existsSync(uploadsDir)) {
         fs.mkdirSync(uploadsDir);
     }
     const tempFilePath = path.join(uploadsDir, `${Date.now()}-${req.file.originalname}`);
     fs.writeFile(tempFilePath, req.file.buffer, async (err) => {
         if (err) {
         return res.status(500).json({ message: 'Failed to save file', error: err.message });
         }})
       const result = await cloudinary.uploader.upload(tempFilePath , {
         folder:'folder_name'
        });
     return result.url   
}



async function deleteDir(){
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.rmdir(uploadsDir, { recursive: true }, (err) => {
        if (err) {
            console.error(`Erreur lors de la suppression du répertoire uploads: ${err}`);
            return;
        }
        
});
}

module.exports = {checkIfExist,generateUrl,deleteDir};

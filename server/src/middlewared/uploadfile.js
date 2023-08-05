const multer =require('multer');
const path = require('path');
const createError = require('http-errors');
const { UPLOAD_User_Diractory, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');
const { error } = require('console');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_User_Diractory)
    },
    filename: function (req, file, cb) {
      const extname =path.extname(file.originalname);
      
      cb(null, Date.now() + '-' + file.originalname.replace(extname,'')+extname);
    }
  })

  const fileFilter = (req,file,cb) =>{
    const extname = path.extname(file.originalname);
    if(!ALLOWED_FILE_TYPES.includes(extname.substring(1))){
      
      return cb(new Error('File type is not Allowed'),false);
    }
    cd(null,true)
  }
  
  const upload = multer({ storage: storage,
  limits:{fileSize:MAX_FILE_SIZE},
  fileFilter
  })
  module.exports = upload;
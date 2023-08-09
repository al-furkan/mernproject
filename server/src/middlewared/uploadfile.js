const multer =require('multer');
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');


const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null,public/images/users)
    },
    filename: function (req, file, cb) {
      const extname =path.extname(file.originalname);
      
      cb(null, Date.now() + '-' + file.originalname.replace(extname,'')+extname);
    }
  })

  const fileFilter = (req,file,cb) =>{
   if(!file.mimetype.startsWith("image/")){
    return cb(new Error('only image files are allowed'), false);
   }
   if(file.size>MAX_FILE_SIZE){
    return cb(new Error('file size is large. please Uplode small size photo '), false);
   }
   if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
    return cb(new Error('file type is not allowes'), false);
   }
   cb(null,true);
  };
  
  const upload = multer({ storage: storage,
  limits:{fileSize:MAX_FILE_SIZE},
  fileFilter:fileFilter,
  })
  module.exports = upload;
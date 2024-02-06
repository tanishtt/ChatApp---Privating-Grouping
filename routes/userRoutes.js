const express= require('express');

const userRoute=express();

const bodyParser= require('body-parser');
const path=require('path');
const multer=require('multer');


userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended: true}));

userRoute.set('view engine','ejs');
userRoute.set('views',path.resolve('./views'));


userRoute.use(express.static('public'));


const storage= multer.diskStorage({
    destination:function(req, file, cb){
        return cb(null, '../public/images');
    },
    filename: function(req, file, cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({
    storage:storage
});




module.exports=userRoute;



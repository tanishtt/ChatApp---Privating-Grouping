const express= require('express');

const userRoute=express();

const bodyParser= require('body-parser');
const path=require('path');
const multer=require('multer');

const {isLogin, isLogout}=require('../middlewares/auth');

const {
        signUpPageLoad, 
        signUpUser,
        loginPageLoad,
        loginUser,
        logoutUser,
        userDashboard
    } =require('../controllers/userController')


require('dotenv').config();
const session= require('express-session');
const SESSION_SECRET= process.env.SESSION_SECRET;
userRoute.use(session({secret:SESSION_SECRET}));



userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended: true}));

userRoute.set('view engine','ejs');
userRoute.set('views',path.resolve('./views'));


userRoute.use(express.static('public'));


const storage= multer.diskStorage({
    destination:function(req, file, cb){
        return cb(null, path.resolve('./public/images'));
    },
    filename: function(req, file, cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({
    storage:storage
});





userRoute.get('/',(req,res)=>{
    res.redirect('/login');
})

userRoute.get('/signup',isLogout, signUpPageLoad);
userRoute.post('/signup',upload.single('profileImage'),signUpUser);


userRoute.get('/login',isLogout, loginPageLoad);
userRoute.post('/login',loginUser);
userRoute.get('/logout',isLogin, logoutUser);


userRoute.get('/dashboard',isLogin, userDashboard)


userRoute.get('*',(req, res)=>{
    res.redirect('/login');
})

module.exports=userRoute;



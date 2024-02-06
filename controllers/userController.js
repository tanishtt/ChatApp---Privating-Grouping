const User= require('../models/user');
const bcrypt= require('bcrypt');

//signup
async function signUpUser(req, res){
    try{
        const body= req.body;
        const file=req.file;

        console.log(body);
        console.log("/////////////////////////////");
        console.log(file);

        const saltRounds = 10;
        const hashPassword= await bcrypt.hash(body.password, saltRounds)


        await User.create({
            name: body.name,
            email:body.email,
            password: hashPassword,
            profileImage: `images/${file.filename}`
        });

        return res.json("register succesfully");

    }catch(err){
        console.log('signup error : ',err);
    }
}

async function signUpPageLoad(req, res){
    return res.render('signUpPage')

}


//login
async function loginPageLoad(req, res){
    return res.render('loginPage')

}

async function loginUser(req, res){
    //return res.json('logged in...');
    const body=req.body;

    const email=body.email;
    const password= body.password;

    const userData= await User.findOne({
        email:email,
        
    });
//password:password
console.log(userData);
    if(userData){
        const samePassword=await bcrypt.compare(password, userData.password);
        if(samePassword){
            req.session.user= userData;
            res.redirect('/dashboard');
        }
        else{
            return res.render('loginPage',{
            message:'email or password is incorrect'
        });
        }
    }
    else{
        return res.render('loginPage',{
            message:'email or password is incorrect'
        });
    }
}


async function logoutUser(req, res){
    req.session.destroy();
    res.redirect('/login');

}
////////////////////////////////////////////////////////////


async function userDashboard(req, res){
    return res.render('dashboard',{user:req.session.user});

}

module.exports={
    signUpUser,
    signUpPageLoad,
    loginPageLoad,
    loginUser,
    logoutUser,
    userDashboard
}
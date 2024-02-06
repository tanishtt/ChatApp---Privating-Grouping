async function isLogin(req, res, next){
    if(req.session.user)
    {
    next();

    }else{
        res.redirect('/login');
    }
    
    //next();
}

async function isLogout(req, res, next){
    if(req.session.user)
    {
        res.redirect('/dashboard');
    }
    else{
    next();

    }
    
}

module.exports={
    isLogin,
    isLogout
}
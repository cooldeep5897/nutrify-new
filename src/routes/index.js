var router=require('express').Router();
var jwt=require('jsonwebtoken');

const authRouter =require('./auth');
const todoRouter =require('./todos');
const adminRouter =require('./admin');

const isAdmin=function(req,res,next){

    // console.log('userDetails',);

    // if(req.session.email ){
    //     next();
    // }else{
    //     res.sendStatus(401);
    // }
    next();
}

const verifyToken=function(req,res,next){
    if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        const userDetails= jwt.verify(token,'secret');
        
        console.log('userDetails in routes index',userDetails.email);
        if(userDetails.email){
            req.userDetails=userDetails; 
            next();
            // res.render('home',{email: userDetails.email});
        }else{
            res.sendStatus(401);
        }
   }else{
        res.sendStatus(401);
   }
}

router.use('/auth',authRouter);
router.use('/todos',verifyToken,todoRouter); 
router.use('/admin',isAdmin,verifyToken,adminRouter); 

module.exports= router;
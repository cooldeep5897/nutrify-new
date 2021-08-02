var router=require('express').Router();
var jwt=require('jsonwebtoken');
var dbClient=require('../db/index');

const authRouter =require('./auth');
const todoRouter =require('./todos');
// const adminRouter =require('./admin');

const isAdmin=function(req,res,next){

    // console.log('userDetails',);

    // if(req.session.email ){
    //     next();
    // }else{
    //     res.sendStatus(401);
    // }
    next();
}

const verifyToken= async function(req,res,next){
    if(req.cookies.token){
        const token=req.cookies.token;
        const userDetails= jwt.verify(token,'secret');
        
        console.log('userDetails in routes index',userDetails.email);
        if(userDetails.email){
            //req.dbUsers=userDetails;
            const users = dbClient.get('users');
            const dbUsers=await users.findOne({email:userDetails.email});
            req.dbUsers=dbUsers;
            // req.userDetails=userDetails; 

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
// router.use('/admin',verifyToken,adminRouter); 

module.exports= router;
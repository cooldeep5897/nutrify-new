var router=require('express').Router();
var authModel=require('../models/authModel');
var jwt=require('jsonwebtoken');

router.post('/signup',(req,res)=>{
    console.log("in signup");
    const user=req.body;
    authModel.createUser(user,(err,data) => {
        if (err){
            res.json({
                error:true,
                data:null
            })
        }
        else{
            res.status(201);
            res.redirect('/auth/signin');
        }

        // res.end('signed up');
    })
})
router.get('/signup',(req,res)=>{ 
    res.render('signup'); 
})

router.get('/signin',(req,res)=>{ 
    res.render('signin'); 
})

router.post('/signin',(req,res)=>{

    const user=req.body;
    authModel.verifyUser(user,(err,data) => {
        
        if (err){
            console.log(err);
            res.json({
                error:true,
                data:null,
                message:"Failed SignIn"
            })
        }
        else{
            if(data.success){
                //session

            //         req.session.email=data.email;
            //         req.session.role='ADMIN'; 
            //         res.redirect('/home');

            //JWT
                    const token=jwt.sign({
                        email:data.email,
                        role:'ADMIN'
                    },'secret');
                    res.cookie('token',token,{
                        httpOnly: true 
                    });
                    res.json({
                        success:true,
                        token
                    })
                    // res.render('home', data); 
            }else{ console.log( "user sign in failed");
                res.json(data);
            }
        }
    })
})

module.exports=router;
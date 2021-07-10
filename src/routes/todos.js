var router=require('express').Router();

var todosModel=require('../models/todosModel');

router.get('/updatemeal',(req,res)=>{
    res.render('updateMeal');
})

router.get('/createmeal',(req,res)=>{
    res.render('createMeal');
})

router.post('/createMeal',(req,res)=>{
    console.log("in createMeal");
    const meal=req.body;
    meal.email=req.userDetails.email;
    todosModel.createMeal(meal,(err,data) => {
        console.log('err',err);
        if (err){
            res.json({
                error:true,
                data:null
            })
        }
        else{
            res.json(data);
        }

    })
})
router.post('/updatemeal',(req,res)=>{
    console.log("in createMeal");
    const meal=req.body;
    meal.email=req.userDetails.email;
    todosModel.updateMeal(meal,(err,data) => {
        if (err){
            res.json({
                error:true,
                data:null
            })
        }
        else{
            res.json(data);
        }

    })
})


router.get('/deletemeal',(req,res)=>{
    res.render('deleteMeal');
})

router.post('/deletemeal',(req,res)=>{
    console.log("in deletemeal");
    const meal=req.body;
    meal.email=req.userDetails.email;
    todosModel.deleteMeal(meal,(err,data) => {
        if (err){
            res.json({
                error:true,
                data:null
            })
        }
        else{
            if(data.success){
               res.json(data);
                
            }else{
                res.json(data);
            }
        }
    })
})

router.get('/fetchmeal',(req,res)=>{
    res.render('fetchMeal');
})

router.post('/fetchmeal',(req,res)=>{
    console.log("in fetchmeal");
    const meal=req.body;
    meal.email=req.userDetails.email;
    console.log('meal.emil',meal.email);
    todosModel.fetchMeal(meal,(err,data) => {
        if (err){
            res.json({
                error:true,
                message:"error outside",
                data:null
            })
        }
        else{
            if(data.success){
                console.log('in success',data);
                res.json(data);
                
            }else{
                res.json(data);
            }
        }
    })
})

module.exports=router;
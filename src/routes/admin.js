var router=require('express').Router();

router.get('/users',(req,res)=>{
    res.json({
        users:[]
    })
})

module.exports=router;
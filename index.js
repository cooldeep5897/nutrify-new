// const { urlencoded } = require('express');
var express=require('express');
var app=express();
var jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')

// var session = require('express-session');
// app.use(session({
    
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false }
// }))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('static',express.static('public'));
app.use(express.static('frontend/build'));
app.use(cookieParser())

const Logger=function(req,res,next){
    req.requestTime =new Date();
    console.log(`[${new Date()}]:${req.method}${req.url}`);
    next();
}
app.use(Logger);

app.set('views',__dirname+'/src/views');
app.set('view engine','ejs');

const indexRouter =require('./src/routes/index');

app.use(indexRouter);
// app.use('/api/v1',indexRouter); 

app.get('/',(req,res)=>{
    res.render('main');
})

// app.get('/home',(req,res)=>{
//     console.log('session',req.session);
//     if(req.session.email){
//         res.render('home',{email:req.session.email});
//     }else{
//         res.sendStatus(401);
//     }
//     // res.render('home',{email:req.email});
// })

app.get('/home',(req,res)=>{
    console.log('req.header',req.headers);
   if(req.headers.authorization){
        const token=req.headers.authorization.split(' ')[1];
        const userDetails= jwt.verify(token,'secret');
        console.log('userDetails in index home',userDetails.email);
        if(userDetails.email){
            res.render('home',{email: userDetails.email});
        }else{
            res.sendStatus(401);
        }
   }else{
        res.sendStatus(401);
   }
})


app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/frontend/build/index.html');
})

// app.get('/admin/users',isAdmin,(req,res)=>{

// })

// app.get('/',(req,res)=>{
//     res.end('Hello world');
// })

// app.get('/a*b',(req,res)=>{
//     res.end('route'); 
// })

// app.get('/users/:user_id',(req,res)=>{
//     console.log(req.query );
//     console.log(req.params);
//     res.end('User id'); 
//     // res.download('readme.txt'); 
//     // res.json({
//     //     user_id : req.params.user_id,
//     //     name: 'Kuldeep'
//     // })
//     // res.sendFile(__dirname+'/readme.txt');
// })

// app.get('/posts/:post_id',(req,res)=>{
//     res.end('Post id'); 
// })
// app.post('/users/new',(req,res)=>{
//     console.log(req.body);
//     res.end('response',JSON.stringify(req.body));
// })

app.listen( 3000 , ()=>{
    console.log('lisenting to 3000');
});

app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        res.sendStatus(500);
    } else {
        next();
    }
})
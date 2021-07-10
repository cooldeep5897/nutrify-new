var dbClient=require('../db/index');
var passwordHash=require('password-hash');

const createUser = async (user,callback) =>{
    console.log("User" , user);
   try { 
       const users = dbClient.get('users');
   await users.insert({
        email:user.email,
        password:passwordHash.generate(user.password),
        MaxCal:user.maxcal
    })
        callback(null,{
            success:true,
            message: 'Successful Signup'
        });
    }
    catch(e){
        callback(e,null);
    }
}

module.exports.createUser=createUser; 


const verifyUser = async (user,callback) => {
    const { email,password }=user;
    try { 
       const users = dbClient.get('users');
        const dbUsers=await users.findOne({email:user.email});
        console.log('dbusers',dbUsers);
        if(dbUsers){
            
            const isPasswordTrue= passwordHash.verify(password,dbUsers.password);
            if(isPasswordTrue){
                callback(null,{
                    success:true,
                    email
                });
            }else{
                callback(null,{
                    success:false,
                    message: 'check password'
                });
            }
        }else{
            callback(null,{
                success:false,
                message: 'User not Found Plzz sign up'
            });
        }
    }
    catch(e){
        callback(e,null);
    }
}

module.exports.verifyUser=verifyUser;
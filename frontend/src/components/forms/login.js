import React,{ useState } from "react";
import { useHistory } from 'react-router';

const Login=()=>{
    const history=useHistory();
    const [user,setUser]= useState({
        email:"",
        password:""
    });


const handelInput =(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    console.log(name,value);

    setUser({...user,[name]:value});

}

    const PostData= async (e)=>{
        e.preventDefault();

    const {email, password }=user;

    const res=await fetch('/auth/signin',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email, password
        })
    });

    const data=await res.json();
    if (!data.success) {
        alert(data.message);
    } else {
        console.log("in logins");
        history.push('/home');
    }
    
}  

    return(
        <div  className="user">
             <header className="user__header"> <h1 class="user__title">***** Login *****</h1></header>
            <form className="form" action="" onSubmit={PostData}>
            <div class="form__group">
            <input className='form__input' placeholder="Email" type="email" autoComplete="off" name="email"
            value={user.email}
            onChange={handelInput}
            /></div>
           <div class="form__group">
            <input className='form__input' placeholder="Password" type="password" autoComplete="off"  name="password"
            value={user.password}
            onChange={handelInput}
            /></div>
            <button class="btn" type="submit">Sign Up</button>
        </form>
        </div>
    )
}

export default Login;